/// <reference types="cypress" />
// cypress/support/commands.js
import 'cypress-mailhog';


it('Deve registar um usuario', () => {
    cy.request({
        method:'POST',
        url: '/auth/register',
        body:{
        email: "d@d.com",
        document: "12345678956",
        birthdate: "10082000",
        password: "d"
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).equal(200)
        expect(res.body.message).eq('Registered successfully')
        expect(res.body.data).to.not.be.null
    })
    })

it('Deve fazer login em uma conta', () => {
    cy.request({
        method: 'POST',
        url: '/auth/login',
        body: {  
            email: "d@d.com",
            password: "d"
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.body.token).to.not.be.null
        expect(res.body.status).to.equal(200)
        expect(res.body.message).to.be.equal('Logged in successfully')
    })

})
it('Deve registrar uma conta com o mesmo email', () => {
    cy.request({
        method:'POST',
        url: '/auth/register',
        body: {
            email: "test@test.com",
            document: "13263535781",
            birthdate: "23112000",
            password: "test"
        }, 
        failOnStatusCode: false
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(400)
        expect(res.body.message).eq("Could not register, email already exists")
    })
})


it('Deve mandar um código de confirmacao', () => {
    cy.request({
        method: 'POST',
        url: '/auth/forgot_password/send_confirmation_code',
        body: {
            email: 'd@d.com'
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq("Confirmation code sent successfully")
    })
})

it.skip('Deve trocar a senha',() => {
    cy.request({
        method: 'POST',
        url: '/auth/forgot_password/change_password',
        body:{
        "email": "d@d.com",
        "confirmationCode": 3493,
        "newPassword": "d"
        }
    }).as('response')

    cy.get('@response').then(res =>{
        expect(res.status).eq(200)
        expect(res.body.message).eq('Password changed successfully')
    })
})
it('Deve listar todos os usuários', () =>{
    cy.getToken('d@d.com', 'd').then(token =>{
        cy.request({
            method: 'GET',
            url:'/users',
            headers:{ Authorization: `Bearer ${token}` }
        }).as('response')
    })
    cy.get('@response').then(res => {
        expect(res.status).eq(200)  
        expect(res.body.message).eq('Fetching users')
        expect(res.body.data.data).to.not.be.empty
    })
    
})

it('Deve procurar por id', () => {
    cy.getId('d@d.com', 'd').then(id => {
        cy.getToken('d@d.com', 'd').then(token => {
            cy.request({
                method: 'GET',
                url : `/users/${id}`,
                headers: {Authorization : `Bearer ${token}`},
        }).as('response')
    })
})
    cy.get('@response').then(res => {
     expect(res.status).eq(200)  

})
    
})
// it.only('Deve ativar um usuário', () => {
//     cy.getToken('c@c.com', 'c').then(token => {
//         cy.request({
//             method: 'POST',
//             url: '/users',
//             headers:{ Authorization: `Bearer ${token}` },
//             body: {
//                 "email": "c@c.com",
//                 "document": "12345678910",
//                 "birthdate": "10102000",
//                 "password": "c",
//                 "status": "ACTIVE"
//             }
//         }).as('response')
// })
//     cy.get('@response').then(res => {
//         expect(res.status).eq(200)
//         expect(res.body.message).eq('User stored successfully')
//         expect(res.body.data).to.not.be.empty
//     })
// })

it('Deve alterar um usuário', () => {
    cy.getId('d@d.com', 'd').then(id => {
        cy.getToken('d@d.com', 'd').then(token => {
            cy.request({
                method: 'PUT',
                url : `/users/${id}`,
                headers: {Authorization : `Bearer ${token}`},
                body: {
                    "email": "d@d.com",
                    "document": "12345678235",
                    "birthdate": "14082000",
                    "password": "d",
                    "status": "ACTIVE"
                }
        }).as('response')
    })
})
    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('User stored successfully')
    })
})

it('Deve deletar o usuario', () => {
    cy.getId('d@d.com', 'd').then(id => {
        cy.getToken('d@d.com', 'd').then(token => {
            cy.request({
                method: 'DELETE',
                url : `/users/${id}`,
                headers: { Authorization : `Bearer ${token}`}
            }).as('response')

        })
    })
    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('User destroyed successfully')
    })
})



describe.skip('Verificar caixa de entrada - emails', () => {
    it('Verification titulo de um email', () => {
        cy.mhGetAllMails().mhFirst().mhGetSubject()
            .should('eq', 'Your account is now confirmed')
        cy.mhGetMailsBySubject('Your account is now confirmed')
        .should('have.length', 1);
    })
    it('Verificando o body do email', () => {
        cy.mhGetMailsBySubject('Your account is now confirmed')
        .mhFirst().mhGetBody()
        .should('contain', 'username')     
        })
})




    


   