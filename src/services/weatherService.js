const fetchDataFromAPI = async (endpoint, params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
    params: {
      ...params,
      appid: API_KEY,
      units: "metric",
    },
  });
  return response.data;
};

export const getWeatherByCity = (city) =>
  fetchDataFromAPI("weather", { q: city });
