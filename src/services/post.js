import { toast } from "react-hot-toast";

import { apiConnector } from "./apiConnector";
import { postEndpoints } from "../utils/api";

const {
  NEWPOST_API,
  GET_ALL_POST_API,
  LIKE_POST_API,
  COMMENT_POST_API,
  GET_COMMENTS_POST_API,
  GET_USER_POST_API,
  DELETE_POST_API,
} = postEndpoints


export function newPost(formData, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    
    try {
      const response = await apiConnector("POST", NEWPOST_API, 
        formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })

      console.log("NEWPOST API RESPONSE............", response)



      toast.success("Post Successful")
      //dispatch(setToken(response.data.token))

navigate("/")

     
    } catch (error) {
      console.log("New Post API ERROR............", error)
      toast.error("post Failed")
    }

    toast.dismiss(toastId)
  }
}

export const getAllPost = async () => {
  // const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_POST_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch posts")
    }
    result = response?.data
  } catch (error) {
    console.log("GET_ALL_POST_API API ERROR............", error)
    toast.error(error.message)
  }
  // toast.dismiss(toastId)
  return result
}


export function likePost(token, post) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")


    try {
      const response = await apiConnector("POST", LIKE_POST_API, {
        post,
      }, {
        Authorization: `Bearer ${token}`,
      })

      console.log("LIKE POST API RESPONSE............", response)



      toast.success("Liked Successful")
      //dispatch(setToken(response.data.token))



      
    } catch (error) {
      console.log("LIKE Post API ERROR............", error)
      toast.error("liked Failed")
    }


    toast.dismiss(toastId)

  }
}

export function commentPost(token, post, body) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")


    try {
      const response = await apiConnector("POST", COMMENT_POST_API, {
        post, body,
      }, {
        Authorization: `Bearer ${token}`,
      })

      console.log("COMMENT POST API RESPONSE............", response)



      toast.success("Comment Successful")
      //dispatch(setToken(response.data.token))



     
    } catch (error) {
      console.log("COMMENT Post API ERROR............", error)
      toast.error("COMMENT Failed")
    }


    // toast.dismiss(toastId)

  }
}


export const getComment = async (post) => {
  // const toastId = toast.loading("Loading...")
  let result = null
  try {

    const response = await apiConnector("POST", GET_COMMENTS_POST_API, { post, })
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch comments")
    }
    result = response?.data
  } catch (error) {
    console.log("GET_ALL_COMMENT_API API ERROR............", error)
    toast.error(error.message)
  }
  // toast.dismiss(toastId)
  return result
}

export const getUserPost = async (id,token) => {
  // const toastId = toast.loading("Loading...")
  let result = null
  try {
  
    const response = await apiConnector("POST", GET_USER_POST_API,{id},{
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch posts")
    }
    result = response?.data
  } catch (error) {
    console.log("GET_USER_POST_API API ERROR............", error)
    toast.error(error.message)
  }
  // toast.dismiss(toastId)
  return result
}



export function deletePost(token, postId) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")


    try {
      const response = await apiConnector("POST", DELETE_POST_API, {
        postId,
      }, {
        Authorization: `Bearer ${token}`,
      })

      console.log("DELETE POST API RESPONSE............", response)



      toast.success("Post Deleted Successful")
      //dispatch(setToken(response.data.token))



      
    } catch (error) {
      console.log("Delete Post API ERROR............", error)
      toast.error("post deletation Failed")
    }


    toast.dismiss(toastId)

  }
}