import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as React from 'react';
import { RoadmapFullData } from 'types';

type Props = {
  roadmap: RoadmapFullData;
};

const ConvertRoadmapIntoMarkdownButton = ({ roadmap }: Props) => {
  const router = useRouter();

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
          <Typography>{'**タグ**'}</Typography>
          <Typography>{`${roadmap.tags.map((tag) => tag.name).join(',')}`}</Typography>
          <Typography>{'**開始時スキル**'}</Typography>
          <Typography>{`${roadmap.start_skill}`}</Typography>
          <Typography>{'**終了時スキル**'}</Typography>
          <Typography>{`${roadmap.end_skill}`}</Typography>
          <Typography>{'**総ステップ数**'}</Typography>
          <Typography>{`${roadmap.steps.length}`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConvertRoadmapIntoMarkdownButton;
