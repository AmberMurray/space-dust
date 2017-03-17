console.log('main.js here!')

let apiKey = 'n58uEY6MvzF3sxKPk7ZgM4k02830Ihr4qe11a6pV'
let apodURL = function(today) {
  return 'https://api.nasa.gov/planetary/apod?date=' + today + '&api_key='
}
let astroURL = function (startDate) {
  return 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + startDate + '&api_key='
}
let busLength = 45
let wkOfEvents = {}
let dayVal = ''
let startDate = ''


//Astronomy Pic of the Day
var today = new Date().toISOString().slice(0,10);
makeAstroPic(today);

(function pickPicDate () {
  $('.pic-date-input').on('submit', function(e) {
    e.preventDefault()
    $('#astro-pic-deets').empty();
    $('#astro-pic-title').empty()

    today = $('#pic-month-day-year').val()
    makeAstroPic(today);
  })
})()


function makeAstroPic (today) {
  $.ajax({
    url: apodURL(today) + apiKey,
    method: 'get',
    success: function (data) {

      $('#astro-pic-img').attr('src', data.url)
      $('#astro-pic-title').text(data.title)
      $('#astro-pic-deets').append('<p id="astro-pic-deets-p">' + data.explanation  + '</p>')
    }, error: function(error) {
      alert('Error! Error!: ' + error)
    }
  })
}

$('#astro-pic-img').hover(function () {
  $('#astro-pic-deets').show()
}, function () {
  $('#astro-pic-deets').hide()
})

$('#clear-button').on('click', function () {
  location.reload();
})

//Get user date
$('.user-date-input').on('submit', function (e) {
  e.preventDefault()
  //format date for ajax request, reset form fields
  startDate = $('#month-day-year').val()
  $('.astro-pic-home').hide()
  makeRequest(startDate)
  $('#month-day-year').empty()

  //animate bus - code borrowed from StackOverflow
  $(document).ready(function() {
    function busLeft() {
      $("#flying-bus").animate({left: "-=3500"}, 4000, "swing", busRight);
    }
    function busRight() {
      $("#flying-bus").animate({left: "+=3500"}, 4000, "swing", busLeft);
    }
    busRight();

  });

  //get table ready
  $('#event_total').append('Week Of ' + startDate)
  $('#month-day-year').val('')
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
      classtype = ' class="death"';
    } else {
      haz = 'Whatevs';
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

//call for astro data
function makeRequest(startDate) {
  $.ajax({
    url: astroURL(startDate) + apiKey,
    method: 'get',
    success: function (data) {

      let numEvents = data.element_count
      $('#astro-total').append('Week Count: ' + numEvents)

      $('#event_total').show()
      $('.day-of-week-container').show()

      wkOfEvents = data.near_earth_objects

      for(let date in wkOfEvents) {

        $('#day-select').append('<option value="' + date + '">'+ date + '</option>')
      }

      $('.astro-table-container').show()
      $('.astro-table-container').addClass('display', 'inline-block')
      $('#daily-count-ttl').append('Date: ' + startDate)
      $('#astro-day-total').append('Day Count: ' + (wkOfEvents[startDate].length))

      buildTableDAta(startDate)
    },
    error: function (error) {
      console.log('Error: ', error)
    }
  })
}
