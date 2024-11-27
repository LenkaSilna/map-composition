import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import TileWMS from 'ol/source/TileWMS';
import { Overlay } from 'ol';
import 'ol/proj/proj4';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { getPolygonStyle } from '../styles/polygonStyles';
import polygonsData from '../data/polygons.json';
import { krovak } from '../config/projection';
import { MapTooltip } from './MapTooltip';

export const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipInfo, setTooltipInfo] = useState({ id: 0, pole: '', visible: false });

  useEffect(() => {
    if (!mapRef.current) return;

    proj4.defs(krovak.code, krovak.def);
    register(proj4);

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(polygonsData, {
        dataProjection: 'EPSG:5514',
        featureProjection: 'EPSG:5514',
      }),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => getPolygonStyle(feature.get('hodnota')),
    });

    const wmsLayer = new TileLayer({
      source: new TileWMS({
        url: 'https://geoportal.cuzk.cz/WMS_ZM25_PUB/WMService.aspx',
        params: {
          LAYERS: 'GR_ZM25',
          FORMAT: 'image/png',
          VERSION: '1.3.0',
          TRANSPARENT: true,
        },
        projection: 'EPSG:5514',
        crossOrigin: 'anonymous',
      }),
    });

    const overlay = new Overlay({
      element: tooltipRef.current!,
      positioning: 'bottom-center',
      offset: [0, -10],
      stopEvent: false,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [wmsLayer, vectorLayer],
      view: new View({
        projection: krovak.code,
        center: [-749992.3, -1045788.0],
        resolution: 2,
        zoom: 10,
        maxZoom: 20,
        minZoom: 10,
      }),
      controls: [],
    });

    map.addOverlay(overlay);

    map.on('pointermove', (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);

      if (feature) {
        overlay.setPosition(evt.coordinate);
        const featureId = feature.get('id');
        const featurePole = feature.get('pole');
        setTooltipInfo({
          id: featureId,
          pole: featurePole,
          visible: true,
        });
      } else {
        setTooltipInfo((prev) => ({ ...prev, visible: false }));
      }
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={mapRef} style={{ width: '800px', height: '500px' }} />
      <div ref={tooltipRef} style={{ position: 'absolute' }}>
        <MapTooltip {...tooltipInfo} />
      </div>
    </div>
  );
};
