import React from "react";
import { render, screen } from "@testing-library/react";
import UserProfile from "./UserProfile";
import axios from "axios";

jest.mock("axios");

describe("UserProfile", () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    profilePicture: "http://example.com/profile.jpg",
  };

  it("renders user profile information correctly", async () => {
    axios.get.mockResolvedValueOnce({ data: user });

    render(<UserProfile {...user} />);

    expect(await screen.findByText(user.name)).toBeInTheDocument();
    expect(await screen.findByText(user.email)).toBeInTheDocument();
    expect(await screen.findByText(user.phoneNumber)).toBeInTheDocument();
    expect(await screen.findByAltText("User Profile")).toHaveAttribute(
      "src",
      user.profilePicture
    );
  });
});
