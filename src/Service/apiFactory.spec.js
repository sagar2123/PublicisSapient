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

  test('should return the value itself when both numbers are equal', () => {
        expect(randomComparisonFunction(2, 2)).toBe(2);
    });

    // If your function should handle non-numeric inputs differently, add tests here
    // For example, comparing strings or handling undefined/null inputs

    test('should return the numerically larger value when comparing strings that can be converted to numbers', () => {
        expect(randomComparisonFunction('10', '2')).toBe('10'); // Assuming it compares them as numbers, not lexicographically
    });

    test('should handle negative numbers correctly', () => {
        expect(randomComparisonFunction(-1, -2)).toBe(-1);
        expect(randomComparisonFunction(-2, -1)).toBe(-1);
    });
});

describe('testSum', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(testSum(1, 2)).toBe(3);
    });

    test('adds -1 + 2 to equal 1', () => {
        expect(testSum(-1, 2)).toBe(1);
    });

    test('adds 0 + 0 to equal 0', () => {
        expect(testSum(0, 0)).toBe(0);
    });

    test('adds decimal numbers correctly', () => {
        expect(testSum(1.5, 2.3)).toBeCloseTo(3.8);
    });

    // Test with larger numbers if necessary
    test('adds large numbers correctly', () => {
        expect(testSum(1000, 2000)).toBe(3000);
    });
});
