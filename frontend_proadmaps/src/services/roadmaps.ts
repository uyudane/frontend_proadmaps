import axios from 'axios';
import type { Roadmap } from 'types';
import { roadmapsIndex } from 'urls/index';

export const fetchRoadmaps = async () => {
  try {
    const res = await axios.get(roadmapsIndex);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const postRoadmaps = async (params: Roadmap, token: any) => {
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
