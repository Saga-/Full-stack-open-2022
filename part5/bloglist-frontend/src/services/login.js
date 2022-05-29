import axios from 'axios';

const baseUrl = '/api/login';

async function login(credentials) {
  const response = await axios.post(baseUrl, credentials);
  console.log('response data', response.data);
  window.localStorage.setItem('blogAppUser', JSON.stringify(response.data));
  return response.data;
}

async function logout() {
  window.localStorage.removeItem('blogAppUser');
}

export default { login, logout };
