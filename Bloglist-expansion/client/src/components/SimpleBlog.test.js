import React from "react";
import { render, fireEvent } from "@testing-library/react";

import SimpleBlog from "./SimpleBlog";

describe("<SimpleBlog />", () => {
  let component;

  const sampleBlog = {
    title: "New testing book",
    author: "Jon Doe",
    likes: 5
  };

  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(<SimpleBlog blog={sampleBlog} onClick={mockHandler} />);
  });

  test("blog title is displayed correct", () => {
    expect(component.container).toHaveTextContent(sampleBlog.title);
  });

  test("blog author is displayed correct", () => {
    expect(component.container).toHaveTextContent(sampleBlog.author);
  });

  test("blog likes is displayed correct", () => {
    const result = "blog has " + sampleBlog.likes + " likes";
    expect(component.container).toHaveTextContent(result);
  });

  test("like button is called twice when event handler is called twice", () => {
    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
