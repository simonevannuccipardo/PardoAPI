/**
 * Pardo API si occupa di gestire le richiesta di dati da Cockpit
 */

class PardoAPI {
  //Url principale
  url = 'https://content.locarnofestival.ch/api';
  //Endpoints
  content = '/content';
  item = '/item';
  items = '/items'
  assets = '/assets';
  image = this.assets + '/image';
  //Parametro key api nel heade
  headerApi = "api-key";
  //API key
  api ="";
  saveLocaldata = 0;
  map;
  lang;

  /**
   * Costruttore
   * @param {*} api api key
   * @param {*} lang language in ISO 639-1 format (2 char)
   */
  constructor(api, lang = 'en') {
    this.api = api;
    this.lang = lang;
  }

  /**
   * Metodo di richiesta generico
   * @param {*} url url di richiesta
   * @param {*} method metodo (GET, POST,...)
   * @returns 
   */
  async request(url, method = 'GET'){
    var myHeaders = new Headers();
    myHeaders.append(this.headerApi, this.api);

    var requestOptions = {
      method: method,
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(url, requestOptions);
    const res = await response.json();
    return res;
  }
  
  get getLocale(){
    return '?locale=' + this.lang;
  }

  /**
   * Getter per ricreare i vari endpoint
   */
  get urlAssets(){
    return this.url + this.assets + this.getLocale;
  }

  get urlImage(){
    return this.urlAssets + this.image + this.getLocale;
  }

  get urlCollectionContents(){
    return this.url + this.content + this.items + this.getLocale;
  }

  get urlContent(){
    return this.url + this.content + this.item + this.getLocale;
  }

  getFilter(attr_name, name){
    return "{" + attr_name + ":\"" + name + "\"}";
  }

}

class PardoGET extends PardoAPI {

  /**
   * Costruttore
   * @param {*} api api key
   * @param {*} lang language in ISO 639-1 format (2 char)
   */
   constructor(api, lang = 'en') {
    super(api, lang);
  }

  /**
   * Get a collection of a specific content items
   * @param {} type type of collection
   * @param {} filter string in Mongo Query sintax
   * @returns 
   */
    getItems(type){
    var url = super.urlCollectionContents + "/" + type
    return super.request(url)
  }

  /**
   * Get specific content item by the ID
   * @param {*} type type of the collection
   * @param {*} id id of the item
   * @returns 
   */
  getItem(type, id){
    var url = super.urlContent + "/" + type + "/" + id;
    return super.request(url);
  }

  /**
   * Get one or more content items by an attribute
   * @param {*} type type of the collection
   * @param {*} attr value of the attribute
   * @param {*} attr_name name of the attribute (default = name)
   * @returns 
   */
  getItemByAttr(type, attr, attr_name='name'){
    var url = super.urlCollectionContents + "/" + + "?filter=" + getFilter(attr_name, attr);
    return super.request(url);
  }

}

class PardoMAP extends PardoGET {
  //API MapBox
  mapBoxApi = '';
  //Attribuzione mappa
  attrMap = '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>© <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap contributors</a>';
  urlMapbox = 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token=';
  //Coordinate centrali di default (Locarno)
  centerLat = '46.1623';
  centerLon = '8.7786';
  zoom = '14';
  //Durata animazioni
  duration = 1000; // 1 secondo durata animazione per interazioni
  //Icona marker di default
  defaultIcon = 'https://assets.locarnofestival.ch/data/web-tools/ico-locate.png';
  //Tipo di modello di default da CMS
  typeData = 'poi';


  /**
   * Costruttore, se non inserisco gli attributo centerLat e centerLon la mappa viene centrata su Locarno
   * @param {*} api API Cocpit CMS
   * @param {*} mapBoxApi API Mapbox
   * @param {*} lang language in ISO 639-1 format (2 char)
   */
  constructor(api, mapBoxApi, lang = 'en') {
    super(api, lang);
    this.mapBoxApi = mapBoxApi;
  }

  /**
   * Setter per variare i comportamenti standard di PardoMAP
   */
  setCenterLat (lat){
    this.centerLat = lat;
  }

  setCenterLon(lon){
    this.centerLon = lon;
  }

  setZoom(zoom){
    this.zoom = zoom;
  }

  setDuration(duration){
    this.duration = duration;
  }

  setDefaultIcon(iconUrl){
    this.defaultIcon = iconUrl;
  }

  setTypeData(type){
    this.typeData = type;
  }

  setTarget(target){
    this.target = target;
  }

  /**
   * Creo l'oggetto mappa e lo pubblico
   * @param {*} target ID del contenitore in cui verrà pubblicata la mappa
   */
  getMap(target){
    var map = new ol.Map({
      //Disabilito rotellina, mantenendo il pinch
      interactions: ol.interaction.defaults({mouseWheelZoom: false}).extend([
          new ol.interaction.MouseWheelZoom({
              condition: ol.events.condition.platformModifierKeyOnly,
          }),
      ]),
      layers: [
      new ol.layer.VectorTile({
          declutter: true,
          source: new ol.source.VectorTile({
              attributions: this.attrMap,
              format: new ol.format.MVT(),
              url: this.urlMapbox + this.mapBoxApi,
              }),
              style: createMapboxStreetsV6Style(ol.style.Style, ol.style.Fill, ol.style.Stroke, ol.style.Icon, ol.style.Text)
          })
      ],
      target: target,
      view: new ol.View({
        center: ol.proj.fromLonLat([this.centerLon, this.centerLat]),
        zoom: this.zoom,
      })
    });
    //Setto durata animazione dello zoom con i vari metodi di input 
    map.addControl(new ol.control.Zoom({
      duration: this.duration
    }));
    map.addInteraction(new ol.interaction.DoubleClickZoom({
        duration: this.duration
    }));
    map.addInteraction(new ol.interaction.KeyboardZoom({
        duration: this.duration
    }));

    this.map = map;
  }

  /**
   * Aggiungo un singolo POI
   * @param {*} id 
   * @param {*} icon 
   */
  addSinglePoi(id, icon = this.defaultIcon){
    super.getItem(this.typeData, id).then((data) => {
      var layer = this.addMarker(data, icon);
      this.map.addLayer(layer);
    });
  }
  
  /**
   * Aggiungo più poi
   * @param {*} type tipo del POI (es Venue)
   * @param {*} icon url per l'icona del marker
   */
  addPois(type = this.typeData , icon = this.defaultIcon){
    super.getItems(this.typeData).then((data) => {
      data.forEach((el) => {
        var layer = this.addMarker(el, icon);
        this.map.addLayer(layer);  
      });
      this.addPopups();
    });
  }


  /**
   * Crea i marker con gli attributi provenienti da un array, restituisce un oggetto 'Layer' da applicare alla mappa
   * @param {*} value array di attributi del POI (singolo POI!!!)
   * @param {*} icon immagine del marker
   * @returns 
   */
  addMarker(value, icon = this.defaultIcon){
    var layer = new ol.layer.Vector({
      source: new ol.source.Vector({
          features: [
              //Imposto attributi per ogni marker da utilizzare nei popup
              new ol.Feature({
                  geometry: new ol.geom.Point(ol.proj.fromLonLat([value.coord.lon, value.coord.lat])),
                  category: value.category,
                  name: value.name,
                  street: value.street,
                  cap: value.cap,
                  city: value.city,
                  lon: value.coord.lon,
                  lat: value.coord.lat,
                  npark: value.npark,
                  description: value.description,
                  tech_details: value.tech_details,
                  acc_details: value.acc_details,
                  seat: value.seat,
                  page_url: value.page_url,
                  pic_url: value.pic_url[0],
                  custom_text: value.custom_text
                })
              ]
          }),
         style: new ol.style.Style({
             image: new ol.style.Icon({
             anchor: [0.5, 1],
             src: icon
             })
         }),
 
     });
     return layer;
  }

  /**
   * Aggiungi gli eventi di popup
   */
  addPopups(){    
    this.map.on('click', function (evt) {
      //Ricupero attributi del punto cliccato
      const feature = this.forEachFeatureAtPixel(evt.pixel, function (feature) {
          return feature;
      });      
      //Se il punto cliccato possiede l'attr 'nome' allora è un POI
      if (feature && feature.get('category')) {
          //Lancio evento di apertura popup con i dati di ciò che ho cliccato
          const eventOpenPopup = new CustomEvent('openPopup', { detail: feature });
          document.dispatchEvent(eventOpenPopup);
      } else{
          //Se clicco in un posto a caso sulla mappa, chiudo il tooltip
          const eventClosePopup = new CustomEvent('closePopup');
          document.dispatchEvent(eventClosePopup);
      }
  });
  // Chiudo il tooltip se muovo la mappa
  this.map.on('movestart', function () {
    const eventClosePopup = new CustomEvent('closePopup');
    document.dispatchEvent(eventClosePopup);
  });
  }

}

