/*
 * Example usage:
 * const myParams = {
 *    name: 'John Doe',
 *    age: 30,
 *    hobbies: ['reading', 'gaming', 'coding']
 * };
 * const queryString = objectToQueryString(myParams);
 * Output: "name=John%20Doe&age=30&hobbies[]=reading&hobbies[]=gaming&hobbies[]=coding"
 * */
const dtoToQueryStr = (obj: object): string =>
  // Convert object entries into encoded query parameters
  // Join all parameters with '&'
  Object.entries(obj)
    .map(([key, value]) => {
      // Encode both key and value, join them with '=', and handle array values
      if (Array.isArray(value)) {
        // For arrays, create a key-value pair for each item
        return value
          .map(item => `${encodeURIComponent(key)}[]=${encodeURIComponent(item)}`)
          .join("&");
      }
      // For single values, create a single key-value pair
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");

export { dtoToQueryStr };
