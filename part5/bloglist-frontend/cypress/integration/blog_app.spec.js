describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Janne Nylund',
      username: 'jnylund',
      password: 'qwerty'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown - 5.17', function() {
    cy.contains('BLOGS')
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials - 5.18', function() {
      cy.get('#username').type('jnylund')
      cy.get('#password').type('qwerty')
      cy.get('#login-button').click()

      cy.contains('Janne Nylund logged in')
    })

    it('fails with wrong credentials - 5.18', function() {
      cy.get('#username').type('jnylund')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('html').should('not.contain', 'Janne Nylund logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jnylund', password: 'qwerty' })
    })

    it('A blog can be created - 5.19', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('First blog created by cypress')
      cy.get('#author').type('Cypress Hill')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create-button').click()
      cy.contains('First blog created by cypress')
      cy.get('.notification').should('contain', 'New blog: First blog created by cypress, by Cypress Hill')
    })

    describe('When a blog is created', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Blog 1', author: 'Author 1', url: 'www.url1.com' })
      })
      it('it can be liked - 5.20', function () {

        cy.get('.default')
          .contains('view')
          .click()

        cy.get('.onView')
          .should('contain', 'Likes: 0')

        cy.get('.onView')
          .contains('like')
          .click()

        cy.get('.onView')
          .should('contain', 'Likes: 1')

        cy.get('.onView')
          .contains('like')
          .click()

        cy.get('.onView')
          .should('contain', 'Likes: 2')
      })
    })

    describe('When a blog is created', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Blog 1', author: 'Author 1', url: 'www.url1.com' })
      })
      it('it can be deleted  - 5.21', function () {

        cy.get('.default')
          .contains('view')
          .click()

        cy.get('.onView')
          .should('contain', 'Blog 1')

        cy.get('.onView')
          .contains('Remove')
          .click()

        cy.get('.onView')
          .should('not.contain', 'Blog 1')

        cy.get('.notification').should('contain', 'Blog "Blog 1" was removed')
      })
    })
    describe('When several blogs are created they are sorted by likes', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Blog 1', author: 'Author 1', url: 'www.url1.com', likes: 2 })
        cy.createBlog({ title: 'Blog 2', author: 'Author 2', url: 'www.url2.com' })
        cy.createBlog({ title: 'Blog 3', author: 'Author 3', url: 'www.url3.com', likes: 3  })
        cy.createBlog({ title: 'Blog 4', author: 'Author 4', url: 'www.url4.com', likes: 1  })
      })

      it('in order of most likes to least likes - 5.22', function () {
        cy.get('.onView').eq(0)
          .should('contain', 'Likes: 3')
        cy.get('.onView').eq(1)
          .should('contain', 'Likes: 2')
        cy.get('.onView').eq(2)
          .should('contain', 'Likes: 1')
        cy.get('.onView').eq(3)
          .should('contain', 'Likes: 0')
      })
    })

  })
})