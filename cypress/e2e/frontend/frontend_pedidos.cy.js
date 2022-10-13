/// <reference types="cypress" />
import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Deve testar a um nível funcional', () => {
    beforeEach(() => {
        cy.login('aa@aa.com', 'aaaaaaaaa')
    })

    it('Deve conseguir clicar nos botões dos cards pedidos', () => {
        cy.get(loc.PEDIDOS.BTN_1ESPERA).click()
        cy.get(loc.PEDIDOS.BTN_1PREPARO).click()
        cy.get(loc.PEDIDOS.BTN_1REVISAO).click()
        cy.get(loc.PEDIDOS.BTM_SELECTSECOND).click()
        cy.get(loc.PEDIDOS.BTN_CANCELAR).click()
        cy.get(loc.PEDIDOS.BTN_SELECT).click()
        cy.get(loc.PEDIDOS.BTN_VISUALIZAR).click()
        //cy.get('.css-q3i1n0 > .css-12jc7j7-MuiTypography-root').should('contain', 'cancelado')
       
    })

})
