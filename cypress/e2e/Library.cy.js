describe("The Book App e2e Tests", () => {
  it("Should login successfully", () => {
    cy.visit("http://localhost:3000");
    cy.login("test@test.com", "test");
    cy.contains("Submit").click();
    cy.get("#mail").then(($el) => $el[0].checkValidity()).should("be.false");
  });


  it("Should not login with empty login", () => {
    cy.visit("http://localhost:3000");
    cy.login("bropet@mail.ru", "123");
    cy.contains("Submit").click();
    cy.get("#pass").then(($el) => $el[0].checkValidity()).should("be.false");
  });

  it("Should not login with empty password", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Log in").click();
    cy.get("#mail").type("test@test.com");
    cy.contains("Submit").click();
    cy.get("#pass").then(($el) => $el[0].checkValidity()).should("be.false");
  });

  it("Should add books", () => {
    cy.visit("http://localhost:3000");
    cy.login("test@test.com", "test");
    cy.createBook(
      "1984",
      "О тоталитаризме, массовом наблюдении и промывании мозгов людей в тоталитарном обществе.",
      "Джордж Оруэлл"
    );
   cy.get("href='book/5ec200b1-6376-4f61-ac58-678124ef1c0e'> .h-100 > .card-body").should("be.visible");
  });

  it("Should delete book in favorites", () => {
    cy.viewport("iphone-6");
    cy.visit("http://localhost:3000");
    cy.login("test@test.com", "test"); 
    cy.contains("Delete from favorite").click();
    cy.contains("Favorites").click();
    cy.contains("Please add some book to favorites on home page!").should("be.visible"
    );
  });
});
