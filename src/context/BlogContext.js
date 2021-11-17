import React, { useState } from "react"

const BlogContext = React.createContext()

export const BlogProvider = ({children}) => {
  const [ blogPosts, setBlogPosts] = useState([])

  // helper to add 1 element in the all array blogPosts as 
  // setBlogPosts replace the complete array
  const addBlogPost = () => {
    // check how to add dinamic id
    setBlogPosts([...blogPosts, {title:`Blog Post #${blogPosts.length+1}`, id:`${blogPosts.length+1}`} ])
  }

/*   const blogPosts = [
    {title: "Blog Post #1", id:1},
    {title: "Blog Post #2", id:2},
    {title: "Blog Post #3", id:3},
    {title: "Blog Post #4", id:4},
  ] */

  return (
    <BlogContext.Provider value={{data: blogPosts, addBlogPost}}>
      {children}
    </BlogContext.Provider>
  )  
}

export default BlogContext

