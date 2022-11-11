import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const ProfileEditButton = () => {
  const router = useRouter();

  return (
    <>
      <Button
        variant='outlined'
        onClick={() => {
          router.push(`/setting/profile`);
        }}
      >
        編集する
      </Button>
    </>
  );
};

export default ProfileEditButton;
