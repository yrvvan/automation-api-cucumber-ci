const chai = require('chai');
var jp = require('jsonpath');
const { expect } = require('chai');
chai.use(require('chai-json-schema'));
const { Given, When, Then } = require('@cucumber/cucumber');

const app = require('../request_page/api_serve');
const allToken = process.env.TOKEN_GOREST;

let response, token;

Given('I am logged in as {string}', async function (user) {
    token = allToken;
});

When('I send a {string} request to {string} with path {string} and parameters:', async function (method, server, path, params) {
    // Convert headers and parameters strings to JSON
    const paramsObj = JSON.parse(params);
    const headersObj = paramsObj.headers;
    const parametersObj = paramsObj.parameters;

    // Add authorization if the endpoint accessed from external
    server === 'external' && (headersObj['Authorization'] = `Bearer ${token}`);

    // Determine the appropriate method and call the API function accordingly
    response = await (method === 'GET' ? app.getAPI(path, headersObj, parametersObj) : app.postAPI(path, headersObj, parametersObj));
});

// Assert response status
Then('the response should have status code {int}', function (statusCode) {
    expect(response.status).to.equal(statusCode);
});

// Assert json schema
Then('the response body should match the JSON schema {string}', function (schema) {
    let schemaPath = require(`../schema/${schema}`)
    expect(response.body).to.be.jsonSchema(schemaPath);
});

// Assert variables in response body
Then('the response body should contain {string} equal to {string}', function (variables, value) {
    const varValue = jp.query(response, variables);
    expect(varValue[0]).to.equal(value);
});