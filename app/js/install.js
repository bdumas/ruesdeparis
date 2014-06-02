var installModule = (function () {
    "use strict";

    function setUpInstallButton() {
        if (navigator.mozApps) {
            var checkIfInstalled = navigator.mozApps.getSelf();
            checkIfInstalled.onsuccess = function () {
                if (!checkIfInstalled.result) {
                    var install = document.querySelector("#install"),
                        manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
                    install.className = "show-install";
                    install.onclick = function () {
                        var installApp = navigator.mozApps.install(manifestURL);
                        installApp.onsuccess = function() {
                            install.style.display = "none";
                        };
                        installApp.onerror = function() {
                            alert("Install failed\n\n:" + installApp.error.name);
                        };
                    };
                }
            };
        } else {
            console.log("Open Web Apps not supported");
        }
    }
    
    return {
        setUpInstallButton: setUpInstallButton
    };

})();
