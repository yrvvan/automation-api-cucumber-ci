require('dotenv').config();
const supertestProxy = require('supertest-with-proxy');
const url = process.env.URL_GOREST;
const api = supertestProxy(url);

const getAPI = (path, headers, payload) =>
    api.get(path)
        .set(headers)
        .query(payload);

const postAPI = (path, headers, payload) =>
    api.post(path)
        .set(headers)
        .send(payload);

module.exports = {
    getAPI,
    postAPI
};