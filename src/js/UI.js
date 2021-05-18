class UI {
  constructor() {

  }

  handleSubmit = async (event) => {
    let searchInput = document.querySelector('#search-input').value;

    await transitSchedule.search(searchInput);
    renderer.renderPage();
    searchInput = '';
  }

  handleClick = target => {
    if (target.tagName === 'A') {
      transitSchedule.getStops(target.dataset.streetKey)
        .then(streetStopsData => transitSchedule.streetStops = streetStopsData)
        .then(() => renderer.renderPage(target.textContent))
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

