import { Container, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
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
      <Container maxWidth='xl' sx={{ pt: { xs: 0, md: 2 }, pb: 3 }}>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
};
export default Layout;
