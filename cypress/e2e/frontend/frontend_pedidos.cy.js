/// <reference types="cypress" />
import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Deve testar a um nível funcional', () => {
    beforeEach(() => {
        cy.login('a@a.com', 'a')
    })

    it('Deve conseguir clicar nos botões dos cards pedidos', () => {
        cy.get(loc.PEDIDOS.BTN_1ESPERA).click()
        cy.get(loc.PEDIDOS.BTN_1PREPARO).click()
        cy.get(loc.PEDIDOS.BTN_1REVISAO).click()
        cy.get(loc.PEDIDOS.BTN_1ENTREGA).click()
        cy.get(loc.PEDIDOS.BTN_VISUALIZAR).click
    })

})
