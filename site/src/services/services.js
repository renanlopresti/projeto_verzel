import axios from 'axios';
import { BASE_URL } from '../constants/url';
import { goToHomePage, goToLoginPage } from '../routes/coordinator';

export const login = (body, history, setIsLoading) => {
 setIsLoading(true)
 axios.post(`${BASE_URL}/users/signup`, body)
  .then((res) => {
   localStorage.setItem("token", res.data.token)
   setIsLoading(false)
   goToHomePage(history)
  })
  .catch((err) => {
   console.log(err.response)
   alert(err.response.data.errors.message)
   setIsLoading(false)
  })
}

export const getModules = (setIsLoading, setModules) => {
 setIsLoading(true)
 axios.get(`${BASE_URL}/modules`)
  .then((res) => {
   setModules(res.data.result)
   setIsLoading(false)
  })
  .catch((err) => {
   console.log(err.response)
   setIsLoading(false)
  })
}

export const getClassRoom = (
 setIsLoading,
 setClassRoom,
 id,
) => {
 setIsLoading(true)
 axios.get(`${BASE_URL}/class/${id}`)
  .then((res) => {
   setClassRoom(res.data.result)
   setIsLoading(false)
  })
  .catch((err) => {
   console.log(err.response)
   setIsLoading(false)
  })
}