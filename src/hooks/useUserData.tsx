import axios from 'axios';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import tokenState from 'recoil/atoms/tokenState';
import { userWhoami } from 'urls';

const useUserData = () => {
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する
  const fetcher = async (url: any) => {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };
  const { data, error } = useSWR(userWhoami, fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUserData;
