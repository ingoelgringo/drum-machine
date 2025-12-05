describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("passes", () => {
    cy.get("h1").contains("IngoBongo");
  });
});
