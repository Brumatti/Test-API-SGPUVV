/// <reference types="cypress" />

//NAO AUTOMATIZADA

let token
before('Pegando token', () => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(tkn => {
        token = tkn
    })
})

it.skip('Deve registar um endereço', () => {
    cy.request({
        method: 'POST',
        url: 'addresses',
        headers: { Authorization : `Bearer ${token}`},
        body: {
            "userId": "5e23f7e7-4c5a-4f19-a58d-48c0bc31a1b1",
            "state": "ES",
            "city": "Vitoria",
            "street": "Rua Joaquino",
            "neighbourhood": "Itaparica",
            "number": 234,
            "complement": "Ap 101",
            "reference": "Posto"
          }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).equal(201)

    })
})

it('Deve listar os endereços', () => {
    cy.request({
        method:'GET',
        url: 'addresses',
        headers: { Authorization : `Bearer ${token}`}

    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
    })
})

it('Deve encontrar um endereço por ID', () => {
        cy.request({
           method: 'GET',
           url : `addresses/8f4fa19d-e872-4fe0-86c0-a34908f8e44c`,
           headers: {Authorization : `Bearer ${token}`}
       }).as('response')

   cy.get('@response').then(res => {
       expect(res.status).eq(200)  
       expect(res.body.message).eq('Address fetched successfully')
       expect(res.body.data).to.not.be.empty
   })   
})

it('Deve alterar um endereço', () => {
    cy.request({
        method: 'PUT',
        url: `addresses/13fbca28-c129-42e0-8e24-f6048bb80dd5`,
        headers: {Authorization : `Bearer ${token}`},
        body: {
            "userId": "13fbca28-c129-42e0-8e24-f6048bb80dd5",
            "state": "ES",
            "city": "Vitoria",
            "street": "Rua Joaquino",
            "neighbourhood": "Itaparica",
            "number": 234,
            "complement": "Ap 101",
            "reference": "Posto"
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)  
        expect(res.body.message).eq('Address updated successfully')
    })
})
it.skip('Deve deletar um endereço', () => {
    cy.request({
        method: 'DELETE',
        url: `addresses/13fbca28-c129-42e0-8e24-f6048bb80dd5`,
        headers: {Authorization : `Bearer ${token}`}
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
    })
})

