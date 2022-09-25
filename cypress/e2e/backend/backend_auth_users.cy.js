/// <reference types="cypress" />
import 'cypress-mailhog';

let token 
before('Pegando token',() => {                        
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(tkn => { 
            token = tkn  
  })
})
after('Criando o usuario deletado',() => {
    cy.request({
        method:'POST',
        url: '/auth/register',
        body:{
            "email": "cc@cc.com",
            "document": "34567246783",
            "birthdate": "15092000",
            "password": "ccccccccc"
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
        expect(res.status).equal(201)
        expect(res.body.message).eq('Registered successfully')
        expect(res.body.data).to.not.be.null
    })
    })

it('Deve fazer login em uma conta', () => {
    cy.request({
        method: 'POST',
        url: '/auth/login',
        body: {  
            email: "aa@aa.com",
            password: "aaaaaaaaa"
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
            email: "aa@aa.com",
            password: "kkkkkkkkk"
        }, 
        failOnStatusCode: false
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.body.statusCode).to.equal(401)
        console.log(res.body)
        expect(res.body.message).to.be.equal('Could not login, invalid credentials!')
    })
})
it('Não deve fazer login com uma senha vazia ou com tamanho menor que 8', () => {
    cy.request({
        method: 'POST',
        url: '/auth/login',
        body: {  
            email: "aa@aa.com",
            password: "k"
        }, 
        failOnStatusCode: false
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.body.statusCode).to.equal(400)
        console.log(res.body)
        expect(res.body.message[0]).to.be.equal('password must be longer than or equal to 8 characters')
    })
})

it('Não deve registrar uma conta com o mesmo email', () => {
    cy.request({
        method:'POST',
        url: '/auth/register',
        body: {
            email: "aa@aa.com",
            document: "13263535781",
            birthdate: "23112000",
            password: "test1234"
        }, 
        failOnStatusCode: false
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(400)
        expect(res.body.message).eq("Error while creating user!")
    })
})


it.skip('Deve mandar um código de confirmacao', () => {
    cy.request({
        method: 'POST',
        url: '/auth/forgot_password/send_confirmation_code',
        body: {
            email: 'aa@aa.com'
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(201)
        expect(res.body.message).eq("Confirmation code sent successfully")
    })
})


it('Não deve trocar a senha com um código errado',() => {
    cy.request({
        method: 'POST',
        url: '/auth/forgot_password/change_password',
        body:{
        "email": "leonardobrito371+sgp@gmail.com",
        "confirmationCode": 1000,
        "newPassword": "bbbbbbbba"
        }, 
        failOnStatusCode: false
    }).as('response')

    cy.get('@response').then(res =>{
        expect(res.status).eq(500)
        expect(res.body.message).eq('Error while changing password!')
        expect(res.body.error).eq('Invalid confirmation code')
    })
})

it.skip('Deve trocar a senha',() => {
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
            expect(res.status).eq(201)
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
        expect(res.body.message).eq('Users fetched successfully')
        expect(res.body.data).to.not.be.empty
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
        expect(res.body.message).eq('User fetched successfully')
        expect(res.body.data.email).not.be.empty

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
    cy.getId('bb@bb.com').then(id => {
        cy.request({
            method: 'PUT',
            url : `/users/${id}`,
            headers: {Authorization : `Bearer ${token}`},
            body: {
                "email": "bb@bb.com",
                "document": "34567246785",
                "birthdate": "23111999",
                "password": "bbbbbbbbb",
                "status": "ACTIVE",
                "confirmationCode": 0
            }
        }).as('response')
})
    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        //expect(res.body.message).eq('User stored successfully')
    })
})

it('Deve deletar o usuario', () => {
    cy.getId('cc@cc.com').then(id => {
        cy.request({
            method: 'DELETE',
            url : `/users/${id}`,
            headers: { Authorization : `Bearer ${token}`}
        }).as('response')

    })
    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('User deleted successfully')
    })
})