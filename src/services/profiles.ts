import axios from 'axios';
import type { Profile } from 'types';
import { profilesIndex } from 'urls/index';

// export const fetchRoadmaps = async () => {
//   try {
//     const res = await axios.get(roadmapsIndex);
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const postProfiles = async (params: Profile, token: any) => {
  try {
    const res = await axios.post(profilesIndex, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
