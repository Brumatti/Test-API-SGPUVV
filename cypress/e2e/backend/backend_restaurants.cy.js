/// <reference types="cypress" />

let token
before('Pegando token', () => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(tkn => {
        token = tkn
    })
})
after('Criando o restaurante deletado', () => {
    cy.request({
        method: 'POST',
        url: 'restaurants',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            "orderId": "5f26137e-bfde-4550-bc0d-a05021b87f67",
            "restaurantName": "Xico",
            "restaurantEmail": "xico@xico.com",
            "cnpj": "12312321",
            "password": "abcabcabc",
            "pix": "string"
        }
    })
})


it('Deve testar o endpoint GET de restaurante', () => {
    cy.request({
        method: 'GET',
        url: 'restaurants',
        headers: { Authorization: `Bearer ${token}` },
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Restaurants fetched successfully')
    })
})

it.skip('Deve testar o endpoint POST de restaurante', () => {
    cy.request({
        method: 'POST',
        url: 'restaurants',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            "orderId": "5f26137e-bfde-4550-bc0d-a05021b87f67",
            "restaurantName": "Xico",
            "restaurantEmail": "xico@xico.com",
            "cnpj": "12312321",
            "password": "abcabcabc",
            "pix": "string"
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(201)
        expect(res.body.message).eq('Restaurant created successfully')
    })
})

it('Deve testar o endpoint GET ID de restaurante', () => {
    cy.getIdRest('Xico').then(id => {
        cy.request({
            method: 'GET',
            url: `restaurants/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Restaurant fetched successfully')
            expect(res.body.data).not.be.null
        })

    })

})

it('Deve testar o endpoint PUT de restaurante', () => {
    cy.getIdRest('Xico').then(id => {
        cy.request({
            method: 'PUT',
            url: `restaurants/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            body: {
                "orderId": "5f26137e-bfde-4550-bc0d-a05021b87f67",
                "restaurantName": "Xico",
                "restaurantEmail": "xico@xico.com",
                "cnpj": "12312321",
                "password": "abcabcabc",
                "pix": "string"
            }
        })
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Restaurant updated successfully')
    })
})

it('Deve testar o endpoint DELETE de restaurante', () => {
    cy.getIdRest('Xico').then(id => {
        cy.request({
            method: 'DELETE',
            url: `restaurants/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Restaurant deleted successfully')
    })
})