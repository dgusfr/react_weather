export const getHourlyForecastByCity = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
        cnt: 8, // Número de horas para a previsão
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar previsão horária.");
  }
};
