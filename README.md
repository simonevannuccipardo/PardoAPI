
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
#### getItemByAttr(type, attr, attr_name='name') [NON TESTATO]
@param {*} tipo di collezione<br>
@param {*} attr valore dell'attributo<br>
@param {*} attr_name nome dell'attributo<br>
Recupera un solo asset specifico cercandolo nella collezione di dati attraverso un attributo, di default cerca nell'attributo nome

### PardoMAP
Classe per la creazione di mappe (ha bisogno librerie esterne per funzionare)
#### Costruttore new PardoMAP(api, mapBoxApi)
@param {*} api API Cocpit CMS<br>
@param {*} mapBoxApi API Mapbox<br>
Istanzia la classe
#### setCenterLat (lat)
Modifica la latitudine del centro della mappa
#### setCenterLon(lon)
Modifica la longitudine del centro della mappa
#### setZoom(zoom)
Modifica lo zoom di partenza
#### setDuration(duration)
Modifica la durata delle animazioni sulla mappa
#### setDefaultIcon(iconUrl)
Modifica l'icona di default
#### setTypeData(type)
Modifica la collezione di default
#### getMap(target)
@param {*} target ID del contenitore in cui verrà pubblicata la mappa<br>
Crea e pubblica la mappa usando l'ID passato in argomento, se non cambiato precedenetemnte il centro sarà su locarno
