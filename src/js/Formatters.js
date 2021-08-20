class TimeFormatter {
  static getCurrentTime = () => {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
  }

  static getYear = () => moment().format('YYYY');

  static getMonth = () => moment().format('MM');

  static getDay = () => moment().format('DD');
  
  static getTime = (hoursFromNow = 0) => moment().add(hoursFromNow, 'h').format('HH:mm:ss');
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