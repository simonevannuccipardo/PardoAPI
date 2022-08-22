
# PardoAPI
Questa serie di classi servono a dialogare con il CMS headless di Locarno Film Festival

## Le classi
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
#### Costruttore
@param {*} api api key<br>
Istanzia la classe prendendo in argomento la api di Cockpit CMS
#### request
@param {*} url url di richiesta<br>
@param {*} method metodo (GET, POST,...)<br>
@returns richiesta<br>
Metodo generico di richiesta API di Cockpit CMS, tutte le richieste si basano su questo metodo

