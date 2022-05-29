const User = require('../models/User');

const initialUsers = [
  {
    name: 'John Connor',
    username: 'johnc',
    password: '1234'
  },
  {
    name: 'Dan Donnell',
    username: 'dand22',
    password: '5678'
  },
  {
    name: 'James Darcy',
    username: 'jd88',
    password: 'password'
  }
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialUsers,
  usersInDb
}
