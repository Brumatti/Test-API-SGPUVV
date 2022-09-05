/// <reference types="cypress" />
import 'cypress-mailhog';

let token 
before('Pegando token',() => {                        
    cy.getToken('a@a.com', 'a').then(tkn => { 
            token = tkn  
  })
})
after('Criando o usuario deletado',() => {
    cy.request({
        method:'POST',
        url: '/auth/register',
        body:{
            email: "c@c.com",
            document: "12345678234",
            birthdate: "15092002",
            password: "c"
        }
    })

})

it.skip('Deve registar um usuario', () => {
    cy.request({
        method:'POST',
        url: '/auth/register',
        body:{
        email: "h@h.com",
        document: "12345678968",
        birthdate: "15092002",
        password: "g"
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
            email: "a@a.com",
            password: "a"
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.body.token).to.not.be.null
        expect(res.body.status).to.equal(200)
        expect(res.body.message).to.be.equal('Logged in successfully')
    })
})

it('Não deve fazer login com uma senha errada', () => {
    cy.request({
        method: 'POST',
        url: '/auth/login',
        body: {  
            email: "a@a.com",
            password: "kk"
        }, 
        failOnStatusCode: false
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.body.status).to.equal(401)
        expect(res.body.message).to.be.equal('Could not login, invalid credentials')
    })
})

it('Não deve registrar uma conta com o mesmo email', () => {
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
            email: 'b@b.com'
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq("Confirmation code sent successfully")
    })
})


it('Não deve trocar a senha com um código errado',() => {
    cy.request({
        method: 'POST',
        url: '/auth/forgot_password/change_password',
        body:{
        "email": "b@b.com",
        "confirmationCode": 1000,
        "newPassword": "bb"
        }, 
        failOnStatusCode: false
    }).as('response')

    cy.get('@response').then(res =>{
        expect(res.status).eq(401)
        expect(res.body.message).eq('Could not change password, unauthorized payload')
    })
})

it('Deve trocar a senha',() => {
    cy.getCode('b@b.com').then(code => {   
        cy.request({
            method: 'POST',
            url: '/auth/forgot_password/change_password',
            body:{
            "email": "b@b.com",
            "confirmationCode": `${code}`,
            "newPassword": "b"
            }
        }).as('response')

        cy.get('@response').then(res =>{
            expect(res.status).eq(200)
            expect(res.body.message).eq('Password changed successfully')
        })
})
})

it('Deve listar todos os usuários', () =>{
    cy.request({
        method: 'GET',
        url:'/users',
        headers:{ Authorization: `Bearer ${token}` }
    }).as('response')
    
    cy.get('@response').then(res => {
        expect(res.status).eq(200)  
        expect(res.body.message).eq('Fetching users')
        expect(res.body.data.data).to.not.be.empty
    })
    
})


it('Deve procurar por id', () => {
    cy.getId('Leonardobrito@teste.com').then(id => {    
         cy.request({
            method: 'GET',
            url : `users/${id}`,
            headers: {Authorization : `Bearer ${token}`},
        }).as('response')
})
    cy.get('@response').then(res => {
        expect(res.status).eq(200)  
        expect(res.body.message).eq('User found successfully')
        expect(res.body.data.user.email).not.be.empty

})
    
})

// it('Deve ativar um usuário', () => {
//         cy.request({
//             method: 'POST',
//             url: '/users',
//             headers:{ Authorization: `Bearer ${token}` },
//             body: {
//                 "email": "e@e.com",
//                 "document": "12345678910",
//                 "birthdate": "10102000",
//                 "password": "e",
//                 "status": "ACTIVE"
//             }
//         }).as('response')
//     cy.get('@response').then(res => {
//         expect(res.status).eq(200)
//         expect(res.body.message).eq('User stored successfully')
//         expect(res.body.data).to.not.be.empty
//     })
// })

it('Deve alterar um usuário', () => {
    cy.getId('b@b.com').then(id => {
        cy.request({
            method: 'PUT',
            url : `/users/${id}`,
            headers: {Authorization : `Bearer ${token}`},
            body: {
                "email": "b@b.com",
                "document": "13446678998",
                "birthdate": "14082000",
                "password": "b",
                "status": "ACTIVE"
            }
        }).as('response')
})
    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('User stored successfully')
    })
})

it('Deve deletar o usuario', () => {
    cy.getId('c@c.com').then(id => {
        cy.request({
            method: 'DELETE',
            url : `/users/${id}`,
            headers: { Authorization : `Bearer ${token}`}
        }).as('response')

    })
    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('User destroyed successfully')
    })
})