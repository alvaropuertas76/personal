// Este archivo carga todos los datos de carreras y los exporta como un arreglo
import mds2022 from './mds-2022.json';
import boston2024 from './boston-2024.json';
import utmb2023 from './utmb-2023.json';
import ironmanFrankfurt2018 from './ironman-frankfurt-2018.json';
import fireIceUltra2018 from './fire-ice-ultra-2018.json';

// Combinamos todos los datos de carreras en un solo arreglo
const raceData = [
  mds2022,
  boston2024,
  utmb2023,
  ironmanFrankfurt2018,
  fireIceUltra2018
];

export default raceData;
