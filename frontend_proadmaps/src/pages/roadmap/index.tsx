import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { NextPage } from 'next';

import React, { useEffect, useState } from 'react';

// recoil
import { useRecoilValue } from 'recoil';
import tokenState from 'recoil/atoms/tokenState';

const RoadmapPage: NextPage = () => {
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する

  const [title, setTitle] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');

  const onClick = () => {
    const params = {
      title: title,
      introduction: introduction,
    };
    console.log(token);

    axios
      .post('https://proadmaps.herokuapp.com/api/v1/roadmaps', params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(e.target.value);
  };

  // ログでgetの結果を出力
  useEffect(() => {
    const getRoadmaps = async () => {
      const res = await axios.get('https://proadmaps.herokuapp.com/api/v1/roadmaps');
      console.log(res);
    };
    getRoadmaps();
  });

  return (
    <div>
      <label htmlFor=''>タイトル</label>
      <input
        type='text'
        value={title}
        onChange={(e) => {
          onChange(e, setTitle);
        }}
      />
      <br />
      <label htmlFor=''>本文</label>
      <input
        type='text'
        value={introduction}
        onChange={(e) => {
          onChange(e, setIntroduction);
        }}
      />
      <br />
      <button onClick={onClick}>新規投稿</button>
    </div>
  );
};

export default RoadmapPage;
