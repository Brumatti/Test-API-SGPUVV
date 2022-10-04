/// <reference types="cypress" />

let token
before('Pegando token', () => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(tkn => {
        token = tkn
    })
})

after('Criando o deliveryman deletado', () => {
    cy.request({
        method: 'POST',
        url: 'deliverymans',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            deliverymanName: "Marcos",
            plateNumber: "5"
          }
    })
})

it('Deve testar o endpoint GET de delivery', () => {
    cy.request({
        method: 'GET',
        url: 'deliverymans',
        headers: { Authorization: `Bearer ${token}` },
    }).as('response')

	cy.get('@response').then(res => {
        expect(res.status).eq(200)
	    expect(res.body.message).eq('Deliverymans fetched successfully')
    })
})

it.skip('Deve testar o endpoint POST de payments', () => {
    cy.request({
        method: 'POST',
        url: 'deliverymans',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            deliverymanName: "Marcos",
            plateNumber: "5"
          }
    }).as('response')

	cy.get('@response').then(res => {
        expect(res.status).eq(201)
	    expect(res.body.message).eq('Deliverymans created successfully')
    })
})

it('Deve testar o endpoint GET de deliverymans', () => {
    cy.getIdDeliv('5').then(id => {
        cy.request({
            method: 'GET',
            url: `deliverymans/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        }).as('response')
    
        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Deliveryman fetched successfully')
        })
    })
})

it('Deve testar o endpoint PUT de deliverymans', () => {
    cy.getIdDeliv('5').then(id => {
        cy.request({
            method: 'PUT',
            url: `deliverymans/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            body: {
                deliverymanName: "Marcos",
                plateNumber: "5"
              }
        }).as('response')
    
        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).contains('successfully')
        })
    })
})

it('Deve testar o endpoint DELETE de deliverymans', () => {
    cy.getIdDeliv('5').then(id => {
        cy.request({
            method: 'DELETE',
            url: `deliverymans/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        }).as('response')
    
        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).contains('successfully')
        })
    })
})






