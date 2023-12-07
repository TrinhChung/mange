/// <reference types="Cypress" />

describe('Spec profile admin', () => {
  beforeEach(() => {
    // set localStorage
    localStorage.setItem(
      'authUser',
      JSON.stringify({ "id": 1, "username": "admin", "email": "diamond.hayes@example.com", "avatar": "https://via.placeholder.com/640x480.png/0044ff?text=reiciendis", "email_verified_at": "2023-11-05T06:25:18.000000Z", "role": "admin", "active": 1, "activated_at": "+055808-12-08T13:40:00.000000Z", "active_token": "cvAZwbm8EsmKTIOOlRh1", "reset_token": null, "reset_sent_at": null, "created_at": "2023-11-05T06:25:18.000000Z", "updated_at": "2023-11-05T06:25:18.000000Z" })
    );

    cy.visit('http://localhost:3000/profile');
  });

  it('Vào được trang profile', () => { });

  it("Có các mục tên tài khoản, email, trạng thái", () => {
    cy.contains('Tên tài khoản');
    cy.contains('mail');
    cy.contains('Trạng thái');
  })

  it("Có các mục quản lý", () => {
    cy.contains('Quản lý truyện');
    cy.contains('Quản lý người dùng');
  })

  it("Có thể chuyển hướng tới quản lý người dùng", () => {
    cy.contains('Quản lý người dùng').click();
    cy.url().should('include', '/management-account');
  })

  it("Có thể chuyển hướng tới quản lý truyện", () => {
    cy.contains('Quản lý truyện').click();
    cy.url().should('include', '/management-story');
  })

  it("Có thể chuyển hướng tới quản lý bình luận", () => {
    cy.contains('Quản lý bình luận').click();
    cy.url().should('include', '/management-comment');
  })

  it("Có thể chọn Upload Ảnh", () => {
    cy.contains('Upload Ảnh').click();
    cy.contains("Thay đổi ảnh đại diện");
  })

  it("Có thể Upload ảnh đại diện", () => {
    cy.intercept('POST', '/api/me/avatar', {
      statusCode: 200,
      fixture: 'profile/upload_avatar_success.json',
    }).as('avatar');

    cy.contains('Upload Ảnh').click();
    cy.contains("Chọn ảnh").click();
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('file contents'),
      fileName: 'avatar.jpg',
      mimeType: 'image/jpeg'
    }, { force: true })
    cy.contains('OK').click();

    cy.contains('thành công');
  })
});
