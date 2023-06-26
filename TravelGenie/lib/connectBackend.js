import axios from "axios";
axios.defaults.baseURL = process.env.BACKEND_URL;

export async function handleLogin(email, password) {
  try {
    console.log("Loggin in...");
    const res = await axios.post(
        "/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
    );
    console.log(`handleLogin Error: ${res.data.error}`);
    return res.data;
  } catch (error) {
    console.log(`handleLogin error: ${error}`);
    return { error };
  }
}

export async function handleRegister(email, password) {
  try {
    const res = await axios.post(
        "/user",
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
    );
    return res.data;
  } catch (error) {
    console.log(`handleRegister error: ${error}`);
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

export async function changeProfile(userId, data) {
  const endPoints = {
    name: "/name",
    avatarUrl: "/avatar",
    email: "/email",
  };
  const keys = [
    "name",
    "avatarUrl",
    "email",
  ];
  const apiRoute = `/user/${userId}`;
  const ret = {
    ...data,
  };
  try {
    keys.forEach(async (key) => {
      const res = await axios.post(
          apiRoute + endPoints[key],
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
      );
      ret[key] = res.data[key];
    });
    return ret;
  } catch (error) {
    console.log(error);
    return { error: "An error occured. Please try again." };
  }
}

export async function changePassword(userId, oldPassword, newPassword) {
  try {
    const res = await axios.post(
        `/user/${userId}/password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
    );
    return res.data;
  } catch (error) {
    console.log(`changePassword error: ${error}`);
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

export async function deleteAccount(userId) {
  try {
    await axios.delete(`/user/${userId}`);
    return {};
  } catch (error) {
    console.log(error);
    return { error: error.message || error };
  }
}
