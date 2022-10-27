const DEFAULT_API_LOCALHOST = process.env.NEXT_PUBLIC_BACKEND_URL;

// ロードマップ
export const roadmapsIndex = `${DEFAULT_API_LOCALHOST}/roadmaps`;

// プロフィール
export const profilesIndex = `${DEFAULT_API_LOCALHOST}/profiles`;
export const profilesShow = (UserId: number) => `${DEFAULT_API_LOCALHOST}/profiles/${UserId}`;
export const profileWhoami = `${DEFAULT_API_LOCALHOST}/profiles/whoami`;
