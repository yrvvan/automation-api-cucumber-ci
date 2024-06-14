# Automation API using Cucumber and JavaScript
This project demonstrates how to automate API testing using Cucumber and JavaScript. It provides a structured framework for writing and executing API tests with ease.

## Features
- **BDD Approach**: Utilizes Behavior-Driven Development (BDD) principles with Cucumber to write human-readable test scenarios.
- **Modular Structure**: Organizes tests, step definitions, and configuration files in a modular structure for maintainability and scalability.
- **HTTP Requests**: Performs HTTP requests using libraries like `axios`, `request-promise`, or any other preferred library.
- **Assertions**: Validates API responses using assertion libraries like `Chai` or native assertion methods.
- **Reporting**: Generates comprehensive test reports for easy analysis using Cucumber's reporting capabilities or custom reporting solutions.
- **Configuration Management**: Allows configuration management for different environments (e.g., development, staging, production).

## Prerequisites
- Node.js and npm installed on your machine.
- Basic understanding of JavaScript and API testing concepts.

## Getting Started
1. **Clone the repository**:
2. **Install dependencies**:
3. **Define API endpoints**:
    Modify the `api_serve.js` file to specify the base URLs for different environments and other configuration options.
4. **Write feature files**:
    Create `.feature` files under the `features` directory to describe test scenarios using Gherkin syntax.
5. **Implement step definitions**:
    Write step definitions in JavaScript under the `step_definitions` directory to define the behavior for each step in the feature files.
6. **Run tests**:
    Execute the tests using the following command:

## Directory Structure
- npm run test-gorest

cucumber-automation-api/
│
├── features/ # Feature files (test scenarios)
│ ├── sample.feature # Example feature file
|    └── ...
│
│ ├── step_definitions/ # Step definitions (test logic)
|    └── api_steps.js
|    └── ...
│
| ├── request_page/ # Step definitions (test logic)
|    └── api_serve.js
|    └── ...
│
| ├── schema/ # Step definitions (test logic)
|    └── ..._schema.js
|    └── ...
│
| ├── data/ # Step definitions (test logic)
|    └── ..._data.js
|    └── ...
│
├── helpers/ # Step definitions (test logic)
│ ├── get_cases.js # Example step definitions
│ └── ...
│
├── report/ # Support files (hooks, utilities)
│ └── ...
│
├── package.json # Node.js dependencies and scripts
└── ...




