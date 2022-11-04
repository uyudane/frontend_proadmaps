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

  if (!targetUrl) return;

  // URLに含まれる幾つかの文字がaxiosの中でエンコードされないため、事前にurlをエンコードしている??
  const encodedUri = encodeURI(targetUrl);
  // カスタムヘッダーを設定
  const headers = { 'User-Agent': 'bot' };

  try {
    const res = await axios.get(encodedUri, { headers: headers });
    const html = res.data;
    const dom = new JSDOM(html);
    const metas = dom.window.document.head.querySelectorAll('meta');
    // 必要なデータのみを抽出
    for (let i = 0; i < metas.length; i++) {
      const pro = metas[i].getAttribute('property');
      if (typeof pro == 'string') {
        if (pro.match('site_name')) metaData.site_name = metas[i].getAttribute('content') as string;
        if (pro.match('title')) metaData.title = metas[i].getAttribute('content') as string;
        if (pro.match('description'))
          metaData.description = metas[i].getAttribute('content') as string;
        if (pro.match('image')) metaData.image = metas[i].getAttribute('content') as string;
      }
    }
  } catch (error) {
    res.status(400).send('error');
  }
  res.status(200).json(metaData);
};

export default ogp;
