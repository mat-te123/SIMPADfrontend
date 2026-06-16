Feature: Project Details and User Interactions
  As a user
  I want to view project details and interact with projects
  So that I can see team information and post comments

  Background:
    Given the application is running
    And the database is seeded with test data
    And I am logged in as "erico@mail.ugm.ac.id"

  # Scenario 1: View project details - Basic functionality
  Scenario: View project details page
    Given I am on the projects list page
    When I click on project "E-Commerce Platform Redesign"
    Then I should be redirected to the project details page
    And I should see the project title
    And I should see the project description
    And I should see the team members list
    And I should see existing comments

  # Scenario 2: Team members display - Equivalence Partitioning
  Scenario: View project team members
    Given I am on a project details page
    Then I should see a team members section
    And the section should display at least 1 team member
    And each team member should show:
      | name    |
      | role    |
      | profile |

  # Scenario 3: Post comment - BVA (Valid input)
  Scenario: Post a comment on a project
    Given I am on a project details page
    When I fill in the comment field with "Great project implementation!"
    And I click the post comment button
    Then the comment should be posted successfully
    And I should see my comment in the comments section
    And the comment should display my username and profile picture

  # Scenario 4: Post empty comment - BVA (Empty/Invalid input)
  Scenario: Attempt to post empty comment
    Given I am on a project details page
    When I leave the comment field empty
    And I click the post comment button
    Then I should see a validation error
    And no comment should be posted
    And I should remain on the project details page

  # Scenario 5: Comment length validation - Equivalence Partitioning
  Scenario: Post comment with very long text
    Given I am on a project details page
    When I fill in the comment field with a 500-character message
    And I click the post comment button
    Then the comment should be posted successfully
    And the long text should be displayed correctly

  # Scenario 6: View own project permissions - Authorization
  Scenario: Owner can see edit and delete buttons on own project
    Given I am viewing a project I own (as Erico)
    Then I should see the "Edit Project" button
    And I should see the "Delete Project" button

  # Scenario 7: View other's project permissions - Authorization
  Scenario: User cannot see edit and delete buttons on others' projects
    Given I am viewing a project I don't own
    Then I should NOT see the "Edit Project" button
    And I should NOT see the "Delete Project" button
    But I should see the "Add Comment" button

  # Scenario 8: View YouTube video - Content verification
  Scenario: YouTube video is embedded in project details
    Given I am on a project details page
    When the project has a youtube_video_url
    Then I should see an embedded YouTube player
    And I should be able to play the video

  # Scenario 9: Comments persistence - Data integrity
  Scenario: Posted comments persist after refresh
    Given I am on a project details page
    When I post a comment "Test comment"
    And I refresh the page
    Then I should still see the comment I posted
    And the comment should display the correct timestamp
