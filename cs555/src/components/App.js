import { render, screen } from "@testing-library/react";
import Login from "./Login.js";
import SignUp from "./SignUp.js";
test("renders learn react link", () => {
  render(<Login />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  render(<SignUp />);
  const linkElement2 = screen.getByText(/learn react/i);
  expect(linkElement2).toBeInTheDocument();
});
