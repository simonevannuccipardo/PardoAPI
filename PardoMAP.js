import Map from 'https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/build/ol.js';

/**
 * Pardo API si occupa di gestire la mappa standard
 */

class PardoMAP extends PardoAPI {

  apiMap = "";

  /**
   * Costruttore
   * @param {*} apiCms api key Cockpit CMS
   * @param {*} apiMap api key Mapbox
   */
  constructor(apiCms, apiMap) {
    super(apiCms);
    this.apiMap = apiMap;
  }

}
