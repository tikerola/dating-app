/* eslint-disable no-undef */


describe('find a profile and send mail', function() {

  beforeEach(function() {
    cy.request('DELETE', 'http://localhost:3000/developer')
    cy.visit('http://localhost:3000')

    cy.get('#login-username')
    .type('timo')

    cy.get('#password')
    .type('123456')

    cy.get('#login')
    .click()

  })

  it('should find a profile and send mail', function() {

    cy.contains('Search')
    .click()

    cy.get('#search1')
    .click()

    cy.contains('hanna')
    .click()

    cy.contains('Send Mail')
    .click()

    cy.get('#title')
    .type('moi')

    cy.get('#text')
    .type('oot söpö')

    cy.get('#send')
    .click()

    cy.contains('Sent mail')
    .click()

    cy.contains('moi')
    .click()

    cy.get('#logout')
    .click()

    cy.get('#login-username')
    .type('hanna')

    cy.get('#password')
    .type('123456')

    cy.get('#login')
    .click()

    
  })


})
