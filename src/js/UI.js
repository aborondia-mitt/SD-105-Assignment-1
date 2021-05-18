class UI {
  constructor() {
    this.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.searchInput = {
      get: () => {
        return document.querySelector('#search-input').value;
      }
    }
  }

  handleSubmit = async (event) => {
    const searchInput = this.searchInput.get();
    const sanitizedInput = StringFormatter.sanitizeInputString(searchInput);
    await transitSchedule.getSearchResults(sanitizedInput);
    renderer.currentSearchedInput = searchInput;
    renderer.renderPage(searchInput);
  }

  handleClick = async target => {
    if (target.tagName === 'A') {
      await transitSchedule.getStops(target.dataset.streetKey)
        .then(streetStopsData => transitSchedule.streetStops = streetStopsData)
      renderer.currentStreetTitle = target.textContent
      renderer.renderPage(renderer.currentSearchedInput)
    }
  }
}

const ui = new UI();

document.body.addEventListener('submit', event => {
  event.preventDefault()

  ui.handleSubmit(event);
})

document.body.addEventListener('click', event => {
  const target = event.target;

  ui.handleClick(target);
})

const currentTimeUpdater = setInterval(() => {
  renderer.renderCurrentTime();
}, 100)