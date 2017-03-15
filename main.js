console.log('main.js here!')

let apiKey = 'n58uEY6MvzF3sxKPk7ZgM4k02830Ihr4qe11a6pV'
let apodURL = 'https://api.nasa.gov/planetary/apod?api_key='
let astroURL = function (startDate) {
  return 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + startDate + '&api_key='
}
let busLength = 45
let wkOfEvents = []

//Get user date
$('.user-date-input').on('submit', function (e) {
  e.preventDefault()

  //make date for ajax request
  let year = $('#year-date').val()
  let month = $('#month-date').val()
  let day = $('#day-date').val()
  let startDate = year + '-' + month + '-' + day

  makeRequest(startDate)

  $('#event_total').append('Total Asteroids For: ' + month + '/' + day + '/' + year)
  $('#month-date').val('')
  $('#day-date').val('')
  $('#year-date').val('')

  buildTableDAta
})

//allow user to select from week dropdown
$('#day-select').on('change', function() {
  $('tbody').empty()
  $('#astro-day-total').empty()
  $('.astro-table-container').show()
  dayVal = $('#day-select option:selected').val()
  $('#daily-count-ttl').append('Date: ' + dayVal)
  $('#astro-day-total').append('Asteroid Count: ' + wkOfEvents[dayVal].length)

  buildTableDAta(dayVal)
})

//build table based on user dropdown choice
function buildTableDAta (dayVal) {

  for(i = 0; i < wkOfEvents[dayVal].length; i++) {
    let name =  wkOfEvents[dayVal][i]['name']
    let haz = (wkOfEvents[dayVal][i]['is_potentially_hazardous_asteroid'])

    if (haz) {
      haz = 'HIDE!';
    } else {
      haz = 'Whatevs';
    }

    //school bus calc
    let diaMax = Math.round(wkOfEvents[dayVal][i]['estimated_diameter']['feet']['estimated_diameter_max'])
    let diaMin = Math.round(wkOfEvents[dayVal][i]['estimated_diameter']['feet']['estimated_diameter_min'])
    let dia = Math.round(diaMax + diaMin)/2
    let astroBus = Math.round((dia/45))

    let dist = Math.round(wkOfEvents[dayVal][i]['close_approach_data'][0]['miss_distance']['miles'])
    let easyDist = dist.toLocaleString('en')

    $('tbody').append('<tr><td>'+ haz +'</td><td>'+ name +'</td><td>'+ astroBus +'</td><td>'+ dia +'</td><td>'+ easyDist +'</td>' + '</tr>')
  }
}


function makeRequest(startDate) {
  $.ajax({
    url: astroURL(startDate) + apiKey,
    method: 'get',
    success: function (data) {

      let numEvents = data.element_count
      $('#astro-total').append(numEvents)

      $('#event_total').show()
      $('.day-of-week-container').show()

      wkOfEvents = data.near_earth_objects

      for(let date in wkOfEvents) {

        let dailyCount = wkOfEvents[date].length
        $('#day-select').append('<option value="' + date + '">'+ date + '</option>')
      }
      //build table based on date user enters
      // $('tbody').empty()
      // $('#astro-day-total').empty()
      // $('.astro-table-container').show()
      //
      // console.log(wkOfEvents[0])
      // buildTableDAta(0)
    }
  })
}


//Astronomy Pic of the Day
$.ajax({
  url: apodURL + apiKey,
  method: 'get',
  success: function (data) {
    $('#astro-pic-img').attr('src', data.url)
    $('#astro-pic-title').text(data.title)
  }
})
