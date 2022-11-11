import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import tokenState from 'recoil/atoms/tokenState';
import userState from 'recoil/atoms/userState';
import { postLike, deleteLike } from 'services/likes';

const RoadmapLikeButton = ({ roadmap }: any) => {
  const token = useRecoilValue(tokenState);
  const user = useRecoilValue(userState);

  const [isLiked, setIsLiked] = useState<boolean | null>(null);

  useEffect(() => {
    // いいねをしているかどうかを判定
    setIsLiked(
      typeof roadmap.likes.find((like: any) => like.user_sub === user.sub) !== 'undefined',
    );
  }, []);

  const execPostLike = async () => {
    const result = await postLike({ id: roadmap.id, token: token });
    setIsLiked(true);
  };

  const execDeleteLike = async () => {
    const result = await deleteLike({ roadmapId: roadmap.id, token: token });
    setIsLiked(false);
  };
  return (
    <>
      {typeof isLiked === 'undefined' ? (
        <p>loading...</p>
      ) : isLiked ? (
        <IconButton aria-label='favorite' onClick={execDeleteLike}>
          <FavoriteIcon sx={{ fontSize: 40, color: 'blue' }} />
        </IconButton>
      ) : (
        <IconButton aria-label='unfavorite' onClick={execPostLike}>
          <FavoriteIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    </>
  );
};

export default RoadmapLikeButton;
