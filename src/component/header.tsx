import { useAuth0 } from '@auth0/auth0-react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as React from 'react';
import { useSetRecoilState } from 'recoil'; // Auth0の認証情報をグローバルステートに保存
import tokenState from '../recoil/atoms/tokenState'; // Auth0の認証情報をグローバルステートに保存
import RequireLoginDialog from './RequireLoginDialog';

function ResponsiveAppBar() {
  const setToken = useSetRecoilState(tokenState);
  const router = useRouter();
  const { isAuthenticated, loginWithRedirect, logout, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // ログイン完了後にトークンを取得しRecoilへ格納
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);

  // 画面がxsになった時に、メニューをハンバーガーメニューで表示するようにする。
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

  // logoutのままだとonClickにactionとして渡した際にエラーになったため以下で再定義
  const logout_auth0 = () => logout({ returnTo: window.location.origin });

  // 左側メニュー一覧
  const pages = [
    { name: 'ロードマップ/学習記録を作成', link: '/roadmap' },
    // { name: '○○○', link: '/' },
    // { name: '○○○', link: '/' },
  ];

  // 右側ユーザメニュ一覧
  const settings = [
    { name: 'Profile', action: handleOpenUserMenu },
    { name: 'Account', action: handleCloseUserMenu },
    // { name: 'login', action: loginWithRedirect },
    { name: 'Logout', action: logout_auth0 },
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
            <Link href='/'>
              <a>
                <Box
                  component='img'
                  sx={{
                    height: 50,
                    width: 50,
                    display: { xs: 'none', md: 'flex' },
                    mr: 1,
                  }}
                  alt='ロゴ'
                  src='logo_unit.png'
                />
              </a>
            </Link>
            {/* Linkで囲む事でクライアント側でページ遷移ができる(リロードせずにすむ)
          Link側とTyporaphyで両方"/"を指定するのが気持ち悪いが、カーソルが変わらなくなるため両方つける。
          遷移は問題なさそう */}
            <Link href='/'>
              <Typography
                variant='h6'
                noWrap
                component='a'
                href='/'
                sx={{
                  mr: 4,
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

            {/* xsの時はハンバーガーメニュー */}
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
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={
                      isAuthenticated
                        ? () => {
                            router.push('/roadmap');
                          }
                        : dialogOpen
                    }
                  >
                    <Typography textAlign='center'>{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* xs用(ハンバーガーメニュー、ロゴの順で表示) */}
            <Box
              component='img'
              sx={{
                height: 50,
                width: 50,
                display: { xs: 'flex', md: 'none' },
                mr: 1,
              }}
              alt='ロゴ'
              src='logo_unit.png'
            />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href=''
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
            {/* md用メニューボタン */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={
                    isAuthenticated
                      ? () => {
                          router.push('/roadmap');
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
                  <Tooltip title='Open settings'>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
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
                <div>Loading...</div>
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
