/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [37.8, -96],
  zoom: 3
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 12,
  ext: 'png'
}).addTo(map);

/* =================
Get data from remote server, which is compiled myself based on information collected from Federal Aviation Administration
================== */

var dataset = "https://raw.githubusercontent.com/yutingsssun/Midterm/master/Airports.json"
var featureGroup;
var featureGroup2;
var featureGroup3;
var featureGroup4;
var featureGroup5;

// Creat circle markers for feature layer-based geojson data.
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.9
};

var pointToLayer = function(feature,latlng) {
  return L.circleMarker(latlng, geojsonMarkerOptions);
}

/* ============
First slide
=============*/
// code color based on hub category that it belongs to
var getColor1 = function(d) {
  switch (d) {
            case 'L': return '#d46780';
            case 'M': return '#f0c6c3';
            case 'S': return '#d0d3a2';
            case 'N': return '#798234';
          }
};

function style1(feature) {
    return {
        fillColor: getColor1(feature.properties.Hub),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.7
    };
}

var Filter1 = function(feature) {
  if (feature.properties.Hub ==="")
    {return false;}
  else {return true;}
};

/* ==============
Second slide
=============== */
// code color based on hub category that it belongs to
function getColor2(d) {
    return d > 17000 ? '#cf597e' :
           d > 8000  ? '#e88471' :
           d > 5000  ? '#e9e29c' :
           d > 1000  ? '#9ccb86' :
                      '#009392';
}

function style2(feature) {
    return {
        fillColor: getColor2(feature.properties.LandAreaCo),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.7
    };
}

var Filter2 = function(feature) {
  if (feature.properties.Hub ==="")
    {return false;}
  else {return true;}
};

/* ==============
Third slide
=============== */
// code color based on the rank of passenger airports
function getColor3(d) {
    return d > 25 ? '#1d4f60' :
           d > 20  ? '#266b6e' :
           d > 15 ? '#36877a':
           d > 10  ? '#4da284' :
           d > 5  ? '#6dbc90' :
                    '#96d2a4';
}

function style3(feature) {
    return {
        fillColor: getColor3(feature.properties.pass16_csv),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.7
    };
}

var Filter3 = function(feature) {
  if (feature.properties.pass16_csv <=30)
    {return true;}
  else {return false;}
};

/* ==============
Fourth slide
=============== */
// code color based on the rank of passenger airports
function getColor4(d) {
    return d > 25 ? '#e15383' :
           d > 20  ? '#f16d7a' :
           d > 15 ? '#fa8a76':
           d > 10  ? '#ffa679' :
           d > 5  ? '#ffc285' :
                    '#ffdd9a';
}

function style4(feature) {
    return {
        fillColor: getColor4(feature.properties.Rank),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.7
    };
}

var Filter4 = function(feature) {
  if (feature.properties.Rank <32 && feature.properties.Rank >0)
    {return true;}
  else {return false;}
};

/* ==============
Fifth slide
=============== */
// code color based on the rank of passenger airports
var getColor5 = function(d) {
  switch (d) {
            case 'EWR': return '#d46780';
            case 'LGA': return '#798234';
            case 'JFK': return '#009392';
          }
};

function style5(feature) {
    return {
        fillColor: getColor5(feature.properties.LocationID),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.7
    };
}

var Filter5 = function(feature) {
  if (feature.properties.LocationID ==="EWR"|feature.properties.LocationID ==="LGA"|feature.properties.LocationID ==="JFK")
    {return true;}
  else {return false;}
};

/* ==============
Add control to map that when mouse hover over an airport, the control on topright
shows that airort's profile, including its name, city and state it is located,
and its hub category.
*/

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>Airport Profile</h4>' +  (props ?
    '<b>' + props.pass16_c_5 + '</b><br />' + props.City + '</b><br />'+ props.StateName +
    '</b><br />'+"Hub Category: "+props.Hub +
    '</b><br />'+"Land Area: "+props.LandAreaCo +" SqM" +
    '</b><br />'+"Enplanments (in thousands): "+props.En16 +
    '</b><br />'+"Landed Weight (lbs.): "+props.Wei16
    : 'Hover over a point');
  };

info.addTo(map);

/* Make the states highlighted visually in some way when they are hovered with a mouse.
First we’ll define an event listener for layer mouseover event:*/
function highlightFeature(e) {
  // we get access to the layer that was hovered through e.target,
  // set a thick white border on the layer as highlight effect,
  // also bringing it to the front so that the border doesn’t clash with nearby states
  var layer = e.target;
  layer.setStyle({
    weight: 3,
    color: '#fff',
    dashArray: '',
    fillOpacity: 0.7
  });
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  };
  info.update(layer.feature.properties);
};

// Next, define what happens on mouseout
function resetHighlight(e) {
  featureGroup.resetStyle(e.target);
  info.update();
};

// As an additional touch, define a click listener that zooms to the airport:
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

// se the onEachFeature option to add the listeners on point layers:
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      pointToLayer:pointToLayer,
      style: style1,
      filter: Filter1,
      onEachFeature: onEachFeature
    }).addTo(map);
    // Add Legend to map
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
      categories = ["L","S","M","N"],
      labels = [];
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
        '<i class="circle" style="background:' + getColor1(categories[i]) + '"></i> ' +
        (categories[i] ? categories[i] + '<br>' : '+');
      }

      return div;
    };

    legend.addTo(map);

    function refreshMarkers0() {
      map.removeLayer(featureGroup);
      map.removeControl(legend);
      featureGroup = L.geoJson(parsedData, {
        pointToLayer:pointToLayer,
        style: style1,
        filter: Filter1,
        onEachFeature: onEachFeature
      }).addTo(map);
      legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
        categories = ["L","S","M","N"],
        labels = [];
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < categories.length; i++) {
          div.innerHTML +=
          '<i class="circle" style="background:' + getColor1(categories[i]) + '"></i> ' +
          (categories[i] ? categories[i] + '<br>' : '+');
        }

        return div;
      };

      legend.addTo(map);
    }

    function refreshMarkers1() {
      map.removeLayer(featureGroup);
      map.removeControl(legend);
      featureGroup = L.geoJson(parsedData, {
        pointToLayer:pointToLayer,
        style: style2,
        filter: Filter2,
        onEachFeature: onEachFeature
      }).addTo(map);

      legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [0,1000,5000,8000,17000],
        labels = [];
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
          '<i class="circle" style="background:' + getColor2(grades[i]+1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
      };

      legend.addTo(map);
    }

    function refreshMarkers2() {
      map.removeLayer(featureGroup);
      map.removeControl(legend);
      featureGroup = L.geoJson(parsedData, {
        pointToLayer:pointToLayer,
        style: style3,
        filter: Filter3,
        onEachFeature: onEachFeature
      }).addTo(map);
      // Update legend
      legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [1,5,15,20,25],
        labels = [];
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
          '<i class="circle" style="background:' + getColor3(grades[i]+1) + '"></i> ' +
          grades[i] + (grades[i+1] ? '&ndash;' + grades[i+1] + '<br>' : '+');
        }

        return div;
      };

      legend.addTo(map);
    }

    function refreshMarkers3() {
      map.removeLayer(featureGroup);
      map.setView([37.8, -96],3);
      map.removeControl(legend);
      featureGroup = L.geoJson(parsedData, {
        pointToLayer:pointToLayer,
        style: style4,
        filter: Filter4,
        onEachFeature: onEachFeature
      }).addTo(map);
      // Update legend
      legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [1,5,15,20,25],
        labels = [];
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
          '<i class="circle" style="background:' + getColor4(grades[i]+1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
      };

      legend.addTo(map);
    }

    function refreshMarkers4() {
      map.removeLayer(featureGroup);
      map.setView([40.7,-74.05],10);
      map.removeControl(legend);
      featureGroup = L.geoJson(parsedData, {
        pointToLayer:pointToLayer,
        style: style5,
        filter: Filter5,
        onEachFeature: onEachFeature
      }).addTo(map);
      legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
        categories = ["LGA","JFK","EWR"],
        labels = [];
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < categories.length; i++) {
          div.innerHTML +=
          '<i class="circle" style="background:' + getColor5(categories[i]) + '"></i> ' +
          (categories[i] ? categories[i] + '<br>' : '+');
        }

        return div;
      };

      legend.addTo(map);
    }

  var showTitle = function(num){
    var theSt = "#slide" + (num+1).toString();
    $(".title").not(theSt).hide();
    $(theSt).show();
  };

  var showContent = function(num){
    var theSt = "#text-label" + (num+1).toString();
    $(".input-text").not(theSt).hide();
    $(theSt).show();
  }

  var showNote = function(num){
    var theSt = "#note-label" + (num+1).toString();
    $(".input-note").not(theSt).hide();
    $(theSt).show();
  }

  var theCount = 0;
  var operations = function(count){
    switch (count){
      case 0:
        $('.previous').hide();
        showTitle(theCount);
        showContent(theCount);
        showNote(theCount);
        refreshMarkers0();
        break;
      case 1:
        $('.previous').show();
        showTitle(theCount);
        showContent(theCount);
        showNote(theCount);
        refreshMarkers1();
        break;
      case 2:
        showTitle(theCount);
        showContent(theCount);
        showNote(theCount);
        refreshMarkers2();
        break;
      case 3:
        showTitle(theCount);
        showContent(theCount);
        showNote(theCount);
        $('.next').show();
        refreshMarkers3();
        break;
      case 4:
        showTitle(theCount);
        showContent(theCount);
        showNote(theCount);
        $('.next').hide();
        refreshMarkers4();
        break;
    }
  };

  operations(theCount);

    // quite similar to _.each
    // featureGroup.eachLayer(onEachFeature);
    $( ".next" ).click(function() {
        theCount += 1;
        if(theCount > 4){
          theCount = 0;
        }
        operations(theCount);
    });

    $( ".previous" ).click(function() {
        theCount -= 1;
        if(theCount < 0){
          theCount = 4;
        }
        operations(theCount);
    });
  });
});
