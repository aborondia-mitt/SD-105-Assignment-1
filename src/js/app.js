const apiKey = 'd7PLUCql1DUVNbas9tgX';
const baseSearchURL = `https://api.winnipegtransit.com/v3/streets.json?usage=long&api-key=${apiKey}&name=`;
const baseStopURL = `https://api.winnipegtransit.com/v3/stops.json?usage=long&api-key=${apiKey}&street=`;

class TransitSchedule {
  constructor() {
    this.searchResults = [];
    this.streetStops = [];
    this.stopSchedule = [];
  }

  search = async searchString => {
    const searchURL = `${baseSearchURL}${searchString}`;
    const searchResults = await transitSchedule.getData(searchURL);

    searchResults.streets.forEach(result => {
      this.searchResults.push({ id: result.key, streetName: result.name });
    })

    return searchResults;
  }

  getStops = async street => {
    // replace street key with target dataset key
    const streetKey = this.searchResults[0].id;
    const streetStops = await this.getData(`${baseStopURL}${streetKey}`);
    streetStops.stops.forEach(stop => {
      this.streetStops.push({ id: stop.key, name: stop.name, crossStreet: stop['cross-street'].name, direction: stop.direction })
    })

    this.getStopSchedules();

  }

  getData = async url => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  // getStopInformation = () => {

  // }

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

transitSchedule.search('kinver')
  .then(searchResults => {
    // render search
    return transitSchedule.getStops(searchResults)
  })
  .then(stops => {
    // transitSchedule.streetStops = stops.stops;
    // return transitSchedule.getStopSchedules();
  })
  .then(schedules => console.log(transitSchedule))
// .then(()=> console.log(transitSchedule.searchResults) )
  // .then(data => buildHTMLLinks)
  // getStops on click
  // .then(data => getStops(data))
  // .then(data => getStopSchedules(data))