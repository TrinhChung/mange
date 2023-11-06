describe('spec Tìm kiếm', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Kiểm tra trang chủ có trường tìm kiếm và có cho phép nhập từ khóa', () => {
    cy.get('input')
      .should('have.attr', 'placeholder', 'Tìm truyện')
      .as('search')
      .type('truyen tranh')
      .should('have.value', 'truyen tranh');
  });
});
