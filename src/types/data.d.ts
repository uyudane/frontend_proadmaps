// ロードマップデータ
export type Roadmap = {
  id?: number;
  title: string;
  tags: Tag[];
  introduction: string;
  start_skill: string;
  end_skill: string;
  is_published?: boolean;
};

export type Tag = {
  name: string;
};

// ロードマップデータのtagsをstring[]にしたバージョン
// ロードマップ作成時に使用するAutocompleでは、オブジェクトが扱えないため。
export type RoadmapWhenCreating = {
  id?: number;
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
export type RoadmapAndSteps = Roadmap & { steps: Step[] } & { is_published: boolean };

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
