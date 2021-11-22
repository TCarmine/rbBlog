import createDataContext from "./createDataContext"

const blogReducer = (state, action) => { 
  switch(action.type) {
    case "add_blogpost":
      return [ 
        ...state, 
        {
          id: Math.floor(Math.random()*10000),
          title: action.payload.title,
          content: action.payload.content
        }
      ]
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

const addBlogPost = dispatch => {
  return (title, content, callback) =>{
    dispatch({type:"add_blogpost", payload:{title:title, content:content}})
    if(callback){
      callback()
    }  
  }       
}

const deleteBlogPost = dispatch => {
  return (id) =>{
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
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{title:"Test Post", content:"Content test", id:1}] 
)


