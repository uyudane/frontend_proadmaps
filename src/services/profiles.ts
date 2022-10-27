import axios from 'axios';
import type { Profile } from 'types';
import { profilesIndex, profilesShow, profileWhoami } from 'urls/index';

export const getProfile = async (profileId: number) => {
  try {
    const res = await axios.get(profilesShow(profileId));
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProfiles = async () => {
  try {
    const res = await axios.get(profilesIndex);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyprofile = async (token: any) => {
  try {
    const res = await axios.get(profileWhoami, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

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

export const updateProfile = async (userId: number, params: Profile, token: any) => {
  try {
    const res = await axios.put(profilesShow(userId), params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
