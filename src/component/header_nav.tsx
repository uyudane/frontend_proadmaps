import Link from 'next/link';
const HeaderNav = () => {
  return (
    <>
      <nav>
        <ul>
          <Link href='/'>
            <a>MakeMap!</a>
          </Link>
        </ul>
        <ul>
          <Link href='/'>
            <a>LogIn!</a>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default HeaderNav;
