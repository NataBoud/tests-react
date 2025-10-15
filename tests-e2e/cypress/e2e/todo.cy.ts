/// <reference types="cypress" />

describe("Todo App - Tests E2E", () => {

    beforeEach(() => {
        cy.visit("/"); // le baseUrl est défini dans cypress.config.ts
    });

    it("affiche 'Aucune tâche' au départ", () => {
        cy.contains("Aucune tâche").should("be.visible");
    });


    it("ajoute une nouvelle tâche et l'affiche dans la liste", () => {

        cy.get('input[placeholder="Nouvelle tâche"]').type("Acheter du pain", { delay: 150 });
        cy.wait(500)
        cy.contains("Ajouter").click();
        cy.wait(500)
        cy.contains("Acheter du pain").should("be.visible");
        cy.contains("Aucune tâche").should("not.exist");
    });

 
    it("supprime la tâche et réaffiche 'Aucune tâche'", () => {

        cy.get('input[placeholder="Nouvelle tâche"]').type("Acheter du pain", { delay: 300 });
        cy.wait(1000); // pause après la saisie

        cy.contains("Ajouter").click();
        cy.wait(1000); // pause après l'ajout pour visualiser l'effet

        cy.contains("Acheter du pain").should("be.visible");

        cy.contains("Acheter du pain")
            .parent() // remonte au <li>
            .find("button")
            .contains("Supprimer")
            .click();
        cy.wait(1000); // pause après la suppression

        
        cy.contains("Acheter du pain").should("not.exist");
        cy.contains("Aucune tâche").should("be.visible");
    });

});
