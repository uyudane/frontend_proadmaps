import { NextPage } from 'next';

import React, { useState } from 'react';

import { useRecoilValue } from 'recoil';
import { Meta } from 'component/meta';

// recoil
import tokenState from 'recoil/atoms/tokenState';

import { fetchRoadmaps, postRoadmaps } from 'services/roadmaps';

const RoadmapPage: NextPage = () => {
  const token = useRecoilValue(tokenState); // RecoilのTokneを取得する

  const [title, setTitle] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');

  const onClick_post = () => {
    postRoadmaps(
      {
        title: title,
        introduction: introduction,
      },
      token,
    );
  };

  // ログでgetの結果を出力
  const onClick_get = () => {
    fetchRoadmaps();
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(e.target.value);
  };

  return (
    <>
      <Meta pageTitle='ロードマップ' />
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
        <button onClick={onClick_post}>新規投稿</button>
        <br />
        <button onClick={onClick_get}>投稿取得</button>
      </div>
    </>
  );
};

export default RoadmapPage;
