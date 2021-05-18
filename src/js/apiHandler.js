const baseApiData = {
  apiKey: 'd7PLUCql1DUVNbas9tgX',
  baseSearchURL: {
    get: () => `https://api.winnipegtransit.com/v3/streets.json?usage=long&api-key=${baseApiData.apiKey}&name=`
  },
  baseStopURL: {
    get: () => `https://api.winnipegtransit.com/v3/stops.json?usage=long&api-key=${baseApiData.apiKey}&street=`
  },
}

class TransitSchedule {
  constructor() {
    this.searchResults = [];
    this.streetStops = [];
    this.currentStreetTitle = '';
  }

  getData = async url => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Fetch not successful')
    }

    const data = await response.json();

    return data;
  }

  formatTimeForApiURL = hoursFromNow => {
    const twoDigitHour = (parseInt(moment(new Date()).format('h')) + hoursFromNow).toString().padStart(2, '0');
    return moment(new Date()).format(`${twoDigitHour}:m`);
  }

  getStopScheduleURL = stopId => {
    const todaysDate = new Date().getDate();
    const searchEndTime = this.formatTimeForApiURL(6);
    const searchStartTime = this.formatTimeForApiURL(0);
    const scheduleURL = `https://api.winnipegtransit.com/v3/stops/${stopId}/schedule.json?usage=long&start=2021-05-${todaysDate}T${searchStartTime}:00&end=2021-05-${todaysDate}T${searchEndTime}:00&api-key=${baseApiData.apiKey}`;

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

  getStops = async streetId => {
    let filteredStops = [];
    const streetStops = await this.getData(`${baseApiData.baseStopURL.get()}${streetId}`);

    streetStops.stops.forEach(stop => {
      filteredStops.push({ id: stop.key, name: stop.name, crossStreet: stop['cross-street'].name, direction: stop.direction })
    })

    filteredStops = await this.getStopSchedules(filteredStops);

    filteredStops.sort((a, b) => {
      return a.schedule.rawStopTime - b.schedule.rawStopTime;
    })

    return filteredStops;
  }

  getSearchResults = async searchString => {
    const filteredResults = [];
    const searchURL = `${baseApiData.baseSearchURL.get()}${searchString}`;
    const searchResults = await transitSchedule.getData(searchURL)
      .catch(() => {
        renderer.renderPage();
        throw new Error('The search input was invalid');
      })

    searchResults.streets.forEach(result => {
      filteredResults.push({ id: result.key, streetName: result.name });
    })

    this.searchResults = filteredResults;

    return searchResults;
  }
}

const transitSchedule = new TransitSchedule();