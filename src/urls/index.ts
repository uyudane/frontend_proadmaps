const DEFAULT_API_LOCALHOST = process.env.NEXT_PUBLIC_BACKEND_URL;
const DEFAULT_BASE_LOCALHOST = process.env.NEXT_PUBLIC_BASE_URL;

// ロードマップ
export const roadmapsIndex = `${DEFAULT_API_LOCALHOST}/roadmaps`;
export const roadmapsShowEdit = (RoadmapId: string) =>
  `${DEFAULT_API_LOCALHOST}/roadmaps/${RoadmapId}`;
export const ogpShow = `${DEFAULT_BASE_LOCALHOST}/api/ogp`;

// ユーザ情報
export const usersIndex = `${DEFAULT_API_LOCALHOST}/users`;
export const usersShow = (UserSub: string) => `${DEFAULT_API_LOCALHOST}/users/${UserSub}`;
export const userWhoami = `${DEFAULT_API_LOCALHOST}/users/whoami`;
