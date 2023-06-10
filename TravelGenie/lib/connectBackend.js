import axios from "axios";
axios.defaults.baseURL = process.env.BACKEND_URL;

export async function handleLogin(email, password) {
  try {
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
    return { error };
  }
}
