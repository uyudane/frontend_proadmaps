// ロードマップデータ
export type Roadmap = {
  id: number | null; // ロードマップ新規作成時はnullになる
  title: string;
  tags: Tag[];
  introduction: string;
  start_skill: string;
  end_skill: string;
  is_published: boolean | null;
};

// ロードマップデータのtagsをstring[]にしたバージョン
// ロードマップ作成時に使用するAutocompleでは、オブジェクトが扱えないため。
export type RoadmapWhenCreating = {
  id: number | null;
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
  step_number: number | null;
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

// ロードマップ&ステップス(ロードマップの作成、修正時に使用)
export type RoadmapAndSteps = Roadmap & { steps: Step[] } & { is_published: boolean };

// プロフィールデータ
export type User = {
  sub: string;
  name: string;
  avatar: string;
  github_account: string;
  twitter_account: string;
};

export type Like = {
  roadmap_id: number;
  roadmap_id: number;
};

// userStateで使用する型
export type UserState = {
  sub: string;
  name: string;
  avatar: string;
};

// 作成済みのユーザーデータ(バックエンドから取得したデータ)
export type UserFullData = {
  sub: string;
  name: string;
  avatar: string;
  github_account: string;
  twitter_account: string;
  roadmaps: Roadmap[];
  likes: Like[];
};
