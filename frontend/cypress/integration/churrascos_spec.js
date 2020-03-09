describe('Churrasco', function() {

    before(() => {
        cy.task('db:clean');

        cy.server()
        cy.server().route("POST", '/user/').as('createUser')

        cy.visit('/register');

        cy.get('.input:first').type('Bruno');
        cy.get('.input:nth-of-type(2)').type('Rodrigues');
        cy.get('.input:nth-of-type(3)').type('bruno@email.com');
        cy.get('.input:nth-of-type(4)').type('password');

        cy.contains('Registrar').click();
        cy.wait('@createUser');
    });

    beforeEach(() => {
        cy.visit("/login");

        cy.get('.input:first').type('bruno@email.com');
        cy.get('.input:nth-of-type(2)').type('password');

        cy.contains('Entrar').click();
    });

    it('Successfully loads churrascos page', () => {
        cy.url().should('include', '/churrascos');
    });

    it('Create a churrasco', () => {
        cy.get(".info svg").click();
        
        cy.get('.input:first').type('Churrasco Test');
        cy.get('.input:nth-of-type(2)').type('Descrição do churrasco aqui.');
        cy.get('.input:nth-of-type(3)').type('2020-10-20');
        cy.get('.input:nth-of-type(4)').type('50');
        cy.get('.input:nth-of-type(5)').type('40');

        cy.contains('Criar').click();
    });

    it('Successfully loads the churrasco page', () => {
        cy.contains('Churrasco Test').click();

        cy.url().should('include', '/churrasco/');
    });

    it('Add participant to the churrasco', () => {
        cy.contains('Churrasco Test').click();

        cy.get('.people__add').click();
        
        cy.get('.participant__add__modal .input:first').type('Rodrigo');
        cy.get('.participant__add__modal .input:nth-of-type(2)').type('100');

        cy.get('.participant__add__modal .button').click();
    });

    it('Delete participant of the churrasco', () => {
        cy.contains('Churrasco Test').click();

        cy.contains('Rodrigo').click();

        cy.get('.churrasco__box .button').click();

        cy.get('.info__money .money .money__total').should('have.text', '0');
    });

    it("Delete the churrasco", () => {
        cy.contains('Churrasco Test').click();

        cy.get('.churrasco__remove').click();

        cy.contains('Sim').click();

        cy.url().should('include', '/churrascos');
    });
});