(function () {
    
    var geocoder, lat, lng;
    
    function reduceStreetName(street) {
        console.log("reduceStreetName(" + street + ")");
        var result = street.toLowerCase();
        result = result.replace(/[éèëê]/g, "e");
        result = result.replace(/[àâä]/g, "a");
        result = result.replace(/[ïî]/g, "i");
        result = result.replace(/[ôö]/g, "o");
        result = result.replace(/[ùüû]/g, "u");
        result = result.replace(/ÿ/g, "y");
        result = result.replace(/ç/g, "c");
        result = result.replace(/ /g, "");
        result = result.replace(/[^\w]/g, "");
        result = result.substring(0,24);
        return result;
    }
    
    function getPosition() {
        console.log("getPosition()");
        var options = {
            enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition(
            reverseGeocode,
            function (position) {
                displayErrorMessage("Votre localisation n'a pas pu être déterminée.");
            }, 
            options
        );
    }
    
    function reverseGeocode(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log("lat: " + lat + ", lng: " + lng);
        console.log("Accuracy in meters: " + position.accuracy);
        latlng = new google.maps.LatLng(lat, lng);
        if (!geocoder) {
            geocoder = new google.maps.Geocoder();
            console.log("Geocoder initialized.");
        }
        geocoder.geocode({"latLng": latlng}, function(results, status) {
            console.log("Reverse geocoding status: " + status);
            if (status == google.maps.GeocoderStatus.OK) {
                extractStreet(results);
            } else {
                displayErrorMessage("Echec de la recherche de l'adresse : " + status);
            }
        });
    }
    
    function extractStreet(results) {
        var city = results[0].address_components[2].long_name;
        console.log(city);
        if (city.indexOf('Paris') == -1) {
            displayErrorMessage("Vous avez été localisé à " + city + ". Cette application ne fonctionne qu'à Paris.");
            return;
        }
        var streetName = results[0].address_components[1].long_name;
        console.log(streetName);
        loadJSON(streetName);
    }
    
    function loadJSON(streetName) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json; charset=UTF-8");
        xobj.open('GET', 'data/ruesdeparis.json', true);
        xobj.onreadystatechange = function () {
            console.log("loadJSON result : " + xobj.readyState);
            if (xobj.readyState == 4) {
                extractStreetInfo(xobj.responseText, streetName);
            }
        };
        xobj.send(null);
    }
    
    function extractStreetInfo(data, streetName) {
        var jsonResponse = JSON.parse(data);
        var reduceName = reduceStreetName(streetName);
        console.log(reduceName);
        var theStreet = jsonResponse[reduceName];
        if (theStreet) {
            displayStreetInfo(formatLatLng(), streetName, "Quartier " + theStreet.d, formatArr(theStreet.a), formatHisto(theStreet.h));
        } else {
            displayErrorMessage("Aucune information n'est disponible pour " + streetName + ".");
        }
    }
    
    function formatLatLng() {
        return "Latitude : " + lat + ", Longitude : " + lng;
    }
    
    function formatArr(arr) {
        var result;
        if (arr !== null && arr.indexOf(",") > -1) {
            result = arr.replace(/,/g, ", ") + " arrondissements.";
        } else {
            result = arr + " arrondissement.";
        }
        return result;
    }
    
    function formatHisto(histo) {
        if (!histo || histo === "") {
            return "Aucune information";
        }
        var result = histo.replace("#HISTO#", "</p><p><strong>Historique : </strong>");
        result = result.replace("#ORIG#", "</p><p><strong>Origine du nom : </strong>");
        result = result.replace("#HISTORIG#", "</p><p><strong>Historique et origine du nom : </strong>");
        result = result.replace("#MC#", "</p><p><strong>Monument classé : </strong>");
        result = result.replace("#MCS#", "</p><p><strong>Monuments classés : </strong>");
        result = result.replace("#SC#", "</p><p><strong>Site classé : </strong>");
        result = result.replace("#NOT#", "</p><p><strong>Note : </strong>");
        result = result.replace("#OUV#", "</p><p><strong>Ouverture : </strong>");
        result = result.replace("#OBS#", "</p><p><strong>Observations : </strong>");
        result = result.replace("#DENOM#", "</p><p><strong>Dénomination : </strong>");
        return result;
    }

    function displayErrorMessage(message) {
        document.querySelector(".loading").style.display = "none";
        emptyInfoDiv();
        var errorParag = document.querySelector("#error");
        errorParag.innerHTML = message;
    }
    
    function displayStreetInfo(coord, streetName, district, arr, histo) {
        document.querySelector(".loading").style.display = "none";
        document.querySelector("#error").innerHTML = "";
        document.querySelector("#result-coord").innerHTML = coord;
        document.querySelector("#result-streetName").innerHTML = streetName;
        document.querySelector("#result-district").innerHTML = district;
        document.querySelector("#result-arr").innerHTML = arr;
        document.querySelector("#result-histo").innerHTML = histo;
    }
    
    function emptyInfoDiv() {
        displayStreetInfo("", "", "", "", "");
    }
    
    function start() {
            document.querySelector("#error").innerHTML = "";
            emptyInfoDiv();
            document.querySelector(".loading").style.display = "block";
            lat = null;
            lng = null;
            console.log("Launching localization...");
            getPosition();
    }
    
    window.onload = function () {
        start();

        var reload = document.querySelector("#reload");
        if (reload) {
            reload.onclick = start;
        }
    };

})();
