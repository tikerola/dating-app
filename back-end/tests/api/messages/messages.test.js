const User = require('../../../models/user')
const Message = require('../../../models/message')
const Profile = require('../../../models/profile')
const app = require('../../../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const api = supertest(app)

describe('testing messages', () => {

  let newUser1
  let newUser2
  let tero

  beforeAll(async () => {
    await User.deleteMany({})
    await Message.deleteMany({})
    await Profile.deleteMany({})

    newUser1 = {
      username: 'tero',
      password: 'sumussa',
      gender: 'male',
      age: 23,
      birthday: new Date()
    }

    newUser2 = {
      username: 'minna',
      password: 'sumussa',
      gender: 'female',
      age: 23,
      birthday: new Date()
    }

    const result = await api
      .post('/api/user/signup')
      .send(newUser1)


    await api
      .post('/api/user/signup')
      .send(newUser2)


      tero = await api
      .post('/api/user/login')
      .send({ username: newUser1.username, password: newUser1.password })
  })

  it('should be able to create a message', async () => {
   
    const { token, username } = tero.body

    const newMessage = new Message({
      title: "hei, me lennetään",
      content: "no eino wiseguy",
      author: username,
      receiver: newUser2.username
    })

    const response = await api
      .post('/api/messages')
      .set('Authorization', 'bearer ' + token)
      .send(newMessage)
      .expect(201)

    

    expect(response.body.title).toEqual('hei, me lennetään')
    expect(response.body.author).toEqual(username)
    expect(response.body.receiver).toEqual(newUser2.username)

    const author = await User.findOne({ username }).populate('sent')
    expect(author.sent[0].title).toEqual('hei, me lennetään')

    const receiver = await User.findOne({ username: newUser2.username }).populate('inbox')
    expect(receiver.inbox[0].title).toEqual('hei, me lennetään')
  })

  it('should be able to fetch inbox', async () => {

    const { token } = tero.body

    const response = await api
      .get('/api/messages/inbox')
      .set('Authorization', 'bearer ' + token)

    expect(response.body).toEqual([])

  })

  it('should be able to fetch sent mail', async () => {
    const { token } = tero.body

    const response = await api
      .get('/api/messages/sent')
      .set('Authorization', 'bearer ' + token)
    
    expect(response.body[0].title).toEqual('hei, me lennetään')
  })

  afterAll( async () => {
    await mongoose.connection.close()
  })
})