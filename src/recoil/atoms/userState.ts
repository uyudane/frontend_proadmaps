import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserState } from 'types';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
});

const userState = atom<UserState>({
  key: 'userState',
  default: { sub: '', name: '', avatar: '' },
  effects_UNSTABLE: [persistAtom],
});

export default userState;
