(function () {
    "use strict";
    
    window.onload = function () {
        var reload = document.querySelector("#reload");
        if (reload) {
            reload.onclick = geolocationModule.start();
        }
        
        installModule.setUpInstallButton();
        geolocationModule.start();
    };

})();
