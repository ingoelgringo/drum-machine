describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("name", () => {
    cy.get("h1").contains("INGO BONGO");
  });

  it("knob selector", () => {
    cy.get("[data-cy=BD]").contains("BD");
    cy.get("[data-cy=BD]").should("have.css", "color", "rgb(50, 42, 26)");
    cy.get("[data-cy=BD]").click();
    cy.get("[data-cy=BD]").should("have.css", "color", "rgb(255, 66, 66)");
    cy.get("[data-cy=SD]").contains("SD");
    cy.get("[data-cy=SD]").should("have.css", "color", "rgb(50, 42, 26)");
    cy.get("[data-cy=SD]").click();
    cy.get("[data-cy=SD]").should("have.css", "color", "rgb(255, 66, 66)");
    cy.get("[data-cy=HH]").contains("HH");
    cy.get("[data-cy=HH]").should("have.css", "color", "rgb(50, 42, 26)");
    cy.get("[data-cy=HH]").click();
    cy.get("[data-cy=HH]").should("have.css", "color", "rgb(255, 66, 66)");
    cy.get("[data-cy=OH]").contains("OH");
    cy.get("[data-cy=OH]").should("have.css", "color", "rgb(50, 42, 26)");
    cy.get("[data-cy=OH]").click();
    cy.get("[data-cy=OH]").should("have.css", "color", "rgb(255, 66, 66)");
    cy.get("[data-cy=CL]").contains("CL");
    cy.get("[data-cy=CL]").should("have.css", "color", "rgb(50, 42, 26)");
    cy.get("[data-cy=CL]").click();
    cy.get("[data-cy=CL]").should("have.css", "color", "rgb(255, 66, 66)");
    cy.get("[data-cy=HT]").contains("HT");
    cy.get("[data-cy=HT]").should("have.css", "color", "rgb(50, 42, 26)");
    cy.get("[data-cy=HT]").click();
    cy.get("[data-cy=HT]").should("have.css", "color", "rgb(255, 66, 66)");
    cy.get("[data-cy=LT]").contains("LT");
    cy.get("[data-cy=LT]").should("have.css", "color", "rgb(50, 42, 26)");
    cy.get("[data-cy=LT]").click();
    cy.get("[data-cy=LT]").should("have.css", "color", "rgb(255, 66, 66)");
  });

  //! CYPRESS CANT HANDLE THIS TEST:

  // it("login and choose beat", () => {
  //   cy.get("[data-cy=LOGIN]").click();
  //   cy.get("[data-cy=nameInput]").type("Ingo");
  //   cy.get("[data-cy=pswInput]").type("password1");
  //   cy.get("[data-cy=inlogBtn]").click();
  //   cy.get("[data-cy=beat]").select("Conga");
  //   cy.get("[data-cy=BD]").click();
  //   cy.get("[data-cy=1]").should(
  //     "have.css",
  //     "background-image",
  //     "linear-gradient(340deg, rgb(255, 140, 140), rgb(182, 154, 103), rgb(182, 154, 103))"
  //   );
  // });

  it("pad-click", () => {
    cy.get("[data-cy=BD]").click();
    cy.get("[data-cy=1]").should(
      "have.css",
      "background-color",
      "rgb(182, 154, 103)"
    );
    cy.get("[data-cy=1]").click();
    cy.get("[data-cy=1]").should(
      "have.css",
      "background-image",
      "linear-gradient(340deg, rgb(255, 140, 140), rgb(182, 154, 103), rgb(182, 154, 103))"
    );
  });
});
