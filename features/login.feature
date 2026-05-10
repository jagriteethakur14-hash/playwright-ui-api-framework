Feature: SauceDemo Login and Shopping

  Background:
    Given user navigates to the login page

  Scenario: Login should be successful with valid credentials
    When user logs in with valid standard user credentials
    Then the products page should be displayed

  Scenario: Login should fail for locked out user
    When user logs in with locked out user credentials
    Then an error message should be displayed

  Scenario: User should add product to cart successfully
    When user logs in with valid standard user credentials
    And user adds a product to the cart
    And user navigates to the cart page
    Then the product should be visible in the cart
