/// <reference types="Cypress" />

describe('Spec đăng nhập', () => {
  beforeEach(() => {
    // Vào trang đăng nhập
    cy.visit('http://localhost:3000/auth/login');
  });

  //TC_Login_001
  it('Vào được trang đăng nhập', () => {});

  it('Có trường Tên đăng nhập và mật khẩu', () => {
    cy.contains('Tên đăng nhập').get('input');
    cy.contains('Mật khẩu').get('input');
  });

  it('Có nút Quên mật khẩu', () => {
    cy.contains('Quên mật khẩu');
  });

  /*
    it('Có nút Ghi nhớ mật khẩu', () => {
        cy.contains('Ghi nhớ mật khẩu');
    });

    */

  it('Kiểm tra trường username cho phép nhập thông tin', () => {
    const username = 'levanhoa20020406';
    cy.contains('div', 'Tên đăng nhập')
      .next('input')
      .type(username)
      .should('have.value', username);
  });

  it('Kiểm tra trường password cho phép nhập thông tin', () => {
    const password = '0123456789';
    cy.contains('div', 'Mật khẩu')
      .next('input')
      .type(password)
      .should('have.value', password);
  });

  /// TC_Login
  it('Kiểm tra che dấu mật khẩu đang nhập', () => {
    cy.contains('div', 'Mật khẩu').next('input').as('passwordInput');

    cy.get('@passwordInput').should('have.attr', 'type', 'password');
  });

  ///TC_Login
  it('Hiện thông báo khi dữ liệu đã nhập không hợp lệ', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 422,
      fixture: 'login/invalid_login_data.json',
    }).as('login');
    cy.get('button').contains('Đăng nhập').click();

    cy.contains('Dữ liệu đã nhập không hợp lệ');
  });

  ///TC_Login
  it('Hiện thông báo khi đăng nhập thành công', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      fixture: 'login/login_success.json',
    }).as('login');
    cy.get('button').contains('Đăng nhập').click();

    cy.contains('Đăng nhập thành công');
  });

  it('Hiển thị thông báo khi nhập sai tên đăng nhập hoặc mật khẩu', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      fixture: 'login/login_failed.json',
    }).as('login');

    cy.get('button').contains('Đăng nhập').click();
    cy.contains('Sai tên đăng nhập hoặc mật khẩu');
  });
});
