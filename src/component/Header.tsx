import { useAuth0 } from '@auth0/auth0-react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import RequireLoginDialog from './RequireLoginDialog';
import roadmapState from 'recoil/atoms/roadmapState';
import stepsState from 'recoil/atoms/stepsState';
import tokenState from 'recoil/atoms/tokenState';
import userState from 'recoil/atoms/userState';

function ResponsiveAppBar() {
  const router = useRouter();
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const resetToken = useResetRecoilState(tokenState);
  const resetUser = useResetRecoilState(userState);
  const resetRoadmap = useResetRecoilState(roadmapState);
  const resetSteps = useResetRecoilState(stepsState);
  const current_user = useRecoilValue(userState); // RecoilのTokneを取得する

  // 画面がxsになった時に、メニューをハンバーガーメニューで表示するようにする
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  // アイコンをクリックした時にユーザーメニューを表示
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // メニューを閉じる
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // ユーザーメニューを閉じる
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // プロフィール画面にルーティング(もっとうまい方法がないかを検討する)
  const toProfile = () => {
    router.push(`/${current_user.sub}`);
  };

  // 下書き一覧ページにルーティング
  const toDrafts = () => {
    router.push('/drafts');
  };

  // logoutのままだとonClickにactionとして渡した際にエラーになったため以下で再定義
  const logout_auth0 = () => {
    resetRoadmap();
    resetSteps();
    resetToken();
    resetUser();
    logout({ returnTo: window.location.origin });
  };

  // 左側メニュー一覧
  const pages = [{ name: 'ロードマップ/学習記録の作成はこちら！', link: '/roadmap/new' }];

  // 右側ユーザメニュ一覧
  const settings = [
    { name: 'プロフィール', action: toProfile },
    { name: '下書き一覧', action: toDrafts },
    { name: 'ログアウト', action: logout_auth0 },
  ];

  // 未ログイン時のダイアログの開閉に使用
  const [open, setOpen] = React.useState(false);

  const dialogOpen = () => {
    setOpen(true);
  };

  const dialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* xsとmdで表示順序が変わる
      xs: ハンバーガーメニュー、ロゴ、サービス名、アイコン(ユーザメニュー)
      md: ロゴ、サービス名、メニューボタン、アイコン(ユーザメニュー) */}
      <AppBar position='static'>
        <Container maxWidth='xl'>
          {/* disableGutters→左右の余白を削除 */}
          <Toolbar disableGutters>
            {/* md以上ようのロゴ */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Link href='/'>
                <a>
                  <Image src='/logo_unit.png' alt='ロゴ' width='48' height='48'></Image>
                </a>
              </Link>
            </Box>
            {/* Linkで囲む事でクライアント側でページ遷移ができる(リロードせずにすむ)
          Link側とTyporaphyで両方"/"を指定するのが気持ち悪いが、カーソルが変わらなくなるため両方つける。
          遷移は問題なさそう */}
            <Link href='/' passHref>
              <Typography
                variant='h6'
                noWrap
                component='a'
                sx={{
                  ml: 1,
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                ProadMaps
              </Typography>
            </Link>
            {/* xsの時に表示するハンバーガーメニュー */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem>
                  <Typography variant='body2' textAlign='center'>
                    ※ロードマップ作成/編集機能はPCのみになります
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>

            {/* xsの時のロゴ(ハンバーガーメニュー、ロゴの順で表示) */}
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                mr: 1,
              }}
            >
              <Link href='/'>
                <a>
                  <Image src='/logo_unit.png' alt='ロゴ' width='32' height='32'></Image>
                </a>
              </Link>
            </Box>
            <Link href='/' passHref>
              <Typography
                variant='h6'
                noWrap
                component='a'
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                ProadMaps
              </Typography>
            </Link>
            {/* md用メニューボタン */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Typography variant='body2'>
                〜プログラミング学習のロードマップ/学習記録 共有サイト〜
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, pr: 2 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={
                    isAuthenticated
                      ? () => {
                          resetRoadmap();
                          resetSteps();
                          router.push(page.link);
                        }
                      : dialogOpen
                  }
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated ? (
                <>
                  <Tooltip title='Open menus'>
                    <IconButton onClick={handleOpenUserMenu}>
                      <Avatar alt='Remy Sharp' src={current_user.avatar} />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{ mt: '45px' }}
                    id='menu-appbar'
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting.name} onClick={setting.action}>
                        <Typography textAlign='center'>{setting.name}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : // ログイン確認中はローディングを出す
              isLoading ? (
                <div>
                  <CircularProgress sx={{ color: '#eeeeee' }} />
                </div>
              ) : (
                <MenuItem key='login' onClick={loginWithRedirect}>
                  <Typography textAlign='center'>Login</Typography>
                </MenuItem>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <RequireLoginDialog open={open} onClose={dialogClose} />
    </>
  );
}
export default ResponsiveAppBar;
