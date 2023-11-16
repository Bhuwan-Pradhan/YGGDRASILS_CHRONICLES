import { toast } from "react-hot-toast";

import { apiConnector } from "./apiConnector";
import { groupEndpoints } from "../utils/api";

const {
 NEWGROUP_API
} = groupEndpoints


export function newGroup(name, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    
    try {
      const response = await apiConnector("POST", NEWGROUP_API, 
        name,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })

      console.log("NEWGROUP API RESPONSE............", response)



      toast.success("Group Created Successful")
      //dispatch(setToken(response.data.token))

navigate("/home")

     
    } catch (error) {
      console.log("New Group API ERROR............", error)
      toast.error("Group Not Created")
    }

    toast.dismiss(toastId)
  }
}











