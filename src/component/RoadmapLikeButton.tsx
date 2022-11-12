import { useAuth0 } from '@auth0/auth0-react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import RequireLoginDialog from './RequireLoginDialog';
import tokenState from 'recoil/atoms/tokenState';
import userState from 'recoil/atoms/userState';
import { postLike, deleteLike } from 'services/likes';

const RoadmapLikeButton = ({ roadmap }: any) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const token = useRecoilValue(tokenState);
  const user = useRecoilValue(userState);

  // パスでロードマップ作成/編集を判断するのに使用
  const router = useRouter();

  // いいねの実施有無を格納
  const [isLiked, setIsLiked] = useState<boolean | null>(null);

  useEffect(() => {
    // いいねをしているかどうかを判定
    setIsLiked(
      typeof roadmap.likes?.find((like: any) => like.user_sub === user.sub) !== 'undefined',
    );
  }, []);

  // いいねをする
  const execPostLike = async () => {
    const result = await postLike({ id: roadmap.id, token: token });
    setIsLiked(true);
  };

  // いいねを取り消し
  const execDeleteLike = async () => {
    const result = await deleteLike({ roadmapId: roadmap.id, token: token });
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
        <div>Loading...</div>
      ) : isAuthenticated ? (
        typeof isLiked === 'undefined' ? (
          <p>loading...</p>
        ) : isLiked ? (
          // ログイン済みの場合は、いいね有無で色、アクションを変える。
          <IconButton aria-label='favorite' onClick={execDeleteLike}>
            <FavoriteIcon sx={{ fontSize: 40, color: 'blue' }} />
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
