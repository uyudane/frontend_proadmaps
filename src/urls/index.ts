const DEFAULT_API_LOCALHOST = process.env.NEXT_PUBLIC_BACKEND_URL;

// ロードマップ
export const roadmapsIndex = `${DEFAULT_API_LOCALHOST}/roadmaps`;

// ユーザ情報
export const usersIndex = `${DEFAULT_API_LOCALHOST}/users`;
export const usersShow = (UserId: number) => `${DEFAULT_API_LOCALHOST}/users/${UserId}`;
export const userWhoami = `${DEFAULT_API_LOCALHOST}/users/whoami`;
