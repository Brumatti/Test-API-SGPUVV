/// <reference types="cypress" />

let token
before('Pegando token', () => {
    cy.getToken('aa@aa.com', 'aaaaaaaaa').then(tkn => {
        token = tkn
    })
})
after('Criando o voucher deletado', () => {
    cy.request({
        method: 'POST',
        url: 'vouchers',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            "orderId": "5f26137e-bfde-4550-bc0d-a05021b87f67",
            "voucherName": "CUPOM",
            "voucherDescription": "string",
            "percentage": 10,
            "voucherValue": 5,
            "validity": "2022-09-29T05:48:24.924Z",
            "vaucherStatus": "INACTIVE"
        }
    })
})

it('Deve testar o endpoint GET de voucher', () => {
    cy.request({
        method: 'GET',
        url: 'vouchers',
        headers: { Authorization: `Bearer ${token}` },
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Vouchers fetched successfully')
    })
})

it.skip('Deve testar o endpoint POST de restaurante', () => {
    cy.request({
        method: '',
        url: '',
        headers: { Authorization: `Bearer ${token}` },
        body: {
            "orderId": "5f26137e-bfde-4550-bc0d-a05021b87f67",
            "voucherName": "CUPOM",
            "voucherDescription": "string",
            "percentage": 10,
            "voucherValue": 5,
            "validity": "2022-09-29T05:48:24.924Z",
            "vaucherStatus": "INACTIVE"
        }
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Voucher created successfully')
        expect(res.body.data).not.be.null
    })
})

it('Deve testar o endpoint GET ID de voucher', () => {
    cy.getIdVoucher('string').then(id => {
        cy.request({
            method: 'GET',
            url: `vouchers/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Voucher fetched successfully')
        })

    })

})

it('Deve testar o endpoint PUT de voucher', () => {
    cy.getIdVoucher('string').then(id => {
        cy.request({
            method: 'PUT',
            url: `vouchers/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            body: {
                "orderId": "5f26137e-bfde-4550-bc0d-a05021b87f67",
                "voucherName": "CUPOM",
                "voucherDescription": "string",
                "percentage": 10,
                "voucherValue": 5,
                "validity": "2022-09-29T05:48:24.924Z",
                "vaucherStatus": "INACTIVE"
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).eq(200)
            expect(res.body.message).eq('Voucher updated successfully')
        })
    })
})
it('Deve testar o endpoint DELETE de voucher', () => {
    cy.getIdVoucher('string').then(id => {
        cy.request({
            method: 'DELETE',
            url: `vouchers/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        })
    }).as('response')

    cy.get('@response').then(res => {
        expect(res.status).eq(200)
        expect(res.body.message).eq('Voucher deleted successfully')
    })
})