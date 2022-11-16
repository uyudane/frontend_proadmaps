// ロードマップデータ
export type Roadmap = {
  id: number;
  title: string;
  tags: Tag[];
  introduction: string;
  start_skill: string;
  end_skill: string;
  is_published?: boolean;
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
  step_number: number;
};

// タグデータ
export type Tag = {
  name: string;
};

// 作成済みのロードマップデータ(バックエンドから取得したデータ)
export type RoadmapFullData = {
  id: number;
  title: string;
  tags: Tag[];
  introduction: string;
  start_skill: string;
  end_skill: string;
  is_published: boolean;
  steps: Step[];
  user: User;
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

// ロードマップ&ステップス(ロードマップの作成、修正時に使用)
export type RoadmapAndSteps = Roadmap & { steps: Step[] } & { is_published: boolean };

// プロフィールデータ
export type User = {
  sub: string;
  name: string;
  avatar: string;
  github_account?: string;
  twitter_account?: string;
  likes: [];
};

// userStateで使用する型
export type UserState = {
  sub: string;
  name: string;
  avatar: string;
};

export type UserFullData = {
  sub: string;
  name: string;
  github_account: string;
  twitter_account: string;
  avatar: string;
  roadmaps: Roadmap[];
  likes: [];
};
