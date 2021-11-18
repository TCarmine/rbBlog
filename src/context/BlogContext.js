import React, { useReducer } from "react"

const BlogContext = React.createContext()

const blogReducer = (state, action) => { 
  switch(action.type) {
    case "add_blogpost":
      return [ ...state, {title:`Blog Post #${state.length+1}`, id:`${state.length+1}`}]
    default:
        return state
  }
}  

export const BlogProvider = ({children}) => {
  const [ blogPosts, dispatch] = useReducer(blogReducer, [])
  
  // helper to add 1 element in the all array blogPosts as 
  // setBlogPosts replace the complete array
  const addBlogPost = () => {
    dispatch({type:"add_blogpost"})     
  }

  return (
    <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
      {children}
    </BlogContext.Provider>
  )  
}

export default BlogContext

