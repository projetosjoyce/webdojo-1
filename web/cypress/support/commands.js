
Cypress.Commands.add('start', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
})

// email e senha
Cypress.Commands.add('submitLoginForm', (email, senha) => {
    cy.get('#email').type(email);
    cy.get('#password').type(senha);
    cy.contains('button', 'Entrar').click();
})

// Acesso rápido do dashboard 
Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
    cy.contains('button', buttonName)
        .should('be.visible').click();
    cy.contains('h1', pageTitle)
        .should('be.visible')
})