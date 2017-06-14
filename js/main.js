const busLength = 45
let wkOfEvents = {}
let dayVal = ''
let startDate = ''

//Get user date
$('.user-date-input').on('submit', function (e) {
  e.preventDefault()


  startDate = $('#month-day-year').val()
  $('tbody').empty()
  $('#astro-total').text('')
  $('#event_total').text('')
  $('#daily-count-ttl').text('')
  $('#astro-day-total').text('')
  makeRequest(startDate)
  busAnimate()
  $('#month-day-year').empty('')
})

//allow user to select from week dropdown
$('#day-select').on('change', function() {
  $('tbody').empty()
  $('#astro-day-total').empty()
  $('#daily-count-ttl').empty()

  dayVal = $('#day-select option:selected').val()
  $('#daily-count-ttl').append('Date: ' + dayVal)
  $('#astro-day-total').append('Day Count: ' + wkOfEvents[dayVal].length)

  buildTableDAta(dayVal)

})

//build table based on user dropdown choice
function buildTableDAta (dayVal) {
  for(i = 0; i < wkOfEvents[dayVal].length; i++) {
    let name =  wkOfEvents[dayVal][i]['name']
    let haz = wkOfEvents[dayVal][i]['is_potentially_hazardous_asteroid']
    let classtype = ''

    if (haz) {
      haz = 'HIDE!'
      classtype = ' class="death"'
    } else {
      haz = 'Whatevs'
    }

    //school bus calc
    let diaMax = Math.round(wkOfEvents[dayVal][i]['estimated_diameter']['feet']['estimated_diameter_max'])
    let diaMin = Math.round(wkOfEvents[dayVal][i]['estimated_diameter']['feet']['estimated_diameter_min'])
    let dia = (Math.round(diaMax + diaMin)/2).toFixed(0)
    let astroBus = (dia/45).toFixed(0)

    let dist = Math.round(wkOfEvents[dayVal][i]['close_approach_data'][0]['miss_distance']['miles'])
    let easyDist = dist.toLocaleString('en')

    $('tbody').append('<tr' + classtype + '><td>'+ haz +'</td><td>'+ name +'</td><td>'+ astroBus +'</td><td>'+ dia +'</td><td>'+ easyDist +'</td>' + '</tr>')
  }

  $('tbody').append('<tr><td colspan="5" class="death">HIDE! = potentially hazardous asteroid... That\'s bad.</td></tr>')
}

$('#clear-button').on('click', function () {
  location.reload()
})
