/// <reference types="cypress" />
import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Deve testar a um nível funcional', () => {

    beforeEach(() => {
        cy.visit('https://interface-sgp-new-package.vercel.app/')
    })

    it('Deve fazer login', () => {
        cy.login('a@a.com', 'a')
    })

    it('Não deve fazer login com um email incorreto', () => {
        cy.get('#email').type('asdasd@sads.com')
        cy.get('#password').type('a')
        cy.get('form > .MuiButton-root').click()
        cy.get(loc.LOGIN.MESSAGE).should('contain', 'email ou senha incorretos')
    })

    it('Não deve fazer login com campos em branco', () => {
        cy.get(loc.LOGIN.BTN_LOGIN).click()
        cy.xpath("//body//div//span[contains(., 'Email obrigat')]").should('contain','Email obrigatorio' )
        cy.xpath("//body//div//span[contains(., 'Email obrigat')]//following-sibling::span[contains(., 'Senha obrigatória')]").should('contain', 'Senha obrigat')
    })

    it.skip('Não deve fazer login com uma senha incorreta', () => {
        cy.get('#email').type('a@a.com')
        cy.get('#password').type('a')
        cy.get('form > .MuiButton-root').click()
        cy.get(loc.LOGIN.MESSAGE).should('contain', 'email ou senha incorretos')
    })

})