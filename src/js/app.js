const apiKey = 'd7PLUCql1DUVNbas9tgX';
const baseSearchURL = `https://api.winnipegtransit.com/v3/streets.json?usage=long&api-key=${apiKey}&name=`;
const baseStopURL = `https://api.winnipegtransit.com/v3/stops.json?usage=long&api-key=${apiKey}&street=`;

class TransitSchedule {
  constructor() {
    this.searchResults = [];
    this.streetStops = [];
    this.stopSchedule = [];
  }

  search = async (searchString) => {
    if (searchString === '') {
      searchString = 'no input';
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
    const streetStops = await this.getData(`${baseStopURL}${streetId}`);
    const filteredStops = [];
    streetStops.stops.forEach(stop => {
      filteredStops.push({ id: stop.key, name: stop.name, crossStreet: stop['cross-street'].name, direction: stop.direction })
    })

    this.streetStops = filteredStops;

    this.getStopSchedules();
  }

  getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  getStopScheduleURL = stopId => {
    const scheduleURL = `https://api.winnipegtransit.com/v3/stops/${stopId}/schedule.json?usage=long&api-key=${apiKey}`;

    return scheduleURL;
  }

  getStopSchedules = async () => {
    this.streetStops.forEach(async streetStop => {
      // streetStop.schedule = {};
      const stopScheduleURL = this.getStopScheduleURL(streetStop.id);
      const stops = await this.getData(stopScheduleURL);
      streetStop.scheduledStops = stops;
      // this.getStopInformation(stops, streetStop);
    })

    // scheduledStops = await Promise.all(scheduledStops);
    // const soonestStops = getStopTimes(scheduledStops);

    // return soonestStops;
    // return scheduledStops;
  }
}



const transitSchedule = new TransitSchedule();

