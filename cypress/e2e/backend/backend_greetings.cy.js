/// <reference types="cypress" />

let token
before('Pegando token', () => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(tkn => {
        token = tkn
    })
})

it('Deve testar o endpoint de saudação', () => {
    cy.request({
        method: 'GET',
        url: 'greetings',
        headers: { Authorization : `Bearer ${token}`}
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
    })
})