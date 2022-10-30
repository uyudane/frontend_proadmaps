import axios from 'axios';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import tokenState from 'recoil/atoms/tokenState';
import type { Roadmap } from 'types';
import { roadmapsIndex, roadmapsShow } from 'urls/index';

export const fetchRoadmaps = async () => {
  try {
    const res = await axios.get(roadmapsIndex);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const useGetRoadMap = (id: string) => {
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する
  const fetcher = async (url: any) => {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };
  const { data, error } = useSWR(roadmapsShow(id), fetcher);
  return {
    roadmap: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const postRoadmap = async (params: Roadmap, token: any) => {
  try {
    const res = await axios.post(roadmapsIndex, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 'OK';
  } catch (error) {
    return error;
  }
};
