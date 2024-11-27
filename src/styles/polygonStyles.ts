import { Style, Fill, Stroke } from 'ol/style';

const colors = {
  1: 'rgba(255, 0, 0, 0.6)',
  2: 'rgba(0, 255, 0, 0.6)',
  3: 'rgba(0, 0, 255, 0.6)',
  4: 'rgba(255, 255, 0, 0.6)',
};

export const getPolygonStyle = (value: number) => {
  return new Style({
    fill: new Fill({
      color: colors[value as keyof typeof colors],
    }),
    stroke: new Stroke({
      color: '#000000',
      width: 1,
    }),
  });
};
