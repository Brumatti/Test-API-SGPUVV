/// <reference types="cypress" />

let token
before('Pegando token', () => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(tkn => {
        token = tkn
    })
})

after('Criando o produto deletado', () => {
    cy.request({
        method: 'POST',
        url: 'products',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            "orderId": "5f26137e-bfde-4550-bc0d-a05021b87f67",
            "restaurantName": "test",
            "restaurantEmail": "test",
            "productName": "paçoca",
            "description": "albla",
            "price": 2,
            "cnpj": "1239424",
            "password": "test",
            "pix": "true"
        }
    })
})

it('Deve testar o endpoint GET de produtos', () => {
    cy.request({
        method: 'GET',
        url: 'products',
        headers: { Authorization: `Bearer ${token}` },
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Products fetched successfully')
        expect(res.body.data).not.be.empty
    })
})

it.skip('Deve testar o endpoint POST de produtos', () => {
    cy.request({
        method: 'POST',
        url: 'products',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            "orderId": "5f26137e-bfde-4550-bc0d-a05021b87f67",
            "restaurantName": "test",
            "restaurantEmail": "test",
            "productName": "paçoca",
            "description": "albla",
            "price": 2,
            "cnpj": "1239424",
            "password": "test",
            "pix": "true"
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(201)
        expect(res.body.message).eq('Product created successfully')
        expect(res.body.data).not.be.empty
    })
})

it('Deve testar o endpoint GET ID de produtos', () => {
    cy.getIdProducts('paçoca').then(id => {
        cy.request({
            method: 'GET',
            url: `products/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Product fetched successfully')
            expect(res.body.data).not.be.empty
        })

    })

})

it('Deve testar o endpoint PUT de produtos', () => {
    cy.getIdProducts('paçoca').then(id => {
        cy.request({
            method: 'PUT',
            url: `products/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            body: {
                "orderId": "5f26137e-bfde-4550-bc0d-a05021b87f67",
                "restaurantName": "test",
                "restaurantEmail": "test",
                "productName": "paçoca",
                "description": "albla",
                "price": 2,
                "cnpj": "1239424",
                "password": "test",
                "pix": "true"
            }
        })
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Product updated successfully')
        expect(res.body.data).not.be.empty

    })
})

it('Deve testar o endpoint DELETE de produtos', () => {
    cy.getIdProducts('paçoca').then(id => {
    cy.request({
        method: 'DELETE',
        url: `products/${id}`,
        headers: { Authorization: `Bearer ${token}` },
    })
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Product deleted successfully')
    })
})