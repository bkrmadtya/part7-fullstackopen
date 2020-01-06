describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'Testing user',
      username: 'test',
      password: 'test'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('Log in to application');
      cy.get('#username').type('test');
      cy.get('#password').type('test');
      cy.get('#login-btn').click();
    });

    it('name of the user is shown', function() {
      cy.contains('Testing user logged in');
    });

    describe('user can create and like blog', function() {
      const title = 'A new title';
      const author = 'A test author';
      const url = 'www.example.com';
      beforeEach(function() {
        cy.get('#create_cancel_btn').click();
        cy.get('#title_input').type(title);
        cy.get('#author_input').type(author);
        cy.get('#url_input').type(url);
        cy.get('#create_blog_btn').click();
      });

      it('Newly created blog is displayed', function() {
        const exp = new RegExp(`^(${title})`, 'g');
        cy.contains(exp);
        cy.contains(author);
      });

      it('Blog details can be viewed', function() {
        //get the <a> tag which contains the specific text and click it
        cy.get(`a:contains(${title})`).click();
        cy.contains(title);
        cy.contains(author);
        cy.contains(url);
      });

      it('Blog can be liked', function() {
        cy.get(`a:contains(${title})`).click();
        cy.contains('0');
        cy.get('button:contains(Like)').click();
        cy.contains('1');
        // cy.get('button:contains(Like)')
      });
    });
  });
});
