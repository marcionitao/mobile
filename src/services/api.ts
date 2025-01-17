import axios from 'axios'
// ao executar a app, verificar no console se o ip da maquina esta correto
export const api = axios.create({
  baseURL: 'http://192.168.132.119:3333',
  timeout: 700,
})
