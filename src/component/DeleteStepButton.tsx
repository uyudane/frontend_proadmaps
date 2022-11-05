import Button from '@mui/material/Button';
import { useRecoilState } from 'recoil';
import stepsState from 'recoil/atoms/stepsState';
import { Step } from 'types';

const removeItemAtIndex = (arr: Step[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const DeleteStepButton = ({ index }: { index: number }) => {
  const [steps, setSteps] = useRecoilState(stepsState);
  const deleteItem = () => {
    const newList = removeItemAtIndex(steps, index);
    setSteps(newList);
  };
  return (
    <>
      <Button variant='text' onClick={deleteItem}>
        削除
      </Button>
    </>
  );
};

export default DeleteStepButton;
