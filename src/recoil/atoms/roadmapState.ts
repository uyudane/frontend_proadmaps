import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { Roadmap } from 'types';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
});

const roadmapState = atom<Roadmap>({
  key: 'roadmapState',
  default: {
    id: null,
    title: '',
    tags: [],
    introduction: '',
    start_skill: '',
    end_skill: '',
    is_published: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export default roadmapState;
