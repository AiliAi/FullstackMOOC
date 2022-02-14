/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened',  function() {
    cy.contains('Blogs')
  })

  it('Login form is shown', function() {
    cy.contains('Login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.errorMessage')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(163, 24, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'test logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'test' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#createBlog').click()
      cy.contains('a blog created by cypress')
      cy.contains('cypress')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'cypress',
          url: 'www.cypress.com'
        })
        cy.createBlog({
          title: 'testing testing',
          author: 'testing',
          url: 'www.testing.com'
        })
        cy.createBlog({
          title: 'Ummamuuga',
          author: 'ummmanuunna',
          url: 'www.nummanunna.com'
        })
      })

      it('blog can be liked', function () {
        cy.contains('a blog created by cypress')
          .contains('view')
          .click()

        cy.get('.addLikes')
          .contains('like')
          .click()

        cy.get('.blog').should('contain', '1')

        cy.get('.addLikes')
          .contains('like')
          .click()

        cy.get('.blog').should('contain', '2')
      })

      it('a blog can be deleted', function() {
        cy.contains('a blog created by cypress')
          .contains('view')
          .click()

        cy.get('#deleteBlog')
          .click()

        cy.get('.message')
          .should('have.css', 'color', 'rgb(0, 163, 109)')

        cy.get('html').should('not.contain', 'a blog created by cypress')
      })
    })
  })
})