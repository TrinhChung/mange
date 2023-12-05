/// <reference types="Cypress" />

describe('Spec đăng nhập', () => {
  beforeEach(() => {
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
      fixture: 'login/login_failed.json',
    }).as('login');

    cy.get('button').contains('Đăng nhập').click();
    cy.contains('Sai tên đăng nhập hoặc mật khẩu');
  });
});

describe('Spec đăng ký', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/signup');

    cy.intercept('POST', '/api/auth/signup', {
      statusCode: 201,
      fixture: 'signup/signup_success.json',
    }).as('signup');
  });

  it('Vào được trang đăng ký', () => { });
  it('Có thể chuyển hướng tới đăng nhập', () => {
    cy.contains('Đăng nhập').click();
    cy.contains('Bạn chưa có tài khoản?');
  });

  it('Có trường email, tên đăng nhập, mât khẩu, nhập lại mật khẩu', () => {
    cy.contains('Email').get('input');
    cy.contains('Tên đăng nhập').get('input');
    cy.contains('Mật khẩu').get('input');
    cy.contains('Nhập lại mật khẩu').get('input');
  });

  it('Đỏ field email nếu không đúng định dạng', () => {
    cy.get('#email').type('abc');
    cy.get('#email').should('have.class', 'ant-input-status-error');
  });

  it('Đỏ field tên nhập lại mất khẩu nếu không trùng', () => {
    cy.get('#resetPassword').type('123456');
    cy.get('#resetPassword').should('have.class', 'ant-input-status-error');
  });

  it("Đăng ký thành công", () => {
    cy.get('#email').type('newuser@gmail.com');
    cy.get('#username').type('newuser');
    cy.get('#password').type('111111');
    cy.get('#resetPassword').type('111111');
    cy.get('button').contains('Đăng ký').click();

    cy.contains('thành công');
  });
});
