import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import * as React from 'react';
import { RoadmapFullData, Step } from 'types';

type Props = {
  roadmap: RoadmapFullData;
  steps: Step[];
};

const ConvertRoadmapIntoMarkdownButton = ({ roadmap, steps }: Props) => {
  // Markdownダイアログに使用
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen()}>
        <ContentPasteGoIcon />
        Markdownで出力
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          外部サイトや個人ブログへの転記にご使用ください
        </DialogTitle>
        <DialogContent dividers>
          <Typography>{`# ${roadmap.title}`}</Typography>
          <Typography>{'**概要**'}</Typography>
          <Typography>{`${roadmap.introduction}`}</Typography>
          <Typography>{'**タグ**'}</Typography>
          <Typography>{`${roadmap.tags.map((tag) => tag.name).join(',')}`}</Typography>
          <Typography>{'**開始時スキル**'}</Typography>
          <Typography>{`${roadmap.start_skill}`}</Typography>
          <Typography>{'**終了時スキル**'}</Typography>
          <Typography>{`${roadmap.end_skill}`}</Typography>
          <Typography>{'**総ステップ数**'}</Typography>
          <Typography>{`${steps.length}`}</Typography>
          {steps.map((step, i) => (
            <React.Fragment key={`step-${i}`}>
              <Typography>{`## ステップ${i + 1} ${step.title}`}</Typography>
              <Typography>{'**紹介文/コメント**'}</Typography>
              <Typography>{`${step.introduction}`}</Typography>
              <Typography>{'**所要時間**'}</Typography>
              <Typography>{`${step.required_time}`}</Typography>
              <Typography>{'**実施年月**'}</Typography>
              <Typography>{`${step.year}${step.month}`}</Typography>
              <Typography>{'**コンテンツURL**'}</Typography>
              <Typography>{`${step.url}`}</Typography>
            </React.Fragment>
          ))}
          <Typography>以上です。</Typography>
          <Typography>{`このロードマップ/学習記録は[ProadMaps](https://proadmaps.com/${roadmap.user.sub}/roadmaps/${roadmap.id})で作成しました。`}</Typography>
          <Typography>
            {
              'ロードマップの作成、共有から、作成したロードマップをマークダウンで出力ができるので、Qiita等の外部サイトや、個人ブログへの転記にも便利です。'
            }
          </Typography>
          <Typography>{`https://proadmaps.com/${roadmap.user.sub}/roadmaps/${roadmap.id}`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConvertRoadmapIntoMarkdownButton;
