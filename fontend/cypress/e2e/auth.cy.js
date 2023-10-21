/// <reference types="Cypress" />

describe('Spec đăng nhập', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:6001/socket.io/*', {
      body: 'socket.io',
    }).as('socket.io');
    cy.intercept('GET', 'http://localhost:8000/api/mangas*', {})

    cy.visit('http://localhost:3000/auth/login');
  });

  it('Vào được trang đăng nhập', () => { });

  it('Có trường Tên đăng nhập và mật khẩu', () => {
    cy.contains('Tên đăng nhập').get('input');
    cy.contains('Mật khẩu').get('input');
  });

  it('Có nút Quên mật khẩu', () => {
    cy.contains('Quên mật khẩu');
  });

  it('Hiển thị thông báo khi nhập sai tên đăng nhập hoặc mật khẩu', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      fixture: 'login_failed.json',
    }).as('login');

    cy.get('button').contains('Đăng nhập').click();
    cy.contains('Sai tên đăng nhập hoặc mật khẩu');
  });
});
