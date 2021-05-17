const apiKey = 'd7PLUCql1DUVNbas9tgX';
const baseSearchURL = `https://api.winnipegtransit.com/v3/streets.json?usage=long&api-key=${apiKey}&name=`;
const baseStopURL = `https://api.winnipegtransit.com/v3/stops.json?usage=long&api-key=${apiKey}&street=`;

class TransitSchedule {
  constructor() {
    this.searchResults = [];
    this.stops = [];
  }
  search = searchString => {
    const searchURL = `${baseSearchURL}${searchString}`;

    return transitSchedule.getData(searchURL);
  }

  getStops = street => {
    // replace street key with target dataset key
    const streetKey = street.streets[0].key;
    const streetStops = transitSchedule.getData(`${baseStopURL}${streetKey}`);
  
    return streetStops;
  }

  getData = async url => {
    const response = await fetch(url);
    const data = await response.json();
  
    return data;
  }
  
  // const getStopTimes = (stops) => {
  //   // const scheduledStops = 
  //   // console.log(stops)
  //   stops.forEach(stop => {
  
  //     console.log(new Date(stop['stop-schedule']['route-schedules'][0]['scheduled-stops'][0].times.arrival.estimated).toLocaleTimeString());
  //   })
  // }
  
  getStopScheduleURL = stop => {
    const scheduleURL = `https://api.winnipegtransit.com/v3/stops/${stop.key}/schedule.json?usage=long&api-key=${apiKey}`;
  
    return scheduleURL;
  }
  
  getStopSchedules = async streetStops => {
    let scheduledStops = [];
  
    streetStops.stops.forEach(stop => {
      const stopScheduleURL = transitSchedule.getStopScheduleURL(stop);
  
      scheduledStops.push(transitSchedule.getData(stopScheduleURL));
    })
  
    scheduledStops = await Promise.all(scheduledStops);
    // const soonestStops = getStopTimes(scheduledStops);
  
    // return soonestStops;
  }
}



const transitSchedule = new TransitSchedule();

transitSchedule.search('kinver')
  .then(searchResults => {
    transitSchedule.searchResults = searchResults.streets;
    return transitSchedule.getStops(searchResults)
  })
  .then(stops => {
    transitSchedule.stops = stops.stops;
    console.log(transitSchedule.stops);
  })
// .then(()=> console.log(transitSchedule.searchResults) )
  // .then(data => buildHTMLLinks)
  // getStops on click
  // .then(data => getStops(data))
  // .then(data => getStopSchedules(data))