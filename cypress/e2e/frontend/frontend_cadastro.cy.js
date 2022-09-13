/// <reference types="cypress" />
import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Deve testar a um nível funcional', () => {
    before(() => {
        cy.visit('https://interface-sgp-new-package.vercel.app/')
        cy.get('.MuiBox-root > .MuiButtonBase-root').click()
    })

    it('Deve digitar os dados para cadastrar uma conta',() => {
        cy.get('[name= nomeEmpresa]').type('Wonka')
        cy.get('[name= email]').type('wonka@wonka.com')
        cy.get('[name= cpj]').type('123455555555')
        cy.get('[name= senha]').type('w')
        cy.get('[name= repetirSenha]').type('w')
        cy.get('form > .MuiButtonBase-root').click()
    })
    
    it('Deve selecionar o plano', ( ) => {
        cy.get('.MuiInputBase-input').type('premium')
        cy.get(loc.PLANO.BTN_PLANO).click()
    })
    it('Deve inserir os dados do pagamento e finalizar cadastro', () => {
        cy.get('[name=numeroDoCartao]').type('2545345645344')
        cy.get('[name=dataVencimento]').type('02/2025')
        cy.get('[name=cpf]').type('191.454.456.45')
        cy.get('[name=csv]').type(123)
        cy.get('[name=nomeCompleto]').type('Martin Silva')
        cy.get(':nth-child(3) > .MuiButtonBase-root').click()
        cy.get('.MuiButton-contained').click()
    })

})