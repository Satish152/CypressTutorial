const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    
    },
    env:{
      'environment':"dev",
      "enail":"test@test.com"
    },
    port:4444,
    watchForFileChanges:false,
    downloadsFolder:"",
    videosFolder:"videos",
  //  baseUrl:"https://opensource-demo.orangehrmlive.com/"
  },
});
