class TimeFormatter {
  static getCurrentTime = () => {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
  }

  static formatTimeForApiURL = hoursFromNow => {
    const twoDigitHour = moment(new Date()).add(hoursFromNow, 'hours').format('hh');
    return moment(new Date()).format(`${twoDigitHour}:mm:ss`);
  }
}

class StringFormatter {

  static searchInputEmpty = (searchInput) => {
    for (let letter of searchInput) {
      if (letter !== '') {
        return false;
      }
    }

    return true;
  }

  static isInvalidCharacter = (letter) => {
    const invalidCharacters = [';', '#', '%', '&', '_', '+', '?'];

    for (let i = 0; i < invalidCharacters.length; i++) {
      if (letter === invalidCharacters[i]) {
        return true;
      }
    }

    return false;
  }
  static sanitizeInputString = (searchInput) => {
    if (this.isInvalidCharacter(searchInput[0]) || this.searchInputEmpty(searchInput)) {
      return 'EMPTYSTRING';
    }

    return searchInput;
  }
}