import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { Step } from 'types';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
});

const stepState = atom<Step>({
  key: 'stepState',
  default: { url: '', title: '', introduction: '', required_time: '', date: '' },
  effects_UNSTABLE: [persistAtom],
});

export default stepState;
