describe('spec Tìm kiếm', () => {
    beforeEach(() => {

        cy.intercept('GET', 'http://localhost:6001/socket.io/*', {
            body: 'socket.io',
        }).as('socket.io');
        // Vào trang chủ
        cy.visit('http://localhost:3000');
    });

    it('Kiểm tra trang chủ có trường tìm kiếm và có cho phép nhập từ khóa', () => {
        cy.get('input')
            .should('have.attr', 'placeholder', 'Tìm kiếm').as('search')
            .type("truyen tranh")
            .should('have.value', 'truyen tranh')
    })
});