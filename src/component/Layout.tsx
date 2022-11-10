import { Container, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: any) => {
  // フラッシュメッセージを表示する。
  const router = useRouter();
  const successMessage = router.query.successMessage || null;
  const errorMessage = router.query.errorMessage || null;
  return (
    <>
      <Header />
      {successMessage && <Alert severity='success'>{successMessage}</Alert>}
      {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
      {/* Containerはもともと左右にpaddingが設定されているため、上下にのみpaddingをつける */}
      <Container maxWidth='xl' sx={{ pt: 3, pb: 3 }}>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
};
export default Layout;
