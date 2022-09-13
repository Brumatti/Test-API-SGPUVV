/// <reference types="cypress" />

let token
before('Pegando token', () => {
    cy.getToken('a@a.com', 'a').then(tkn => {
        token = tkn
    })
})

it.only('Deve registar um cartão', () => {
    cy.request({
        method: 'POST',
        url: '/cards',
        headers: { Authorization : `${token}`},
        body: {
            "userId": "05f3d6d5-cd83-4295-969a-64cfb5513f63",
            "number": "33453454",
            "cardholder": "testeteste",
            "dueDate": "21212332",
            "cvc": "234",
            "document": "12345678911",
            "nickName" : "Mart"
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).equal(200)

    })
})
it('Listar cartões', () => {
    cy.request({
        method: 'GET',
        url: '/card',
        headers: { Authorization :`Bearer ${token}` }

    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Fetching cards')
    })
})

it('Deve procurar por um cartão', () => {
    cy.getIdOrderByName('test').then(id => {    
         cy.request({
            method: 'GET',
            url : `card/${id}`,
            headers: {Authorization : `Bearer ${token}`},
        }).as('response')
    })

    cy.get('@response').then(res => {
        expect(res.status).eq(200)  
        expect(res.body.message).eq('Card found successfully')
    })   
})

it('Deve atualizar um cartão', () => {
    cy.getIdOrderByName('test').then(id => {
        cy.request({
            method: 'PUT',
            url: `card/${id}`,
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
        expect(res.body.message).eq('Card updated successfully')
    })
})

it('Deve deletar o cartão', () => {
    cy.getIdOrderByName('test').then(id => {
        cy.request({
            method: 'DELETE',
            url: `card/${id}`,
            headers: { Authorization :`Bearer ${token}` }
        }).as('response')
    })

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Card destroyed successfully')
    })
})