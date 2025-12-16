import React from "react";
import BeatLibrary from "./BeatLibrary";

describe("<BeatLibrary />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BeatLibrary />);
  });
});
