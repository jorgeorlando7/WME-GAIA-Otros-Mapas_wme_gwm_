// ==UserScript==
// @name         WME GAIA + Otros Mapas
// @name:es      WME GAIA - Todos al GAIA
// @version      1.2
// @description  WME Ir a GaiaMDM, OpenStreetMap, Google Maps. Redirecciona a la página de cada servicio en la posición actual haciendo clic en la etiqueta de coordenadas de WME.
// @description:es WME Go to GaiaMDM, OpenStreetMap, Google Maps te lleva a la posición en el mapa de cada servicio para que no tengas que hacer tantos clicks.
// @author       GWM_
// @include      https://www.waze.com/editor/*
// @include      https://www.waze.com/*/editor/*
// @include      https://beta.waze.com/*
// @exclude      https://www.waze.com/user/editor*
// @grant        none
// @license      GPLv3
// @namespace https://greasyfork.org/es/users/1362250-gwm
// ==/UserScript==
 
(function() {
    function bootstrap(tries) {
        tries = tries || 1;
        if (window.W && window.W.map && window.W.model && $) {
            init();
        } else if (tries < 1000) {
            setTimeout(function () {bootstrap(tries++);}, 200);
        }
    }
 
    bootstrap();
 
    function init(){
        createLinks();
        console.log("WME G2GMDM + OSM + Maps v1.1 está corriendo.");
    }
 
    // Crea enlaces tanto para Gaia como para OpenStreetMap, Google Maps
    function createLinks(){
        createLinkGaia();
        createLinkOSM();
        createLinkGoogleMaps();
    }
 
    // Agrega enlace a Gaia
    function createLinkGaia(){
        const $gaiaLink = $("<a href='#' data-toggle='tooltip' title='Ir a Gaia'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAINSURBVDhPnZPfS1NhGMcf6A8QgpIVpczN82vKCCyoLvpxWdRutMn5uTGhvJEoiIl0kxeDLOqiKBqSsKCrrIyCJhGlIl14IavAMFs4IU3BmIUz9+054w3GcKF94L047/t8v+f7Puc5VBVZ95Bih0ixukhxoiQ7+8TJJtCcTvLpX8lrgBrcZYJ2t6+SbKZI7vCIqipoVjf5LHiOX8SlW4MYHn+P/icjOBS7CpKjIMmaoGZjp6iuQLWDVNe+5j8Rx0xuHuX8LhYRS6RAfhukmNeFogLF6CPJwY1HI3g9vYJnk9+R/rCIpZVCySRfKMB/qgdU3zZHgXCtUJXREE5vP3oBw5lZJMe+4Vo6i97nMxiaXCgZ/FoDTncnQXtD66TpLUJVhi/8quZwF95+nMXSz3VkcnlcfjqNHl73x+fwYuoHQvF7oLpqBrJ50+347cE3pTe6vPuyjP6xHB5OLCC7mId0Ms4JwvMkRXcJVRmqtZ/8erH2yHmMZj4Li78UEe0dAPm4iaqVFIoN0OyE2+mag504m3iAgaFR9KVeosW4wmKeh0b7E8/JHlG9Aa2t29jkMckRvmsbd/yM23WQVwfvL/OXOiAq/0EwsoM0c4qaYm5cFjqgAA+RauuiYhOozjFq1AsU4CTNHWxi3BEnW0Ax71LwnJsgW0q1ZSS7nqOv8jXiYuc/0Ph3bop4xVMFRH8AgigQaceEwpQAAAAASUVORK5CYII=' width='20px' height='20px' align='left' hspace='2' vspace='2'></a>");
        $gaiaLink[0].onclick = go2GMDM;
        $(".WazeControlPermalink").append($gaiaLink);
    }
 
    // Abre Gaia en la posición actual
    function go2GMDM(){
        const link = $(".permalink")[0].href;
        const lat = getQueryString(link, 'lat');
        const lon = getQueryString(link, 'lon');
        const zoom = getQueryString(link, 'zoom');
 
        if (lat && lon && zoom) {
            const encodedCoords = btoa(`lat:${lat},lon:${lon},z:${parseInt(zoom)+8}`);
            window.open(`http://gaia.inegi.org.mx/mdm6/?v=${encodedCoords}`);
        } else {
            alert("Error: Coordenadas no encontradas.");
        }
    }
 
    // Agrega enlace a OpenStreetMap
    function createLinkOSM(){
        const $osmLink = $("<a href='#' data-toggle='tooltip' title='Ir a OpenStreetMap'><img src='https://www.openstreetmap.org/assets/osm_logo-4b074077c29e100f40ee64f5177886e36b570d4cc3ab10c7b263003d09642e3f.svg' width='20px' height='20px' align='left' hspace='2' vspace='2'></a>");
        $osmLink[0].onclick = go2OSM;
        $(".WazeControlPermalink").append($osmLink);
    }
 
    // Abre OpenStreetMap en la posición actual
    function go2OSM(){
        const link = $(".permalink")[0].href;
        const lat = getQueryString(link, 'lat');
        const lon = getQueryString(link, 'lon');
 
        if (lat && lon) {
            window.open(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}&zoom=14`);
        } else {
            alert("Error: Coordenadas no encontradas.");
        }
    }
 
 // Agrega enlace a Google Maps
    function createLinkGoogleMaps(){
        const $googleMapsLink = $("<a href ='#' data-toggle='tooltip' title='Ir a Google Maps'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn5uDUFPgf7p8SojaD68ZbRm5bGqrR94Ps-A&s' width='20px' height='20px' align='left' hspace='2' vspace='2'></a>");
        $googleMapsLink[0].onclick = go2GoogleMaps;
        $(".WazeControlPermalink").append($googleMapsLink);
    }
 
    // Abre Google Maps en la posición actual
    function go2GoogleMaps(){
        const link = $(".permalink")[0].href;
        const lat = getQueryString(link, 'lat');
        const lon = getQueryString(link, 'lon');
 
        if (lat && lon) {
            window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`);
        } else {
            alert("Error: Coordenadas no encontradas.");
        }
    }
 
    // Función para obtener los parámetros del permalink
    function getQueryString(link, name){
        const pos = link.indexOf( name + '=' ) + name.length + 1;
        const len = link.substr(pos).indexOf('&');
        if (len === -1) return link.substr(pos);
        return link.substr(pos,len);
    }
})();
