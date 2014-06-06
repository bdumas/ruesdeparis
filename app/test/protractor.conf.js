exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'e2e/*.test.js'
    ],

    seleniumAddress: 'http://localhost:4444/wd/hub',
    
    framework: 'jasmine',
  
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },
      
    onPrepare: function() {
        var ptor = protractor.getInstance();
        ptor.elem = ptor.findElement;
        ptor.elems = ptor.findElements;
        global.by = protractor.By;
        global.ptor = ptor;
    }
};
