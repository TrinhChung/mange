/// <reference types="Cypress" />

describe('Spec Xem chi tiết truyện', () => {
  beforeEach(() => {
    // Stub network request cho socket.io hết đỏ
    cy.intercept('GET', 'http://localhost:6001/socket.io/*', {
      body: 'socket.io',
    }).as('socket.io');
    cy.intercept('GET', '/api/mangas?page=1&per_page=30', {
      statusCode: 200,
      fixture: 'manga/mangas_page1.json',
    }).as('mangas');

    cy.intercept('GET', 'http://localhost:8000/api/mangas/58', {
      statusCode: 200,
      fixture: 'manga/manga_id_58.json',
    }).as('manga');
    cy.visit('http://localhost:3000');
    // cy.reload();
  });

  it('Hiển thị danh sách truyện', () => {
    cy.contains('Berserk');
  });

  it('Chuyển hướng đến trang xem chi tiết truyện khi click vào ảnh', () => {
    cy.get('img[src*="berserk/thumbnail.jpg"]').click();
    cy.url().should('include', '/detail-manga/58');
  });

  it('Chuyển hướng đến trang xem chi tiết truyện khi click vào tên truyện', () => {
    cy.contains('div', 'Berserk').click();
    cy.url().should('include', '/detail-manga/58');
  });

  it('Hiện thông báo khi truy cập vào url xem chi tiết truyện của 1 truyện không tồn tại', () => {
    cy.intercept('GET', 'http://localhost:8000/api/mangas/123456789', {
      statusCode: 404,
      body: {
        success: 0,
        message: 'Không tìm thấy dữ liệu',
      },
    }).as('manga-123456789');
    cy.visit('http://localhost:3000/detail-manga/123456789');
    cy.wait('@manga-123456789');
    cy.contains('Không tìm thấy dữ liệu');
  });

  it('test chức năng đọc từ đầu', () => {
    cy.visit('http://localhost:3000/detail-manga/58');
    cy.contains('Đọc từ đầu').click();
    cy.url().should('include', '11213');
  });

  it('test chức năng đọc mới nhất', () => {
    cy.visit('http://localhost:3000/detail-manga/58');
    cy.contains('Đọc mới nhất').click();
    cy.url().should('include', '11592');
  });
});
