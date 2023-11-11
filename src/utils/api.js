const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
   
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
   
  }

export const postEndpoints ={

  NEWPOST_API: BASE_URL + "/post/newPost",
  GET_ALL_POST_API: BASE_URL + "/post/getAllPost",

}  