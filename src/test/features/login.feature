Feature: User Authentication and Login Flow
  As a user
  I want to be able to login to the platform
  So that I can access my projects and profile

  Background:
    Given the application is running
    And the database is seeded with test data

  # Scenario 1: Valid Login - BVA (Boundary Value Analysis)
  Scenario: Successful login with valid UGM email
    Given I am on the login page
    When I enter a valid email "rainard@mail.ugm.ac.id"
    And I click the login button
    Then I should be redirected to the home page
    And I should see the user profile in the navbar
    And the local storage should contain a token

  # Scenario 2: Invalid Domain - Equivalence Partitioning
  Scenario: Failed login with non-UGM email domain
    Given I am on the login page
    When I enter an invalid email "user@gmail.com"
    And I click the login button
    Then I should see an error message
    And the error message should be "Login is only available for @mail.ugm.ac.id email addresses"
    And I should remain on the login page
    And the local storage should not contain a token

  # Scenario 3: Empty Email - BVA (Empty Input)
  Scenario: Login attempt with empty email
    Given I am on the login page
    When I leave the email field empty
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  # Scenario 4: Unregistered but valid domain email - Equivalence Partitioning
  Scenario: Login with valid domain but unregistered email
    Given I am on the login page
    When I enter an unregistered email "unknown@mail.ugm.ac.id"
    And I click the login button
    Then I should see an error message
    And the error message should contain "not registered"
    And I should remain on the login page

  # Scenario 5: Logout
  Scenario: User logout
    Given I am logged in as "rainard@mail.ugm.ac.id"
    When I click the logout button
    Then I should be redirected to the login page
    And the local storage should be cleared
