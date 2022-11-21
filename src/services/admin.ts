import axios from 'axios';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import tokenState from 'recoil/atoms/tokenState';
import type { RoadmapAndSteps, RoadmapFullData, User, UserFullData } from 'types';
import {
  roadmapsIndex,
  roadmapsShowUpdateDelete,
  ogpShow,
  roadmapsIndexAdmin,
  roadmapsDeleteAdmin,
  usersIndexAdmin,
  usersDeleteAdmin,
} from 'urls/index';

// 他にも型をつけたかったが、errorとの付け方が分からなかったため、一旦、仕様上エラーにならない全取得のみ型をつけた
export const useRoadmapsAdmin = () => {
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する
  const fetcher = async (url: string) => {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };
  const { data, error } = useSWR<RoadmapFullData[], Error>(roadmapsIndexAdmin, fetcher);
  return {
    roadmaps: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const deleteRoadmapAdmin = async (id: string, token: string) => {
  try {
    const res = await axios.delete(roadmapsDeleteAdmin(String(id)), {
      data: { param: '' },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.statusText; // 0Kが返る想定
  } catch (error) {
    return error;
  }
};

export const useUsersAdmin = () => {
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する
  const fetcher = async (url: string) => {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };
  const { data, error } = useSWR<UserFullData[], Error>(usersIndexAdmin, fetcher);
  console.log(data);
  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
};
