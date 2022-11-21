import { RoadmapFullData, Tag } from 'types';

type Props = {
  roadmaps: RoadmapFullData[];
  searchTags: Tag[] | undefined;
  freeSearchWord: string | undefined;
};

const useSearchRoadmaps = ({ roadmaps, searchTags, freeSearchWord }: Props) => {
  let outputRoadmaps = undefined;
  if (searchTags) {
    // 取得したタグ情報からロードマップのID情報を抽出する(二次元配列)
    const searchRoadmapsIds = searchTags.map((tag: Tag) => tag.roadmap_ids);
    const tagCount = searchRoadmapsIds.length;

    // 検索結果となるロードマップのIDの初期値を設定
    let outputRoadmapsIds = searchRoadmapsIds[0];

    // 上記の初期値をもとに、全てのタグを含むロードマップのIDを抽出する
    for (let i = 0; i < tagCount - 1; i++) {
      outputRoadmapsIds = (outputRoadmapsIds as number[]).filter((outputRoadmapsId: number) =>
        (searchRoadmapsIds[i + 1] as number[]).includes(outputRoadmapsId),
      );
    }

    // 抽出したIDをもとに、ロードマップの情報を取得する
    outputRoadmaps = roadmaps.filter((roadmap) =>
      (outputRoadmapsIds as number[])?.includes(roadmap.id),
    );
  } else if (freeSearchWord) {
    // 正規表現で文字列が含まれるロードマップを検索する
    const reg = new RegExp(freeSearchWord);
    for (const roadmap of roadmaps) {
      roadmap.steps;
    }

    outputRoadmaps = roadmaps.filter(
      (roadmap) => roadmap.title.match(reg) || roadmap.introduction.match(reg),
    );
  } else {
    // どちらも検索ワードがない場合は全出力する
    outputRoadmaps = roadmaps;
  }

  return outputRoadmaps;
};

export default useSearchRoadmaps;
