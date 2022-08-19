/**
 * Pardo API si occupa di gestire le richiesta di dati da Cockpit
 */

class PardoAPI {
  
  url = 'https://content.locarnofestival.ch/api';
  content = '/content';
  item = '/item';
  items = '/items'
  assets = '/assets';
  image = this.assets + '/image';
  headerApi = "api-key";
  api ="";

  /**
   * Costruttore
   * @param {*} api api key
   */
  constructor(api) {
    this.api = api;
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

  /**
   * Getter per ricreare i vari endpoint
   */
  get urlAssets(){
    return this.url + this.assets;
  }

  get urlImage(){
    return this.urlAssets * this.image;
  }

  get urlCollectionContents(){
    return this.url + this.content + this.items;
  }

  get urlContent(){
    return this.url + this.content + this.item;
  }

  getFilter(attr_name, name){
    return "{" + attr_name + ":\"" + name + "\"}";
  }

  /**
   * Get a collection of a specific content items
   * @param {} type type of collection
   * @param {} filter string in Mongo Query sintax
   * @returns 
   */
  getItems(type){
    var url = this.urlCollectionContents + "/" + type
    return this.request(url)
  }

  /**
   * Get specific content item by the ID
   * @param {*} type type of the collection
   * @param {*} id id of the item
   * @returns 
   */
  getItem(type, id){
    var url = this.urlContent + "/" + type + "/" + id;
    return this.request(url);
  }

  /**
   * Get one or more content items by an attribute
   * @param {*} type type of the collection
   * @param {*} attr value of the attribute
   * @param {*} attr_name name of the attribute (default = name)
   * @returns 
   */
  getItemByAttr(type, attr, attr_name='name'){
    var url = this.urlCollectionContents + "/" + + "?filter=" + getFilter(attr_name, attr);
    return this.request(url);
  }

}
