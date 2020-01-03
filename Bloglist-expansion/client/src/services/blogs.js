import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
  console.log(token);
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateBlog = async newBlog => {
  const config = {
    headers: { Authorization: token }
  };

  const updatedBlog = await axios.put(
    baseUrl + "/" + newBlog.id,
    newBlog,
    config
  );
  return updatedBlog.data;
};

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  };

  const deletedBlog = await axios.delete(baseUrl + "/" + blog.id, config);
  return deletedBlog.data;
};

export default { getAll, setToken, createBlog, updateBlog, deleteBlog };
