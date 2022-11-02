import Button from '@mui/material/Button';
import { useRecoilState } from 'recoil';
import stepsState from 'recoil/atoms/stepsState';

const removeItemAtIndex = (arr: any, index: any) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const DeleteStepButton = ({ itemId }: { itemId: any }) => {
  const [steps, setSteps] = useRecoilState(stepsState);
  const deleteItem = () => {
    const newList = removeItemAtIndex(steps, itemId);

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
