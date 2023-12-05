/// <reference types="Cypress" />

describe('Spec Bình luận', () => {

    it('Tại trang xem chi tiết truyện có cho phép bình luận', () => {
        cy.intercept('GET', 'http://localhost:8000/api/mangas/58', {
            statusCode: 200,
            fixture: 'manga/manga_id_58.json',
        }).as('manga');

        cy.visit('http://localhost:3000/detail-manga/58');
        cy.contains('Bình luận')
    })

    it('Tại trang chapter có cho phép bình luận', () => {
        cy.intercept('GET', 'http://localhost:8000/api/chapters/11223', {
            statusCode: 200,
            fixture: 'chapter/chapter_id_11223.json',
        }).as('chapter');

        cy.visit('http://localhost:3000/live-manga/berserk/11223');
        cy.contains('Bình luận')
    })

    it('Thông báo khi người dùng chưa đăng nhập bình luận', () => {
        cy.visit('http://localhost:3000/detail-manga/58');

        cy.intercept('POST', 'http://localhost:8000/api/mangas/58/comment', {
            statusCode: 401,
            body: { "message": "Unauthenticated." },
        });

        cy.get('textarea[placeholder="Viết bình luận"]')
            .type('hay{enter}');


        cy.contains('Unauthenticated')

    })

    it('Thông báo khi người dùng đã đăng nhập bình luận', () => {
        //đăng nhập
        cy.visit('http://localhost:3000/auth/login');

        cy.intercept('POST', '/api/auth/login', {
            statusCode: 200,
            fixture: 'login/login_success.json',
        }).as('login');

        cy.get('button').contains('Đăng nhập').click();

        cy.visit('http://localhost:3000/detail-manga/58');

        //comment
        cy.intercept('POST', 'http://localhost:8000/api/mangas/58/comment', {
            statusCode: 200,
            fixture: 'manga/comment.json'
        }).as('comment');

        cy.intercept('GET', 'http://localhost:8000/api/mangas/58/comments?page=1', {
            statusCode: 200,
            fixture: 'manga/comment_page_1.json'
        })


        cy.get('textarea[placeholder="Viết bình luận"]')
            .type('hay{enter}');


        cy.contains('Đã bình luận')
    })

    // it('Trả lời một bình luận thành công', () => {
    //     //đăng nhập
    //     cy.visit('http://localhost:3000/auth/login');

    //     cy.intercept('POST', '/api/auth/login', {
    //         statusCode: 200,
    //         fixture: 'login/login_success.json',
    //     }).as('login');

    //     cy.get('button').contains('Đăng nhập').click();

    //     cy.visit('http://localhost:3000/detail-manga/58');

    //     //comment
    //     cy.intercept('POST', 'http://localhost:8000/api/mangas/58/comment', {
    //         statusCode: 200,
    //         fixture: 'manga/comment.json'
    //     }).as('comment');

    //     cy.intercept('GET', 'http://localhost:8000/api/mangas/58/comments?page=1', {
    //         statusCode: 200,
    //         fixture: 'manga/comment_page_1.json'
    //     })


    //     cy.contains('Trả lời').click();
    //     cy.get('textarea[placeholder="Viết bình luận"]').last().type('hay{enter}');
    //     cy.wait('@comment');
    //     cy.contains('Đã bình luận')
    // })

    // it('Báo cáo một bình luận thành công', () => {
    //     //đăng nhập
    //     cy.visit('http://localhost:3000/auth/login');

    //     cy.intercept('POST', '/api/auth/login', {
    //         statusCode: 200,
    //         fixture: 'login/login_success.json',
    //     }).as('login');

    //     cy.get('button').contains('Đăng nhập').click();

    //     cy.visit('http://localhost:3000/detail-manga/58');

    //     //comment
    //     cy.intercept('POST', 'http://localhost:8000/api/report/comment/7', {
    //         statusCode: 200,
    //         fixture: 'comment/report_success.json'
    //     }).as('comment_report');

    //     cy.intercept('GET', 'http://localhost:8000/api/mangas/58/comments?page=1', {
    //         statusCode: 200,
    //         fixture: 'manga/comment_page_1.json'
    //     })


    //     cy.get('span.anticon-more').last().click();
    //     cy.contains('Báo cáo').click();
    //     cy.wait('@comment_report');
    //     cy.contains('được gửi đi')
    // })
});
