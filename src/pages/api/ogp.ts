import axios from 'axios';
import { JSDOM } from 'jsdom';
import { NextApiRequest, NextApiResponse } from 'next';

const ogp = async (req: NextApiRequest, res: NextApiResponse) => {
  const targetUrl = req.query.url as string;

  if (!targetUrl) return;

  const ogps: any = {};

  // URLに含まれる幾つかの文字がaxiosの中でエンコードされないため、事前にurlをエンコードしている??
  const encodedUri = encodeURI(targetUrl);
  // カスタムヘッダーを設定
  const headers = { 'User-Agent': 'bot' };

  try {
    const res = await axios.get(encodedUri, { headers: headers });
    const html = res.data;
    const dom = new JSDOM(html);
    const meta = dom.window.document.head.querySelectorAll('meta');
    const ogp = extractOgp([...meta]);

    // URLをキーとして、取得したOGPをまとめて返す
    ogps[targetUrl] = ogp;
  } catch (error) {
    console.error(error);
    res.status(400).send('error');
  }

  res.status(200).json(ogps);
};

// HTMLのmetaタグからogpを抽出
const extractOgp = (metaElements: HTMLMetaElement[]): object => {
  const ogp = metaElements
    // "property"の含む行でフィルタリングし、
    .filter((element: Element) => element.hasAttribute('property'))
    // meta要素がキーで、バリューがその中身の配列を作成
    .reduce((previous: any, current: Element) => {
      const property = current.getAttribute('property')?.trim();
      if (!property) return;
      const content = current.getAttribute('content');
      previous[property] = content;
      return previous;
    }, {});

  return ogp;
};

// const sendErrorResponse = (res: any, message: string): void => {
//   res.status(400).send(message);
// };

export default ogp;

// fetch(url)
//   .then((res) => res.text())
//   .then((text) => {
//     const el = new DOMParser().parseFromString(text, 'text/html');
//     const headEls = el.head.children;
//     Array.from(headEls).map((v) => {
//       const prop = v.getAttribute('property');
//       if (!prop) return;
//       console.log(prop, v.getAttribute('content'));
//     });
//   });
