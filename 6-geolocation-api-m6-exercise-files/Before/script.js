var map;
var infoWindow;
var markers = [];

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
  
	var pLocation = document.getElementById("location");
	pLocation.innerHTML = latitude + ", " + longitude;
  
	showMap(position.coords);
}

function showMap(coords) {

	var googleLatLong = new google.maps.LatLng(coords.latitude, coords.longitude);
	var mapOptions = {
		zoom: 11,
		center: googleLatLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
  
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
	infoWindow = new google.maps.InfoWindow();

	google.maps.event.addListener(map, "click", function(event) {
		var latitude = event.latLng.lat();
		var longitude = event.latLng.lng();
		
		var pLocation = document.getElementById("location");
		pLocation.innerHTML = latitude + ", " + longitude;
		map.panTo(event.latLng);

		createMarker(event.latLng);
	});
}

function createMarker(latLng) {
	var markerOptions = {
		position: latLng,
		map: map,
		clickable: true
	};

	var marker = new google.maps.Marker(markerOptions);
	markers.push(marker);

	google.maps.event.addListener(marker, "click", function(event) {
			infoWindow.setContent("Location: " + event.latLng.lat().toFixed(2) + 
				", " + event.latLng.lng().toFixed(2));
			infoWindow.open(map, marker);
	});
}

function displayError(error) {
	var errors = ["Unknown error", "Permission denied by user", "Position not available", "Timeout error"];
	var message = errors[error.code];
	console.warn("Error in getting your location: " + message, error.message);
}

window.onload = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
	} else {
		alert("Sorry, this browser doesn't support geolocation!");
	}
}







