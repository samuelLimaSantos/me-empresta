Feature: Create user
  Feature Description: the possibility to create a new user in application

Scenario: Entering all correct data
  Given I have created an user object with all correct data
  When I make a request to endpoint for create user
  Then I had an created user

Scenario: Entering an existent email
  Given I have created an user
  When I make a request to create an user with a same email that I used when I created a previously user
  Then I should not be able to create a user


