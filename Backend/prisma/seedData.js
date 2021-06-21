 const users = [
    {
      username: 'john',
      email: 'john@email.com',
      password: 'john',
      imageUrl:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80',
      
    },
    {
      username: 'jane',
      email: 'jane@email.com',
      password: 'jane',
      imageUrl:
        'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2190&q=80',
      
    },
    {
      username: 'boss',
      email: 'boss@email.com',
      password: 'boss',
      imageUrl:
        'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2122&q=80',
    },
  ]

   const messages = [
    {
      uuid: '7648485a-6657-48d7-87d6-6a98931d3598',
      content: 'Hey Jane!',
      from: 'john',
      to: 'jane',
      
    },
    {
      uuid: 'ae4df4f1-a428-400d-bb16-edd4237e0c47',
      content: "Hey John, how's it going?",
      from: 'jane',
      to: 'john',
      
    },
    {
      uuid: '0a7c92ac-f69c-4799-8aad-9663a4afb47d',
      content: 'Not too bad, just getting to work, you?',
      from: 'john',
      to: 'jane',
      
    },
    {
      uuid: '240dd560-5825-4d5d-b089-12a67e8ec84c',
      content: "I'm working from home now",
      from: 'jane',
      to: 'john',
      
    },
    {
      uuid: 'fd4cee68-5caf-4b1b-80a9-5b9add7fd863',
      content: 'Hey John, are you done with that task?',
      from: 'boss',
      to: 'john',
      
    },
  ]

  module.exports = {messages, users}