console.log('main.js here!')

let apiKey = 'n58uEY6MvzF3sxKPk7ZgM4k02830Ihr4qe11a6pV'
let apodURL = 'https://api.nasa.gov/planetary/apod?api_key='
let astroURL = function (startDate) {
  return 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + startDate + '&api_key='
}

let busLength = 45

//Get user date
$('.user-date-input').on('submit', function (e) {
  e.preventDefault()

  let year = $('#year-date').val()
  let month = $('#month-date').val()
  let day = $('#day-date').val()

  let startDate = year + '-' + month + '-' + day

  $.ajax({
    url: astroURL(startDate) + apiKey,
    method: 'get',
    success: function (data) {
      let numEvents = data.element_count
      $('#event_total').append(numEvents)

      let wkOfEvents = data.near_earth_objects

      for(let date in wkOfEvents) {

        let dailyCount = wkOfEvents[date].length
        $('#day-select').append('<option>'+ date + ' Count: ' + dailyCount + '</option')

        for(i = 0; i < wkOfEvents[date].length; i++) {
          let name =  wkOfEvents[date][i]['name']
          let haz = wkOfEvents[date][i]['is_potentially_hazardous_asteroid']

          //school bus calc
          let diaMax = Math.round(wkOfEvents[date][i]['estimated_diameter']['feet']['estimated_diameter_max'])
          let diaMin = Math.round(wkOfEvents[date][i]['estimated_diameter']['feet']['estimated_diameter_min'])
          let dia = (diaMax + diaMin)/2
          let astroBus = Math.round((dia/45))

          let dist = Math.round(wkOfEvents[date][i]['close_approach_data'][0]['miss_distance']['miles'])
          let easyDist = dist.toLocaleString('en')

          let approachDate = wkOfEvents[date][i]['close_approach_data'][0]['close_approach_date']

          $('tbody').append('<tr><td>'+ haz +'</td><td>'+ name +'</td><td>'+ astroBus +'</td><td>'+ dia +'</td><td>'+ easyDist +'</td><td>'+ approachDate +'</td>' + '</tr>')

          $('#bad-select').append()
        }
      }
    }
  })
})


//Astronomy Pic of the Day
$.ajax({
  url: apodURL + apiKey,
  method: 'get',
  success: function (data) {
    $('#astro-pic-img').attr('src', data.url)
    $('#astro-pic-title').text(data.title)
  }
})
