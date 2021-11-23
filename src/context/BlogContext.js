import createDataContext from "./createDataContext"
import jsonServer from "../api/jsonServer"

const blogReducer = (state, action) => { 
  switch(action.type) {
    case "get_blogposts":
      return action.payload
    /* case "add_blogpost":
      return [ 
        ...state, 
        {
          id: Math.floor(Math.random()*10000),
          title: action.payload.title,
          content: action.payload.content
        }
      ] */
    case "edit_blogpost":
        return [
          ...(state.filter( blogPost => blogPost.id !== action.payload.id )),
          {
            id: action.payload.id,
            title: action.payload.title,
            content: action.payload.content
          }
        ]   
    case "delete_blogpost":
      return state.filter( blogPost => blogPost.id !== action.payload)
    default:
        return state
  }
}  

const getBlogPosts = dispatch => {
  return async () => {
   const response = await jsonServer.get("blogposts")

   dispatch({type:"get_blogposts", payload: response.data })
  }
}

const  addBlogPost = dispatch => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogposts", {title, content})
    if(callback){
      callback()
    }  
  }       
}

const deleteBlogPost = dispatch => {
  return async id =>{
    await jsonServer.delete(`/blogposts/${id}`)
    // delete also the istance from local storage app
    dispatch({type:"delete_blogpost", payload: id})
  }       
}

const editBlogPost = dispatch =>{
  return (id, title, content, callback) =>{
    dispatch({
      type:"edit_blogpost", 
      payload:{id, title, content}
    })
    if(callback){
      callback()
    }   
  }
}  

export const { Context, Provider } = createDataContext( 
  blogReducer, 
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  [] 
)


