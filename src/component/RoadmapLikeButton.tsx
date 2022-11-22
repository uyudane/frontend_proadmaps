import { useAuth0 } from '@auth0/auth0-react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import RequireLoginDialog from './RequireLoginDialog';
import tokenState from 'recoil/atoms/tokenState';
import { postLike, deleteLike } from 'services/likes';
import { getMyUser } from 'services/users';
import { RoadmapFullData, Roadmap } from 'types';

type Props = {
  // 詳細時はRoadmapFullData、Roadmapは確認時に渡ってくる
  roadmap: RoadmapFullData | Roadmap;
};

const RoadmapLikeButton = ({ roadmap }: Props) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const token = useRecoilValue(tokenState);
  // パスでロードマップ作成/編集を判断するのに使用
  const router = useRouter();

  // いいねの実施有無を格納
  const [isLiked, setIsLiked] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLiked = async () => {
      try {
        const user_data = await getMyUser(token);
        // いいねをしているかどうかを判定
        // 確認画面でRoadmapが渡っている場合+いいねがない場合は、undefindeになる。
        setIsLiked(
          typeof user_data.likes.find((like: any) => like.roadmap_id === roadmap.id) !==
            'undefined',
        );
      } catch (e: unknown) {
        setIsLiked(false);
      }
    };
    checkLiked();
  }, []);

  // いいねをする
  const execPostLike = async () => {
    await postLike({ id: roadmap.id as number, token: token });
    setIsLiked(true);
  };

  // いいねを取り消し
  const execDeleteLike = async () => {
    await deleteLike({ roadmapId: String(roadmap.id), token: token });
    setIsLiked(false);
  };

  // 未ログイン時のダイアログの開閉に使用
  const [open, setOpen] = useState(false);
  const dialogOpen = () => {
    setOpen(true);
  };
  const dialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      {router.pathname === '/roadmap/new' || router.pathname === '/drafts/[id]/edit' ? (
        // ロードマップ作成、編集時の確認画面ではクリックアクションなし。
        <IconButton aria-label='unfavorite'>
          <FavoriteIcon sx={{ fontSize: 40 }} />
        </IconButton>
      ) : isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : isAuthenticated ? (
        typeof isLiked === 'undefined' ? (
          <div>
            <CircularProgress />
          </div>
        ) : isLiked ? (
          // ログイン済みの場合は、いいね有無で色、アクションを変える。
          <IconButton aria-label='favorite' onClick={execDeleteLike}>
            <FavoriteIcon sx={{ fontSize: 40, color: '#f62b86' }} />
          </IconButton>
        ) : (
          <IconButton aria-label='unfavorite' onClick={execPostLike}>
            <FavoriteIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )
      ) : (
        // 未ログイン時はクリック時にログインが必要な旨を通知
        <>
          <IconButton aria-label='unfavorite' onClick={dialogOpen}>
            <FavoriteIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <RequireLoginDialog open={open} onClose={dialogClose} />
        </>
      )}
    </>
  );
};

export default RoadmapLikeButton;
