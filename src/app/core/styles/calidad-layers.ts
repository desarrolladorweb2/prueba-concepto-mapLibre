import { Expression, LayerSpecification } from 'maplibre-gl';

// export const CALIDAD_ICON_SIMBOLO = {
//   id: 'calidad-icon-simbolo-unificado',
//   type: 'symbol',
//   minzoom: 15,
//   layout: {
//     'icon-image': 'circle-15',
//     'icon-size': 2, // Usa CASE para decidir qué texto mostrar
//     'text-field': [
//       'case',
//       ['==', ['get', 'estado'], '1'], // Inconforme
//       '!',
//       ['==', ['get', 'estado'], '2'], // Aprobado: No muestres nada (o un checkmark si lo necesitas)
//       '', // Muestra la cantidad si estado es 0, null o '' Y cantidad >= 1
//       [
//         'all',
//         [
//           'any',
//           ['==', ['get', 'estado'], null],
//           ['==', ['get', 'estado'], '0'],
//           ['==', ['get', 'estado'], ''],
//         ],
//         ['>=', ['to-number', ['get', 'cantidad']], 1],
//       ],
//       ['to-string', ['get', 'cantidad']], // Convertir cantidad a texto
//       '', // Default: vacío
//     ],
//     'text-size': ['case', ['==', ['get', 'estado'], '1'], 18, 15], // Texto más grande para '!'
//     'text-font': ['Open Sans Bold'],
//     'text-anchor': 'center',
//   },
//   paint: {
//     // Usa CASE para decidir el color del texto
//     'text-color': [
//       'case',
//       ['==', ['get', 'estado'], '1'],
//       '#0d588f', // Inconforme (azul oscuro)
//       ['==', ['get', 'estado'], '2'],
//       'transparent', // Aprobado (Si no muestra texto, no importa el color) // Default: Cantidad
//       '#2E86C1',
//     ],
//   }, // El filtro general: Solo muestra el símbolo si hay una razón para hacerlo
//   filter: [
//     'any',
//     ['==', ['get', 'estado'], '1'], // Inconforme
//     [
//       'all',
//       ['!=', ['get', 'estado'], '1'],
//       ['>=', ['to-number', ['get', 'cantidad']], 1], // Cantidad >= 1
//     ],
//   ],
// };

// export const CALIDAD_FILL_PAINT: LayerSpecification['paint'] = {
//   'fill-color': [
//     'case', // 1. Inconforme (estado = '1')

//     ['==', ['get', 'estado'], '1'],
//     '#173558', // 2. Aprobado (estado = '2')

//     ['==', ['get', 'estado'], '2'],
//     '#3BA935', // El estado no es 1 ni 2. Lo evaluamos por cantidad: // 3. Cantidad >= 1 (y estado 0/null/''): Se cubre el caso intermedio/pendiente

//     ['>=', ['to-number', ['get', 'cantidad']], 1],
//     '#5DADE2', // 4. Cantidad = 0 (y estado 0/null/''): Por descarte, si llega aquí la cantidad es 0

//     ['==', ['to-number', ['get', 'cantidad']], 0],
//     '#818181ff', // 5. Default/Fallback

//     '#CCCCCC',
//   ],
//   'fill-opacity': 1,
// };


export const CALIDAD_FILL_PAINT: LayerSpecification['paint'] = {
  'fill-color': [
    'match',
    ['get', 'estado'],
    '1', '#173558',
    '2', '#3BA935',
    '0', '#5DADE2',
    '#8d8d8dff'
  ],
  'fill-opacity': 1,
};


export const CALIDAD_ICON_SIMBOLO = {
  id: 'calidad-icon-simbolo-unificado',
  type: 'symbol',
  minzoom: 15,

  layout: {
    'icon-image': 'circle-15',
    'icon-size': 2,

    'text-field': [
      'case',
      // Inconforme
      ['==', ['to-string', ['get', 'estado']], '1'],
      '!',

      // Aprobado → no mostrar
      ['==', ['to-string', ['get', 'estado']], '2'],
      '',

      // Pendiente → mostrar cantidad
      ['>=', ['to-number', ['get', 'cantidad']], 1],
      ['to-string', ['get', 'cantidad']],

      ''
    ],

    'text-size': [
      'case',
      ['==', ['to-string', ['get', 'estado']], '1'],
      18,
      15
    ],

    'text-font': ['Open Sans Bold'],
    'text-anchor': 'center',
  },

  paint: {
    'text-color': [
      'case',
      ['==', ['to-string', ['get', 'estado']], '1'],
      '#0d588f',
      '#2E86C1'
    ],
  },

  filter: [
    'any',
    ['==', ['to-string', ['get', 'estado']], '1'],
    ['>=', ['to-number', ['get', 'cantidad']], 1],
  ],
};



