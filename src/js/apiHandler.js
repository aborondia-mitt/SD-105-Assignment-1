const apiKey = 'd7PLUCql1DUVNbas9tgX';
const baseSearchURL = `https://api.winnipegtransit.com/v3/streets.json?usage=long&api-key=${apiKey}&name=`;
const baseStopURL = `https://api.winnipegtransit.com/v3/stops.json?usage=long&api-key=${apiKey}&street=`;

class TransitSchedule {
  constructor() {
    this.searchResults = [];
    this.streetStops = [];
    this.currentStreetTitle = '';
  }

  search = async searchString => {
    if (searchString === '') {
      searchString = 'NOSEARCHENTERED';
    }

    const searchURL = `${baseSearchURL}${searchString}`;
    const searchResults = await transitSchedule.getData(searchURL);
    const filteredResults = [];

    searchResults.streets.forEach(result => {
      filteredResults.push({ id: result.key, streetName: result.name });
    })

    this.searchResults = filteredResults;

    return searchResults;
  }

  getStops = async streetId => {
    let filteredStops = [];
    const streetStops = await this.getData(`${baseStopURL}${streetId}`);

    streetStops.stops.forEach(stop => {
      filteredStops.push({ id: stop.key, name: stop.name, crossStreet: stop['cross-street'].name, direction: stop.direction })
    })

    filteredStops = await this.getStopSchedules(filteredStops);

    filteredStops.sort((a, b) => {
      return a.schedule.rawStopTime - b.schedule.rawStopTime;
    })

    return filteredStops;
  }

  getData = async url => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  getTime = additionalHours => {
    return (parseInt(moment(new Date()).format('h')) + additionalHours).toString().padStart(2, '0')
  }

  getStopScheduleURL = stopId => {
    const todaysDate = new Date().getDate();
    const inSixHours = this.getTime(6);
    const currentHour = this.getTime(0);
    const scheduleURL = `https://api.winnipegtransit.com/v3/stops/${stopId}/schedule.json?usage=long&start=2021-05-${todaysDate}T${currentHour}:00&end=2021-05-${todaysDate}T${inSixHours}:00&api-key=${apiKey}`;

    return scheduleURL;
  }

  getStopInformation = async streetStop => {
    const schedule = { busNumber: 'N/A', nextStop: 'N/A' };
    const stopScheduleURL = this.getStopScheduleURL(streetStop.id);
    const stops = await this.getData(stopScheduleURL);
    const stopSchedule = stops['stop-schedule']['route-schedules'][0];

    if (stopSchedule !== undefined) {
      schedule.busNumber = (stopSchedule.route.key);
      const arrivalTime = stopSchedule['scheduled-stops'][0].times.arrival;

      if (arrivalTime !== undefined) {
        const nextStop = new Date(arrivalTime.estimated);
        schedule.nextStop = moment(nextStop).format('LT');
        schedule.rawStopTime = nextStop.getTime();
      }
    }

    return schedule;
  }

  getStopSchedules = async filteredStops => {
    const stopsWithSchedule = filteredStops;

    for (let i = 0; i < stopsWithSchedule.length; i++) {
      stopsWithSchedule[i].schedule = await this.getStopInformation(stopsWithSchedule[i]);
    }

    return stopsWithSchedule;
  }
}

const transitSchedule = new TransitSchedule();