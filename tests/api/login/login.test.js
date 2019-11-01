const User = require('../../../models/user')
const app = require('../../../app')
const supertest = require('supertest')

const api = supertest(app)

describe('testing login', () => {
  beforeEach( async () => {

    await User.deleteMany({})

    await api
    .post('/api/signup')
    .send({
      username: 'timo',
      password: 'kauluri'
    })
  })

  it('should login with good credentials', async () => {
    const response = await api
    .post('/api/login')
    .send({
      username: 'timo',
      password: 'kauluri'
    })
    .expect(200)

    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('username')

  })

  it('should fail login with wrong credentials', async () => {
    await api
    .post('/api/login')
    .send({
      username: 'timo',
      password: 'autotalli'
    })
    .expect(401)
  })

})