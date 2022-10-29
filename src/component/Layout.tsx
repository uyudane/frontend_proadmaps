import { Container, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: any) => {
  // フラッシュメッセージを表示する。
  const router = useRouter();
  const message = router.query.message || null;
  return (
    <>
      <Header />
      {message && <Alert severity='success'>{message}</Alert>}
      {/* Containerはもともと左右にpaddingが設定されているため、上下にのみpaddingをつける */}
      <Container maxWidth='xl' sx={{ pt: 3, pb: 3 }}>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
};
export default Layout;
