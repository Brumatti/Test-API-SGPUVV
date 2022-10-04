/// <reference types="cypress" />

let token
before('Pegando token', () => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(tkn => {
        token = tkn
    })
})

after('Criando o payment deletado', () => {
    cy.request({
        method: 'POST',
        url: 'payments',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            "name": "CASH",
            "active": true
        }
    })
})

it('Deve testar o endpoint GET de payments', () => {
    cy.request({
        method: 'GET',
        url: 'payments',
        headers: { Authorization: `Bearer ${token}` },
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Payments fetched successfully')
    })
})

it.skip('Deve testar o endpoint POST de payments', () => {
    cy.request({
        method: 'POST',
        url: 'payments',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            "name": "CASH",
            "active": true
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(201)
        expect(res.body.message).eq('Payments created successfully')
    })
})

it('Deve testar o endpoint GET ID de payments', () => {
    cy.getIdPay('CASH').then(id => {
        cy.request({
            method: 'GET',
            url: `payments/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Payment fetched successfully')
        })
    })

})

it('Deve testar o endpoint PUT de payments', () => {
    cy.getIdPay('CASH').then(id => {
        cy.request({
            method: 'GET',
            url: `payments/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            body: {
                "name": "CASH",
                "active": true
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Payment fetched successfully')
        })
    })

})
it('Deve testar o endpoint DELETE de payments', () => {
    cy.getIdPay('CASH').then(id => {
        cy.request({
            method: 'DELETE',
            url: `payments/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        })
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Payment deleted successfully')
    })
})