import HelpIcon from '@mui/icons-material/Help';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement='right-start' />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.secondary.main,
    maxWidth: 500,
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}));

const CreateStepTitleTooltip = () => {
  return (
    <>
      <HtmlTooltip
        title={
          <>
            {'以下のようなものも大歓迎です！'}
            <br />
            {
              '・教材ではないもの(「簡単なアプリを作る」「共同開発をする」「現役エンジニアと話す」等)'
            }
            <br />
            {'・評判が良く今後実施したい教材(頭に【実施予定】等をつけていただくとありがたいです)'}
            <br />
            {'・作成済みの別のロードマップ、他サイトで作成した記事をURLで紐づける'}
          </>
        }
      >
        <HelpIcon fontSize='small' />
      </HtmlTooltip>
    </>
  );
};

export default CreateStepTitleTooltip;
