const request = require('supertest');
const app = require('../../app.js');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET / launches', () => {
    test('It should response with 200', async () => {
      await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('Test POST / launches', () => {
    const completeLaunchData = {
      target: 'Kepler-62 f',
      mission: 'SuperTest Mission',
      rocket: 'TEST rocket',
      launchDate: 'January 22, 2033',
    };

    const launchDataWithoutDate = {
      target: 'Kepler-62 f',
      mission: 'SuperTest Mission',
      rocket: 'TEST rocket',
    };

    const launchDataInvalidDate = {
      target: 'Kepler-62 f',
      mission: 'SuperTest Mission',
      rocket: 'TEST rocket',
      launchDate: 'not-possible!',
    };

    test('It should response with 201', async () => {
      const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

      const sendedDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(sendedDate).toBe(responseDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing requirements props', async () => {
      const response = await request(app)
        .post('/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Missing required launch property ',
      });
    });

    test('It should catch invalid date', async () => {
      const response = await request(app)
        .post('/launches')
        .send(launchDataInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Invalid date provided, please type valid date!',
      });
    });
  });
});
