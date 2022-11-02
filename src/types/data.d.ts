// ロードマップデータ
export type Roadmap = {
  title: string;
  introduction: string;
  start_skill: string;
  end_skill: string;
};

// ステップデータ
export type Step = {
  id: number;
  url: string;
  title: string;
  introduction: string;
  required_time: string;
  date: string;
};

// プロフィールデータ
export type User = {
  sub?: string;
  name: string;
  github_account: string;
  twitter_account: string;
};

// プロフィール一覧データ
export type Users = User[];
