import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from '@mui/material/Link';
import type { User } from 'types';

const SocialButton = ({ profileUser }: { profileUser: User }) => {
  return (
    <>
      {profileUser.github_account ? (
        <Link
          href={`https://github.com/${profileUser.github_account}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHubIcon />
        </Link>
      ) : (
        <GitHubIcon sx={{ color: '#dddddd' }} />
      )}
      {profileUser.twitter_account ? (
        <Link
          href={`https://twitter.com/${profileUser.twitter_account}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <TwitterIcon sx={{ color: 'rgb(25, 118, 210);' }} />
        </Link>
      ) : (
        <TwitterIcon sx={{ color: '#dddddd' }} />
      )}
    </>
  );
};
export default SocialButton;
