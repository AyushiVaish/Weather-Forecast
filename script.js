var locationSearch = "";

function checkweather() {
	let location=document.querySelector("#location").value;
	locationSearch=location;
	if(!location || location==="") {
		alert("Bank Value supplied");
		return;
	}
	
	let queryURL = "http://localhost:4000/" + location;
	
	fetch(queryURL)
	.then(function(response) {
		return response.json();
	})
	.then (function (result) {
		displayLocationResult(result);
	})
	.catch(function(error) {
		console.log(error.message);
	});
}

function displayLocationResult(result) {
	
	let msgDiv=document.querySelector("#message");
	let div=document.querySelector("#result");
	
	if(result.message) {
		div.innerHTML="";
		msgDiv.innerHTML=`<div class=" alert alert-danger alert-dismissible" role="alert"> \
							<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
							<strong>oops!</strong> ${result.message} \
						  </div>`;
							
	}

	
	else {
				msgDiv.innerHTML=`<div class=" alert alert-success alert-dismissible" role="alert"> \
							<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
							<strong>Weather of</strong><h3 style="text-transform: uppercase">${locationSearch}.</h3>\
						  </div>`;
	
	
		div.innerHTML="";
	
	const weather=result.consolidated_weather;
	console.log(weather);
	for (let i=0;i<weather.length;i++) {
	

	console.log(weather[i].weather_state_name);
	var elemts=`<div>${weather[i]}`;

	let hackedHTMLDiv= `<div class="jumbotron" id="id_${i}"> \
								<div class="row">
								<h3>Date:  <h5 style="color:green">${weather[i].applicable_date}</h5></h3>
								<div class="col-xs-12 col-sm-12" style="text-align:center">
								<h3>Minimum Temperature:<h5 style="color:blue">${weather[i].min_temp} &deg;C</a></h5>
								<h3>Maximum Temperature:<h5 style="color:blue">${weather[i].max_temp} &deg;C</a></h5>
								<h3>Current Temperature:<h5 style="color:blue">${weather[i].the_temp} &deg;C</a></h5>
								<h3>Wind Speed:<h5 style="color:blue">${weather[i].wind_speed} &deg;C</a></h5>
								
								
						</div>
						</div>
						</div>`;
						
						$('#result').append(hackedHTMLDiv);
	
	}

	console.log(result);
	}

}