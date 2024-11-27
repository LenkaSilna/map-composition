import proj4 from 'proj4';

export const krovak = {
  code: 'EPSG:5514',
  extent: [-925000, -1444353.536, -400646.464, -920000],
  def: `+proj=krovak 
        +lat_0=49.5
        +lon_0=24.83333333333333
        +alpha=30.28813972222222
        +k=0.9999
        +x_0=0
        +y_0=0
        +ellps=bessel
        +towgs84=570.8,85.7,462.8,4.998,1.587,5.261,3.56
        +units=m
        +no_defs`,
};

proj4.defs(krovak.code, krovak.def);
