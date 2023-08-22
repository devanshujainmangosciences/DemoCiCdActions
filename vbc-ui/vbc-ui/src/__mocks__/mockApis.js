import axios from 'axios';

/**
 *
 * Sample Test
 */
export const getFirstAlbumTitle = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/albums'
  );
  return response.data[0].title;
};

/**
 * Mock register API
 */

export const registerMockApi = async (data) => {
  var config = {
    method: 'post',
    url: 'https://vbcdev.mangosciences.com/vbc-gateway/vbc-patient/api/register',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };
  try {
    const response = await axios(config);
    // console.log('RESPONSE=>', response);
    return response;
  } catch (error) {
    console.log('ERROR=>', error);
  }
};
