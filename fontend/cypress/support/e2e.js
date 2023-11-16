// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import '@cypress/code-coverage/support';

beforeEach(() => {
  cy.intercept('GET', 'http://localhost:6001/socket.io/*', {
    body: 'socket.io',
  }).as('socket.io');
  cy.intercept('GET', 'http://localhost:8000/api/mangas*', {});
  cy.intercept('GET', 'http://localhost:8000/api/me/recommendation', {});
  cy.intercept('GET', 'http://localhost:8000/api/categories', {
    statusCode: 200,
    fixture: 'manga/categories.json',
  }).as('categories');
});
