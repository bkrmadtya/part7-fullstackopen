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
      const deletedBlog = action.payload;
      return state.filter(blog => blog.id !== deletedBlog.id);

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
    const createdBlog = await blogService.createBlog(blog);

    dispatch({
      type: 'NEW_BLOG',
      payload: createdBlog
    });

    dispatch(
      setNotification({
        message: `A new blog ${blog.title} added!`
      })
    );
  };
};

export const likeBlog = blog => {
  return async dispatch => {
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
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    const deletedBlog = await blogService.deleteBlog(blog);
    dispatch({
      type: 'NEW_BLOG',
      payload: deletedBlog
    });

    dispatch(
      setNotification({
        message: `Blog ${blog.title} deleted!`
      })
    );
  };
};

export default blogReducer;
