//declare map variable globally so all functions have access
var map;
var minValue;
var geojsonLayer;
var dataStats = {}; 
var dataStatsUS= {};
//create an attributes array
var attributes = ["Refugees", "Asylum", "total"];



//step 1 create map
function createMap(){
    //create the map
    map = L.map('map', {
        center: [20, 0],
        zoom: 2
    });
	
// Define your Stadia Maps API key
var apiKey = '57ee498e-3518-4617-9ff3-6a58512c7d36';

// Create a Stadia Maps tile layer with your API key
var tileLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=' + apiKey, {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors'
});
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(map)
    //call getData function
    getData(map);

// Create a custom control for the title
	var titleControl = L.control({ position: 'topleft' });

	// Define the content and behavior of the title control
	titleControl.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'leaflet-control leaflet-bar leaflet-no-border'); // Apply a custom class for no border


		// Set the title content with custom styles
		div.innerHTML = '<h1 style="color: #000000; background-color: #ffffff; padding: 15px; border: 2px solid #999999; border-radius: 2px; font-size: 28px; font-family: Georgia, sans-serif;">Afghan Diaspora in 2021</h1>';

		return div;

	};

	// Add the title control to the map
	titleControl.addTo(map);

	// Move the default zoom control below the title
	map.zoomControl.setPosition('topright');

// Remove the default zoom control from the map
map.removeControl(map.zoomControl);


// Define legend content with placeholders for dynamic values and circles
var legendContent = '<div class="legend">' +
    '<h4>Legend</h4>' +
    '<div><svg width="70" height="15"><circle cx="35" cy="7" r="5" fill="rgba(178, 24, 43, 1)" stroke="#000000" stroke-width="2" /></svg> Minimum</div>' +
    '<div><svg width="70" height="35"><circle cx="35" cy="18" r="15" fill="rgba(178, 24, 43, 1)" stroke="#000000" stroke-width="2" /></svg> Mean</div>' +
    '<div><svg width="70" height="65"><circle cx="35" cy="33" r="30" fill="rgba(178, 24, 43, 1)" stroke="#000000" stroke-width="2" /></svg>Maximum</div>' +
    '</div>';


// Create a Leaflet control for the legend
	var legendControl = L.Control.extend({
		options: {
			position: 'bottomright' // Position the legend in the bottom left corner
		},

		onAdd: function (map) {
			var div = L.DomUtil.create('div', 'info legend'); // Create a custom container

			// Add CSS styles to the legend
			div.style.color = '#000000';
			div.style.backgroundColor = '#ffffff';
			div.style.padding = '30px';
			div.style.border = '2px solid #999999';
			div.style.borderRadius = '2px';
			div.style.fontSize = '16px';
			div.style.fontFamily = 'Georgia, sans-serif'
			div.style.opacity = '0.8';

			// Set the legend content
			div.innerHTML = legendContent;

			return div;
		}
	});


// Create an instance of the legend control and add it to the map
var legend = new legendControl();
map.addControl(legend);


// Create a container div for the paragraph and box
     var container = document.createElement('div');
     container.style.position = 'absolute';
     container.style.bottom = '20px';
     container.style.left = '70px';
     container.style.zIndex = '1000'; // Ensure the container is layered over the map
     map.getContainer().appendChild(container);
 
     // Add a box with white background at 0.7 opacity
     var box = document.createElement('div');
     box.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'; // White background at 0.7 opacity
     box.style.padding = '10px';
     box.style.borderRadius = '5px';
     container.appendChild(box);

    // Add a close button inside the box
    var closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.float = 'right';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = function() {
        // Call the close function when the close button is clicked
        closeParagraphBox(container);
    };
    box.appendChild(closeButton);

    // Add a paragraph to the bottom left of the map
    var paragraph = document.createElement('p');
    paragraph.textContent = "Welcome to the World Map showcasing the Afghan Diaspora in 2021! First we want to go over some definitions. "+
    "'Asylum Seeker' refers to someone who is approaching a country purely for the purpose of escaping a hostile environment. \n"+
    "'Refugee' is a legal title that is above asylum seeker in terms of protections. Asylum seekers will apply for refugee status and depending on which countries"+
    " are receptive will grant the refugee status. Use the dropdown Menu to switch between refugee, asylum seeker and SIV recipients or "+
    "click on the buttons to zoom into an area of interest!";
    paragraph.style.maxWidth = '300px'; // Set maximum width for the paragraph
    paragraph.style.wordWrap = 'break-word'; // Allow words to break and wrap
    box.appendChild(paragraph);

};

// Function to close the paragraph box
function closeParagraphBox(container) {
    container.parentNode.removeChild(container);
}

function getData(map){

    fetch("data/geoBoundaries-AFG-ADM0_simplified.geojson")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: '#000000', // color of the border
                    weight: 2,        // thickness of the border
                    opacity: 1,       // opacity of the border
                    fillColor: '#fffcf5', // color inside the border
                    fillOpacity: 0.5  // opacity inside the border
                };
            }
        }).addTo(map);
    })
};


function processDataRef(data) {
   var attributes = [];

    data.features.forEach(feature => {
        var properties = feature.properties;
        for (var key in properties) {
            if (key.startsWith('Refugees') 
            && !attributes.includes(key)) {
                attributes.push(key);
            }
        }
    });
    return attributes;
}

function processDataAsylum(data) {
    var attributes = [];

    data.features.forEach(feature => {
        var properties = feature.properties;
        for (var key in properties) {
            if (key.startsWith('Asylum') 
            && !attributes.includes(key)) {
                attributes.push(key);
            }
        }
    });

    return attributes;
}

function processDataUS(data) {
    var attributes = [];

    data.features.forEach(feature => {
        var properties = feature.properties;
        for (var key in properties) {
             if (key.startsWith('total') && !attributes.includes(key)) {
                attributes.push(key);
             }
            }
    });


    return attributes;
}

function calcStatsRef(data){
    //create empty array to store all data values
    var features = data.features;
    var dataStats = {};
    var minRefugees = Infinity;
    var maxRefugees = -Infinity;
    var totalRefugees = 0;
    // Looping through each feature
    features.forEach(function(feature) {
        // Accessing properties of each feature
        var properties = feature.properties;
        // Now you can access individual properties of each feature
        // For example:
        var name = properties.Country;
        var refugees = properties.Refugees;
    var allValues = [];
    
    if (refugees < minRefugees) {
        minRefugees = refugees;
    }
    if (refugees > maxRefugees) {
        maxRefugees = refugees;
    } 
    totalRefugees += refugees;

// Calculate average
var averageRefugees = totalRefugees / features.length;

    //loop through each city
    for(var city of data.features){
        //loop through each year
       // for(var year = 2021; year <= 2021; year+=1){
              //get population for current year
              var value = city.properties["Refugees"];
              //add value to array
              allValues.push(value);
        //}
    }
    //get min, max, mean stats for our array
    //dataStats.min = Math.min(...allValues);
    //dataStats.max = Math.max(...allValues);
    //calculate meanValue
    //var sum = allValues.reduce(function(a, b){return a+b;});
    //dataStats.mean = sum/ allValues.length;
    dataStats.min = 0;
    dataStats.max = 1490562;
    dataStats.mean = 27682
    return dataStats;

});    

}

function calcStatsAsylum(data){
    //create empty array to store all data values
    var features = data.features;
    var dataStats = {};
    var minAsylum = Infinity;
    var maxAsylum = -Infinity;
    var totalAsylum = 0;
    // Looping through each feature
    features.forEach(function(feature) {
        // Accessing properties of each feature
        var properties = feature.properties;
        // Now you can access individual properties of each feature
        // For example:
        var name = properties.Country;
        var asylum = properties.Asylum;
    var allValues = [];
    
    if (asylum < minAsylum) {
        minAsylum = asylum;
    }
    if (asylum > maxAsylum) {
        maxAsylum = asylum;
    } 
    totalAsylum += asylum;


// Calculate average
var averageAsylum = totalAsylum / features.length;

    //loop through each city
    for(var city of data.features){
        //loop through each year
       // for(var year = 2021; year <= 2021; year+=1){
              //get population for current year
              var value = city.properties["Asylum"];
              //add value to array
              allValues.push(value);
        //}
    }
    //get min, max, mean stats for our array
    //dataStats.min = Math.min(...allValues);
    //dataStats.max = Math.max(...allValues);
    //calculate meanValue
    //var sum = allValues.reduce(function(a, b){return a+b;});
    //dataStats.mean = sum/ allValues.length;
    dataStats.min = 0;
    dataStats.max = 43964;
    dataStats.mean = averageAsylum
    return dataStats;

});    

}

function calcStatsUS(data){
    //create empty array to store all data values
    var features = data.features;
    var dataStatsUS = {};
    var min = Infinity;
    var max = -Infinity;
    var total = 0;
    // Looping through each feature
    features.forEach(function(feature) {
        // Accessing properties of each feature
        var properties = feature.properties;
        // Now you can access individual properties of each feature
        // For example:
        var name = properties.state;
        var totalSIV = properties.total;
    var allValues = [];
    
    if (totalSIV < min) {
        min = totalSIV;
    }
    if (total > max) {
        max = totalSIV;
    } 
    total += totalSIV;


// Calculate average
var average = total / features.length;

    //loop through each city
    for(var city of data.features){
        //loop through each year
       // for(var year = 2021; year <= 2021; year+=1){
              //get population for current year
              var value = city.properties["Total"];
              //add value to array
              allValues.push(value);
        //}
    }
    //get min, max, mean stats for our array
    //dataStats.min = Math.min(...allValues);
    //dataStats.max = Math.max(...allValues);
    //calculate meanValue
    //var sum = allValues.reduce(function(a, b){return a+b;});
    //dataStats.mean = sum/ allValues.length;
    dataStatsUS.min = 5;
    dataStatsUS.max = 1649;
    dataStatsUS.mean = average
    return dataStatsUS;

});    

}




// Define a function to handle the change event of the dropdown menu
function dropdownChange() {
    // Get the selected attribute from the dropdown menu
    var selectedAttribute = document.getElementById("attributeDropdown").value;
    // Fetch the GeoJSON data
    var worldDataURL = "data/2021WorldData.geojson";
    var USDataURL = "data/USDataSIV.geojson";
    var fetchURL;
    if (selectedAttribute === "total") {
        fetchURL = USDataURL;
    } else {
        fetchURL = worldDataURL;
    }
    fetch(fetchURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            // Process the data based on the selected attribute
            var attributes;
            if (selectedAttribute === "Refugees") {
                attributes = processDataRef(json);
                calcStatsRef(json);
                zoomToPakistanAndIran();
                
            } else if (selectedAttribute === "Asylum") {
                attributes = processDataAsylum(json);
                calcStatsAsylum(json);
                zoomToGermany();
            }  else if (selectedAttribute === "total") {
                attributes = processDataUS(json);
                calcStatsUS(json);
                zoomToUSA();
            }

            // If a previous GeoJSON layer exists, remove it from the map
            if (geojsonLayer) {
                map.removeLayer(geojsonLayer);
            }

            // Create the new GeoJSON layer based on the selected attribute
            geojsonLayer = createPropSymbols(json, attributes);

             
        });
}
document.getElementById("attributeDropdown").addEventListener("change", dropdownChange);


function calcPropRadius(attValue) {
    // Define a maximum and minimum radius
    var maxRadius = 30;
    var minRadius = 3;

    // Logarithmic transformation
    var minVal = 1;  // to avoid taking log of 0
    var logValue = Math.log(Math.max(attValue, minVal));

    // Normalize the log value to a scale of 0 to 1
    var logMax = Math.log(1490562);  // Use the log of your max value in data
    var normalizedValue = (logValue - Math.log(minVal)) / (logMax - Math.log(minVal));

    // Scale to the range of radii
    var radius = normalizedValue * (maxRadius - minRadius) + minRadius;
    
     // Adjust color if attValue is zero
     return radius;
}

function calcPropRadiusAsylum(attValue) {
    // Define a maximum and minimum radius
    var maxRadius = 30;
    var minRadius = 3;

    // Logarithmic transformation
    var minVal = 1;  // to avoid taking log of 0
    var logValue = Math.log(Math.max(attValue, minVal));

    // Normalize the log value to a scale of 0 to 1
    var logMax = Math.log(43964);  // Use the log of your max value in data
    var normalizedValue = (logValue - Math.log(minVal)) / (logMax - Math.log(minVal));

    // Scale to the range of radii
    var radius = normalizedValue * (maxRadius - minRadius) + minRadius;
    return radius;
}

function calcPropRadiusUS(attValue) {
    // Define a maximum and minimum radius
    var maxRadius = 25;
    var minRadius = 3;

    // Logarithmic transformation
    var minVal = 1;  // to avoid taking log of 0
    var logValue = Math.log(Math.max(attValue, minVal));

    // Normalize the log value to a scale of 0 to 1
    var logMax = Math.log(1649);  // Use the log of your max value in data
    var normalizedValue = (logValue - Math.log(minVal)) / (logMax - Math.log(minVal));

    // Scale to the range of radii
    var radius = normalizedValue * (maxRadius - minRadius) + minRadius;
    return radius;
}

function handleZero(attValue, options) {
    if (attValue == 0) {
        options.fillColor = 'grey';  // Change fill color to grey if attribute value is zero
        options.color = 'grey';      // Optionally change the border color to grey as well
    }
    return options;
}

function pointToLayerAsylum(feature, latlng, attributes){
    //Determine which attribute to visualize with proportional symbols
        //Step 4: Assign the current attribute based on the first index of the attributes array
        var attribute = attributes[1];
        var attValue = Number(feature.properties[attribute]);
        var radius = calcPropRadius(attValue); // Calculate the radius based on the attribute value
    //create marker options
    var options = {
        fillColor: "#b2182b",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
        radius: radius
        
    };

    // Adjust color if attribute value is zero
    options = handleZero(attValue, options);
    
    //For each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);
    
    //Give each feature's circle marker a radius based on its attribute value
    options.radius = calcPropRadius(attValue);

    //create circle marker layer
    var layer = L.circleMarker(latlng, options);

    var popupContent = new PopupContentWorld(feature.properties, attribute);

    //bind the popup to the circle marker    
    layer.bindPopup(popupContent.formatted, { 
        offset: new L.Point(0,-options.radius)
    });


    //return the circle marker to the L.geoJson pointToLayer option
    return layer;
};

function pointToLayer(feature, latlng, attributes) {
    var attribute = attributes[0];  // This might need to be adjusted based on actual use
    var attValue = Number(feature.properties[attribute]);
    var radius = calcPropRadius(attValue); // Calculate the radius based on the attribute value

    // Initial marker options
    var options = {
        fillColor: "#b2182b",  // Default fill color
        color: "#000",         // Default border color
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
        radius: radius
    };

    // Adjust color if attribute value is zero
    options = handleZero(attValue, options);

    // Create and return the circle marker
    var layer = L.circleMarker(latlng, options);
    var popupContent = new PopupContentWorld(feature.properties, attribute);
    layer.bindPopup(popupContent.formatted, { offset: new L.Point(0,-options.radius) });
    return layer;
}
function pointToLayerUS(feature, latlng, attributes){
    //Determine which attribute to visualize with proportional symbols
        //Step 4: Assign the current attribute based on the first index of the attributes array
        var attribute = attributes[0];
    //create marker options
    var options = {
        fillColor: "#00008B",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
        
    };
    
    //For each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);

    //Give each feature's circle marker a radius based on its attribute value
    options.radius = calcPropRadiusUS(attValue);

    //create circle marker layer
    var layer = L.circleMarker(latlng, options);

    var popupContent = new PopupContentUS(feature.properties, attribute);

    //bind the popup to the circle marker    
    layer.bindPopup(popupContent.formatted, { 
        offset: new L.Point(0,-options.radius)
    });


    //return the circle marker to the L.geoJson pointToLayer option
    return layer;
};



// Function to create the GeoJSON layer and assign it to geojsonLayer
function createPropSymbols(json, attributes) {
    if (attributes == 'total') {
        // Handle the case where 'total' attribute is selected
        newGeojsonLayer = L.geoJson(json, {
            pointToLayer: function(feature, latlng) {
                return pointToLayerUS(feature, latlng, attributes);
            }
        });
    }
    else {
        // Handle other attributes ('Refugees' and 'Asylum')
        newGeojsonLayer = L.geoJson(json, {
            pointToLayer: function(feature, latlng) {
                return pointToLayer(feature, latlng, attributes);
            }
        });
    }
    // Add the new GeoJSON layer to the map
    newGeojsonLayer.addTo(map);

    return newGeojsonLayer; // Return the newly created GeoJSON layer
}



function PopupContentUS(properties, attribute){
    this.properties = properties;
    this.attribute = attribute;
    this.sIV = this.properties[attribute];
    this.formatted = "<p><b>State:</b> " + this.properties.state + "</p><p><b>Total SIV refugees: " + ":</b> " + this.sIV + " </p>";
};
function PopupContentWorld(properties, attribute) {
    this.properties = properties;
    this.attribute = attribute;
    
    // Check if the attribute is "Refugees" or "Asylum" and set the corresponding property
    if (attribute === 'Refugees') {
        this.refugees = this.properties[attribute];
        this.formatted = "<p><b>Country: </b> " + this.properties.Country + "</p><p><b>Total refugees: </b> " + this.refugees + " </p>";
    } else if (attribute === 'Asylum') {
        this.asylum = this.properties[attribute];
        this.formatted = "<p><b>Country: </b> " + this.properties.Country + "</p><p><b>Total asylum seekers: </b> " + this.asylum + " </p>";
    }
}

document.getElementById("zoomButton").addEventListener("click", zoomToPakistanAndIran);

// Function to handle zooming to Pakistan and Iran
function zoomToPakistanAndIran() {
    // Set the coordinates and zoom level for Pakistan and Iran
    var pakistanIranBounds = [
        [24.0, 60.0], // Southwest coordinates (Pakistan)
        [39.0, 77.0]  // Northeast coordinates (Iran)
    ];
    var narrativeContent = "Pakistan shows the highest refugee count in 2021 with 1,490,562. Iran is the second most with " + 
    "778,054. Iran is most similar to Afghanistan in terms of language and culture, but Pakistan tends to be more receptive to" 
    + " Afghan refugees that Iran. ";
    
   
    openNarrativeBox(narrativeContent);
    
    
    // Fit the map view to the bounds of Pakistan and Iran
    map.fitBounds(pakistanIranBounds);
    // Function to close the paragraph box
    document.getElementById("zoomButton").style.display = 'none';
    document.getElementById("zoomToWorldButton").style.display = 'block';
    document.getElementById("zoomToUSButton").style.display = 'block';
    document.getElementById("zoomToGermanyButton").style.display = 'block';
        
}

// Add a click event listener to your arrow button (assuming it has an id="zoomButton")
document.getElementById('zoomButton').addEventListener('click', function() {
    zoomToPakistanAndIran();
});

// Add event listener to the button element
document.getElementById("zoomToGermanyButton").addEventListener("click", zoomToGermany);

// Function to handle zooming to Germany
function zoomToGermany() {
    // Set the coordinates and zoom level for Germany
    var germanyBounds = [
        [39.7986609345133, -9.31640625], // Southwest coordinates
        [61.60639637138628, 27.421875] // Northeast coordinates
    ];
    var narrativeContent = "Europe is known for Asylum seekers. Turkey takes in many refugees given its proximity to the Middle East" +
    " and its ability to coordinate with the rest of Europe to find a permanent living situation for asylum seekers. Germany is a popular hub "+
    "especially for Afghan asylum seekers given the US has its main military infrastructure in Germany, so the US is able to " +
    "Move people to Germany easier than move people to the US.";
    openNarrativeBox(narrativeContent);
    // Fit the map view to the bounds of Germany
    map.fitBounds(germanyBounds);

    document.getElementById("zoomToGermanyButton").style.display = 'none';
    document.getElementById("zoomToWorldButton").style.display = 'block';
    document.getElementById("zoomButton").style.display = 'block';
    document.getElementById("zoomToUSButton").style.display = 'block';
}

// Add event listener to the button element
document.getElementById("zoomToUSButton").addEventListener("click", zoomToUSA);

// Function to handle zooming to the USA
function zoomToUSA() {
    // Set the coordinates and zoom level for the USA
    var USBounds = [
        [24.396308, -125.0], // Southwest coordinates
        [49.384358, -66.93457] // Northeast coordinates
    ];
    var narrativeContent = "The Special Immigration Visa (SIV) was created in 2009 to help Afghan and Iraqi individuals "+
    " to come to the US as lawful permanent residents and obtain a greencard for assisting the US in their campaigns in the War On Terror."+
    " Unfortunetly, there is a small cap on how many SIVs are accepted into the US, even during the US withdrawal in 2021 many SIV applications were"+
    " denied.";

    // Open the narrative box with the specified content
    openNarrativeBox(narrativeContent);
    // Fit the map view to the bounds of the USA
    map.fitBounds(USBounds);
    document.getElementById("zoomToUSButton").style.display = 'none';
    document.getElementById("zoomToWorldButton").style.display = 'block';
    document.getElementById("zoomButton").style.display = 'block';
    document.getElementById("zoomToGermanyButton").style.display = 'block';
    
}
    //Add event listener and code for zooming out
    // Add event listener to the button element

// Add event listener to the button element
document.getElementById("zoomToWorldButton").addEventListener("click", zoomToWorldMap);

// Function to handle zooming out to the world map
function zoomToWorldMap() {
    // Set the coordinates and zoom level for the entire world
    map.setView([20, 0], 2);
    document.getElementById("zoomToWorldButton").style.display = 'none';
    document.getElementById("zoomToUSButton").style.display = 'block';
    document.getElementById("zoomToGermanyButton").style.display = 'block';
    document.getElementById("zoomButton").style.display = 'block';
    closeNarrativeBox();
}



// Function to open the narrative box
function openNarrativeBox(content) {
    var narrativeBox = document.getElementById('narrativeBox');
    var narrativeText = document.getElementById('narrativeText');
    
    // Set the content of the narrative box
    narrativeText.innerHTML = content;

    // Show the narrative box
    narrativeBox.style.display = 'block';
}

// Function to close the narrative box
function closeNarrativeBox() {
    var narrativeBox = document.getElementById('narrativeBox');
    // Hide the narrative box
    narrativeBox.style.display = 'none';
}

document.addEventListener('DOMContentLoaded',createMap)
