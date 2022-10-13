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
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(token => {
        cy.request({
            method: 'GET',
            url:'/orders',
            headers:{ Authorization: `Bearer ${token}` }
        }).its('body.data.orders').then((res) => {
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
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(token => {
        cy.request({
            method: 'GET',
            url:'/users',
            headers:{ Authorization: `Bearer ${token}` }
        }).its('body.data').then((res) => {
            const result = res.find(({email}) => email === user)
            cy.wrap(result).its('confirmationCode')
                .then(code => {
                return code
            })
        })

    })
})

Cypress.Commands.add('getIdGreetings', (msg) => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(token => {
        cy.request({
            method: 'GET',
            url: 'greetings',
            headers:{ Authorization: `Bearer ${token}` }
        }).its('body.data.greetings').then(res => {
            const result = res.find(({message}) => message.startsWith(msg))
            cy.wrap(result).its('id')
            .then(id => {
                return id
            })

        })

    })
})

Cypress.Commands.add('getIdProducts', (prod) => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(token => {
        cy.request({
            method: 'GET',
            url:'products',
            headers:{ Authorization: `Bearer ${token}` }
        }).its('body.data.products').then((res) => {
            const result = res.find(({productName}) => productName === prod)
            cy.wrap(result).its('id')
                .then(id => {
                return id
            })
        })

    })
})
Cypress.Commands.add('getIdProductsCat', (prod) => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(token => {
        cy.request({
            method: 'GET',
            url:'productCategories',
            headers:{ Authorization: `Bearer ${token}` }
        }).its('body.data.productCategorys').then((res) => {
            const result = res.find(({productCategoryName}) => productCategoryName === prod)
            cy.wrap(result).its('id')
                .then(id => {
                return id
            })
        })

    })
})
Cypress.Commands.add('getIdRest', (rest) => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(token => {
        cy.request({
            method: 'GET',
            url:'restaurants',
            headers:{ Authorization: `Bearer ${token}` }
        }).its('body.data.restaurants').then((res) => {
            const result = res.find(({restaurantName}) => restaurantName === rest)
            cy.wrap(result).its('id')
                .then(id => {
                return id
            })
        })

    })
})

Cypress.Commands.add('getIdVoucher', (x) => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(token => {
        cy.request({
            method: 'GET',
            url:'vouchers',
            headers:{ Authorization: `Bearer ${token}` }
        }).its('body.data.vouchers').then((res) => {
            const result = res.find(({voucherDescription}) => voucherDescription === x)
            cy.wrap(result).its('id')
                .then(id => {
                return id
            })
        })

    })
})

Cypress.Commands.add('getIdPay', (x) => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(token => {
        cy.request({
            method: 'GET',
            url:'payments',
            headers:{ Authorization: `Bearer ${token}` }
        }).its('body.data.payments').then((res) => {
            const result = res.find(({name}) => name === x)
            cy.wrap(result).its('id')
                .then(id => {
                return id
            })
        })

    })
})
Cypress.Commands.add('getIdDeliv', (x) => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(token => {
        cy.request({
            method: 'GET',
            url:'deliverymans',
            headers:{ Authorization: `Bearer ${token}` }
        }).its('body.data.deliverymans').then((res) => {
            const result = res.find(({plateNumber}) => plateNumber === x)
            cy.wrap(result).its('id')
                .then(id => {
                return id
            })
        })

    })
})



