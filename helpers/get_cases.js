require('dotenv').config();
const axios = require('axios');
const fs = require('fs').promises;
const token = process.env.QASE_TOKEN;
const myArgs = process.argv.slice(2);
const testPlanId = myArgs[0];
const headers = {
    'Token': token,
    'accept': 'application/json'
}

const getPlanDetails = async () => {
    try {
        const response = await axios.get(`https://api.qase.io/v1/plan/IDPOS/${testPlanId}`, { headers });

        const planData = response.data.result;
        const caseIds = planData.cases.map(caseData => caseData.case_id);

        const caseDetails = await Promise.all(caseIds.map(async (caseId) => {
            const caseResponse = await axios.get(`https://api.qase.io/v1/case/IDPOS/${caseId}`, { headers });
            return caseResponse.data;
        }));
        try {
            for (const caseResponse of caseDetails) {
                const { id, title, description } = caseResponse.result;
                const fileName = `gorest/features/${title.replace(/\s+/g, '_').toLowerCase()}.feature`;
                const content = `${description.replace(/\\/g, '')}`;

                await fs.writeFile(fileName, content);
                console.log(`File '${fileName}' has been created.`);
            }
        } catch (error) {
            console.error('Error writing feature file:', error);
            throw error;
        }
        return { planData, caseDetails };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Example usage
getPlanDetails()
    .then(data => {
        // console.log('Plan details:', data.planData);
        // console.log('Case details:', data.caseDetails);
    })
    .catch(error => {
        console.error('Error:', error);
    });
