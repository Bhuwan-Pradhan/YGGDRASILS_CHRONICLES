import { toast } from "react-hot-toast";

import { apiConnector } from "./apiConnector";
import { groupEndpoints } from "../utils/api";

const {
  NEWGROUP_API,
  GET_ALL_GROUP_API,
  ADD_MODERATOR_API,
  ADD_MEMBER_API,
  GET_ALL_POST_API,
  INVITE_TO_GROUP_API,
  REQUEST_TO_JOIN_API,
  ACCEPT_THE_REQUEST_API,

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

      navigate("/allGroups")


    } catch (error) {
      console.log("New Group API ERROR............", error)
      toast.error("Group Not Created")
    }

    toast.dismiss(toastId)
  }
}


export const getAllGroup = async () => {
  // const toastId = toast.loading("Loading...")
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
  // toast.dismiss(toastId)
  return result
}





export function addModerator(fromData, token, newJoin) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")

    try {
      const response = await apiConnector("POST", ADD_MODERATOR_API,
        fromData,

        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        })

      console.log("ADD MODERATOR API RESPONSE............", response)




      toast.success(` ${newJoin} new Moderators are Added Successfully`)
      //dispatch(setToken(response.data.token))




    } catch (error) {
      console.log("ADD MODERATOR API ERROR............", error)
      toast.error("Failed")
    }

    toast.dismiss(toastId)
  }
}


export function addMember(fromData, token, newJoin) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")

    try {
      const response = await apiConnector("POST", ADD_MEMBER_API,
        fromData,

        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        })

      console.log("ADD MEMBER API RESPONSE............", response)




      toast.success(` ${newJoin} new Members are Added Successfully`)
      //dispatch(setToken(response.data.token))




    } catch (error) {
      console.log("ADD MEMBER API ERROR............", error)
      toast.error("Failed")
    }

    toast.dismiss(toastId)
  }
}


export const getGroupPost = async (id) => {
  // const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("POST", GET_ALL_POST_API, id)
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



export function inviteMember(fromData, token, newJoin) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")


    try {
      const response = await apiConnector("POST", INVITE_TO_GROUP_API,
        fromData,

        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        })

      console.log("INVITE TO GROUP API RESPONSE............", response)



      toast.success(` ${newJoin} new Members are Invited Successfully`)
      //dispatch(setToken(response.data.token))




    } catch (error) {
      console.log("Invite API ERROR............", error)
      toast.error("Invitation  Failed")
    }


    // toast.dismiss(toastId)

  }
}



export function requestToJoinGroup(groupId, token) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")

    
    try {
      const response = await apiConnector("POST", REQUEST_TO_JOIN_API,
      {
        id: groupId,
      },

        {
          Authorization: `Bearer ${token}`,
        })

      console.log("REQUEST TO GROUP API RESPONSE............", response)



      toast.success("Request send successfully");
      //dispatch(setToken(response.data.token))




    } catch (error) {
      console.log("Request API ERROR............", error)
      toast.error("Request  Failed")
    }


    // toast.dismiss(toastId)

  }
}





