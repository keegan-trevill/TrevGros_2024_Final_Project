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

    //add OSM base tilelayer
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(map)
    //call getData function
    getData(map);
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

    console.log(attributes);
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

    console.log(attributes);
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

    console.log(attributes);
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
        console.log("Refugees:" + refugees + ", " + "Country: " + name)
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
    console.log("Minimum:", minRefugees);
    console.log("Maximum:", maxRefugees);
    console.log("Mean:", averageRefugees);
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
        console.log("Asylum:" + asylum + ", " + "Country: " + name)
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
    console.log("Minimum:", minAsylum);
    console.log("Maximum:", maxAsylum);
    console.log("Mean:", averageAsylum);
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
        console.log("total:" + totalSIV + ", " + "States: " + name)
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
    console.log("MinimumUS:", min);
    console.log("MaximumUS:", max);
    console.log("MeanUS:", average);
    return dataStatsUS;

});    

}




// Define a function to handle the change event of the dropdown menu
function dropdownChange() {
    // Get the selected attribute from the dropdown menu
    var selectedAttribute = document.getElementById("attributeDropdown").value;
    console.log(selectedAttribute)
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
                
            } else if (selectedAttribute === "Asylum") {
                attributes = processDataAsylum(json);
                calcStatsAsylum(json);
                
            }  else if (selectedAttribute === "total") {
                attributes = processDataUS(json);
                calcStatsUS(json);
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


//calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
    // Define a maximum radius to cap the symbol sizes
    var maxRadius = 30; 
    var minRadius = 5// You can adjust this value based on your preference
    console.log(attValue)
    // Scale the attribute value to fit within a reasonable range
    var scaledValue = attValue / 1490562; // Assuming you have maxValue calculated elsewhere

    // Cap the scaled value to ensure it doesn't exceed 1
    scaledValue = Math.min(scaledValue, 1);
    console.log(scaledValue * maxRadius)
    // Calculate the radius using a linear interpolation
    
    var radius;
    if(attValue < 10000 && attValue > 1000){
        radius = scaledValue * maxRadius + 5
    }else if (attValue < 1000){
        radius = scaledValue * maxRadius
    }
    else if(attValue > 10000 && attValue< 150000){
        radius = scaledValue * maxRadius + 10
    }
    else if(attValue > 150000 && attValue< 200000){
        radius = scaledValue * maxRadius + 20
    }
    else {
        radius = maxRadius;
    }
    return radius;
    
}

function calcPropRadiusAsylum(attValue) {
    // Define a maximum radius to cap the symbol sizes
    var maxRadius = 30;
    var minRadius = 5 // You can adjust this value based on your preference
    console.log(attValue)
    // Scale the attribute value to fit within a reasonable range
    var scaledValue = attValue / 43964; // Assuming you have maxValue calculated elsewhere

    // Cap the scaled value to ensure it doesn't exceed 1
    scaledValue = Math.min(scaledValue, 1);

    // Calculate the radius using a linear interpolation
    var radius;
    if(attValue < 1000){
        radius = scaledValue * maxRadius 
    }
    else if(attValue >= 1000 && attValue < 2000){
        radius = scaledValue * maxRadius + 3
    }
    else if (attValue >= 2000 && attValue < 40000){
        radius = scaledValue * maxRadius + 7
    }
    else if (attValue >= 40000 && attValue < 100000){
        radius = scaledValue * maxRadius + 1
    }
    else {
        radius =scaledValue * maxRadius + 20;
    }
    return radius;
}

function calcPropRadiusUS(attValue) {
    // Define a maximum radius to cap the symbol sizes
    var maxRadius = 30;
    var minRadius = 5 // You can adjust this value based on your preference

    // Scale the attribute value to fit within a reasonable range
    var scaledValue = attValue / 1649; // Assuming you have maxValue calculated elsewhere

    // Cap the scaled value to ensure it doesn't exceed 1
    scaledValue = Math.min(scaledValue, 1);

    // Calculate the radius using a linear interpolation
    var radius = scaledValue * maxRadius ;

    return radius;
}

function pointToLayerAsylum(feature, latlng, attributes){
    //Determine which attribute to visualize with proportional symbols
        //Step 4: Assign the current attribute based on the first index of the attributes array
        var attribute = attributes[1];
        //check
        console.log(feature);
    //create marker options
    var options = {
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
        
    };
    
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

function pointToLayer(feature, latlng, attributes){
    //Determine which attribute to visualize with proportional symbols
        //Step 4: Assign the current attribute based on the first index of the attributes array
        var attribute = attributes[0];
        //check
        console.log(attributes[0]);
    //create marker options
    var options = {
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
        
    };
    
    //For each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);

    //Give each feature's circle marker a radius based on its attribute value
    if(attributes[0] == 'Asylum'){
        options.radius = calcPropRadiusAsylum(attValue);
    }else if(attributes[0] == 'Refugees'){
    options.radius = calcPropRadius(attValue);
    }
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
function pointToLayerUS(feature, latlng, attributes){
    //Determine which attribute to visualize with proportional symbols
        //Step 4: Assign the current attribute based on the first index of the attributes array
        var attribute = attributes[0];
        //check
        console.log(attribute);
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
    console.log(attValue)

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
    console.log(attributes)
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
    var narrativeContent = "Zoomed to surrounding countries.";
    openNarrativeBox(narrativeContent);

    // Fit the map view to the bounds of Pakistan and Iran
    map.fitBounds(pakistanIranBounds);
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
    var narrativeContent = "Zoomed to Germany.";
    openNarrativeBox(narrativeContent);
    // Fit the map view to the bounds of Germany
    map.fitBounds(germanyBounds);
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
    var narrativeContent = "Zoomed to the USA.";

    // Open the narrative box with the specified content
    openNarrativeBox(narrativeContent);
    // Fit the map view to the bounds of the USA
    map.fitBounds(USBounds);
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