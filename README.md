
# PardoAPI
Questa serie di classi servono a dialogare con il CMS headless di Locarno Film Festival

## Le classi in breve
### PardoGET
Classe per il recupero delle informazioni, sottoforma di JSON, da Cockpit CMS
### PardoMAP
Classe per la creazione di mappe (ha bisogno librerie esterne per funzionare)
### PardoAPI (solo di servizio)
Classe principale con i metodi base per interfacciarsi a Cockpit CMS

## Esempi
### Recuperare informazioni
La libreria si appoggia sulle promise asincrone, per questo è necessrio usare .then() per fornire i dati
```
var api = new PardoGET(API-CMS);
api.getItems('poi').then((value) => {
      //Array dei POI
      console.log(value);
})
```
### Creare una mappa
#### Libreria da includere per caricare la mappa
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/simonevannuccipardo/PardoAPI/src/style.css">
<script src="https://cdn.jsdelivr.net/gh/simonevannuccipardo/PardoAPI/src/theme.js"></script>
<script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/build/ol.js"></script>
```
#### Html da includere
La larghezza sia l'altezza iniziale del tag devono essere impostate via CSS
```
<div id="map"></div>
```
#### Crea una mappa con tutte le venue di LLF
```
var map = new PardoMAP(API-CMS, API-APBOX);
map.getMap('map');
map.addPois();
```

## Documentazione
### PardoAPI
Classe principale con i medodi base per interfacciarsi a Cockpit CMS

| Metodo  | Args | Descrizione | Return |
| ------------- | ------------- | ------------- | ------------- |
| request  | (url, method)  | Richiesta generica al CMS  | -  |
| getFilter  | (attr_name, mane)  | Restituisce filtro formattato per l'url  | Stringa con filtro  |
| getLocale  | ()  | Recupera l'attr lingua fornmattato per l'url  | -  |
| getAssets  | ()  | Recupera l'url assets formattato  | -  |
| getimage  | ()  | Recupera l'url immagini formattato  | -  |
| urlCollectionContents  | ()  | Recupera l'url di una collection formattato  | -  |
| urlContent  | ()  | Recupera l'url di un content formattato  | -  |

#### Costruttore new PardoAPI(api)

| Parametro  | Descrizione |
| ------------- | ------------- |
| api  | API key data dal CMS |
| lang  | lingua dei conteunti in formato ISO 639-1 (a 2 lettere), default inglese |

Istanzia la classe prendendo in argomento la api di Cockpit CMS
#### request(url, method = 'GET')

| Parametro  | Descrizione |
| ------------- | ------------- |
| url  | url di richiesta |
| method  | metodo (GET, POST,...) |

@returns richiesta<br>
Metodo *asincrono* generico di richiesta API di Cockpit CMS, tutte le richieste si basano su questo metodo

### PardoGET
Classe per il recupero delle informazioni, sottoforma di JSON, da Cockpit CMS. PardoGET estendel la classe PardoAPI

| Metodo  | Args | Descrizione | Return |
| ------------- | ------------- | ------------- | ------------- |
| getItems  | (type)  | Recupera una collezione (es.POI) di dati | JSON contenente i dati  |
| getItem  | (type, id)  | Recupera un solo asset specifico passando l'ID | JSON contenente i dati dell'asset |
| getItemByAttr  | (type, attr, attr_name)  | Recupera un solo asset specifico cercandolo nella collezione di dati attraverso un attributo, di default cerca nell'attributo nome
 | JSON contenente i dati dell'asset |
 
#### Costruttore new PardoGET(api,lang)

| Parametro  | Descrizione |
| ------------- | ------------- |
| api  | API key data dal CMS |
| lang  | lingua dei conteunti in formato ISO 639-1 (a 2 lettere), default inglese |

Istanzia la classe prendendo in argomento la api di Cockpit CMS
#### getItems(type)

| Parametro  | Descrizione |
| ------------- | ------------- |
| type  | tipo di collezione (es. POI) |

Recupera una collezione (es.POI) di dati
#### getItem(type, id)
| Parametro  | Descrizione |
| ------------- | ------------- |
| type  | tipo di collezione (es. POI) |
| id  | id dell'asset |

Recupera un solo asset specifico passando l'ID
#### getItemByAttr(type, attr, attr_name='name') [NON TESTATO]

| Parametro  | Descrizione |
| ------------- | ------------- |
| type  | tipo di collezione (es. POI) |
| attr  | valore dell'attributo |
| attr_name  | nome dell'attributo |

Recupera un solo asset specifico cercandolo nella collezione di dati attraverso un attributo, di default cerca nell'attributo nome

<details><summary>Esempio</summary>
<p>

#### Recupero un poi di nome PalaCinema

```ruby
   var api = new PardoGET(API-CMS);
   var palaCinema = api.getItemByAttr('poi', 'Palacinema', 'name');
```

</p>
</details>

### PardoMAP
Classe per la creazione di mappe (ha bisogno librerie esterne per funzionare)
#### Costruttore new PardoMAP(api, mapBoxApi, lang)
@param {*} api API Cocpit CMS<br>
@param {*} mapBoxApi API Mapbox<br>
@param {*} lang lingua dei conteunti in formato ISO 639-1 (a 2 lettere), default inglese<br>
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

