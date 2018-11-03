import axios from 'axios'

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

// const baseUrl = process.env.REACT_APP_SERVER 
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
  }

export default { getAll, create, update, remove }