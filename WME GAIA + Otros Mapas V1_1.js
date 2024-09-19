// ==UserScript==
// @name         WME GAIA
// @name:es      WME GAIA - Todos al GAIA
// @version      1.0
// @description  WME Ir a GaiaMDM. Redirecciona a la página de GAIA MDM en la posición actual haciendo clic en la etiqueta de coordenadas de WME.
// @description:es WME Go to GaiaMDM - Todos al GAIA te lleva a la posicion en el mapa de GAIA pa que no tengas que hacer tantos clicks.
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
        createLink();
        console.log("WME G2GMDM v1.2 is running.");
    }
 
    // Function to append the link to Gaia in the WME UI
    function createLink(){
        const $a = $("<a href='#' data-toggle='tooltip' title='Ir a Gaia'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAINSURBVDhPnZPfS1NhGMcf6A8QgpIVpczN82vKCCyoLvpxWdRutMn5uTGhvJEoiIl0kxeDLOqiKBqSsKCrrIyCJhGlIl14IavAMFs4IU3BmIUz9+054w3GcKF94L047/t8v+f7Puc5VBVZ95Bih0ixukhxoiQ7+8TJJtCcTvLpX8lrgBrcZYJ2t6+SbKZI7vCIqipoVjf5LHiOX8SlW4MYHn+P/icjOBS7CpKjIMmaoGZjp6iuQLWDVNe+5j8Rx0xuHuX8LhYRS6RAfhukmNeFogLF6CPJwY1HI3g9vYJnk9+R/rCIpZVCySRfKMB/qgdU3zZHgXCtUJXREE5vP3oBw5lZJMe+4Vo6i97nMxiaXCgZ/FoDTncnQXtD66TpLUJVhi/8quZwF95+nMXSz3VkcnlcfjqNHl73x+fwYuoHQvF7oLpqBrJ50+347cE3pTe6vPuyjP6xHB5OLCC7mId0Ms4JwvMkRXcJVRmqtZ/8erH2yHmMZj4Li78UEe0dAPm4iaqVFIoN0OyE2+mag504m3iAgaFR9KVeosW4wmKeh0b7E8/JHlG9Aa2t29jkMckRvmsbd/yM23WQVwfvL/OXOiAq/0EwsoM0c4qaYm5cFjqgAA+RauuiYhOozjFq1AsU4CTNHWxi3BEnW0Ax71LwnJsgW0q1ZSS7nqOv8jXiYuc/0Ph3bop4xVMFRH8AgigQaceEwpQAAAAASUVORK5CYII=' width='20px' height='20px' align='left' hspace='2' vspace='2'></a>");
        $a[0].onclick = go2GMDM;
        $(".WazeControlPermalink").append($a);
    }
 
    // Function to open Gaia with the current WME coordinates
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
 
    // Function to get specific query string parameters from the permalink
    function getQueryString(link, name){
        const pos = link.indexOf( name + '=' ) + name.length + 1;
        const len = link.substr(pos).indexOf('&');
        if (len === -1) return link.substr(pos);
        return link.substr(pos,len);
    }
})();
