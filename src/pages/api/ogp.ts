import axios from 'axios';
import { JSDOM } from 'jsdom';
import { NextApiRequest, NextApiResponse } from 'next';

const ogp = async (req: NextApiRequest, res: NextApiResponse) => {
  const targetUrl = req.query.url as string;

  const metaData = {
    site_name: '',
    title: '',
    description: '',
    image: '',
    url: targetUrl,
  };

  if (!targetUrl) {
    res.status(400).send('error');
    return;
  }

  // URLに含まれる幾つかの文字がaxiosの中でエンコードされないため、事前にurlをエンコードしている??
  const encodedUri = encodeURI(targetUrl);
  // カスタムヘッダーを設定
  const headers = { 'User-Agent': 'bot' };

  try {
    const res = await axios.get(encodedUri, { headers: headers });
    const html = res.data;
    const dom = new JSDOM(html);
    // 必要なデータのみを抽出
    // Amazonは特殊(propertyではなくname属性かつ、head外にmetatagが存在)だったため、処理を変える
    if (targetUrl.match(/amazon.co/)) {
      // imageがmetaになかったため、imageだけはクラス名で絞って最初に出てきた画像がトップの画像になる(っぽい)。
      const image = dom.window.document.getElementsByClassName('a-dynamic-image');
      metaData.image = image[0].getAttribute('src') as string;
      const metas = dom.window.document.querySelectorAll('meta');
      metaData.site_name = '書籍';
      for (let i = 0; i < metas.length; i++) {
        const pro = metas[i].getAttribute('name');
        if (typeof pro == 'string') {
          if (pro.match('title')) metaData.title = metas[i].getAttribute('content') as string;
          if (pro.match('description'))
            metaData.description = metas[i].getAttribute('content') as string;
        }
      }
    } else {
      const metas = dom.window.document.head.querySelectorAll('meta');
      for (let i = 0; i < metas.length; i++) {
        const pro = metas[i].getAttribute('property');
        if (typeof pro == 'string') {
          if (pro.match('site_name'))
            metaData.site_name = metas[i].getAttribute('content') as string;
          if (pro.match('title')) metaData.title = metas[i].getAttribute('content') as string;
          if (pro.match('description'))
            metaData.description = metas[i].getAttribute('content') as string;
          if (pro.match('image') && !pro.match('image:width') && !pro.match('image:height'))
            metaData.image = metas[i].getAttribute('content') as string;
        }
      }
    }
  } catch (error) {
    res.status(400).send('error');
  }
  res.status(200).json(metaData);
};

export default ogp;
