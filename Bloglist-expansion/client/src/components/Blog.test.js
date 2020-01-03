import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Blog from "./Blog";

describe("<Blog />", () => {
  let component;

  const sampleBlog = {
    title: "Sample blog",
    author: "Sample author",
    url: "www.sample.com",
    likes: 0,
    user: {
      username: "Jon Doe"
    }
  };

  beforeEach(() => {
    component = render(<Blog blog={sampleBlog} />);
  });

  test("only blog name and author are shown by default", () => {
    const blogContainer = component.container.querySelector(".blogPost");
    expect(blogContainer).toHaveTextContent(sampleBlog.title);
    expect(blogContainer).toHaveTextContent(sampleBlog.author);
    expect(blogContainer).not.toHaveTextContent(sampleBlog.url);
  });

  test("when the blog post is clicked, other information is visible", () => {
    const blogContainer = component.container.querySelector(".blogPost");
    expect(blogContainer).not.toHaveTextContent(sampleBlog.url);

    fireEvent.click(blogContainer);

    expect(blogContainer).toHaveTextContent(sampleBlog.title);
    expect(blogContainer).toHaveTextContent(sampleBlog.author);
    expect(blogContainer).toHaveTextContent(sampleBlog.url);
    expect(blogContainer).toHaveTextContent(sampleBlog.likes + " likes");
    expect(blogContainer).toHaveTextContent(
      "added by " + sampleBlog.user.username
    );
  });
});
