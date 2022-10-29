import { Container, Paper } from '@mui/material';
import Footer from './footer';
import Header from './header';

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      {/* Containerはもともと左右にpaddingが設定されているため、上下にのみpaddingをつける */}
      <Container maxWidth='xl' sx={{ pt: 3, pb: 3 }}>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
};
export default Layout;
