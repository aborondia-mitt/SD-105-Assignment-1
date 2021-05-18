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
    let searchList = '';

    transitSchedule.searchResults.forEach(result => {
      searchList += `<a href="#" data-street-key=${result.id}>${result.streetName}</a>`
    })
    console.log(transitSchedule.searchResults)
    return searchList;
  }

  renderPage = (streetName) => {
    document.body.innerHTML = `
<aside>
  <div class="titlebar">
    <i class="fas fa-bus-alt" aria-hidden="true"></i>Nexbuss
  </div>
  <form>
    <input type="text" placeholder="Search for a Street" />
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

document.body.addEventListener('click', event => {
  renderer.renderPage(transitSchedule.searchResults[0].streetName);
})

