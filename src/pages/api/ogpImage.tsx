import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const ogpImage = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const hasTitle = searchParams.has('title');
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : 'プログラミング学習のロードマップ/学習記録 共有サイト';
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#143F6B',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            position: 'absolute',
            width: '100%',
            backgroundColor: '#eeeeee',
            left: 0,
            top: 0,
            paddingLeft: 30,
          }}
        >
          <h2
            style={{
              color: '#143F6B',
              fontSize: 40,
              textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            ProadMaps
          </h2>
        </div>
        <h2
          style={{
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 60,
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          {title}
        </h2>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
};

export default ogpImage;
