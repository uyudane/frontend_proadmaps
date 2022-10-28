import axios from 'axios';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import tokenState from 'recoil/atoms/tokenState';
import { userWhoami } from 'urls';

const useUserData = () => {
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する
  const fetcher = (url: any) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: any) => res.data);

  const { data, error } = useSWR(userWhoami, fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUserData;
