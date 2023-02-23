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
