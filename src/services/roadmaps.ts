import axios from 'axios';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import tokenState from 'recoil/atoms/tokenState';
import type { RoadmapAndSteps } from 'types';
import { roadmapsIndex, roadmapsShowEditDelete, ogpShow } from 'urls/index';

export const getRoadmap = async (id: string) => {
  try {
    const res = await axios.get(roadmapsShowEditDelete(id));
    return res.data;
  } catch (error) {
    return 'エラー';
  }
};

export const getRoadmaps = async () => {
  try {
    const res = await axios.get(roadmapsIndex);
    return res.data;
  } catch (error) {
    return error;
  }
};

// (必要に応じて消す)SWRを使用した取得を作成したが、おそらく不要な気がする。
// export const useGetRoadmap = (id: string) => {
//   const token = useRecoilValue(tokenState);
//   const fetcher = async (url: string) => {
//     const res = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res.data;
//   };
//   const { data, error } = useSWR(roadmapsShowEditDelete(id), fetcher);
//   return {
//     roadmap: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

export const postRoadmap = async (params: RoadmapAndSteps, token: string) => {
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

export const editRoadmap = async (params: RoadmapAndSteps, token: string) => {
  try {
    const res = await axios.put(roadmapsShowEditDelete(String(params.id)), params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 'OK';
  } catch (error) {
    return error;
  }
};

export const deleteRoadmap = async (id: string, token: string) => {
  try {
    const res = await axios.delete(roadmapsShowEditDelete(String(id)), {
      data: { param: '' },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 'OK';
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
