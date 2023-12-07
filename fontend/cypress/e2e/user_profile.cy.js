/// <reference types="Cypress" />

describe('Spec profile user', () => {
  beforeEach(() => {
    // set localStorage
    localStorage.setItem(
      'authUser',
      JSON.stringify({ "id": 2, "username": "user", "email": "bradtke.janet@example.com", "avatar": "https://via.placeholder.com/640x480.png/0099dd?text=dolorum", "email_verified_at": "2023-11-10T02:19:27.000000Z", "role": "user", "active": 1, "activated_at": "2023-11-10T02:19:27.000000Z", "active_token": "TTzzsXnDBPtq7WF0WUSY", "reset_token": null, "reset_sent_at": null, "created_at": "2023-11-10T02:19:27.000000Z", "updated_at": "2023-11-10T02:19:27.000000Z" })
    );

    cy.visit('http://localhost:3000/profile');
  });

  it('Vào được trang profile', () => { });

  it("Có các mục tên tài khoản, email, trạng thái", () => {
    cy.contains('Tên tài khoản');
    cy.contains('mail');
    cy.contains('Trạng thái');
  })

  it("Có các mục thông tin chung, truyện đang theo dõi, đổi mật khẩu", () => {
    cy.contains('Thông tin chung');
    cy.contains('Truyện đang theo dõi');
    cy.contains('Đổi mật khẩu');
  });

  it("Có thể vào trang chuyện đang theo dõi", () => {
    cy.contains('Truyện đang theo dõi').click();
    cy.url().should('include', '/following');
  })

  it("Có thể vào trang đổi mật khẩu", () => {
    cy.contains('Đổi mật khẩu').click();
    cy.url().should('include', '/change-password');
  });

  it("Có thể xem các truyện đang theo dõi", () => {
    cy.intercept('GET', '/api/mangas/bookmarked', {
      statusCode: 200,
      fixture: 'profile/bookmarked_mangas.json',
    }).as('bookmarked');

    cy.contains('Truyện đang theo dõi').click();
    cy.contains("Đối Phương Phải Tỏ")
  })

  it("Có thể cập nhật mật khẩu thành công", () => {
    cy.intercept('PATCH', '/api/me', {
      statusCode: 200,
      fixture: 'profile/update_password_success.json',
    }).as('change_password');

    cy.contains('Đổi mật khẩu').click();
    cy.get('input[name="currentPassword"]').type('12345678');
    cy.get('input[name="newPassword"]').type('123456789');
    cy.get('input[name="confirmPassword"]').type('123456789');
    cy.contains('Cập nhật').click();
    cy.contains('thành công')
  })

  it("Kiểm tra trường nhập lại mật khẩu khớp", () => {
    cy.contains('Đổi mật khẩu').click();
    cy.get('input[name="currentPassword"]').type('12345678');
    cy.get('input[name="newPassword"]').type('123456789');
    cy.get('input[name="confirmPassword"]').type('1234567899999999999');
    cy.contains('Cập nhật').click();
    cy.contains('phải trùng khớp')
  })
});
