const DEFAULT_API_LOCALHOST = process.env.NEXT_PUBLIC_BACKEND_URL;
const DEFAULT_BASE_LOCALHOST = process.env.NEXT_PUBLIC_BASE_URL;

// ロードマップ
export const roadmapsIndex = `${DEFAULT_API_LOCALHOST}/roadmaps`;
export const roadmapsShowUpdateDelete = (RoadmapId: string) =>
  `${DEFAULT_API_LOCALHOST}/roadmaps/${RoadmapId}`;
export const ogpShow = `${DEFAULT_BASE_LOCALHOST}/api/ogp`;

// ユーザ情報
export const usersIndex = `${DEFAULT_API_LOCALHOST}/users`;
export const usersShowUpdateDelete = (UserSub: string) =>
  `${DEFAULT_API_LOCALHOST}/users/${UserSub}`;
export const userWhoami = `${DEFAULT_API_LOCALHOST}/users/whoami`;

// いいね(ロードマップ)
export const likePost = `${DEFAULT_API_LOCALHOST}/likes`;
export const likeDelete = (Id: string) => `${DEFAULT_API_LOCALHOST}/likes/${Id}`;

// いいね(ロードマップ)
export const tagsGet = `${DEFAULT_API_LOCALHOST}/tags`;

// Admin(ロードマップ)
export const roadmapsIndexAdmin = `${DEFAULT_API_LOCALHOST}/admin/roadmaps`;
export const roadmapsDeleteAdmin = (RoadmapId: string) =>
  `${DEFAULT_API_LOCALHOST}/admin/roadmaps/${RoadmapId}`;

// Admin(ユーザー)
export const usersIndexAdmin = `${DEFAULT_API_LOCALHOST}/admin/users`;
export const usersDeleteAdmin = (UserSub: string) =>
  `${DEFAULT_API_LOCALHOST}/admin/users/${UserSub}`;
