class Renderer {
  constructor() {

  }

  buildScheduledStopsHTML = () => {
    let scheduledStopList = '';
    transitSchedule.streetStops.forEach(stop => {
      scheduledStopList += `<tr>
      <td>${stop.name}</td>
      <td>${stop.crossStreet}</td>
      <td>${stop.direction}</td>
      <td>TBD</td>
      <td>TBD</td>
        </tr>`;
    })

    return scheduledStopList;
  }

  buildSearchResultHTML = () => {
    const searchResults = transitSchedule.searchResults;

    if (searchResults.length <= 0) {
      return 'Please enter a valid search';
    }

    let searchList = '';

    searchResults.forEach(result => {
      searchList += `<a href="#" data-street-key=${result.id}>${result.streetName}</a>`
    })
    return searchList;
  }

  renderPage = (streetName = '') => {
    document.body.innerHTML = `
<aside>
  <div class="titlebar">
    <i class="fas fa-bus-alt" aria-hidden="true"></i>Nexbuss
  </div>
  <form id="search-form">
    <input id="search-input" type="text" placeholder="Search for a Street" />
  </form>
  <section class="streets">
    ${this.buildSearchResultHTML()}
  </section>
</aside>
<main>
  <div id="street-name" class="titlebar">
    Displaying results for ${streetName}
  </div>
  <table>
    <thead>
      <tr>
        <td>Stop Name</td>
        <td>Cross Street</td>
        <td>Direction</td>
        <td>Bus #</td>
        <td>Next Bus</td>
      </tr>
    </thead>
    <tbody>
    ${this.buildScheduledStopsHTML()};
    </tbody>
  </table>
</main>`;
  }
}

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
      renderer.renderPage(target.textContent);
    }
  }
}

const renderer = new Renderer();
const ui = new UI();
renderer.renderPage();



document.body.addEventListener('keydown', event => {
  ui.handleSubmit(event);
})

document.body.addEventListener('click', event => {
  const target = event.target;

  ui.handleClick(target);
})

