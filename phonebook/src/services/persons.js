import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important:true,
  }
  return request.then(response => {
    return response.data
  })
}

const remove = (id) => {
  const urlToDelete = `${baseUrl}/${id}`;
  return axios.delete(urlToDelete);
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data);
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, update, remove}