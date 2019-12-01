const User = require('../../../models/user')
const Profile = require('../../../models/profile')
const app = require('../../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const data = require('../../helperData/data')

const api = supertest(app)



describe('search profiles', () => {

  let user1

  beforeAll(async () => {

    await User.deleteMany({})
    await Profile.deleteMany({})
    
    await api
    .post('/api/user/signup')
    .send(data.newUser1)

    await api
    .post('/api/user/signup')
    .send(data.newUser2)

    await api
    .post('/api/user/signup')
    .send(data.newUser3)

    user1 = await api
    .post('/api/user/login')
    .send({ username: data.newUser1.username, password: data.newUser1.password })
    
  })

  it('should test searching profiles v1', async () => {

    
    const { token } = user1.body

    const age = [23, 24]
    const gender = 'female'

    const response = await api
    .post('/api/profiles/search')
    .set('Authorization', 'bearer ' + token)
    .send({ age, gender })
    .expect(200)

    expect(response.body.profiles.length).toBe(1)
    expect(response.body.profiles[0].username).toEqual('minna')

  })

  it('should test searching profiles v2', async () => {

    
    const { token } = user1.body

    const age = [23, 33]
    const gender = 'female'

    const response = await api
    .post('/api/profiles/search')
    .set('Authorization', 'bearer ' + token)
    .send({ age, gender })
    .expect(200)

    expect(response.body.profiles.length).toBe(2)
    expect(response.body.profiles[0].username).toEqual('henriikka')

  })


  it('should test searching profiles v3', async () => {

    
    const { token } = user1.body

    const age = [24, 30]
    const gender = 'female'

    const response = await api
    .post('/api/profiles/search')
    .set('Authorization', 'bearer ' + token)
    .send({ age, gender })
    .expect(200)

    expect(response.body.profiles.length).toBe(0)
    expect(response.body.profiles).toEqual([])

  })


  afterAll( async () => {
    await mongoose.connection.close()
  })

})