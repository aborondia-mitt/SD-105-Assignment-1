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

  buildSearchResultHTML = (searchInput) => {
    const searchResults = transitSchedule.searchResults;

    if (searchInput === '' || searchInput === undefined) {
      return 'Please enter a valid search';
    }

    if (searchResults.length <= 0) {
      return 'There were no results for that search'
    }



    let searchList = '';

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
    <input id="search-input" type="text" placeholder="Search for a Street" name="inpu" "autocomplete="off" />
  </form>
  <section class="streets">
    ${this.buildSearchResultHTML(searchInput)}
  </section>
</aside>
<main>
  <div id="street-name" class="titlebar">
    Displaying results for ${transitSchedule.currentStreetTitle}
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