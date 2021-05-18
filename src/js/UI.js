

class UI {
  constructor() {

  }

  handleSubmit = async (event) => {
    let searchInput = document.querySelector('#search-input').value;

    if (event.key === 'Enter' && event.target.id === 'search-input') {
      await transitSchedule.search(searchInput);
      renderer.renderPage();
      searchInput = '';
    }

  }

  handleClick = async (target) => {
    if (target.tagName === 'A') {
      await transitSchedule.getStops(target.dataset.streetKey)
        .then(stopPromises => Promise.all(stopPromises))
        .then(stopPromises => transitSchedule.streetStops = stopPromises)
      .then(() => renderer.renderPage(target.textContent))
    }
  }
}

const ui = new UI();

document.body.addEventListener('keydown', event => {
  ui.handleSubmit(event);
})

document.body.addEventListener('click', event => {
  const target = event.target;

  ui.handleClick(target);
})

