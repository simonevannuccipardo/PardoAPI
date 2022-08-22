
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
´´´
    var map = new PardoMAP([API-CMS], [API-,APBOX]);
    map.getMap('map');
    map.addPois();
´´´

