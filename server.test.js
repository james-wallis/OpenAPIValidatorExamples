const jestOpenAPI = require('jest-openapi');
const request = require('supertest');
const path = require('path');
const server = require('./server');

jestOpenAPI(path.join(__dirname, './openapi.yml'));

describe('server.js', () => {
  it('should make a GET request and satisfy OpenAPI spec', async () => {
    // Make request (supertest used here)
    const res = await request(server).get('/hello');
    // Make any assertions as normal
    expect(res.status).toEqual(200);
    // Assert that the HTTP response satisfies the OpenAPI spec
    expect(res).toSatisfyApiSpec();
  });

  it('should make a POST request and satisfy OpenAPI spec', async () => {
    const res = await request(server).post('/hello');

    expect(res.status).toEqual(202);

    // Assert that the HTTP response satisfies the OpenAPI spec
    expect(res).toSatisfyApiSpec();
  });

  it('should make a GET request, receive a 418 code and satisfy OpenAPI spec', async () => {
    const res = await request(server).get('/customcode');
    expect(res.status).toEqual(418);
    // Assert that the HTTP response satisfies the OpenAPI spec
    expect(res).toSatisfyApiSpec();
  });

  it('should make a GET request, receive an object and satisfy OpenAPI spec', async () => {
    const res = await request(server).get('/object');

    expect(res.status).toEqual(200);

    // Assert that the HTTP response satisfies the OpenAPI spec
    expect(res).toSatisfyApiSpec();
  });
});
