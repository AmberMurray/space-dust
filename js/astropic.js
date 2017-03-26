console.log('astropic.js here!')

  const apiKey = 'n58uEY6MvzF3sxKPk7ZgM4k02830Ihr4qe11a6pV'
  let today = new Date().toISOString().slice(0,10);


  function makeAstroPic (today) {
    $.ajax({
      url: `https://api.nasa.gov/planetary/apod?date=${today}&api_key=${apiKey}`,
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
  makeAstroPic(today);

  $('.pic-date-input').on('submit', function(e) {
    e.preventDefault()
    $('#astro-pic-deets').empty();
    $('#astro-pic-title').empty()
    today = $('#pic-month-day-year').val()
    makeAstroPic(today);
  })

  $('#astro-pic-img').hover(function () {
    $('#astro-pic-deets').show()
  }, function () {
    $('#astro-pic-deets').hide()
  })
