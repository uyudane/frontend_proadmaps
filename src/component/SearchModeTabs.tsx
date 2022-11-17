import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState, Dispatch, SetStateAction } from 'react';
import FreeSearchInput from 'component/FreeSearchInput';
import TagSearchInput from 'component/TagSeachInput';
import { Tag } from 'types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// タブの下側に表示される部分
function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

type Props = {
  setSearchTags: Dispatch<SetStateAction<Tag[] | undefined>>;
  setFreeSearchWord: Dispatch<SetStateAction<string | undefined>>;
  tags: Tag[];
};

const SearchModeTabs = ({ setFreeSearchWord, setSearchTags, tags }: Props) => {
  const [value, setValue] = useState(0);

  // 選択されたタブに合わせて、valueを変更
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {/* valueの値と一致したTabが表示される? */}
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label='タグ検索' />
            <Tab label='フリーワード検索' />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TagSearchInput {...{ setSearchTags, setFreeSearchWord, tags }} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FreeSearchInput {...{ setSearchTags, setFreeSearchWord }} />
        </TabPanel>
      </Box>
    </>
  );
};

export default SearchModeTabs;
