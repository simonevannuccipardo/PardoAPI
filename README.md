
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
| getItemByAttr  | (type, attr, attr_name)  | Recupera un solo asset specifico cercandolo nella collezione di dati attraverso un attributo, di default cerca nell'attributo nome | JSON contenente i dati dell'asset |
 
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

```
   var api = new PardoGET(API-CMS);
   var palaCinema = api.getItemByAttr('poi', 'Palacinema', 'name');
```

</p>
</details>

### PardoMAP
Classe per la creazione di mappe (ha bisogno librerie esterne per funzionare)

| Metodo  | Args | Descrizione | Return |
| ------------- | ------------- | ------------- | ------------- |
| setCenterLat  | (latitudine)  | Modifica la latitudine del centro della mappa | - |
| setCenterLon  | (longitudine)  | Modifica la longitudine del centro della mappa | - |
| setZoom  | (valore da 0 a 15)  | Modifica lo zoom di partenza | - |
| setDuration  | (millisecondi)  | Modifica la durata delle animazioni sulla mappa | - |
| setDefaultIcon  | (url icona)  | Modifica l'icona di default | - |
| setTypeData  | (type)  | Modifica la collezione di default | - |
| getMap  | (id html tag)  | Crea e pubblica la mappa usando l'ID passato in argomento, se non cambiato precedenetemnte il centro sarà su locarno | - |
| addSinglePoi  | (id, icon(opzionale))  | Aggiungo un singolo poi, se *icon* non impostato prende quella di default | - |
| addPois  | (type(opzionale), icon(opzionale))  | Aggiungo una collezione di POI alla mappa, se *type* e *icon* non impostati prende quella di default) | - |
| addMarker  | (value, icon(opzionale))  | Metodo per la creazione generica di POI. Crea i marker con gli attributi provenienti da un array, restituise un oggetto 'Layer' da applicare alla mappa, se *icon* non impostato prende quella di default | - |
| addPopup  | ()  | Questa classe crea degli eventi personalizzati per l'apertura e la chiusura di tooltip sui marker. | - |

#### Costruttore new PardoMAP(api, mapBoxApi, lang)
| Parametro  | Descrizione |
| ------------- | ------------- |
| api  | API key data dal CMS |
| mapBoxApi  | API key di MapBox |
| lang  | lingua dei conteunti in formato ISO 639-1 (a 2 lettere), default inglese |

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

| Metodo  | Args | Descrizione | Return |
| ------------- | ------------- | ------------- | ------------- |
| id  | (id html tag)  | Target ID del contenitore in cui verrà pubblicata la mappa | - |

Crea e pubblica la mappa usando l'ID passato in argomento, se non cambiato precedenetemente il centro sarà su locarno
#### addSinglePoi(id, icon = this.defaultIcon)

| Metodo  | Args | Descrizione | Return |
| ------------- | ------------- | ------------- | ------------- |
| id  | (id)  | id ID dell'asset | - |
| icon  | (url icona(opzionale))  | icon icona del marker (se non impostato prende quella di default) | - |

Aggiungo un singolo poi
#### addPois(type = this.typeData , icon = this.defaultIcon)

| Metodo  | Args | Descrizione | Return |
| ------------- | ------------- | ------------- | ------------- |
| type  | (type(opzionale))  | tipo del poi (es Venue), se non impostato prende quello di default | - |
| icon  | (url icona(opzionale))  | icon icona del marker, se non impostato prende quella di default | - |

Aggiungo una collezione di POI alla mappa
#### addMarker(value, icon = this.defaultIcon)

| Metodo  | Args | Descrizione | Return |
| ------------- | ------------- | ------------- | ------------- |
| value  | (array)  | array di attributi per creare un POI (singolo POI!!!) | - |
| icon  | (url icona(opzionale))  | icon icona del marker (se non impostato prende quella di default) | - |

Metodo per la creazione generica di POI. Crea i marker con gli attributi provenienti da un array, restituise un oggetto 'Layer' da applicare alla mappa.
Si può usare questo metodo per inserire marker che non provengono dal CMS, l'array value deve essere contenere i seguenti dati:

<details><summary>Dati da inserire in value</summary>
<p>

| valore  | obbligatorio | Descrizione |
| ------------- | ------------- | ------------- |
| coord  | Si | Array contenente lat e lon |
| coord.lon  | Si | Longitudine |
| coord.lat  | Si | Latitudine |
| category  |  | Categoria POI |
| name  |  | - |
| street  |  | - |
| cap  |  | - |
| city  |  | - |
| npark  |  | Numero parcheggi |
| description  |  | - |
| tech_details  |  | - |
| acc_details  |  | - |
| seat  |  | Array posti a sedere |
| page_url  |  | Url esterno |
| pic_url  |  | Url dell'immagine |
| custom_text |  | - |

</p>
</details>

#### addPopups()
Questa classe crea degli eventi personalizzati per l'apertura e la chiusura di tooltip sui marker.

| evento  | Trigger |Descrizione | Valori |
| ------------- | ------------- | ------------- | ------------- |
| openPopup | Click sul marker | Evento che segnala il click sul marker | Array di valori del marker cliccato |
| closePopup | Clik non su marker, sposto mappa, zoom mappa | Evento segna la richieta di chiusura del popup | - |
