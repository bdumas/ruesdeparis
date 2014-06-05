exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.test.js'
  ],

  /*capabilities: {
    'browserName': 'chrome'
  },

  chromeOnly: true,
  
  chromeDriver: '../../node_modules/chromedriver',*/

  baseUrl: 'http://localhost:8282/',
  seleniumAddress: 'http://localhost:4444/wd/hub',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
