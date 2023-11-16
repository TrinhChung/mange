/// <reference types="Cypress" />

describe('Spec Đánh giá truyện', () => {
    beforeEach(() => {
        // Stub network request cho socket.io hết đỏ
        cy.intercept('GET', 'http://localhost:6001/socket.io/*', {
            body: 'socket.io',
        }).as('socket.io');

        cy.intercept('GET', 'http://localhost:8000/api/mangas/58', {
            statusCode: 200,
            fixture: 'manga/manga_id_58.json',
        }).as('manga');
        cy.visit('http://localhost:3000/detail-manga/58');
        // cy.reload();
    });

    it('Kiểm tra xem trang xem chi tiết truyện có hiển thị rating không', () => {
        cy.contains('Đánh giá chung')
        cy.get('ul.ant-rate').should('exist');
    });


    it('Kiểm tra xem khi nhấn vào số sao thì có ghi nhận đúng số sao không', () => {

        //đăng nhập
        cy.visit('http://localhost:3000/auth/login');

        cy.intercept('POST', '/api/auth/login', {
            statusCode: 200,
            fixture: 'login/login_success.json',
        }).as('login');

        cy.get('button').contains('Đăng nhập').click();

        cy.visit('http://localhost:3000/detail-manga/58');


        //click vào nửa trước của ngôi sao thứ 4 (tương ứng với vote 3.5 sao)    

        cy.contains('div', 'Đánh giá của bạn')
            .parent()
            .find('ul.ant-rate li')
            .then(($rate) => {
                cy.wrap($rate).eq(3).trigger('mouseover').click()

                cy.wrap($rate).eq(3).should('have.class', 'ant-rate-star-active')
                    .and('have.class', 'ant-rate-star-half')
                    .and('have.class', 'ant-rate-star-focused')

                cy.wrap($rate).eq(0)
                    .should('have.class', 'ant-rate-star-full')

                cy.wrap($rate).eq(1)
                    .should('have.class', 'ant-rate-star-full')

                cy.wrap($rate).eq(2)
                    .should('have.class', 'ant-rate-star-full')

                cy.wrap($rate).eq(4)
                    .should('have.class', 'ant-rate-star-zero')
            })
    })
});
