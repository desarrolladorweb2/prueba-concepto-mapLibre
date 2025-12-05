import { Expression, LayerSpecification } from 'maplibre-gl';

export const CALIDAD_FILL_PAINT: LayerSpecification['paint'] = {
  'fill-color': [
    'case',

    // inconforme (estado = 1)
    ['==', ['get', 'estado'], '1'], '#173558',

    // aprobado (estado = 2)
    ['==', ['get', 'estado'], '2'], '#3BA935',

    // cantidad >= 1
    [
      'all',
      [
        'any',
        ['==', ['get', 'estado'], null],
        ['==', ['get', 'estado'], '0'],
        ['==', ['get', 'estado'], '']
      ],
      ['>=', ['to-number', ['get', 'cantidad']], 1]
    ],
    '#5DADE2',

    // cantidad = 0
    [
      'all',
      [
        'any',
        ['==', ['get', 'estado'], null],
        ['==', ['get', 'estado'], '0'],
        ['==', ['get', 'estado'], '']
      ],
      ['==', ['to-number', ['get', 'cantidad']], 0]
    ],
    '#818181ff',

    '#CCCCCC'
  ],

  'fill-opacity': 1,
};

export const CALIDAD_ICON_INCONFORME = {
  id: 'calidad-icon-inconforme',
  type: 'symbol',
  minzoom: 15,
  layout: {
    'icon-image': 'circle-15',
    'icon-size': 2,
    'text-field': '!',
    'text-font': ['Open Sans Bold'],
    'text-size': 18,
    'text-anchor': 'center',
  },
  paint: {
    'text-color': '#0d588f',
  },
  filter: ['==', ['get', 'estado'], '1'],
};

export const CALIDAD_ICON_CANTIDAD = {
  id: 'calidad-icon-cantidad',
  type: 'symbol',
  minzoom: 15,
  layout: {
    'icon-image': 'circle-15',
    'icon-size': 2,
    'text-field': ['get', 'cantidad'],
    'text-size': 15,
    'text-font': ['Open Sans Bold'],
    'text-anchor': 'center',
  },
  paint: {
    'text-color': '#2E86C1',
  },
  filter: [
    'all',
    [
      'any',
      ['==', ['get', 'estado'], null],
      ['==', ['get', 'estado'], ''],
      ['==', ['get', 'estado'], '0']
    ],
    ['>=', ['to-number', ['get', 'cantidad']], 1]
  ],
};
