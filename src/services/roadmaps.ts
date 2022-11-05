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

export const getURLData = async ({ url }: { url: string }) => {
  try {
    const res = await axios.get('http://localhost:9000/api/ogp', { params: { url: url } });
    return res.data;
  } catch (error) {
    return error;
  }
};

// ロードマップ確認画面で、ローディング画面を出すために、SWRでの取得版を作成
// ボタン押下の時はカスタムフックじゃない方が都合が良いのだけれど、うまいこと統合できないか後日調べる
export const useURLData = (url: string) => {
  const fetcher = async (apiURL: string) => {
    const res = await axios.get(apiURL, { params: { url: url } });
    return res.data;
  };
  const { data, error } = useSWR('http://localhost:9000/api/ogp', fetcher);
  return {
    urlData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
