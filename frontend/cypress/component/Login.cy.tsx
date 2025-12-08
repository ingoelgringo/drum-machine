import Login from "../../src/components/Login.tsx";

describe("<Login />", () => {
  it("includes", () => {
    cy.mount(<Login />);
    cy.get("#nameInput").should("be.visible");
    cy.get("#pswInput").should("be.visible");
    cy.get("button").should("be.visible");
    cy.get("link").contains("Sign up");
  });
  it("sign up", () => {
    cy.mount(<Login />);
    cy.get("link").click();
    cy.get("#nameInput").should("be.visible");
    cy.get("#pswInput").should("be.visible");
    cy.get("button").should("be.visible");
    cy.get("link").contains("Log in");
  });
  it("need to fill form", () => {
    cy.get("button").click();
    cy.get("#message").contains("You need to fill out name and password!");
  });
  it("create account", () => {
    cy.get("link").click();
    cy.get("#nameInput").type("JohnDoe");
    cy.get("#pswInput").type("Password1");
    cy.get("button").click();
    cy.get("#message").contains("You've successfully created an account'!");
  });
});
