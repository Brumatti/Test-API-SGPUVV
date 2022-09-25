/// <reference types="cypress" />

let token
before('Pegando token', () => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(tkn => {
        token = tkn
    })
})

after('Cria o cartão deletado', () => {
    cy.request({
        method: 'POST',
        url: 'cards',
        headers: { Authorization : `Bearer ${token}`},
        body: {
            "userId": "5e23f7e7-4c5a-4f19-a58d-48c0bc31a1b1",
            "number": 223456789,
            "cardholder": "baboboba",
            "dueDate": "21212332",
            "cvc": 204,
            "document": "198293900",
            "nickName" : "Arroz"
        }
    })
})
it.skip('Deve registar um cartão', () => {
    cy.request({
        method: 'POST',
        url: 'cards',
        headers: { Authorization : `Bearer ${token}`},
        body: {
            "userId": "4723d3ad-9886-489f-8ab2-6a8885a36c8c",
            "number": 123456789,
            "cardholder": "abobobb",
            "dueDate": "21212332",
            "cvc": 234,
            "document": "198293929",
            "nickName" : "Arroz"
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).equal(201)
        expect(res.body.message).eq('Card created successfully')
        expect(res.body.data.cardholder).to.not.be.empty

    })
})
it('Listar cartões', () => {
    cy.request({
        method: 'GET',
        url: '/cards',
        headers: { Authorization :`Bearer ${token}` }

    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Cards fetched successfully')
        expect(res.body.data.cards).to.not.be.empty
    })
})

it('Deve procurar por um cartão', () => {
    cy.getNick('Arroz').then(id => {    
         cy.request({
            method: 'GET',
            url : `cards/${id}`,
            headers: {Authorization : `Bearer ${token}`},
        }).as('response')
    })

    cy.get('@response').then(res => {
        expect(res.status).eq(200)  
        expect(res.body.message).eq('Card fetched successfully')
    })   
})

it('Deve atualizar um cartão', () => {
    cy.getNick('Batata').then(id => {
        cy.request({
            method: 'PUT',
            url: `cards/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            body: {
                "userId": `${id}`,
                "number": 123456789,
                "cardholder": "abobobb",
                "dueDate": "21212332",
                "cvc": 234,
                "document": "198293929",
                "nickName": "Batata"
            }
        }).as('response')
    })

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Card updated successfully')
    })
})

it('Deve deletar o cartão', () => {
    cy.getNick('Arroz').then(id => {
        cy.request({
            method: 'DELETE',
            url: `cards/${id}`,
            headers: { Authorization :`Bearer ${token}` }
        }).as('response')
    })

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Card deleted successfully')
    })
})