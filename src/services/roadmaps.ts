import axios from 'axios';
import useSWR from 'swr';
import type { RoadmapAndSteps, RoadmapFullData } from 'types';
import { roadmapsIndex, roadmapsShowUpdateDelete, ogpShow } from 'urls/index';

export const getRoadmap = async (id: string) => {
  try {
    const res = await axios.get(roadmapsShowUpdateDelete(id));
    return res.data;
  } catch (error) {
    return error;
  }
};

// 他にも型をつけたかったが、errorとの付け方が分からなかったため、一旦、仕様上エラーにならない全取得のみ型をつけた
export const getRoadmaps = async (): Promise<RoadmapFullData[]> => {
  const res = await axios.get(roadmapsIndex);
  return res.data;
};

export const postRoadmap = async (params: RoadmapAndSteps, token: string) => {
  try {
    const res = await axios.post(roadmapsIndex, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const editRoadmap = async (params: RoadmapAndSteps, token: string) => {
  try {
    const res = await axios.put(roadmapsShowUpdateDelete(String(params.id)), params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteRoadmap = async (id: string, token: string) => {
  try {
    const res = await axios.delete(roadmapsShowUpdateDelete(String(id)), {
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

// ステップ作成ダイアログで、外部URLからタイトルを取得する際に使用
export const getURLData = async ({ url }: { url: string }) => {
  try {
    const res = await axios.get(ogpShow, { params: { url: url } });
    return res.data;
  } catch (error) {
    return error;
  }
};

// ロードマップ確認画面で、ローディング画面を出すために、SWRでの取得版を作成
// ボタン押下の時はカスタムフックじゃない方が都合が良いのだけれど、うまいこと統合できないか後日調べる
export const useURLData = (url: string) => {
  const fetcher = async (apiURL: string, url: string) => {
    const res = await axios.get(apiURL, { params: { url } });
    return res.data;
  };
  const { data, error } = useSWR([ogpShow, url], fetcher);
  return {
    urlData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
