import axios from 'axios';

export async function getImagesByQuery(query, page, perPage) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '50311128-48dd02331c2e5a3f7eb5afcac',
      q: query,
      page,
      per_page: perPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}