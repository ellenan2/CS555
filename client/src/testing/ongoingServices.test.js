import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import OngoingServices from "./OngoingServices";

jest.mock("axios");

const fakeServiceData = [
  {
    id: 1,
    title: "Service 1",
    desc: "Description for Service 1",
    fromDate: "2023-05-01",
    cost: 50,
    _id: "abc123",
  },
  {
    id: 2,
    title: "Service 2",
    desc: "Description for Service 2",
    fromDate: "2023-05-15",
    cost: 100,
    _id: "def456",
  },
];

describe("OngoingServices", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: fakeServiceData });
  });

  it("renders the loading message initially", () => {
    render(<OngoingServices />);
    const loadingMessage = screen.getByText("Loading . . . .");
    expect(loadingMessage).toBeInTheDocument();
  });

  it("renders the list of services when data is fetched successfully", async () => {
    render(<OngoingServices />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    const service1 = screen.getByText("Service 1");
    const service2 = screen.getByText("Service 2");
    expect(service1).toBeInTheDocument();
    expect(service2).toBeInTheDocument();
  });

  it("renders the error message when data fetching fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("404 Page Not Found"));
    render(<OngoingServices />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    const errorMessage = screen.getByText("404 Page Not Found");
    expect(errorMessage).toBeInTheDocument();
  });
});
