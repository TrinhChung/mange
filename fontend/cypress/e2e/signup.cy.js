/// <reference types="Cypress" />
// Thêm dòng ở trên để có gợi ý code cypress

describe('Spec Đăng ký', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/login');
  });

  it('Có nút "Đăng ký"', () => {
    cy.contains('Đăng ký tài khoản tại đây');
  });

  it('Nhấn đăng ký chuyển hướng đến trang đăng ký', () => {
    cy.contains('Đăng ký tài khoản tại đây').click();
    cy.url().should('include', '/signup');
  });
});
