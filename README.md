
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
### Creare una mappa
#### Libreria da includere per caricare la mappa
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/simonevannuccipardo/PardoAPI@main/src/style.css">
<script src="https://cdn.jsdelivr.net/gh/simonevannuccipardo/PardoAPI@main/src/theme.js"></script>
<script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/build/ol.js"></script>
```
#### Crea una mappa con tutte le venue di LLF
```
    var map = new PardoMAP([API-CMS], [API-APBOX]);
    map.getMap('map');
    map.addPois();
```

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
#### addSinglePoi(id, icon = this.defaultIcon)
@param {*} id ID dell'asset<br>
@param {*} icon icona del marker (se non impostato prende quella di default)<br>
Aggiungo un singolo poi
#### addPois(type = this.typeData , icon = this.defaultIcon)
@param {*} type tipo del poi (es Venue)
@param {*} icon url per l'icona del marker
Aggiungo una collezione di POI alla mappa
#### addMarker(value, icon = this.defaultIcon)
@param {*} value array di attributi del POI (singolo POI!!!)<br>
@param {*} icon immagine del marker<br>
Metodo per la creazione generica di POI. Crea i marker con gli attributi provenienti da un array, restituise un oggetto 'Layer' da applicare alla mappa
#### addPopups()
Questa classe crea degli eventi personalizzati per l'apertura e la chiusura di tooltip sui marker.
- evento *openPopup* è l'evento che segnala il click sul marker, porta con se i dettagli del marker cliccato
- evento *closePopup* questo evento segna la richieta di chiusura del popup

