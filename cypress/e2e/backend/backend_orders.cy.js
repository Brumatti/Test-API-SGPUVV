/// <reference types="cypress" />

let token //variavel global do token
before('Pegando token', () => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa')
        .then(tkn => {
            token = tkn
        })
})

after('Criando o pedido deletado', () => {
    cy.request({
        method: 'POST',
        url: '/orders',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            "userId": "493717c9-4e6d-4aac-90d4-00c0c9deecfa",
            "addressId": "8f4fa19d-e872-4fe0-86c0-a34908f8e44c",
            "solicitationDate": "2022-09-25T18:24:05.534Z",
            "carriedOut": "test123",
            "estimatedDeliveryDate": "2022-09-25T18:24:05.534Z",
            "deliveryDate": "2022-09-25T18:24:05.534Z",
            "price": 10,
            "status": "ACTIVE"
        }

    })

})


describe('Testes de rota de pedido', () => {

    it.skip('Deve criar um pedido', () => {
        cy.getId('aa@aa.com').then(id => {
            cy.request({
                method: 'POST',
                url: 'orders',
                headers: { Authorization: `Bearer ${token}` },
                body: {
                    "userId": `${id}`,
                    "addressId": "8f4fa19d-e872-4fe0-86c0-a34908f8e44c",
                    "solicitationDate": "2022-09-25T18:24:05.534Z",
                    "carriedOut": "test123",
                    "estimatedDeliveryDate": "2022-09-25T18:24:05.534Z",
                    "deliveryDate": "2022-09-25T18:24:05.534Z",
                    "price": 10,
                    "status": "ACTIVE"
                }

            }).as('response')
        })
        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Order created successfully')
            expect(res.body.data.status).eq('ACTIVE')
        })
    })

    it('Listar pedidos', () => {
        cy.request({
            method: 'GET',
            url: '/orders',
            headers: { Authorization: `Bearer ${token}` }

        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Orders fetched successfully')
            expect(res.body.data).to.not.be.empty
        })
    })

    it('Deve procurar por id do pedido', () => {
        cy.getIdOrderByName('test123').then(id => {
            cy.request({
                method: 'GET',
                url: `orders/${id}`,
                headers: { Authorization: `Bearer ${token}` },
            }).as('response')
        })

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Order fetched successfully')
            expect(res.body.data).to.not.be.empty
        })
    })


    it('Deve atualizar um pedido', () => {
        cy.getIdOrderByName('test123').then(id => {
            cy.request({
                method: 'PUT',
                url: `orders/${id}`,
                headers: { Authorization: `Bearer ${token}` },
                body: {
                    "userId": `${id}`,
                    "addressId": "8f4fa19d-e872-4fe0-86c0-a34908f8e44c",
                    "solicitationDate": "2022-09-25T18:24:05.534Z",
                    "carriedOut": "test123",
                    "estimatedDeliveryDate": "2022-09-25T18:24:05.534Z",
                    "deliveryDate": "2022-09-25T18:24:05.534Z",
                    "price": 10,
                    "status": "ACTIVE"
                }
            }).as('response')
        })

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Order updated successfully')
        })
    })

    it('Deve deletar o pedido', () => {
        cy.getIdOrderByName('test123').then(id => {
            cy.request({
                method: 'DELETE',
                url: `orders/${id}`,
                headers: { Authorization: `Bearer ${token}` }
            }).as('response')
        })

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Order deleted successfully')
        })
    })
})