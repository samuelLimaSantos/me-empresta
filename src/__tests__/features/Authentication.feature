Feature: Authenticate user
  Feature Description: the possibility to authenticate in application

Scenario: Entering a correct email and password
  Given I have previously created an user with email and password
  When I enter my email and password correctly
  Then I should be able to authenticate in application

Scenario: Entering a wrong email
  When I enter an incorrect email
  Then I should not be able to authenticate in application

Scenario: Entering a wrong password
  Given I have previously created an user with email and password
  When I enter my email correctly
  And I enter my password incorrectly
  Then I should not be able to authenticate in application


