describe('Formulário de Consultoria', () => {

    it.only('Deve Solicitar consultoria individual', () => {
        cy.start(); // commands.js
        cy.submitLoginForm('papito@webdojo.com', 'katana123'); // commands.js

        cy.goTo('Formulários', 'Consultoria');
        cy.get('#name').type('Maria Antonia'); //type para preencher
        cy.get('#email').type('mariaantonia@gmail.com');
        cy.get('input[placeholder="(00) 00000-0000"]') //propriedade
            .type('21 99435-3748') //teste com telefone
            .should('have.value', '(21) 99435-3748') //verifico se foi preenchido com a máscara

        // quando tem id no select posso fazer assim
        cy.get('#consultancyType').select('In Company')
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .click()
            .should('be.checked')

        //se pessoa jurídica estiver marcado não pode marcar pessoa física
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')

        cy.get('input[placeholder="00.000.000/0000-00"]')
            .type('56792004000104')
            .should('have.value', '56.792.004/0001-04')

        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ];

        discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked');
        });

        //upload do arquivo
        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/ARQUIVOPDF.pdf', { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.')

        const techs = [
            'Cypress',
            'Selenium',
            'WebDriveIO',
            'Playwright',
            'Robot Framework',
        ]

        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal')
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

    })

    it('Deve verificar os campos obrigatórios', () => {
        cy.start();
        cy.submitLoginForm('papito@webdojo.com', 'katana123');
        cy.goTo('Formulários', 'Consultoria');
        cy.contains('button', 'Enviar formulário').click()

        cy.contains('label', 'Nome Completo *')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório');

        cy.contains('label', 'Email *')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório');

        cy.contains('label', 'termos de uso')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Você precisa aceitar os termos de uso');


    })

})