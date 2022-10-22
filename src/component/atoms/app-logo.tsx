import Image from 'next/image';
import Link from 'next/link';

const AppLogo = () => {
  return (
    <>
      <Link href='/'>
        <a>
          <Image src='/proad_icon.png' alt='アイコン' width={200} height={100} />
        </a>
      </Link>
    </>
  );
};

export default AppLogo;
