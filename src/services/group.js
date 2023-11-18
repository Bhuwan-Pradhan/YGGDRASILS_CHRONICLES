import { toast } from "react-hot-toast";

import { apiConnector } from "./apiConnector";
import { groupEndpoints } from "../utils/api";

const {
 NEWGROUP_API,
 GET_ALL_GROUP_API,
 ADD_MODERATOR_API,
 ADD_MEMBER_API,

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


export const getAllGroup = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_GROUP_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch groups")
    }
    result = response?.data
  } catch (error) {
    console.log("GET_ALL_GROUP_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}





export function addModerator(groupId, userId, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
   
    try {
      const response = await apiConnector("POST", ADD_MODERATOR_API,
      {
        groupId,
        userId,
      } ,
        
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })

      console.log("ADD MODERATOR API RESPONSE............", response)


      

      toast.success("Moderator Added Successful")
      //dispatch(setToken(response.data.token))

navigate("/allGroups")

     
    } catch (error) {
      console.log("ADD MODERATOR API ERROR............", error)
      toast.error("User is already a Moderator of Group")
    }

    toast.dismiss(toastId)
  }
}


export function addMember(groupId, userId, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
   
    try {
      const response = await apiConnector("POST", ADD_MEMBER_API,
      {
        groupId,
        userId,
      } ,
        
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })

      console.log("ADD MEMBER API RESPONSE............", response)


      

      toast.success("Member Added Successful")
      //dispatch(setToken(response.data.token))

navigate("/allGroups")

     
    } catch (error) {
      console.log("ADD MEMBER API ERROR............", error)
      toast.error("User is already a Member of Group")
    }

    toast.dismiss(toastId)
  }
}










