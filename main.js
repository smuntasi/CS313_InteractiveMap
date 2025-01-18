import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import { fromLonLat } from 'ol/proj'; 

// Initialize the map
const map = new Map({
  target: 'map', 
  layers: [
    new TileLayer({
      source: new OSM(), 
    }),
  ],
  view: new View({
    center: fromLonLat([-120.6625, 35.3001]), // Center map around Cal Poly
    zoom: 8, 
  }),
});

//locations
const locations = [
  { name: 'San Luis Obispo', coords: [-120.6625, 35.3001], count: 1 },
  { name: 'San Diego', coords: [-117.1611, 32.7157], count: 1 },
  { name: 'Santa Maria', coords: [-120.4357, 34.9530], count: 2 }, 
  { name: 'Los Angeles', coords: [-118.2437, 34.0522], count: 3 }, 
];

const styles = {
  1: new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({ color: 'blue' }),
    }),
  }),
  2: new Style({
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({ color: 'orange' }),
    }),
  }),
  3: new Style({
    image: new CircleStyle({
      radius: 15,
      fill: new Fill({ color: 'purple' }),
    }),
  }),
};

const features = locations.map((location) => {
  const feature = new Feature({
    geometry: new Point(fromLonLat(location.coords)),
  });
  feature.setStyle(styles[location.count]);
  return feature;
});

const vectorSource = new VectorSource({
  features: features,
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

map.addLayer(vectorLayer);
