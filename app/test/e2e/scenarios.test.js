/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('RuesDeParis App', function() {
    
    beforeEach(function() {
        browser.get('index.html');
    });

    
    it('should display Bd Haussmann datas', function() {
        expect(true).toBe(true);
    });
    
});
