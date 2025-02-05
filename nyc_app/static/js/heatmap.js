// Step 1: CREATE THE BASE LAYERS
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  
  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  
  
  let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/Water_Hydrant_WCORP_070_WA_GDA2020_Public.geojson";
  d3.json(url).then(function (data) {
    // Step 2: CREATE THE DATA/OVERLAY LAYERS
    let heatArray = [];
    let features = data.features;
  
    console.log(data);
  
  
    // Get location for heat array
    for (let i = 0; i < features.length; i++) {
  
      let location = features[i].geometry;
      if(location){
        heatArray.push([location.coordinates[1], location.coordinates[0]]);
      }
    }
  
    // Create Heatmap Layer
    let heatLayer = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    });
  
    // Step 3: CREATE THE LAYER CONTROL
    let baseMaps = {
      Street: street,
      Topography: topo
    };
  
    let overlayMaps = {
      Hydrants: heatLayer
    };
  
  
    // Step 4: INITIALIZE THE MAP
    let myMap = L.map("map", {
      center: [-32.8, 117.9],
      zoom: 7,
      layers: [street, heatLayer]
    });
  
    // Step 5: Add the Layer Control, Legend, Annotations as needed
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  
  });