class UI {
  constructor() {

  }

  get searchInput() {
    return document.querySelector('#search-input').value;
  }

  handleSubmit = async (event) => {
    await transitSchedule.getSearchResults(this.searchInput);
    renderer.renderPage(this.searchInput);
  }

  handleClick = target => {
    if (target.tagName === 'A') {
      transitSchedule.getStops(target.dataset.streetKey)
        .then(streetStopsData => transitSchedule.streetStops = streetStopsData)
        .then(() => transitSchedule.currentStreetTitle = target.textContent)
        .then(() => renderer.renderPage())
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

