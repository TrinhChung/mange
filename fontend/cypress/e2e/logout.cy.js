/// <reference types="Cypress" />


describe('Spec Đăng xuất', () => {
    beforeEach(() => {
        // Stub network request cho socket.io hết đỏ
        cy.intercept('GET', 'http://localhost:6001/socket.io/*', {
            body: 'socket.io',
        }).as('socket.io');

        cy.visit('http://localhost:3000/auth/login');

        cy.intercept('POST', '/api/auth/login', {
            statusCode: 200,
            fixture: 'login/login_success.json',
        }).as('login');

        cy.get('button').contains('Đăng nhập').click();
        cy.url().should('eq', 'http://localhost:3000/');
        cy.wait(3000)
    });



    it('Test chức năng đăng xuất', () => {

        cy.intercept('DELETE', '/api/auth/logout', {
            statusCode: 200,
            fixture: 'logout/logout_success.json',
        }).as('logout');

        cy.contains('div', 'admin').click();
        cy.contains('Đăng xuất').click();
        cy.contains('span', 'OK').click();
        cy.contains('Đã đăng xuất');
    })
})
