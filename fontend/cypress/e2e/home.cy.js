/// <reference types="Cypress" />
// Thêm dòng ở trên để có gợi ý code cypress

describe('Spec màn hình chính', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);

    // Vào trang chủ
    cy.visit('http://localhost:3000');
  });

  it('Vào được trang chủ', () => { });

  it('Có title', () => {
    cy.title().should('equal', 'Mange');
  });

  it('Có nút "Đăng nhập"', () => {
    cy.contains('Đăng nhập', { matchCase: false });
  });

  it('Có các mục Đề xuất, Mới cập nhật và Lịch sử', () => {
    cy.contains('Đề xuất', { matchCase: false });
    cy.contains('Mới cập nhật', { matchCase: false });
    cy.contains('Lịch sử', { matchCase: false });
  });

  it('Có các mục top tuần, top tháng', () => {
    cy.contains('Top tuần', { matchCase: false });
    cy.contains('Top tháng', { matchCase: false });
  });

  it('Hiển thị các category khi hover vào mục Thể loại', () => {
    cy.contains('Thể loại', { matchCase: false }).trigger('mouseover');
    cy.contains('Action');
  });

  it('Chuyển hướng tới trang đăng nhập khi ấn nút', () => {
    cy.contains('Đăng nhập').click();
    cy.url().should('include', '/login');
  });

  it('Có thể chuyển hướng tới trang Lịch sử khi ấn nút trên Navbar', () => {
    cy.get('div').contains('Lịch sử').click();
    cy.url().should('include', '/history');
  });

  it('Có thể chuyển hướng tới trang Theo dõi khi ấn nút trên Navbar', () => {
    cy.get('div').contains('Theo dõi').click();
    cy.url().should('include', '/follow');
  });

  it('Có thể chuyển hướng tới trang Tìm kiếm khi ấn nút trên Navbar', () => {
    cy.get('div').contains('Tìm kiếm').click();
    cy.url().should('include', '/search');
  });

  it("Có thể mở thông báo khi đã đăng nhập", () => {
    localStorage.setItem(
      'authUser',
      JSON.stringify({ "id": 1, "username": "admin", "email": "diamond.hayes@example.com", "avatar": "https://via.placeholder.com/640x480.png/0044ff?text=reiciendis", "email_verified_at": "2023-11-05T06:25:18.000000Z", "role": "admin", "active": 1, "activated_at": "+055808-12-08T13:40:00.000000Z", "active_token": "cvAZwbm8EsmKTIOOlRh1", "reset_token": null, "reset_sent_at": null, "created_at": "2023-11-05T06:25:18.000000Z", "updated_at": "2023-11-05T06:25:18.000000Z" })
    );

    cy.visit('http://localhost:3000');

    cy.get("[data-icon=bell]").click();
    cy.contains("thông báo");
  })
});
