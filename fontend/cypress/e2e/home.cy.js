/// <reference types="Cypress" />
// Thêm dòng ở trên để có gợi ý code cypress

describe('Spec màn hình chính', () => {
  beforeEach(() => {
    // Stub network request cho socket.io hết đỏ
    cy.intercept('GET', 'http://localhost:6001/socket.io/*', {
      body: 'socket.io',
    }).as('socket.io')

    // Vào trang chủ
    cy.visit('http://localhost:3000')
  })

  it('Vào được trang chủ', () => { })

  it('Có title', () => {
    cy.title().should('equal', 'Mange')
  })

  it('Có nút "Đăng nhập"', () => {
    cy.contains('Đăng nhập')
  })

  it('Có các mục Đề xuất, Mới cập nhật và Lịch sử', () => {
    cy.contains('Đề xuất')
    cy.contains('Mới cập nhật')
    cy.contains('Lịch sử')
  })

  it('Chuyển hướng tới trang đăng nhập khi ấn nút', () => {
    cy.contains('Đăng nhập').click()
    cy.url().should('include', '/login')
  })
})