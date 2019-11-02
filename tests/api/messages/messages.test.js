const User = require('../../../models/user')
const Message = require('../../../models/message')
const app = require('../../../app')
const supertest = require('supertest')

const api = supertest(app)

describe('testing messages', () => { 

  let newUser1
  let newUser2

  beforeEach(async () => {
    await User.deleteMany({})
    await Message.deleteMany({})

    newUser1 = {
      username: 'tero',
      password: 'sumussa'
    }

    newUser2 = {
      username: 'minna',
      password: 'sumussa'
    }

    await api
    .post('/api/signup')
    .send(newUser1)

    await api
    .post('/api/signup')
    .send(newUser2)


  })

  it('should be able to create a message', async () => {
    const tero = await api
    .post('/api/login')
    .send(newUser1)

    const { token, id } = tero.body

    const { _id } = await User.findOne({ username: newUser2.username })
    
    const newMessage = new Message({
      title: "hei, me lennetään",
      content: "no eino wiseguy",
      createdAt: new Date().toString(),
      author: id,
      receiver: _id
    })

    const response = await api
    .post('/api/messages')
    .set('Authorization', 'bearer ' + token)
    .send(newMessage)
    .expect(201)

    expect(response.body.title).toEqual('hei, me lennetään')
    expect(response.body.author).toEqual(id)
    expect(response.body.receiver).toEqual(_id.toString())

    const author = await User.findById(id).populate('sent')
    expect(author.sent[0].title).toEqual('hei, me lennetään')

    const receiver = await User.findById(_id).populate('inbox')
    expect(receiver.inbox[0].title).toEqual('hei, me lennetään')
  })


})