// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getToken', (user, passwd) => {
    cy.request({
        method: 'POST',
        url: '/auth/login',
        body: {  
            email: user,
            password: passwd
        }
    }).its('body.data.accessToken').should('not.be.empty') 
    .then(token => {
       return token
    })
} )
Cypress.Commands.add('getNick', (user) => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(token => {
        cy.request({
            method: 'GET',
            url:'/cards',
            headers:{ Authorization: `Bearer ${token}` }
        }).its('body.data.cards').then((res) => {
            const result = res.find(({nickName}) => nickName === user)
            cy.wrap(result).its('id')
                .should('not.be.empty')
                .then(id => {
                return id
            })
        })

    })
})
Cypress.Commands.add('getId', (user) => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(token => {
        cy.request({
            method: 'GET',
            url:'/users',
            headers:{ Authorization: `Bearer ${token}` }
        }).its('body.data.users').then((res) => {
            const result = res.find(({email}) => email === user)
            cy.wrap(result).its('id')
                .should('not.be.empty')
                .then(id => {
                return id
            })
        })

    })
})
Cypress.Commands.add('getIdOrderByName', (pedido) => {
    cy.getToken('a@a.com', 'a').then(token => {
        cy.request({
            method: 'GET',
            url:'/orders',
            headers:{ Authorization: `Bearer ${token}` }
        }).its('body.data.data').then((res) => {
            const result = res.find(({carriedOut}) => carriedOut === pedido)
            cy.wrap(result).its('id')
                .should('not.be.empty')
                .then(id => {
                    return id
                })
        })
    })
})
Cypress.Commands.add('getCode', (user) => {
    cy.getToken('a@a.com', 'a').then(token => {
        cy.request({
            method: 'GET',
            url:'/users',
            headers:{ Authorization: `Bearer ${token}` }
        }).its('body.data.data').then((res) => {
            const result = res.find(({email}) => email === user)
            cy.wrap(result).its('confirmationCode')
                .then(code => {
                return code
            })
        })

    })
})


