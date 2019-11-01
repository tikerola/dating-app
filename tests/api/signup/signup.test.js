
const User = require('../../../models/user')
const app = require('../../../app')
const supertest = require('supertest')

const api = supertest(app)

describe('testing signup', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const newUser = new User({
      username: 'maija',
      passwordHash: 'idontgiveashit'
    })

    await newUser.save()
  })

  it('should sign up with valid credentials', async () => {
    const newUser = {
      username: 'tero',
      password: 'sumussa'
    }

    expect.assertions(1)

    const response = await api
    .post('/api/signup')
    .send(newUser)
    .expect(201)

    expect(response.body.username).toEqual('tero')

  })

  it('should fail when user by same username exists', async () => {
    const newUser = {
      username: 'maija',
      password: 'idontgiveashit'
    }

    const response = await api
    .post('/api/signup')
    .send(newUser)
    .expect(409)

  })

})