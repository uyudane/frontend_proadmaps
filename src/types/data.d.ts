// ロードマップデータ
export type Roadmap = {
  title: string;
  introduction: text;
};

// プロフィールデータ
export type Profile = {
  user_id?: number;
  name: string;
  github_account: string;
  twitter_account: string;
};

// プロフィール一覧データ
export type Profiles = Profile[];
