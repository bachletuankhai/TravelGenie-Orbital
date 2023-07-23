import axios from "axios";
axios.defaults.baseURL = process.env.BACKEND_URL;
// axios.defaults.baseURL = "http://192.168.1.8:3000";

export async function listItineraries(userId) {
  if (!userId) {
    throw new Error("User not defined");
  }
  const api = '/itinerary/user/';
  console.log(axios.defaults.baseURL + api);
  try {
    const res = await axios.get(
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
    return res.data?.results;
  } catch (error) {
    console.log("listItineraries error: " + error.message);
  }
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

export async function createItinerary(
    userId,
    name,
    startDate,
    endDate,
    location,
    photoUrl,
) {
  const api = '/itinerary';
  try {
    const res = await axios.post(
        api,
        {
          userId,
          name,
          startDate,
          endDate,
          location,
          photoUrl,
        },
        {
          headers: {
            'x-api-key': process.env.BACKEND_API_KEY,
          },
          timeout: 10000,
          timeoutErrorMessage: "Network Error",
        });
    if (res.data.error) {
      throw new Error(error);
    } else {
      return res.data;
    }
  } catch (error) {
    console.log(`createItinerary error: ${error}`);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    return { error };
  }
}

export async function createPlanItem(
    planId,
    name,
    subtitle,
    date,
    startTime,
    endTime,
    placeId,
) {
  const api = "/itinerary/items";
  console.log(api);
  console.log("id: " + planId);
  console.log("name: " + name);
  console.log("subtitle: " + subtitle);
  console.log('date: ' + date);
  console.log('startTime' + startTime);
  console.log('endTime: ' + endTime);
  console.log('placeId: ' + placeId);
  try {
    const res = await axios.post(
        api,
        {
          name,
          subtitle,
          date,
          startTime,
          endTime,
          placeId,
        },
        {
          headers: {
            'x-api-key': process.env.BACKEND_API_KEY,
          },
          params: {
            'id': planId,
          },
          timeout: 10000,
          timeoutErrorMessage: "Network Error",
        });
    if (res.data.error) {
      throw new Error(error);
    } else {
      return res.data;
    }
  } catch (error) {
    console.log(`createItinerary error: ${error}`);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    return { error };
  }
}

export async function updateItinerary(
    id,
    name,
    startDate,
    endDate,
    location,
    photoUrl,
) {
  const api = "/itinerary";
  console.log(api);
  try {
    const res = await axios.put(
        api,
        {
          name,
          startDate,
          endDate,
          location,
          photoUrl,
        },
        {
          headers: {
            'x-api-key': process.env.BACKEND_API_KEY,
          },
          params: {
            'id': id,
          },
          timeout: 10000,
          timeoutErrorMessage: "Network Error",
        });
    if (res.data.error) {
      throw new Error(error);
    } else {
      return res.data;
    }
  } catch (error) {
    console.log(`createItinerary error: ${error}`);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    return { error };
  }
}

export async function deleteItinerary(id) {
  const api = "/itinerary";
  console.log(api);
  try {
    const res = await axios.delete(
        api,
        {
          headers: {
            'x-api-key': process.env.BACKEND_API_KEY,
          },
          params: {
            'id': id,
          },
          timeout: 10000,
          timeoutErrorMessage: "Network Error",
        });
    if (res.data.error) {
      throw new Error(error);
    } else {
      return res.data;
    }
  } catch (error) {
    console.log(`createItinerary error: ${error}`);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    return { error };
  }
}
