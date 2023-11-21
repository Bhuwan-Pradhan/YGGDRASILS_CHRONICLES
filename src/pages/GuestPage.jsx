import React, { useEffect, useState } from "react";
import PostContainer from "../components/core/Post/PostContainer";
import { getAllPost } from "../services/post";
import NavBar from "../components/common/NavBar";

const GuestPage = () =>{
    const [postData, setPostData] = useState();
    const getAllData = async () => {
        try {
          const getPost = await getAllPost();
    
          setPostData(getPost);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getAllData();
      }, []);
      console.log(postData);

      return (
        <div>
             <NavBar />
        <div className="MainContentDiv">
          {postData?.data.map((post) => (
            <PostContainer
              id={post._id}
              image={post.user.image}
              name={post.author}
              title={post.title}
              body={post.body}
              isLike={post.likes.includes("")}
              likes={post.likes.length}
              comments={post.comments.length}
              isUser={false}
              isGuest={true}
              user={post.user}
            />
          ))}
        </div>
        </div>
      )
}

export default GuestPage;