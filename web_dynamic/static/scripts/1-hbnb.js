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
});
