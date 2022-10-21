import axios from 'axios';
import { roadmapsIndex } from 'urls/index';

export const fetchRoadmaps = async () => {
  try {
    const res = await axios.get(roadmapsIndex);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
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
