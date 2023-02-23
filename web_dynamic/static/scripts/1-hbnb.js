$(document).ready(function () {
	const amenityIds = {};
	$(input[type="checkbox"]).change(function () {
		const id = $(this).data('id');
		if (this).checked() {
			amenityIds[id] = (this).value;
		}
		else {delete amenityIds[id] }

		$('div.amenity h4').text(Object.values(amenityIds).join(', '));
		$('input[type="checkbox"] + label').css('margin-left', '10px');
	});
});
