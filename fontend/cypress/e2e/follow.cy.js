//


describe('Spec Theo dõi truyện', () => {
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

    it('Có hiển thị nút theo dõi', () => {
        cy.contains('Theo dõi');
    })

    it('Nhấn theo dõi khi chưa đăng nhập', () => {
        cy.get('div')
            .find('span.anticon-plus').click();
        cy.contains('Xác nhận chuyển trang đăng nhập');
        cy.get('div.ant-modal-footer button span')
            .contains('OK')
            .click();

        cy.url().should('include', 'login')
    })

    it('Nhấn theo dõi khi đã đăng nhập', () => {

        cy.visit('http://localhost:3000/auth/login');
        cy.intercept('POST', '/api/auth/login', {
            statusCode: 200,
            fixture: 'login/login_success.json',
        }).as('login');
        cy.get('button').contains('Đăng nhập').click();

        // cy.contains('Đăng nhập thành công');
        cy.visit('http://localhost:3000/detail-manga/58');
        cy.intercept('POST', '/api/mangas/bookmark/58', {
            statusCode: 200,
            body: {
                "success": 1,
                "data": {
                    "bookmarked": true
                },
                "message": "Thêm bookmark thành công"
            }
        })

        cy.get('div')
            .find('span.anticon-plus').click();
        cy.contains('Thêm bookmark thành công')

    })



    it('Nhấn bỏ theo dõi', () => {

        cy.visit('http://localhost:3000/auth/login');
        cy.intercept('POST', '/api/auth/login', {
            statusCode: 200,
            fixture: 'login/login_success.json',
        }).as('login');
        cy.get('button').contains('Đăng nhập').click();

        // cy.contains('Đăng nhập thành công');
        cy.visit('http://localhost:3000/detail-manga/58');
        cy.intercept('POST', '/api/mangas/bookmark/58', {
            statusCode: 200,
            body: {
                "success": 1,
                "data": {
                    "bookmarked": false
                },
                "message": "Xóa bookmark thành công"
            }
        })

        cy.get('div')
            .find('span.anticon-plus').click();
        cy.contains('Xóa bookmark thành công')

    })
});


