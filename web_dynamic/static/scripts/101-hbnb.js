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
    if (this.checked) {
      stateIds[id] = $(this).data('name');
    } else {
      delete stateIds[id];
    }
    if (this.checked) {
      cityIds[id] = $(this).data('name');
    } else {
      delete cityIds[id];
    }
    $('div.amenity h4').text(Object.values(amenityIds).join(', '));
    const selectedLocations = [...stateIds, ...cityIds];
    const locationsHeader = document.querySelector('.locations h4');
    locationsHeader.textContent = 'Selected Location: ${selectedLocations.join(', ')';
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

$('button').click(function () {
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
});
$('.filters > button').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({'amenities': Object.keys(checkedAmenities), 'states': Object.keys(checkedStates), 'cities': Object.keys(checkedCities)}),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          let place = data[i];
          $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
        }
      }
    });
  });
});
const toggleReviews = document.querySelector('#toggle-reviews');
const reviewList = document.querySelector('#review-list');
let reviewsShown = false;
toggleReviews.addEventListener('click', () => {
  if (reviewsShown) {
    reviewList.innerHTML = '';
    toggleReviews.textContent = 'show'
    reviewsShown = false;
  } else {
    fetch('review-data.json')
      .then(response => response.json())
      .then(reviews => {
      reviews.forEach(review => {
        const reviewItem = document.createElement('li');
          reviewItem.textContent = review.comment;
          reviewList.appendChild(reviewItem);
        });
	toggleReviews.textContent = 'hide';
        reviewsShown = true;
      })
      .catch(error => console.error(error));
  }
});
