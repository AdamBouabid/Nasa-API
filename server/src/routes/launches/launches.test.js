
const app = require('../../app')
const request = require('supertest')
const {mongoConnection, mongoDisconnection} = require('../../utils/index')


describe('Launches API', () => {

    beforeAll(async () => {
        await  mongoConnection()
    })

    afterAll(async () => {
        await mongoDisconnection()
    })

    describe('Test GET /launches', () => {
        test('It should respond with 200 success',async () => {
            const response = await request(app)
                .get('/launches')
                .expect(200)
                .expect('Content-Type', /json/)
        })
    })

    describe('Test POST /launches', () => {
        const completeLaunchData = {
            mission: 'Kepler Exploration',
            rocket: 'Explorer IS1',
            launchDate: new Date('December 27, 2034 00:00:00').valueOf(),
            target: 'kepler-62 f'
        }
        const launchDataWithInvalidDate = {
            mission: 'Kepler Exploration',
            rocket: 'Explorer IS1',
            launchDate: 'dd',
            target: 'kepler-62 f'
        }
        const launchDataWithoutDate = {
            mission: 'Kepler Exploration',
            rocket: 'Explorer IS1',
            target: 'kepler-62 f'
        }
        test('It should respond with 201 created',async () => {
            const response = await request(app)
                .post('/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201)


            const requestDate = new Date(completeLaunchData.launchDate).valueOf()
            const responseDate = new Date(response.body.launchDate).valueOf()
            expect(responseDate).toBe(requestDate)

            expect(response.body).toMatchObject(launchDataWithoutDate)
        })



        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithoutDate)
                .expect(400)
                .expect('Content-Type', /json/)

            expect(response.body).toStrictEqual({
                error: 'Missing required parameters',
            })
        })
        test('It should catch invalid dates', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithInvalidDate)
                .expect(400)
                .expect('Content-Type', /json/)
            expect(response.body).toStrictEqual({
                error: 'Invalid launch date',
            })
        })
    })
})

