const fs = require('fs');

function addToEnvFile(variableName, value) {
    // Construct the string to append
    const envString = `${variableName}=${value}\n`;

    // Append the string to the .env file
    fs.appendFile('.env', envString, (err) => {
        if (err) {
            console.error('Error appending to .env file:', err);
            return;
        }
        console.log(`Added ${variableName}=${value} to .env file`);
    });
}

function deleteFromEnvFile(variableName) {
    // Read the contents of the .env file
    fs.readFile('.env', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading .env file:', err);
            return;
        }

        // Split the content into lines
        const lines = data.split('\n');

        // Filter out the line containing the variable to delete
        const updatedContent = lines.filter(line => {
            const [name] = line.split('=');
            return name.trim() !== variableName;
        }).join('\n');

        // Write the updated content back to the .env file
        fs.writeFile('.env', updatedContent, (err) => {
            if (err) {
                console.error('Error writing to .env file:', err);
                return;
            }
            console.log(`Deleted ${variableName} from .env file`);
        });
    });
}

// Usage example
// addToEnvFile('NEW_VARIABLE', 'new_value');
// deleteFromEnvFile('VARIABLE_NAME_TO_DELETE');

module.exports = {
    addToEnvFile,
    deleteFromEnvFile
};