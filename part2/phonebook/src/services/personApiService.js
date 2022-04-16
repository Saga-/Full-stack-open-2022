import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);
}

const addNewPerson = () => {
  const request = axios.post(baseUrl);
  return request.then(res => res.data);
}

export default { getAllPersons, addNewPerson }
