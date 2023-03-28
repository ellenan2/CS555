import React from "react";
import { shallow } from "enzyme";
import UserProfile from "../components/UserProfile";

describe("UserProfile", () => {
  it("renders the user profile with correct props", () => {
    const props = {
      profilePicture: "https://example.com/profile.jpg",
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1 123-456-7890",
    };
    const wrapper = shallow(<UserProfile {...props} />);
    expect(wrapper.find(".user-profile")).toHaveLength(1);
    expect(wrapper.find("img").prop("src")).toEqual(props.profilePicture);
    expect(wrapper.find("h2").at(0).text()).toEqual(props.name);
    expect(wrapper.find("h2").at(1).text()).toEqual(props.email);
    expect(wrapper.find("p").text()).toEqual(props.phoneNumber);
  });
});
