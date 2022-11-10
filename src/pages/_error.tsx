import { NextPage, NextPageContext } from 'next';

interface Props {
  statusCode: number;
}

const Error: NextPage<Props> = ({ statusCode }: any) => {
  return <div>{statusCode}エラーが発生しました</div>;
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  return { statusCode };
};

export default Error;
