Feature: Project Management - View and Filter Projects
  As a user
  I want to view all projects and filter them
  So that I can find projects that interest me

  Background:
    Given the application is running
    And the database is seeded with 7 test projects
    And I am logged in as "erico@mail.ugm.ac.id"

  # Scenario 1: View all projects - Baseline
  Scenario: View all projects on the projects page
    Given I am on the projects page
    When the page loads
    Then I should see at least 5 projects
    And each project should display:
      | title          |
      | description    |
      | team_members   |
      | project_type   |

  # Scenario 2: Filter by project type - Equivalence Partitioning
  Scenario: Filter projects by PAD 1 type
    Given I am on the projects page
    When I select the "PAD 1" filter
    Then I should only see projects of type "PAD 1"
    And the number of displayed projects should be reduced
    And each project should have project_type containing "PAD 1"

  # Scenario 3: Filter by project type - Different equivalence class
  Scenario: Filter projects by PAD 2 type
    Given I am on the projects page
    When I select the "PAD 2" filter
    Then I should only see projects of type "PAD 2"
    And the number of displayed projects should be reduced

  # Scenario 4: Sort by newest - BVA
  Scenario: Sort projects by newest first
    Given I am on the projects page
    When I sort by "Newest"
    Then the projects should be displayed in descending order by creation date
    And the first project should be the most recently created

  # Scenario 5: Sort by oldest - BVA
  Scenario: Sort projects by oldest first
    Given I am on the projects page
    When I sort by "Oldest"
    Then the projects should be displayed in ascending order by creation date
    And the first project should be the oldest

  # Scenario 6: Pagination - BVA (Boundary)
  Scenario: Navigate through paginated projects
    Given I am on the projects page
    When there are more than 10 projects available
    And I click the next page button
    Then I should see the next set of projects
    And the page indicator should show the correct page number

  # Scenario 7: Search with filters - Equivalence Partitioning
  Scenario: Combined filter and sort
    Given I am on the projects page
    When I select "PAD 1" filter
    And I sort by "Newest"
    Then I should see only PAD 1 projects
    And they should be sorted by newest first
