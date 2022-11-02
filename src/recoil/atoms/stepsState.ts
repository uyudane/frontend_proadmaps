import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { Step } from 'types';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
});

const stepsState = atom<Step[]>({
  // const stepState = atom({
  key: 'stepsState',
  // default: [{ url: '', title: '', introduction: '', required_time: '', date: '' }],
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default stepsState;
