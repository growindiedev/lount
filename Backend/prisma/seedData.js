 const users = [
    {
      username: 'henry',
      email: 'henry@email.com',
      password: 'henry',
      imageUrl:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80',
      
    },
    {
      username: 'jane',
      email: 'jane@email.com',
      password: 'jane',
      imageUrl:'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2190&q=80',
      
    },
    {
      username: 'boss',
      email: 'boss@email.com',
      password: 'boss',
      imageUrl:'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2122&q=80',
    },
  ]

   const messages = [
    {
      content: 'Hey Jane!',
      from: 'henry',
      to: 'jane',
      
    },
    {
      content: "Hey henry, how's it going?",
      from: 'jane',
      to: 'henry',
      
    },
    {
      content: 'Not too bad, just getting to work, you?',
      from: 'henry',
      to: 'jane',
      
    },
    {
      content: "I'm working from home now",
      from: 'jane',
      to: 'henry',
      
    },
    {
      content: "That's cool! I'm joining the 'remote club' too",
      from: 'henry',
      to: 'jane',
      
    },
    {
      content: 'Really? how come?',
      from: 'jane',
      to: 'henry',
    },
    {
      content: 'got promoted to a consultancy role',
      from: 'henry',
      to: 'jane',
    },
    {
      content: "That's amazing!! well done!",
      from: 'jane',
      to: 'henry',
    },
    {
      content: 'Thanks ;)',
      from: 'john',
      to: 'jane',
    },
    
    {
      content: 'Hey henry, are you done with that task?',
      from: 'boss',
      to: 'henry',
      
    },
    {
      content: 'It\'s almost done',
      from: 'henry',
      to: 'boss',
      
    },
  ]

  module.exports = {messages, users}