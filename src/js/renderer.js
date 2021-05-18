class Renderer {
  constructor() {
    this.currentSearchedInput = '';
    this.currentStreetTitle = '';
  }

  renderCurrentTime = () => {
    document.getElementById('current-time').innerHTML = TimeFormatter.getCurrentTime();
  }

  buildScheduledStopsHTML = () => {
    let scheduledStopList = '';

    transitSchedule.streetStops.forEach(stop => {
      scheduledStopList += `
      <tr>
        <td>${stop.name}</td>
        <td>${stop.crossStreet}</td>
        <td>${stop.direction}</td>
        <td>${stop.schedule.busNumber}</td>
        <td>${stop.schedule.nextStop}</td>
      </tr>
      `;
    })

    return scheduledStopList;
  }

  buildSearchResultHTML = (searchInput) => {
    let searchList = '';
    const searchResults = transitSchedule.searchResults;

    if (searchInput === undefined) {
      return '<p>Please enter your search</p>';
    }

    if (searchInput === '' || searchResults.length <= 0) {
      return '<p>There were no results for that search</p>'
    }

    searchResults.forEach(result => {
      searchList += `<a href="#" data-street-key=${result.id}>${result.streetName}</a>`
    })

    return searchList;
  }

  renderPage = (searchInput) => {
    document.body.innerHTML = `
<aside>
  <div class="titlebar">
    <i class="fas fa-bus-alt" aria-hidden="true"></i>Nexbuss
  </div>
  <form id="search-form">
    <input id="search-input" type="text" placeholder="Search for a Street" "autocomplete="off" />
  </form>
  <section class="streets">
    ${this.buildSearchResultHTML(searchInput)}
  </section>
</aside>
<main>
  <div id="street-name" class="titlebar">
    Displaying results for: ${this.currentStreetTitle}<br>
    Search Request Time: ${transitSchedule.startOfQuery}<br>
    Current Time: <span id="current-time">${TimeFormatter.getCurrentTime()}</span>
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