//Copy rights reserved for "Mohamed Abulnasr". Before reuse this code email me on objectiveerp@gmail.com

  var temp='0';
 		var dgr='C';
		var tip='path';
  		$(document).ready(function (){
 			getWeather();
 		});

 		function getWeather(){
 			var lo, la;
 			if (navigator.geolocation.getCurrentPosition) {
 				navigator.geolocation.getCurrentPosition(function (pos){
 				lo=pos.coords.longitude;
 				la=pos.coords.latitude;
	 			g1(pos.coords.latitude, pos.coords.longitude);
 				});
 			}
 			else  {
 				alert ("Geo Location not working");
	 			g1(30,31);
 			}

    }

 		function g1(lat,lon){
 				if (!lat || !lon){ 
		     $("#co").html("Not working, please try again later..!");
		     	return;
        }
	     $("#co").html("latitude="+lat+" & longitude="+lon);	
 			$.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon+"",function(data){
 				$.each(data, function(index, val) {
 				});
 				getCountry(data.name, data.sys.country);
				temp=data.main.temp;
				gimgj(temp);
				//"background-image": "url(http://drampc/j/images/weather"+Math.round(temp)+".jpg)"
				$("#img1").prop({
					src: data.weather[0].icon,
				});
				ftemp();
				/*	for (i=30;i<255;i++) {
	 				$("#temp1").append(String.fromCharCode(i) + " : " + i +"<br>");
				}*/
 			});
 		}
 
 			function ftemp(){
				$("#temp1").html(temp+String.fromCharCode(186));
				$("#degr").html("C");
	 			}

 			function dg(){
 				var v;
 				if ($("#degr").text()=="C") 
				{
					$("#degr").html("F");
					temp= ((temp * 9/5) + 32).toFixed(3)/1;
				}
				else 
				{
					$("#degr").html("C");
					temp= ((temp - 32) * 5/9).toFixed(2)/1;
				}
				$("#temp1").html(temp+String.fromCharCode(186));
 			}

 		function gimgj(t){
 			$.ajax({
 				url: 'https://mohamedabulnasr.github.io/SiteAjax/imgweather.json',
 				type: 'GET',
 				dataType: 'json',
 				beforSend: setHeaders
 			})
 			.done(function(data) {
 				console.log("success");
 				t=Math.round(t);
				$("#carea").css({"font-weight":600, "background-image":"url(https://"+data[t+10].ip+")" });
// 				$("#area1").after("<br>data: "+data[t+10].id + " - " + data[t+10].ip);	
			})
 			.fail(function(r) {
 				console.log("error");
 			})
 			.always(function(w) {
 				console.log("complete");
 			});
 			function setHeaders(xhr) {
 				xhr.setRequestHeader('Content-Type', 'application/json');
 				xhr.setRequestHeader('overrideMimeType', 'application/json');
 			}
		/*	for (i=30;i<255;i++) {
				$("#temp1").append(String.fromCharCode(i) + " : " + i +"<br>");
		}*/
 		}

		function getCountry(dname,c) {
			$.ajax({url:'https://mohamedabulnasr.github.io/SiteAjax/countries.json',
				type: 'GET',
				dataType: 'json',
 				beforSend: setHeaders
						})
			.done(function(data){
				console.log("done ok.");
				$.each(data, function(index, val) {
					if (val.id.toLowerCase()==c.toLowerCase()) {
		 				$("#area1").html(dname+"   . "+val.country);
						}
				});
			})
			.fail(function(f){
				console.log("fail");
			})
			.always(function(){
				console.log("completed");
			});
 			function setHeaders(xhr) {
 				xhr.setRequestHeader('Content-Type', 'application/json');
 				xhr.setRequestHeader('overrideMimeType', 'application/json');
 			}
		}
