import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import CurrentOffers from "./CurrentOffers";

jest.mock("axios");

describe("CurrentOffers component", () => {
  test("should render loading message when data is being fetched", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<CurrentOffers />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  test("should render error message when fetching data fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("404"));

    render(<CurrentOffers />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(/404 page not found/i)).toBeInTheDocument();
  });

  test("should render list of offers when data is fetched successfully", async () => {
    const mockData = [
      {
        _id: "1",
        title: "Offer 1",
        description: "Description 1",
        fromDate: "2022-01-01",
        price: 100,
      },
      {
        _id: "2",
        title: "Offer 2",
        description: "Description 2",
        fromDate: "2022-01-02",
        price: 200,
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<CurrentOffers />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

    expect(screen.getByText(/current offers/i)).toBeInTheDocument();

    expect(screen.getByText(/offer 1/i)).toBeInTheDocument();
    expect(screen.getByText(/offer 2/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/go to/i));

    // add more test cases as needed
  });
});
