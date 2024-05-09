/// <reference types="cypress" />

describe("This is sample cypress test",()=>{
    beforeEach(()=>{
      // cy.visit("")
      cy.viewport("macbook-15");
      cy.visit("https://www.google.com")
    })

    it("handling new window",()=>{
                cy.get("*[name='q']").click()
                cy.get("*[name='q']").type("Hello World")
                cy.get("*[name='q']").invoke("val").debug()
                 cy.get("*[name='q']").clear()
               cy.get("*[name='q']").type("Hello World 2")
          })
})