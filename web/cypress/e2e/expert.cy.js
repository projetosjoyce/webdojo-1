describe('Expert', () => {

    // beforeEach(() => {
    //     cy.start()
    // })

    it('Deve manipular os atributos de elementos do HTML', () => {
        cy.log('todo')

        cy.get('#email').invoke('val', 'papito@teste.com.br')

        cy.get('#password').invoke('attr', 'name', 'senha')

        cy.contains('button', 'Entrar')
            .invoke('hide')
            .should('not.be.visible')

        cy.contains('button', 'Entrar')
            .invoke('show')
            .should('be.visible')
    })

    it.only('Não deve logar com senha incorreta', () => {

        cy.visit('https://webdojo.vercel.app')

        cy.clock() // Congela o tempo

        cy.get('#email').type('papito@webdojo.com')
        cy.get('#password').type('pwd123')

        // Aciona um setTimeout de 5s
        cy.get('button[type="submit"]').click()

        cy.tick(100) // tempo para o toast aparecer (ajuste conforme necessário)

        cy.get('[data-sonner-toast]').should('be.visible').as('toast')

        cy.get('@toast')
            .find('[data-title]')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.tick(5000)

        cy.get('[data-sonner-toast]').should('not.exist')

    })

    it('Não deve logar com senha inválida', () => {

        cy.clock() // Congela o tempo

        cy.submitLoginForm('papito@webdojo.com', 'katana321')

        cy.tick(2000)

        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')
        
        cy.tick(5000)

        cy.get('@toast')
            .should('not.exist')
    })

})