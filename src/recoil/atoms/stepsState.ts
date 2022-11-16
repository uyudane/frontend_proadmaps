import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { Step } from 'types';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
});

const stepsState = atom<Step[]>({
  key: 'stepsState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default stepsState;
