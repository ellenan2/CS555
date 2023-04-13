import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import SalesRepBillingPage from "./SalesRepBillingPage";

jest.mock("axios");

describe("SalesRepBillingPage", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it("displays sales information", async () => {
    const mockData = [
      {
        service: "Service A",
        description: "Description A",
        date: "2022-01-01",
        customer: "Customer A",
        amount: 100.0,
      },
      {
        service: "Service B",
        description: "Description B",
        date: "2022-02-01",
        customer: "Customer B",
        amount: 200.0,
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<SalesRepBillingPage />);

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3001/users/billing/"
    );

    const serviceA = await screen.findByText("Service A");
    expect(serviceA).toBeInTheDocument();

    const serviceB = await screen.findByText("Service B");
    expect(serviceB).toBeInTheDocument();

    const descriptionA = await screen.findByText("Description A");
    expect(descriptionA).toBeInTheDocument();

    const descriptionB = await screen.findByText("Description B");
    expect(descriptionB).toBeInTheDocument();

    const dateA = await screen.findByText("2022-01-01");
    expect(dateA).toBeInTheDocument();

    const dateB = await screen.findByText("2022-02-01");
    expect(dateB).toBeInTheDocument();

    const customerA = await screen.findByText("Customer A");
    expect(customerA).toBeInTheDocument();

    const customerB = await screen.findByText("Customer B");
    expect(customerB).toBeInTheDocument();

    const amountA = await screen.findByText("100.00");
    expect(amountA).toBeInTheDocument();

    const amountB = await screen.findByText("200.00");
    expect(amountB).toBeInTheDocument();
  });

  it("displays an error message if sales information cannot be fetched", async () => {
    const errorMessage = "An error occurred while fetching sales information.";

    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    render(<SalesRepBillingPage />);

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3001/users/billing/"
    );

    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
  });
});
