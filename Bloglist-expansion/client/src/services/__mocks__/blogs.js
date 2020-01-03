const blogs = [
  {
    title: "Sample blog",
    author: "Sample author 1",
    url: "www.sample1.com",
    likes: 0,
    user: {
      username: "Jon Doe"
    }
  },
  {
    title: "Second sample blog",
    author: "Sample author 2",
    url: "www.sample2.com",
    likes: 0,
    user: {
      username: "Jon Doe"
    }
  },
  {
    title: "Third Sample blog",
    author: "Sample author 3",
    url: "www.sample3.com",
    likes: 0,
    user: {
      username: "Jon Doe"
    }
  }
];

let token = null;

const getAll = () => {
  return Promise.resolve(blogs);
};

const setToken = newToken => {
  token = newToken;
};

export default { getAll, setToken };
