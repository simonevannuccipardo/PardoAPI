
# PardoAPI
Questa serie di classi servono a dialogare con il CMS headless di Locarno Film Festival

## Le classi in breve
### PardoAPI
Classe principale con i medodi base per interfacciarsi a Cockpit CMS
### PardoGET
Classe per il recupero delle informazioni, sottoforma di JSON, da Cockpit CMS
### PardoMAP
Classe per la creazione di mappe (ha bisogno librerie esterne per funzionare)

## Esempi
### Crea una mappa con tutte le venue di LLF
´´´<br>
    var map = new PardoMAP([API-CMS], [API-,APBOX]);<br>
    map.getMap('map');<br>
    map.addPois();<br>
´´´

## Documentazione
### PardoAPI
Classe principale con i medodi base per interfacciarsi a Cockpit CMS
#### Costruttore new PardoAPI(api)
@param {*} api api key<br>
Istanzia la classe prendendo in argomento la api di Cockpit CMS
#### request(url, method = 'GET')
@param {*} url url di richiesta<br>
@param {*} method metodo (GET, POST,...)<br>
@returns richiesta<br>
Metodo *asincrono* generico di richiesta API di Cockpit CMS, tutte le richieste si basano su questo metodo

### PardoGET
Classe per il recupero delle informazioni, sottoforma di JSON, da Cockpit CMS. PardoGET estendel la classe PardoAPI
#### Costruttore new PardoGET(api)
@param {*} api api key<br>
Istanzia la classe prendendo in argomento la api di Cockpit CMS
#### getItems(type)
@param {} type tipo di collezione<br>
Recuoera una collezione (es.POI) di dati
#### getItem(type, id)
@param {*} tipo di collezione<br>
@param {*} id id dell'asset<br>
Recupera un solo asset specifico passando l'ID
#### getItemByAttr(type, attr, attr_name='name')
@param {*} tipo di collezione<br>
@param {*} attr valore dell'attributo<br>
@param {*} attr_name nome dell'attributo<br>
Recupera un solo asset specifico cercandolo nella collezione di dati attraverso un attributo, di default cerca nell'attributo nome
