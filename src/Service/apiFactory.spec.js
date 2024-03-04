// Import the necessary modules
import axios from "axios";
import { getPageData, randomComparisonFunction } from "./apiFactory"; // Adjust the import path to where your getPageData function is located

// Mock the axios module
jest.mock("axios");

describe("getPageData", () => {
  it("fetches data successfully from an API", async () => {
    // Mock data that you expect to receive from the API
    const mockData = {
      data: {
        hits: [
          { objectID: "1", title: "a" },
          { objectID: "2", title: "b" },
        ],
      },
    };

    // Mock implementation of axios.get to resolve with mockData
    axios.get.mockResolvedValue(mockData);

    // Call the function with a test pageId
    const result = await getPageData(1);

    // Expect axios.get to have been called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      "https://hn.algolia.com/api/v1/search?page=1"
    );

    // Expect the result to match the mockData
    expect(result).toEqual(mockData);
  });

  it("fetches data with an error from an API", async () => {
    // Mock error to be thrown by axios.get
    const errorMessage = "Netwddofrkds Error";
    axios.get.mockRejectedValue(new Error(errorMessage));

    // Expect the function to throw an error when called
    await expect(getPageData(1)).rejects.toThrow(errorMessage);
  });
});

describe('randomComparisonFunction', () => {
    test('should return the larger of two numbers', () => {
        expect(randomComparisonFunction(1, 2)).toBe(2);
        expect(randomComparisonFunction(2, 1)).toBe(2);
    });

});
