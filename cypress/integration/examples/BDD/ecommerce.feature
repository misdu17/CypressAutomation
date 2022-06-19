Feature: End to end Ecommerce validation

    application regression

    Scenario: Ecommerce product delivery
    Given I open ecommerce page
    When I add items to cart
    And Validate the total price
    Then select the country submit and verify Thankyou

    Scenario: Filling the form to shop
    Given I open ecommerce page
    When I fill the form details
        | name  | gender |
        | syful | Male   |

    Then validate the forms behaviour
    And select the Shop Page