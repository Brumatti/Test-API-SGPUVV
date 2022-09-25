/// <reference types="cypress" />

let token //variavel global do token
before('Pegando token',() => {                        
    cy.getToken('aa@aa.com', 'aaaaaaaaa')
        .then(tkn => { 
            token = tkn  
        })
})


describe('Testes de rota de pedido', () => {

    it('Deve criar um pedido', () => {
    cy.getId('aa@aa.com').then(id => {
        cy.request({
        method: 'POST',
        url: '/orders',
        headers: { Authorization : `${token}`},
        body: {    
            "userId": `${id}`,
            "solicitationDate": "2022-08-25 14:05:24",
            "carriedOut": "test",
            "estimatedDeliveryDate": "2022-09-10 14:05:24",
            "deliveryDate": "2022-09-10 14:05:24",
            "price": 10,
            "orderStatus": "ACTIVE"
            }
            
        }).as('response')
    })
        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Order stored successfully')
            expect(res.body.data.order.orderStatus).eq('ACTIVE')
        })
    })

    it.only('Listar pedidos', () => {
        cy.request({
            method: 'GET',
            url: '/orders',
            headers: { Authorization :`Bearer ${token}` }

        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Fetching order')
            expect(res.body.data.data).to.not.be.empty
        })
    })

    it('Deve procurar por id do pedido', () => {
        cy.getIdOrderByName('test').then(id => {    
             cy.request({
                method: 'GET',
                url : `orders/${id}`,
                headers: {Authorization : `Bearer ${token}`},
            }).as('response')
        })

        cy.get('@response').then(res => {
            expect(res.status).eq(200)  
            expect(res.body.message).eq('Order found successfully')
            expect(res.body.data.order).to.not.be.empty
        })   
    })

    it('Deve atualizar um pedido', () => {
        cy.getIdOrderByName('test').then(id => {
            cy.request({
                method: 'PUT',
                url: `orders/${id}`,
                headers: { Authorization: `Bearer ${token}` },
                body: {

                    "userId": `${id}`,
                    "solicitationDate": "2022-08-25 14:05:24",
                    "carriedOut": "test",
                    "estimatedDeliveryDate": "2022-08-25 14:05:24",
                    "deliveryDate": "2022-08-25 14:05:24",
                    "price": 20,
                    "orderStatus": "ACTIVE"
                }
            }).as('response')
        })

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Order updated successfully')
        })
    })

    it('Deve deletar o pedido', () => {
        cy.getIdOrderByName('test').then(id => {
            cy.request({
                method: 'DELETE',
                url: `orders/${id}`,
                headers: { Authorization :`Bearer ${token}` }
            }).as('response')
        })

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Order destroyed successfully')
        })
    })
})