var map = L.map('map', {deawControl: true}).setView([47.217901, -122.427402],
  13);
  L.tileLayer('https://api.mapbox.com/styles/v1/ainsleykm/cka71ldlz0fu91itjnm24f0tg/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWluc2xleWttIiwiYSI6ImNrMmt1cDhnaTAwZDgzY2xrcW1zamIxNGgifQ.-0f1V1moN7hnx8mzPD7hxQ', {
    attribution: 'Map data &copy; Mapbox',
        minZoom: 13,
        maxZoom: 16
  })
  .addTo(map);

map.bounds = [],
   map.setMaxBounds([
     [47.258633,-122.499457],
     [47.207077,-122.421508]
   ]);


// Initialise the draw control and pass it the FeatureGroup of editable layers
// Green
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Set the title to show on the polygon button
L.drawLocal.draw.toolbar.buttons.polygon = 'Trace an area!';
L.drawLocal.draw.toolbar.buttons.polyline = 'Trace streets!';
L.drawLocal.draw.toolbar.buttons.marker = 'Mark an area!';

var drawControlGreen = new L.Control.Draw({
    position: 'topleft',
    draw: {
        polyline: {
            metric: false,
            showArea: false,
            shapeOptions: {
                color: 'green'
            }
        },
        polygon: {
            allowIntersection: false,
            showLength: false,
            drawError: {
                color: '#b00b00',
                timeout: 1000
            },
            shapeOptions: {
                color: 'green'
            }
        },
        circle: false,
        rectangle: false,
        marker: true
    },
    edit: {
        featureGroup: drawnItems,
        edit:false,
        remove: false
    }
},

drawControlGreen.onAdd= function (map) {
    var div = L.DomUtil.create('button', '.leaflet-draw a');
      div.style.backgroundColor = 'yellow';
    return drawControlGreen.div;

    }
);

map.addControl(drawControlGreen);


map.on('draw:created', function (green) {
    var type = green.layerType,
        layer = green.layer;

    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }

    drawnItems.addLayer(layer);
});

map.on('draw:edited', function (green) {
    var layers = green.layers;
    var countOfEditedLayers = 0;
    layers.eachLayer(function(layer) {
        countOfEditedLayers++;
    });
    console.log("Edited " + countOfEditedLayers + " layers");
});

L.DomUtil.get('changeColor').onclick = function () {
    drawControl.setDrawingOptions({ rectangle: { shapeOptions: { color: '#004a80' } } });
};




// *************************************************************************************************
// New Group: Blue
       var drawnItems = new L.FeatureGroup();
       map.addLayer(drawnItems);

       // Set the title to show on the polygon button
       L.drawLocal.draw.toolbar.buttons.polygon = 'Trace an area!';
       L.drawLocal.draw.toolbar.buttons.polyline = 'Trace streets!';
       L.drawLocal.draw.toolbar.buttons.marker = 'Mark an area!';

       var drawControlBlue = new L.Control.Draw({
           position: 'topleft',
           draw: {
               polyline: false,
               polygon: {
                   allowIntersection: false,
                   showLength: false,
                   drawError: {
                       color: '#b00b00',
                       timeout: 1000
                   },
                   shapeOptions: {
                       color: 'blue'
                   }
               },
               circle: false,
               rectangle: false,
               marker: true
           },
           edit: {
               featureGroup: drawnItems,
               edit:false,
               remove: false
           }
       });
       map.addControl(drawControlBlue);

       map.on('draw:created', function (blue) {
           var type = blue.layerType,
               layer = blue.layer;

           if (type === 'marker') {
               layer.bindPopup('A popup!');
           }

           drawnItems.addLayer(layer);
       });

       map.on('draw:edited', function (blue) {
           var layers = blue.layers;
           var countOfEditedLayers = 0;
           layers.eachLayer(function(layer) {
               countOfEditedLayers++;
           });
           console.log("Edited " + countOfEditedLayers + " layers");
       });

       L.DomUtil.get('changeColor').onclick = function () {
           drawControl.setDrawingOptions({ rectangle: { shapeOptions: { color: '#004a80' } } });
       };

// ****************************************************************************
// New group: Black
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Set the title to show on the polygon button
L.drawLocal.draw.toolbar.buttons.polygon = 'Trace an area!';
L.drawLocal.draw.toolbar.buttons.polyline = 'Trace streets!';
L.drawLocal.draw.toolbar.buttons.marker = 'Mark an area!';

var drawControlBlack = new L.Control.Draw({
    position: 'topleft',
    draw: {
        polyline: false,
        polygon: {
            allowIntersection: false,
            showLength: false,
            drawError: {
                color: '#b00b00',
                timeout: 1000
            },
            shapeOptions: {
                color: 'black'
            }
        },
        circle: false,
        rectangle: false,
        marker: false
    },
    edit: {
        featureGroup: drawnItems,
        edit:false,
        remove: false
    }
});
map.addControl(drawControlBlack);

map.on('draw:created', function (black) {
    var type = black.layerType,
        layer = black.layer;

    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }

    drawnItems.addLayer(layer);
});

map.on('draw:edited', function (black) {
    var layers = black.layers;
    var countOfEditedLayers = 0;
    layers.eachLayer(function(layer) {
        countOfEditedLayers++;
    });
    console.log("Edited " + countOfEditedLayers + " layers");
});

L.DomUtil.get('changeColor').onclick = function () {
    drawControl.setDrawingOptions({ rectangle: { shapeOptions: { color: '#004a80' } } });
};


// **************************************************************************
//New Group: RED
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Set the title to show on the polygon button
L.drawLocal.draw.toolbar.buttons.polygon = 'Trace an area!';
L.drawLocal.draw.toolbar.buttons.polyline = 'Trace streets!';
L.drawLocal.draw.toolbar.buttons.marker = 'Mark an area!';

var drawControlRed = new L.Control.Draw({
    position: 'topleft',
    draw:  {
        polyline: {
            metric: false,
            showArea: false,
            shapeOptions: {
                color: 'red'
            }
        },
        polygon: {
            allowIntersection: false,
            showLength: false,
            drawError: {
                color: '#b00b00',
                timeout: 1000
            },
            shapeOptions: {
                color: 'red'
            }
        },
        circle: false,
        rectangle: false,
        marker: false
    },
    edit: {
        featureGroup: drawnItems,
        edit:false,
        remove: true
    }
});
map.addControl(drawControlRed);



map.on('draw:created', function (red) {
    var type = red.layerType,
        layer = red.layer;

    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }

    drawnItems.addLayer(layer);
});

map.on('draw:edited', function (red) {
    var layers = red.layers;
    var countOfEditedLayers = 0;
    layers.eachLayer(function(layer) {
        countOfEditedLayers++;
    });
    console.log("Edited " + countOfEditedLayers + " layers");
});

L.DomUtil.get('changeColor').onclick = function () {
    drawControl.setDrawingOptions({ rectangle: { shapeOptions: { color: '#004a80' } } });
};
