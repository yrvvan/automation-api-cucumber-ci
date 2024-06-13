Feature: API Testing
Scenario: GET /public/v2/users
Given I am logged in as 'gorest'
When I send a 'GET' request to 'external' with path '/public/v2/users' and parameters:
"""
{
"headers": {
"Content-Type": "application/json"
},
"parameters": {
"status": "inactive"
}
}
"""
Then the response should have status code 200
And the response body should contain "$.body..status" equal to "inactive"