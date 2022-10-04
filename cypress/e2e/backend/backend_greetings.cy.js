/// <reference types="cypress" />

let token
before('Pegando token', () => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(tkn => {
        token = tkn
    })
})

after('Criando a msg deletada', () => {
    cy.request({
        method: 'POST',
        url: 'greetings',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            message: "24234234324",
            active: false
        }
    })
})
describe('Teste endpoint greetings', () => {

    it('Deve testar o GET de saudação', () => {
        cy.request({
            method: 'GET',
            url: 'greetings',
            headers: { Authorization: `Bearer ${token}` }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq("Greetings fetched successfully")
        })
    })

    it.skip('Deve testar o endpoint POST de saudação', () => {
        cy.request({
            method: 'POST',
            url: 'greetings',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                "message": "24234234324",
                "active": false
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).eq(201)
            expect(res.body.message).eq("Greeting created successfully")
        })

    })

    it('Deve testar o GET ID de saudação', () => {
        cy.getIdGreetings('24').then(id => {
            cy.request({
                method: 'GET',
                url: `greetings/${id}`,
                headers: { Authorization: `Bearer ${token}` }
            }).as('response')

            cy.get('@response').then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Greeting fetched successfully')
                expect(res.body.data).to.not.be.empty
            })

        })

    })

    it('Deve testar o endpoint PUT de saudação', () => {
        cy.getIdGreetings('24').then(id => {
            cy.request({
                method: 'PUT',
                url: `greetings/${id}`,
                headers: { Authorization: `Bearer ${token}` },
                body: {
                    message: "24234234324",
                    active: true
                }
            }).as('response')

            cy.get('@response').then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq('Greeting updated successfully')
                expect(res.body.greetings).to.not.be.null
            })
        })
    })

    it('Deve testar o endpoint DELETE de saudação', () => {
        cy.getIdGreetings('24').then(id => {
            cy.request({
                method: 'DELETE',
                url: `greetings/${id}`,
                headers: { Authorization: `Bearer ${token}` },
            }).as('response')
            
            cy.get('@response').then(res => {
                expect(res.status).eq(200)
                expect(res.body.message).eq("Greeting deleted successfully")
            })
        })

    })

})
