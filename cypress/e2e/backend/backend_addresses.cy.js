/// <reference types="cypress" />

let token
before('Pegando token', () => {
    cy.getToken('a@a.com', 'a').then(tkn => {
        token = tkn
    })
})

it('Deve registar um endereço', () => {
    cy.request({
        method: 'POST',
        url: '/addresses',
        body: {
            "userId": "05f3d6d5-cd83-4295-969a-64cfb5513f63",
            "state": "ES",
            "city": "Vitoria",
            "street": "Rua Pai",
            "neighbourhood": "Praia do Canto",
            "number": 1245,
            "complement": "Adii",
            "reference": "Posto"
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).equal(200)

    })
})
