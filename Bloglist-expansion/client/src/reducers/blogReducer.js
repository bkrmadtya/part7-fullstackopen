import blogService from '../services/blogs';

import { setNotification } from './notificationReducer';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.payload;

    case 'NEW_BLOG':
      return [...state, action.payload];

    case 'LIKE_BLOG':
      const likedBlog = action.payload;
      console.log(likedBlog);
      return state.map(blog => (blog.id === likedBlog.id ? likedBlog : blog));

    case 'DELETE_BLOG':
      const id = action.payload;
      return state.filter(blog => blog.id !== id);

    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();

    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs
    });
  };
};

export const createBlog = blog => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.createBlog(blog);

      console.log(createdBlog);

      dispatch({
        type: 'NEW_BLOG',
        payload: createdBlog
      });

      dispatch(
        setNotification({
          message: `A new blog ${blog.title} added!`
        })
      );
    } catch (e) {
      dispatch(
        setNotification({
          message: 'Error creating blog',
          type: 'error'
        })
      );
    }
  };
};

export const likeBlog = blog => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.updateBlog(blog);

      dispatch({
        type: 'LIKE_BLOG',
        payload: likedBlog
      });

      dispatch(
        setNotification({
          message: `Blog ${blog.title} liked!`
        })
      );
    } catch (e) {
      dispatch(
        setNotification({
          message: 'Error liking blog',
          type: 'error'
        })
      );
    }
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(blog);
      dispatch({
        type: 'DELETE_BLOG',
        payload: blog.id
      });

      dispatch(
        setNotification({
          message: `Blog ${blog.title} deleted!`
        })
      );
    } catch (e) {
      dispatch(
        setNotification({
          message: 'Error deleting blog',
          type: 'error'
        })
      );
    }
  };
};

export default blogReducer;
