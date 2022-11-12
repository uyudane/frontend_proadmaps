import axios from 'axios';
import { tagsGet } from 'urls/index';

export const getTags = async () => {
  try {
    const res = await axios.get(tagsGet);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
