const apiKey = 'd7PLUCql1DUVNbas9tgX';
const baseSearchURL = `https://api.winnipegtransit.com/v3/streets.json?usage=long&api-key=${apiKey}&name=`;
const baseStopURL = `https://api.winnipegtransit.com/v3/stops.json?usage=long&api-key=${apiKey}&street=`;
// const baseStopScheduleURL = `https://api.winnipegtransit.com/v3/stops/${PUTAVARIABLEINHERE}/schedule.json?usage=long&api-key=${apiKey}`;

const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

const search = (searchString) => {
  const searchURL = `${baseSearchURL}${searchString}`;

  return getData(searchURL);
}

search('henlow')
  .then(data => console.log(data));