class TimeFormatter {
  static getCurrentTime = () => {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
  }

  static formatTimeForApiURL = hoursFromNow => {
    const twoDigitHour = parseInt(moment(new Date()).format('hh')) + hoursFromNow;
    return moment(new Date()).format(`${twoDigitHour}:mm:ss`);
  }
}