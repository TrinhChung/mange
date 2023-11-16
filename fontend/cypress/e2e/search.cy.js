describe('spec Tìm kiếm', () => {
  beforeEach(() => {


    cy.intercept('GET', '/api/mangas?page=1&per_page=30&search=berserk', {
      statusCode: 200,
      fixture: 'manga/search_berserk.json',
    }).as('mangas');

    cy.intercept('GET', '/api/categories', {
      statusCode: 200,
      fixture: 'manga/categories.json',
    }).as('categories');


    cy.visit('http://localhost:3000');
  });




  it('Kiểm tra trang chủ có trường tìm kiếm và có cho phép nhập từ khóa', () => {
    cy.get('input')
      .should('have.attr', 'placeholder', 'Tìm truyện')
      .as('search')
      .type('truyen tranh')
      .should('have.value', 'truyen tranh');
  });

  it('nhấn nút tìm kiếm sẽ chuyển đến trang tìm kiếm', () => {
    cy.get('input')
      .should('have.attr', 'placeholder', 'Tìm truyện')
      .as('search')
      .type('ab')

    cy.get('span[aria-label="search"]')
      .parent('div').click()

    cy.url().should('include', 'search/?search=ab')
    cy.contains('div', 'Từ khóa')
      .parent()
      .children('div')
      .last().children('div').contains('ab')
  })


  it('Hiển thị không có kết quả khi nhập từ khóa không tồn tại', () => {
    cy.get('input')
      .should('have.attr', 'placeholder', 'Tìm truyện')
      .as('search')
      .type('abcxyz123')
    cy.contains('Không có kết quả')
  })

  it('Hiển thị kết quả tìm kiếm khi nhập đúng từ khóa', () => {
    cy.get('input')
      .should('have.attr', 'placeholder', 'Tìm truyện')
      .as('search')
      .type('berserk')

    cy.contains('Kentarō Miura')

    //chuyển đến trang xem chi tiết khi nhấn vào ảnh bìa truyện trong danh sách kết quả tìm kiếm
    cy.get('img[src*="berserk/thumbnail.jpg"]').click();
    cy.url().should('include', '/detail-manga/58');
  });

  // category
  it('Nhấn vào thể loại sẽ chuyển đến trang tìm kiếm với bộ chọn theo thể loại đó', () => {
    cy.contains('Thể loại').click();
    cy.contains('div', 'Action').click();
    cy.url().should('include', '/search?category=1')
  })

  it('Có các bộ lọc tìm kiếm', () => {
    cy.visit('http://localhost:3000/search');
    cy.contains("Sắp xếp theo")
    cy.contains("Trạng thái")
  })

});
