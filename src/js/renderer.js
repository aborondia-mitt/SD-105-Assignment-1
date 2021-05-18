class Renderer {
  constructor() {
  }

  buildScheduledStopsHTML = () => {
    let scheduledStopList = '';
    for (let i = 0; i < transitSchedule.streetStops.length; i++) {
      const stop = transitSchedule.streetStops[i];
      scheduledStopList += `<tr>
      <td>${stop.name}</td>
      <td>${stop.crossStreet}</td>
      <td>${stop.direction}</td>
      <td>${stop.schedule.busNumber}</td>
      <td>${stop.schedule.nextStop}</td>
        </tr>`;
    }

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

const renderer = new Renderer();

renderer.renderPage();