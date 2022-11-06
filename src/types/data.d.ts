// ロードマップデータ
export type Roadmap = {
  title: string;
  tags: string[];
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
  year: string;
  month: string;
};

// ロードマップ&ステップス(ロードマップの作成、修正時に使用)
export type RoadmapAndSteps = Roadmap & { steps: Step[] };

// プロフィールデータ
export type User = {
  sub?: string;
  name: string;
  github_account: string;
  twitter_account: string;
};

// userStateで使用する型
export type UserState = {
  sub: string;
  name: string;
};

// プロフィール一覧データ
export type Users = User[];
