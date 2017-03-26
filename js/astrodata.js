console.log('astrodata.js here')

let numEvents = ''

function makeRequest(startDate) {
  $.ajax({
    url: `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&api_key=${apiKey}`,
    method: 'get',
    success: function (data) {
      console.log(data)

      numEvents = data.element_count
      wkOfEvents = data.near_earth_objects



      for(let date in wkOfEvents) {

        $('#day-select').append('<option value="' + date + '">'+ date + '</option>')
      }

      getStuffReady ()

      buildTableDAta(startDate)
    },
    error: function (error) {
      console.log('Error: ', error)
    }
  })
}

function getStuffReady() {
  $('#astro-total').append('Week Count: ' + numEvents)
  $('#event_total').show()
  $('.day-of-week-container').show()
  $('.astro-table-container').show()
  $('.astro-table-container').addClass('display', 'inline-block')
  $('#daily-count-ttl').append('Date: ' + startDate)
  $('#astro-day-total').append('Day Count: ' + (wkOfEvents[startDate].length))
}
