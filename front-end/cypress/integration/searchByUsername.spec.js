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

  it('should find a profile by username', function() {
    cy.contains('Search')
    .click()

    cy.get('#search-input')
    .type('hanna')

    cy.get('#search2')
    .click()

    cy.contains('hanna')
  })


})