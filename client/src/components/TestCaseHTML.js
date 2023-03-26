const axios = require("axios");

describe("HTML file availability", () => {
  const urls = [
    "http://localhost:8080/ongoing_services.html",
    "http://localhost:8080/request_services.html",
    "http://localhost:8080/current_offers.html",
  ];

  it.each(urls)("should return 200 status code for %s", async (url) => {
    const response = await axios.get(url);
    expect(response.status).toEqual(200);
  });

  describe("Work Service Request Form", () => {
    it("should submit the form successfully", async () => {
      const formUrl = "http://localhost:8080/request_services.html";
      const formData = {
        name: "John Doe",
        phone: "123-456-7890",
        service: "Plumbing",
        description: "I need my sink fixed",
      };
      const response = await axios.post(formUrl, formData);
      expect(response.status).toEqual(200);
      expect(response.data).toContain("Thank you for your request");
    });
  });
});
