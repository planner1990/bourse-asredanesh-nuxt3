async function getUser (userName, axios) {
  if (userName) {
    return await axios.get('user/' + userName)
  } else {
    return await axios.get('user/')
  }
}

async function getUserList (searchModel, axios) {
  return await axios.post('user/list', searchModel)
}

async function updateUser (form, axios) {
  return await axios.post('user/update', form)
}

async function createUser (form, axios) {
  return await axios.post('user/', form)
}

async function deleteUser (form, axios) {
  return await axios.get('user/delete/' + form)
}

const userRoles = [
  {
    value: 'ADMIN',
    text: 'user.roles.ADMIN'
  },
  {
    value: 'OPERATOR',
    text: 'user.roles.OPERATOR'
  },
  {
    value: 'REPORTER',
    text: 'user.roles.REPORTER'
  }
]

export default {
  getUser,
  getUserList,
  createUser,
  deleteUser,
  updateUser,
  userRoles
}
