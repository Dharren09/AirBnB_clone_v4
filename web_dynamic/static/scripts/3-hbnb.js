$(document).ready(function () {
  const amenityIds = {};
  $('input[type="checkbox"]').css('margin-right', '10px');
  $('input[type="checkbox"]').change(function () {
    const id = $(this).data('id');
    if (this.checked) {
      amenityIds[id] = $(this).data('name');
    } else {
      delete amenityIds[id];
    }

    $('div.amenity h4').text(Object.values(amenityIds).join(', '));
  });

  function handleApiStatus (response) {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }
  $.get('http://0.0.0.0:5001/api/v1/status/', handleApiStatus);
});
$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search',
  data: '{}',
  dataType: 'json',
  contentType: 'application/json',
  success: function (data) {
    for (let i = 0; i < data.length; i++) {
      const place = data[i];
      $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
    }
  }
});
