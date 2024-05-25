import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export const getImages = async (topic, currentPage) => {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: "tQOWcEhyyiKRs0sf4Raz_hFvY4mwmzU-LTkGX0hQOrw",
      query: topic,
      page: currentPage,
      per_page: 15,
    },
  });

  return response.data;
};
