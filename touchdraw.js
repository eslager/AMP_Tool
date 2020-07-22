var map = L.map('map').setView([47.217901, -122.427402],
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

/*this command relies on jQuery, so a link to that library must be included in the index.html*/
   $(function () {

   /*Creating classes for new colors. These are created by extending the L.Draw.Polygon (or .Polyline etc.) objects.*/
   /*Green*/
   L.Draw.PolygonGreen = L.Draw.Polygon.extend({
       initialize: function (map, options) {
           this.type = 'polygonGreen';
           L.Draw.Feature.prototype.initialize.call(this, map, options);
       }
   });
   //Note: This creates the class, but the class is not yet defined in the CSS or called in the JavaScript. Those changes need to happen below before the button will appear green.
   L.Draw.PolylineGreen = L.Draw.Polyline.extend({
       initialize: function (map, options) {
           this.type = 'polylineGreen';
           L.Draw.Feature.prototype.initialize.call(this, map, options);
       }
   });

   L.Draw.MarkerGreen = L.Draw.Marker.extend({
       initialize: function (map, options) {
   		     this.type = 'markerGreen';
   		     L.Draw.Feature.prototype.initialize.call(this, map, options);
   	},
  });

   /*Blue*/
   L.Draw.PolygonBlue = L.Draw.Polygon.extend({
       initialize: function (map, options) {
           this.type = 'polygonBlue';
           L.Draw.Feature.prototype.initialize.call(this, map, options);
       }
   });
   /*TO ADD: BLUE MARKER*/

   /*Red*/
   L.Draw.PolygonRed = L.Draw.Polygon.extend({
       initialize: function (map, options) {
           this.type = 'polygonRed';
           L.Draw.Feature.prototype.initialize.call(this, map, options);
       }
   });

   /*Black*/
   L.Draw.PolygonBlack = L.Draw.Polygon.extend({
       initialize: function (map, options) {
           this.type = 'polygonBlack';
           L.Draw.Feature.prototype.initialize.call(this, map, options);
       }
   });
   /*TO ADD: BLACK POLYLINE*/

   // /*Adds new shape types to the options */
   L.DrawToolbar.include({

       options: {},
           initialize: function (options) {
       // Ensure that the options are merged correctly since L.extend is only shallow
       for (var type in this.options) {
           if (this.options.hasOwnProperty(type)) {
               if (options[type]) {
                   options[type] = L.extend({}, this.options[type], options[type]);
               }
           }
       }

       this._toolbarClass = 'leaflet-draw-draw';
       L.Toolbar.prototype.initialize.call(this, options);
   },
       getModeHandlers: function (map) {
           return [
            //GENERIC HANDLERS. Once you've added all of the colors, you can delete these.
               {
                  enabled: this.options.polyline,
                  handler: new L.Draw.Polyline(map, this.options.polyline),
                  title: L.drawLocal.draw.toolbar.buttons.polyline
               },
               {
                   enabled: this.options.marker,
                   handler: new L.Draw.Marker(map, this.options.marker),
                   title: L.drawLocal.draw.toolbar.buttons.marker
               },
               {
                   enabled: this.options.polygon,
                   handler: new L.Draw.Polygon(map, this.options.polygon),
                   title: L.drawLocal.draw.toolbar.buttons.polygon
               },
               //NEW HANDLERS. ADD HANDLERS HERE FOR THE NEW CLASS YOU CREATED ABOVE.
               {
                   enabled: this.options.polygonGreen,
                   handler: new L.Draw.PolygonGreen(map, this.options.polygonGreen),
                   title: L.drawLocal.draw.toolbar.buttons.polygonGreen
               },
               {
                  enabled: this.options.polylineGreen,
                  handler: new L.Draw.PolylineGreen(map, this.options.polylineGreen),
                  title: L.drawLocal.draw.toolbar.buttons.polylineGreen
               },
               {
                   enabled: this.options.polygonBlue,
                   handler: new L.Draw.PolygonBlue(map, this.options.polygonBlue),
                   title: L.drawLocal.draw.toolbar.buttons.polygonBlue
               },
               {
                   enabled: this.options.markerGreen,
                   handler: new L.Draw.MarkerGreen(map, this.options.marker),
                   title: L.drawLocal.draw.toolbar.buttons.markerGreen
               },
           ];
       },
   });

}());
// **************************************************************************
// Initialise the draw control and pass it the FeatureGroup of editable layers
// Green
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Set the title to show on the polygon button
L.drawLocal.draw.toolbar.buttons.polygonGreen = 'Trace an area!';
//these will need to be updated once you've changed your classes to be color-specific
L.drawLocal.draw.toolbar.buttons.polylineGreen = 'Trace streets!';
L.drawLocal.draw.toolbar.buttons.markerGreen = 'Mark an area!';

var drawControlGreen = new L.Control.Draw(
  {
    position: 'topleft',
    draw: {
        polylineGreen: {
            metric: false,
            showArea: false,
            shapeOptions: {
              color: 'green'
            }
        },
        polygonGreen: {
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
        markerGreen: true
    },
    edit: {
        featureGroup: drawnItems,
        edit:false,
        remove: false
    }
});


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

// *************************************************************************************************
// New Group: Blue
       var bluedrawnItems = new L.FeatureGroup();
       map.addLayer(bluedrawnItems);

       // Set the title to show on the polygon button
       L.drawLocal.draw.toolbar.buttons.polygonBlue = 'Trace an area!';
       //these (below) will need to be updated once you've changed your classes to be color-specific
       L.drawLocal.draw.toolbar.buttons.polyline = 'Trace streets!';
       L.drawLocal.draw.toolbar.buttons.marker = 'Mark an area!';

       var drawControlBlue = new L.Control.Draw({
           position: 'topleft',
           draw: {
               polyline: false,
               polygonBlue: {
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
               featureGroup: bluedrawnItems,
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

           bluedrawnItems.addLayer(layer);
       });

       map.on('draw:edited', function (blue) {
           var layers = blue.layers;
           var countOfEditedLayers = 0;
           layers.eachLayer(function(layer) {
               countOfEditedLayers++;
           });
           console.log("Edited " + countOfEditedLayers + " layers");
       });


// ****************************************************************************
// New group: Black
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Set the title to show on the polygon button
//these will need to be updated once you've changed your classes to be color-specific
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




// **************************************************************************
//New Group: RED
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Set the title to show on the polygon button
//these will need to be updated once you've changed your classes to be color-specific
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
