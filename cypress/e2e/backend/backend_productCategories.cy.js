/// <reference types="cypress" />

let token
before('Pegando token', () => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(tkn => {
        token = tkn
    })
})

after('Criando a categoria deletado', () => {
    cy.request({
        method: 'POST',
        url: 'productCategories',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            productId: "23cbe021-7278-4245-ab3d-d16ca4d94af9",
            productCategoryName: "Doce"
        }
    })
})

it('Deve testar o endpoint GET de produtos categories', () => {
    cy.request({
        method: 'GET',
        url: 'productCategories',
        headers: { Authorization: `Bearer ${token}` },
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('ProductCategorys fetched successfully')
        expect(res.body.data).not.be.empty
    })
})

it.skip('Deve testar o endpoint POST de produtos categories', () => {
    cy.request({
        method: 'POST',
        url: 'productCategories',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            productId: "23cbe021-7278-4245-ab3d-d16ca4d94af9",
            productCategoryName: "Doce"
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(201)
        expect(res.body.message).eq('Product Category created successfully')
        expect(res.body.data).not.be.empty
    })
})

it('Deve testar o endpoint GET ID de produtos categories', () => {
    cy.getIdProductsCat('Doce').then(id => {
        cy.request({
            method: 'GET',
            url: `productCategories/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            body: {

            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Product Categories fetched successfully')
            expect(res.body.data).not.be.empty
        })

    })

})

it('Deve testar o endpoint PUT de produtos', () => {
    cy.getIdProductsCat('Doce').then(id => {
        cy.request({
            method: 'PUT',
            url: `productCategories/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            body:
            {
                productId: "23cbe021-7278-4245-ab3d-d16ca4d94af9",
                productCategoryName: "Doce"
            }

        })
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Product Category updated successfully')
        expect(res.body.data).not.be.empty
    })
})

it('Deve testar o endpoint DELETE de produtos', () => {
    cy.getIdProductsCat('Doce').then(id => {

    cy.request({
        method: 'DELETE',
        url: `productCategories/${id}`,
        headers: { Authorization: `Bearer ${token}` },
    })
    }).as('response')

	cy.get('@response').then(res => {
        expect(res.status).eq(200)
    })
})

