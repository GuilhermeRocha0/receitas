import axios from 'axios'

/*
  json-server --watch -d 180 --host 192.168.0.12 db.json
*/

const api = axios.create({
  baseURL: 'http://192.168.0.12:3000/'
})

export default api
