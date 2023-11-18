const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {

  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",

}

export const postEndpoints = {

  NEWPOST_API: BASE_URL + "/post/newPost",
  GET_ALL_POST_API: BASE_URL + "/post/getAllPost",
  LIKE_POST_API: BASE_URL + "/post/like",
  COMMENT_POST_API: BASE_URL + "/post/comment",
  GET_COMMENTS_POST_API: BASE_URL + "/post/getComment",
  GET_USER_POST_API: BASE_URL + "/post/getPost",

}

export const groupEndpoints = {

  NEWGROUP_API: BASE_URL + "/group/createGroup",
  GET_ALL_GROUP_API: BASE_URL + "/group/getAllGroup",
  ADD_MODERATOR_API: BASE_URL + "/group/addModerator",
  ADD_MEMBER_API: BASE_URL + "/group/addMember",
  SEARCH_MEMBER_API: BASE_URL + "/group/searchMember",


}  