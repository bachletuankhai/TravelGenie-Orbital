import axios from "axios";
axios.defaults.baseURL = process.env.BACKEND_URL;
// axios.defaults.baseURL = "http://192.168.1.8:3000";

export async function listItineraries(userId) {
  if (!userId) {
    throw new Error("User not defined");
  }
  const api = '/itinerary/user/';
  console.log(axios.defaults.baseURL + api);
  return await axios.get(
      api,
      {
        params: {
          'id': userId,
        },
        headers: {
          'x-api-key': process.env.BACKEND_API_KEY,
        },
        timeout: 10000,
        timeoutErrorMessage: "Network Error",
      },
  );
}

export async function getItinerary(itemId) {
  if (!itemId) {
    throw new Error("Item id not defined");
  }
  const api = '/itinerary';
  console.log(api);
  return await axios.get(api, {
    params: {
      'id': itemId,
    },
    headers: {
      'x-api-key': process.env.BACKEND_API_KEY,
    },
    timeout: 10000,
    timeoutErrorMessage: "Network Error",
  });
}
