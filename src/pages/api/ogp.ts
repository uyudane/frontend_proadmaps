import axios from 'axios';
import { JSDOM } from 'jsdom';
import { NextApiRequest, NextApiResponse } from 'next';

const ogp = async (req: NextApiRequest, res: NextApiResponse) => {
  // const targetUrls = extractUrlParams(request, response);

  // res.status(200).json({ text: 'Hello' });
  console.log(req.query.url);
  const targetUrls = [];
  targetUrls.push(req.query.url as string);

  if (!targetUrls) return;

  const ogps: any = {};

  // リクエストで渡されたURLごとにOGPを取得
  await Promise.all(
    targetUrls.map(async (targetUrl: string) => {
      const encodedUri = encodeURI(targetUrl);
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
        // sendErrorResponse(response, error);
      }
    }),
  );

  res.status(200).json(ogps);
};

// リクエストからOGPを取得しに行くURLを抽出
// const extractUrlParams = (req: any, res: any): string[] => {
//   const url = req.query.url;
//   const urls = req.query.urls;

//   if (url && urls) {
//     sendErrorResponse(res, "Request query can't have both 'url' and 'urls'");
//     return [];
//   } else if (url) {
//     if (Array.isArray(url)) {
//       sendErrorResponse(res, "'url' must be string");
//       return [];
//     }
//     return [<string>url];
//   } else if (urls) {
//     if (!Array.isArray(urls)) {
//       sendErrorResponse(res, "'urls' must be array of string");
//       return [];
//     }
//     return <string[]>urls;
//   } else {
//     sendErrorResponse(res, "Either 'url' or 'urls' must be included");
//     return [];
//   }
// };

// HTMLのmetaタグからogpを抽出
const extractOgp = (metaElements: HTMLMetaElement[]): object => {
  const ogp = metaElements
    .filter((element: Element) => element.hasAttribute('property'))
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
