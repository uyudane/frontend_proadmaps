import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userState from 'recoil/atoms/userState';

const RoadmapEditDeleteButton = ({ roadmap }: any) => {
  const current_user = useRecoilValue(userState); // RecoilのTokneを取得する
  const [edit, setEdit] = useState<boolean>(false); // 自分のプロフィールの場合のみプロフィール編集ボタンを作成する
  const router = useRouter();

  // 「Hydration failed」(CSRとSSG/SSRの間で作成されるDOMに差異)のエラーが出るため、useEffectで設定する。
  useEffect(() => {
    setEdit(roadmap.user.sub == current_user.sub);
  }, []);

  return (
    <>
      {edit && (
        <>
          <Button
            variant='outlined'
            onClick={() => {
              router.push(`/drafts/${roadmap.id}/edit`);
            }}
          >
            <EditIcon />
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              router.push(`/setting/profile`);
            }}
          >
            <DeleteIcon />
          </Button>
        </>
      )}
    </>
  );
};

export default RoadmapEditDeleteButton;
