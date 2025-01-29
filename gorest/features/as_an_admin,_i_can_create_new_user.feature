Feature: API Testing
Scenario: POST /public/v2/users
Given I am logged in as 'gorest'
When I send a 'POST' request to 'external' with path '/public/v2/users' and parameters:
"""
{
"headers": {
"Content-Type": "application/json"
},
"parameters": {
"name": "Sriradj Kumar",
"gender": "male",
"email": "sriradj.kumar@yopmail.com",
"status": "active"
}
}
"""
Then the response should have status code 201
And the response body should contain "$.body.status" equal to "active"
And the response body should contain "$.body.name" equal to "Sriradj Kumar"
And the response body should match the JSON schema "post_create_user_schema.json"