import loc from './locators'

Cypress.Commands.add('login', (user, passwd) => {
    cy.visit('https://interface-sgp-new-package.vercel.app/')
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.PASSWORD).type(passwd)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
})