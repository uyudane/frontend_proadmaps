import axios from 'axios';
import { likePost, likeDelete } from 'urls/index';

export const postLike = async ({ id, token }: any) => {
  try {
    const res = await axios.post(
      likePost,
      { roadmapId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return 'OK';
  } catch (error) {
    return error;
  }
};

export const deleteLike = async ({ roadmapId, token }: any) => {
  try {
    const res = await axios.delete(likeDelete(roadmapId), {
      data: '',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 'OK';
  } catch (error) {
    return error;
  }
};
