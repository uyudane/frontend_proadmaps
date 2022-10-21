import axios from 'axios';
import { roadmapsIndex } from 'urls/index';

export const fetchRoadmaps = () => {
  return console.log('あとでGetを入れる');
  // axios
  //   .get(restaurantsIndex)
  //   // .get('http://localhost:3200/api/v1/restaurants')
  //   .then((res) => {
  //     console.log('ねこねこんこえねこ');
  //     console.log(res);
  //     return res.data;
  //   })
  //   .catch((e) => console.error(e))
};

export const postRoadmaps = async (params: any, token: any) => {
  try {
    const res = await axios.post(roadmapsIndex, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
