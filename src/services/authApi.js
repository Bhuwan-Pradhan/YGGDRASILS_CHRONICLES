import { toast } from "react-hot-toast";

import { setLoading, setToken, setUser } from "../slices/authSlice";
import { apiConnector } from "./apiConnector";
import { endpoints } from "../utils/api";

const {
    SIGNUP_API,
    LOGIN_API,
    FOLLOW_MEMBER_API,
    UNFOLLOW_MEMBER_API,
  } = endpoints

export function signUp(
  userName,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          userName,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        })
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }


  export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
        // const userImage = response.data?.user?.image
        //   ? response.data.user.image
        //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        // dispatch(setUser({ ...response.data.user, image: userImage }))
        
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }


  
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}


export function follow(token, userId) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")


    try {
      const response = await apiConnector("POST", FOLLOW_MEMBER_API, {
        userId,
      }, {
        Authorization: `Bearer ${token}`,
      })

      console.log("FOLLOW API RESPONSE............", response)



      toast.success("Followed Successful")
      //dispatch(setToken(response.data.token))



      
    } catch (error) {
      console.log("Follow API ERROR............", error)
      toast.error("Follow Failed")
    }


    toast.dismiss(toastId)

  }
}


export function unfollow(token, userId) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")


    try {
      const response = await apiConnector("POST", UNFOLLOW_MEMBER_API, {
        userId,
      }, {
        Authorization: `Bearer ${token}`,
      })

      console.log("UNFOLLOW API RESPONSE............", response)



      toast.success("UNFollowed Successful")
      //dispatch(setToken(response.data.token))



      
    } catch (error) {
      console.log("UNFollow API ERROR............", error)
      toast.error("UNFollow Failed")
    }


    toast.dismiss(toastId)

  }
}

  