import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import tokenState from 'recoil/atoms/tokenState';
import { postLike, deleteLike } from 'services/likes';
import { useMyUser } from 'services/users';

const RoadmapLikeButton = () => {
  const { user, isLoading, isError } = useMyUser();
  const router = useRouter();
  const token = useRecoilValue(tokenState);
  const { id } = router.query;
  if (isLoading) return <div>ローディング</div>;
  if (isError) return <div>エラー</div>;

  // いいねをしているかどうかを判定
  const is_liked =
    typeof user.likes.find((like: any) => like.roadmap_id === Number(id)) !== 'undefined';
  console.log(user);
  console.log(is_liked);

  const execPostLike = async () => {
    const result = await postLike(id as string, token);
  };

  const execDeleteLike = async () => {
    const result = await deleteLike(id as string, token);
  };
  return (
    <>
      {is_liked ? (
        <IconButton aria-label='share' onClick={execDeleteLike}>
          <FavoriteIcon sx={{ fontSize: 40, color: 'blue' }} />
        </IconButton>
      ) : (
        <IconButton aria-label='share' onClick={execPostLike}>
          <FavoriteIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    </>
  );
};

export default RoadmapLikeButton;
