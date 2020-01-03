import React from "react";
import { render, waitForElement, prettyDOM } from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  test("if no user logged, blogs are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("Login"));

    const loginButton = component.getByText("Login");
    expect(loginButton).toBeDefined();
    expect(component.container).toHaveTextContent("Login");

    const blog = component.container.querySelectorAll(".blogPost");
    expect(blog.length).toBe(0);
  });

  test("if user is logged in, blogs are rendered", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Donald Tester"
    };

    localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() =>
      component.container.querySelectorAll(".blogPost")
    );

    const blogs = component.container.querySelectorAll(".blogPost");
    expect(blogs.length).toBe(3);
  });
});
