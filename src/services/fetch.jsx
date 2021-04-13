import axios from "axios";

const fetchSinToken = (endpoint, data, method) => {
  if (method === "POST") {
    axios.post(endpoint, {
      data,
    }).then;
  }
};

const fetchConToken = () => {};

export { fetchSinToken, fetchConToken };
