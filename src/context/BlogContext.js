import React, { useState } from "react"

const BlogContext = React.createContext()

export const BlogProvider = ({children}) => {
  const [ blogPosts, setBlogPosts] = useState([])

  // helper to add 1 element in the all array blogPosts as 
  // setBlogPosts replace the complete array
  const addBlogPost = () => {
    // check how to add dinamic id
    setBlogPosts([
      ...blogPosts, 
      {title:`Blog Post #${blogPosts.length+1}`, id:`${blogPosts.length+1}`} ])
  }

  return (
    <BlogContext.Provider value={{data: blogPosts, addBlogPost}}>
      {children}
    </BlogContext.Provider>
  )  
}

export default BlogContext

