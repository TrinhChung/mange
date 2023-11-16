/// <reference types="Cypress" />

describe('Spec Chapter', () => {
    beforeEach(() => {

        cy.intercept('GET', 'http://localhost:8000/api/chapters/11223', {
            statusCode: 200,
            fixture: 'chapter/chapter_id_11223.json',
        }).as('chapter');

        cy.visit('http://localhost:3000/live-manga/berserk/11223');

    });

    it('Có hiển thị tên chapter', () => {
        cy.contains('Chapter 10')
    })

    it('kiểm tra nút chuyển trang sau', () => {
        cy.contains('Chapter 10').should('be.visible')
        cy.get('span.anticon-right-circle').click()
        cy.url().should('include', '11224')
    })

    it('kiểm tra nút chuyển trang trước', () => {
        cy.contains('Chapter 10').should('be.visible')
        cy.get('span.anticon-left-circle').click()
        cy.url().should('include', '11222')
    })

    it('Kiểm tra hiển thị list chapter khi nhấn vào tên chapter', () => {
        cy.contains('Chapter 10').should('be.visible').click()
        cy.contains('Chapter 7').click()
        cy.url().should('include', '11220')
    })
});