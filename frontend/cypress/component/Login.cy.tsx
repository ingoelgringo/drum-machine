import Login from "../../src/components/Login.tsx";
import { BrowserRouter } from "react-router-dom";
import GlobalContext from "../../src/Components/GlobalContext.tsx";

describe("<Login />", () => {
  beforeEach(() => {
    cy.mount(
      <GlobalContext.Provider
        value={{
          loggedInPlayer: null,
          setLoggedInPlayer: () => {},
          loadedBeat: "",
          setLoadedBeat: () => {},
        }}
      >
        <BrowserRouter>
          <Login />;
        </BrowserRouter>
      </GlobalContext.Provider>
    );
  });

  it("includes", () => {
    cy.get("[data-cy=nameInput]").should("be.visible");
    cy.get("[data-cy=pswInput]").should("be.visible");
    cy.get("[data-cy=inlogBtn]").should("be.visible");
  });

  it("login", () => {
    cy.get("[data-cy=nameInput]").type("Ingo");
    cy.get("[data-cy=pswInput]").type("password1");
    cy.get("[data-cy=inlogBtn]").click();
    cy.location("pathname").should("eq", "/");
  });

  it("need to fill form", () => {
    cy.get("[data-cy=inlogBtn]").click();
    cy.get("[data-cy=errorMessage]").contains(
      "You need to fill out name and password!"
    );
  });

  it("create account", () => {
    cy.get("[data-cy=nameInput]").type("JohnDoe");
    cy.get("[data-cy=pswInput]").type("password1");
    cy.get("[data-cy=createBtn]").click();
    cy.get("[data-cy=successMessage]").contains(
      "You have successfully created an account!"
    );
  });
});
