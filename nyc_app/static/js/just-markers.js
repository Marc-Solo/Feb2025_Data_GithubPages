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
    let markers = [];
    let features = data.features;
  
    // Comment this line in to render all 80,000 markers
    // let marker_limit = features.length;
    let marker_limit = 1000;
  
    for (let i = 0; i < marker_limit; i++) {
  
      let location = features[i].geometry;
      if(location){
        let marker = L.marker([location.coordinates[1], location.coordinates[0]]);
        markers.push(marker);
      }
    }
  
    let markerLayer = L.layerGroup(markers);
  
    // Step 3: CREATE THE LAYER CONTROL
    let baseMaps = {
      Street: street,
      Topography: topo
    };
  
    let overlayMaps = {
      Hydrants: markerLayer
    };
  
  
    // Step 4: INITIALIZE THE MAP
    let myMap = L.map("map", {
      center: [-32.8, 117.9],
      zoom: 7,
      layers: [street, markerLayer]
    });
  
    // Step 5: Add the Layer Control, Legend, Annotations as needed
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  
  });
  
  
  