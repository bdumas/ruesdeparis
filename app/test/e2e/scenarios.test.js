describe('RuesDeParis App', function() {
    
    beforeEach(function() {
        ptor.driver.get('http://localhost:8282/index.html');
    });
    
    it('should display Rues de Paris in title', function() {
        var title = ptor.driver.getTitle();
        expect(title).toBe('Rues de Paris');

        var h1 = ptor.driver.findElement(By.tagName('h1')).getText();
        expect(h1).toBe('Rues de Paris');
    });
    
    describe('Geolocation', function() {
        
        function mockGeo(lat, lon) {
            return 'window.navigator.geolocation.getCurrentPosition = ' +
                '       function (success, error) {' +
                '           var position = {' +
                '               "coords" : {' +
                '                   "latitude": "' + lat + '",' +
                '                   "longitude": "' + lon + '"' +
                '               }' +
                '           };' +
                '           success(position);' +
                '       }';
        }

        function mockGeoError(code) {
            return 'window.navigator.geolocation.getCurrentPosition = ' +
                '       function (success, error) {' +
                '           var err = {' +
                '               code: ' + code + ',' +
                '               PERMISSION_DENIED: 1,' +
                '               POSITION_UNAVAILABLE: 2,' +
                '               TIMEOUT: 3' +
                '           };' +
                '           error(err);' +
                '       }';
        }
        
        describe('Non localized', function() {
            
            beforeEach(function(done) {
               browser.executeScript(mockGeoError(1));
               ptor.driver.findElement(By.id('reload')).click();
               setTimeout(function() {
                   done();
               }, 5000);

            });
            
            it('should display an error when the user location is unknown', function(done) {
                var errorMsg = ptor.driver.findElement(By.id('error')).getText();
                expect(errorMsg).toBe('Cette application ne fonctionne qu\'à Paris.');
                done();
            });
            
        });

        describe('Outside Paris', function() {
        
            beforeEach(function(done) {
               browser.executeScript(mockGeo(36.149674, -86.813347));
               ptor.driver.findElement(By.id('reload')).click();
               setTimeout(function() {
                   done();
               }, 5000);

            });
            
            it('should display an error when the user is not located in Paris', function(done) {
                var errorMsg = ptor.driver.findElement(By.id('error')).getText();
                expect(errorMsg).toBe('Cette application ne fonctionne qu\'à Paris.');
                done();
            });
            
        });
        
        describe('Bd Haussmann', function() {

            beforeEach(function(done) {
                browser.executeScript(mockGeo(48.875088, 2.311088));
                ptor.driver.findElement(By.id('reload')).click();
                setTimeout(function() {
                    done();
                }, 5000); 
             });
             
             it('should display Bd Haussmann infos', function(done) {
                 var streetName = ptor.driver.findElement(By.id('result-streetName')).getText();
                 expect(streetName).toBe('Boulevard Haussmann');
                 done();
             });
        });
        
        describe('Rue Casimir Périer', function() {

            beforeEach(function(done) {
                browser.executeScript(mockGeo(48.857416, 2.319027));
                ptor.driver.findElement(By.id('reload')).click();
                setTimeout(function() {
                    done();
                }, 5000); 
             });
             
             it('should display Rue Casimir Périer infos', function(done) {
                 var streetName = ptor.driver.findElement(By.id('result-streetName')).getText();
                 expect(streetName).toBe('Rue Casimir Périer');
                 done();
             });
        });

    });
    
});
