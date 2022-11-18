import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Grid, ListItem, ListItemText, Box } from '@mui/material';
import type { Identifier, XYCoord } from 'dnd-core';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import DeleteStepButton from './DeleteStepButton';
import EditStepButton from './EditStepButton';
import { Step } from 'types';

const ItemTypes = {
  STEP: 'step',
};

export interface Props {
  index: number;
  step: Step;
  id: number;
  moveStep: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DndStep = ({ index, step, id, moveStep }: Props) => {
  // ドラッグ対象のrefを取得(DOMを操作していくためのもの)
  const ref = useRef<HTMLDivElement>(null);

  // ドラックしているアイテムによって、影響を受けるアイテムの挙動をコントロールしているぽい
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.STEP,
    // ドロップされると影響を受けるアイテムのIDを取得している?
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    // ドラッグしているアイテムのIDと、通過しているアイテム(場所)を判別して、挙動をコントロールしている
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveStep(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  // ドラッグしているアイテムの挙動をコントロール
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.STEP,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // ドラッグされている間は透明になる。
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const stepDescription =
    `URL:${step.url.slice(0, 18)}...  ` +
    `コメント:${step.introduction.slice(0, 5)}...  ` +
    `所要時間:${step.required_time.slice(0, 5)}...  ` +
    `実施年月:${step.year}${step.month}`;

  return (
    <>
      <ListItem sx={{ p: 3, m: 1, bgcolor: '#eeeeee' }}>
        <Grid
          container
          alignItems='center'
          direction='row'
          ref={preview}
          style={{
            opacity,
          }}
        >
          <Grid
            item
            style={{
              // backgroundColor: 'white',
              cursor: 'move',
              opacity,
            }}
            ref={ref}
            data-handler-id={handlerId}
            xs={1}
          >
            <DragHandleIcon
              sx={{ color: 'white', backgroundColor: '#143F6B', borderRadius: '20%', m: 1 }}
            />
          </Grid>
          <Grid item xs={10}>
            <ListItemText primary={step.title.slice(0, 70)} secondary={stepDescription} />
          </Grid>
          <Grid item xs={1}>
            <EditStepButton index={index} />
            <DeleteStepButton index={index} />
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
};

export default DndStep;
