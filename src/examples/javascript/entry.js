// See? ES2015 is here if you want it.
const helloWorldAlertEl = document.createElement('div')
helloWorldAlertEl.id = 'hello-world-alert'
helloWorldAlertEl.className = 'alert alert-success'
helloWorldAlertEl.innerHTML = '<p>Find Your Business</p>'
document.body.appendChild(helloWorldAlertEl)

// See? jQuery is here if you want it
const $ = require('jquery');
var _ = require('lodash');

const $helloWorld = $(helloWorldAlertEl)

const getRandomInt = (min=0, max=255) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

var mapDiv = document.createElement('div');
var map = new google.maps.Map(mapDiv);
var service = new google.maps.places.PlacesService(map);

var Clarifai = require('clarifai');
var photo_url = [];
var globalI = 0;
var tags = []
var app = new Clarifai.App(
'NO18sIhXk9nZDkAdVXNPSThzPXPI8wHn78vAncxe',
'c2vHENnTnNj6XdFkXCEWbG1g1oSdBmTqOTO44eP9'
);

function fetchPhoto(photos){
	if(photos.length == 0){
		return 0;
	}
	photo_url[0] = photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200});
	document.getElementById("img0").src = photo_url[0];
	app.models.predict(Clarifai.GENERAL_MODEL, photo_url[0]).then(
		function(response){
			//console.log(response);
			console.log(response.outputs[0].data.concepts);
			tags[0] = response.outputs[0].data.concepts[0].name + ", ";
			for(var j = 1; j < 5; j++){
				if(j != 4){
					tags[0] = tags[0] + response.outputs[0].data.concepts[j].name + ", ";
				}
				else{
					tags[0] = tags[0] + response.outputs[0].data.concepts[j].name ;
				}
			}
			
			document.getElementById("imgtxt0").innerHTML = tags[0];
		}
	);

	if(photos.length == 1){
		return 0;
	}

	photo_url[1] = photos[1].getUrl({'maxWidth': 200, 'maxHeight': 200});
	document.getElementById("img1").src = photo_url[1];
	app.models.predict(Clarifai.GENERAL_MODEL, photo_url[1]).then(
		function(response){
			//console.log(response);
			console.log(response.outputs[0].data.concepts);
			tags[1] = response.outputs[0].data.concepts[0].name + ", ";
			for(var j = 1; j < 5; j++){
				if(j != 4){
					tags[1] = tags[1] + response.outputs[0].data.concepts[j].name + ", ";
				}
				else{
					tags[1] = tags[1] + response.outputs[0].data.concepts[j].name ;
				}
			}
			document.getElementById("imgtxt1").innerHTML = tags[1];
		}
	);

	if(photos.length == 2){
		return 0;
	}

	photo_url[2] = photos[2].getUrl({'maxWidth': 200, 'maxHeight': 200});
	document.getElementById("img2").src = photo_url[2];
	app.models.predict(Clarifai.GENERAL_MODEL, photo_url[2]).then(
		function(response){
			//console.log(response);
			console.log(response.outputs[0].data.concepts);
			tags[2] = response.outputs[0].data.concepts[0].name + ", ";
			for(var j = 1; j < 5; j++){
				if(j != 4){
					tags[2] = tags[2] + response.outputs[0].data.concepts[j].name + ", ";
				}
				else{
					tags[2] = tags[2] + response.outputs[0].data.concepts[j].name ;
				}

			}
			document.getElementById("imgtxt2").innerHTML = tags[2];
		}
	);

	if(photos.length == 3){
		return 0;
	}

	photo_url[3] = photos[3].getUrl({'maxWidth': 200, 'maxHeight': 200});
	document.getElementById("img3").src = photo_url[3];
	app.models.predict(Clarifai.GENERAL_MODEL, photo_url[3]).then(
		function(response){
			//console.log(response);
			tags[3] = response.outputs[0].data.concepts[0].name + ", ";
			console.log(response.outputs[0].data.concepts);
			for(var j = 1; j < 5; j++){
				if(j != 4){
					tags[3] = tags[3] + response.outputs[0].data.concepts[j].name + ", ";
				}
				else{
					tags[3] = tags[3] + response.outputs[0].data.concepts[j].name ;
				}
			}
			document.getElementById("imgtxt3").innerHTML = tags[3];
		}
	);

	if(photos.length == 4){
		return 0;
	}

	photo_url[4] = photos[4].getUrl({'maxWidth': 200, 'maxHeight': 200});
	document.getElementById("img4").src = photo_url[4];
	app.models.predict(Clarifai.GENERAL_MODEL, photo_url[4]).then(
		function(response){
			//console.log(response);
			console.log(response.outputs[0].data.concepts);
			tags[4] = response.outputs[0].data.concepts[0].name + ", ";
			for(var j = 1; j < 5; j++){
				if(j != 4){
					tags[4] = tags[4] + response.outputs[0].data.concepts[j].name + ", ";
				}
				else{
					tags[4] = tags[4] + response.outputs[0].data.concepts[j].name ;
				}
			}
			document.getElementById("imgtxt4").innerHTML = tags[4];
		}
	);
	//return photo_url;
}

function fetchDetails(results){
	document.getElementById("outphone").innerHTML = "Phone Number: " + results.formatted_phone_number;
	document.getElementById("websiteUrl").href = results.website;
	document.getElementById("websiteUrl").innerHTML = "Link to their website: " + results.website;
}

function printOutBasics(results){
	//console.log(results);
	document.getElementById("outName").innerHTML = results[0].name;
	document.getElementById("address").innerHTML = "Address: " + results[0].formatted_address;
	//console.log(results[0].types[0]);
	var cap = results[0].types[0].replace("_", " ");
	cap = cap.split(' ');
	for(var i = 0; i < cap.length; i++){
		cap[i] = cap[i].charAt(0).toUpperCase() + cap[i].slice(1);
	}
	cap = cap.join(' ');
	document.getElementById("industry").innerHTML = "Catagory: " + cap;
	service.getDetails({
		placeId: results[0].place_id
	}, function(newResults) {
		//console.log(newResults);
		fetchDetails(newResults);
		var i = 0;
		fetchPhoto(newResults.photos);
		//clearInfo();
	});
}

function mainFind(a,b){
	var c = a + ' ' + b;
	service.textSearch({
		query: c
	}, function(results){
		console.log(results);
		printOutBasics(results);
	});
	return 0;
}

const changeTextColor = () => {
  $helloWorld.css(
    'color',
    `rgb(${getRandomInt()}, ${getRandomInt()}, ${getRandomInt()})`
  )
}

window.setInterval(changeTextColor, 300)
window["mainFind"] = mainFind;