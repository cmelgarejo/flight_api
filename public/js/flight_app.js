/**
 * Variables for the from and to airport objects and a 'human' dateTime format
 */
var _airports = {};
var _dateTimeFormat = 'MMMM Do YYYY, h:mm:ss a';
var dateFormat = 'YYYY-MM-DD';
/**
 * documentReady - entry point of the flight_api.js
 */
$(document).ready(function documentReady() {
  var earliestFlightDay = moment().add(3, 'days').format(dateFormat);

  $('#when').attr('placeholder', earliestFlightDay).val(earliestFlightDay); //Set "earliestFlightDay" as placeholder
  $('#dtp_when').datetimepicker({
    format: dateFormat,
    minDate: earliestFlightDay
  }); //And set "earliestFlightDay" as selected date

  autocompleteAirports('#from', 'from');
  autocompleteAirports('#to', 'to');

  $('form').submit(submitSearch);
});

/**
 * createRows - Creates the rows for the grid
 *
 * @param  {sting} gridName     the name of the affected grid
 * @param  {object} searchResult the object containing the data to be appended
 */
function createRows(gridName, searchResult) {
  //Airline [airline.name]	Flight No. [flightNum]	Departure [start.dateTime]	Arrival [finish.dateTime]	Price [price]
  JSON.parse(searchResult).sort(function(a, b) {
    return a.price - b.price; //lets get the best prices for each airline first! :D
  }).forEach(function parseResult(result, ix, resultObj) {
    var starClass = (ix < 3 //Let's mark the 3 best prices first!
      ?
      'success' :
      resultObj.length - 1 == ix ?
      'danger' // and lets mark the most expensive one also.
      :
      'warning');
    var row = $(`<tr class="${starClass}">`);
    row.append($("<td>").text(result.airline.name))
    row.append($("<td>").text(result.flightNum));
    row.append($("<td>").text(moment(result.start.dateTime).format(_dateTimeFormat)));
    row.append($("<td>").text(moment(result.finish.dateTime).format(_dateTimeFormat)));
    row.append($("<td>").text(result.price));
    $(`#${gridName} tbody`).append(row);
  });
}

/**
 * parseSearchResults - Parses the object returned from the flight search
 *
 * @param  {object} airlines   the airlines that will be queried
 * @param  {object} searchData the json data used to query {date, from, to}
 */
function parseSearchResults(gridName, airlines, searchData) {
  //console.log(gridName, searchData);
  JSON.parse(airlines).forEach(function parseAirlines(airline) {
    $.post(`api/search/${airline.code}`, searchData).done(function(searchResult) {
      createRows(gridName, searchResult);
    }).fail(function(obj, status, msg) {
      console.log(obj, status, msg); //Fail graciously, like telling telling the user with an alert that the request hasn't been completed and/or failed
    });
  });
}

/**
 * submitSearch - Submit search behaviour
 */
function submitSearch(event) {
  event.preventDefault(); //stop the page from refreshing
  if (_airports.from && _airports.to) { //if we have all the fields completed
    $.get('api/airlines', function getAirlines(airlines) {
      for (var ix = 1; ix < 6; ix++) {
        $(`#flightgrid_${ix} tbody tr`).remove();
        // get the form data
        var searchData = {
          from: _airports.from.airportCode,
          to: _airports.to.airportCode,
          date: moment($('#when').val()).add(ix - 3, 'days').format(dateFormat)
        };
        parseSearchResults(`flightgrid_${ix}`, airlines, searchData);
      }
    }).fail(function(obj, status, msg) {
      console.log(obj, status, msg);
      //Fail graciously, like telling telling the user with an alert that the request hasn't been completed and/or failed
    });
  } else {
    if (_airports.from) //Let's submit only when all the information is set.
      $('#to').focus();
    else
      $('#from').focus();
  }
}

/**
 * autocompleteAirports - Builds an autocomplete input using the /api/ariports method
 *
 * @param  {string} selector The selector of the input that will autocomplete
 * @param  {string} airport  The object/property that will hold the airport object
 */
function autocompleteAirports(selector, airport) {
  $(selector).autocomplete({
    source: 'api/airports', //Call to our local API, It'll send the "?term=" query string
    minLength: 2,
    select: function autocompleteSelect(event, ui) {
      event.preventDefault(); //prevents the default behaviour (or we'll get a [Object object] label on the input)
      $(this).val(ui.item.label); //and set the right text
      _airports[airport] = ui.item.value; //store the selected airport in the right property
    },
    focus: function autocompleteFocus(event, ui) {
      event.preventDefault(); //prevents the default behaviour (or we'll get a [Object object] label on the input)
      $(this).val(ui.item.label); //and set the right text
    }
  });
}
