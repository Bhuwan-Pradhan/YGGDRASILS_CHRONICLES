const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {

  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  SEARCH_MEMBER_API: BASE_URL + "/auth/searchMember",
  FOLLOW_MEMBER_API: BASE_URL + "/auth/follow",
  UNFOLLOW_MEMBER_API: BASE_URL + "/auth/unfollow",

}

export const postEndpoints = {

  NEWPOST_API: BASE_URL + "/post/newPost",
  GET_ALL_POST_API: BASE_URL + "/post/getAllPost",
  LIKE_POST_API: BASE_URL + "/post/like",
  DISLIKE_POST_API: BASE_URL + "/post/dislike",
  COMMENT_POST_API: BASE_URL + "/post/comment",
  GET_COMMENTS_POST_API: BASE_URL + "/post/getComment",
  GET_USER_POST_API: BASE_URL + "/post/getPost",
  DELETE_POST_API: BASE_URL + "/post/delete",
  REPOST_POST_API: BASE_URL + "/post/repost",
  UPDATE_POST_API: BASE_URL + "/post/update",

}

export const groupEndpoints = {

  NEWGROUP_API: BASE_URL + "/group/createGroup",
  GET_ALL_GROUP_API: BASE_URL + "/group/getAllGroup",
  ADD_MODERATOR_API: BASE_URL + "/group/addModerator",
  ADD_MEMBER_API: BASE_URL + "/group/addMember",
  GET_ALL_POST_API: BASE_URL + "/group/allPost",
  INVITE_TO_GROUP_API: BASE_URL + "/group/invite",
  REQUEST_TO_JOIN_API: BASE_URL + "/group/request",
  ACCEPT_THE_REQUEST_API: BASE_URL + "/group/accept",
  


}  