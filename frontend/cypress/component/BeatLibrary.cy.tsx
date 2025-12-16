import React from "react";
import BeatLibrary from "../../src/Components/BeatLibrary.tsx";
import GlobalContext from "../../src/Components/GlobalContext.tsx";

describe("<BeatLibrary />", () => {
  beforeEach(() => {
    cy.mount(
      <GlobalContext.Provider
        value={{
          loggedInPlayer: 1,
          setLoggedInPlayer: () => {},
          loadedBeat: "",
          setLoadedBeat: () => {},
        }}
      >
        <BeatLibrary />;
      </GlobalContext.Provider>
    );
  });

  it("includes", () => {
    cy.get("[data-cy=beat]").should("be.visible");
    cy.get("[data-cy=beat]").select("Bongo").should("have.value", "Bongo");
    cy.get("[data-cy=beat]").select("Conga").should("have.value", "Conga");
  });
});
