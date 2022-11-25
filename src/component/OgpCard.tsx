import { Grid, Typography, Link, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useURLData } from 'services/roadmaps';

type Props = {
  url: string;
};

const OgpCard = ({ url }: Props) => {
  const { urlData, isLoading, isError } = useURLData(url);
  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (isError) return <div></div>;
  return (
    <>
      <Box sx={{ maxWidth: 'sm', border: 1, m: 1 }}>
        <Grid container>
          <Grid item xs={12}>
            <Link href={url} target='_blank' rel='noopener noreferrer' underline='hover'>
              <Grid container>
                <Typography variant='body1' component='div'>
                  {urlData.title}
                </Typography>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={8}>
                  <Typography variant='body2' component='div'>
                    {urlData.site_name}
                    <br />
                    {urlData.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <img src={urlData.image} height={100} width={150} alt={'imgae'} />
                </Grid>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OgpCard;
