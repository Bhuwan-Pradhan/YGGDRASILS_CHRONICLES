import { toast } from "react-hot-toast";

import { apiConnector } from "./apiConnector";
import { postEndpoints } from "../utils/api";

const {
  NEWPOST_API,
} = postEndpoints


export function newPost(title, body, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")

    try {
      const response = await apiConnector("POST", NEWPOST_API, {
        title,
        body,
      }, {
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