class TimeFormatter {
  static getCurrentTime = () => {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
  }

  static formatTimeForApiURL = hoursFromNow => {
    const twoDigitHour = moment(new Date()).add(hoursFromNow, 'hours').format('hh');
    return moment(new Date()).format(`${twoDigitHour}:mm:ss`);
  }
}