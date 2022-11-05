import { Grid, Typography, Link, Box } from '@mui/material';
import { useURLData } from 'services/roadmaps';

const OgpCard = ({ url }: { url: string }) => {
  const { urlData, isLoading, isError } = useURLData(url);
  if (isLoading) return <div>{url}</div>;
  if (isError) return <div>{url}</div>;
  return (
    <>
      <Box sx={{ maxWidth: 'sm', border: 1 }}>
        <Grid container>
          <Grid item xs={12}>
            <Link href={url} target='_blank' rel='noopener noreferrer' underline='hover'>
              <Grid container>
                <Typography variant='body1' component='div'>
                  {urlData.title}
                </Typography>
              </Grid>
              <Grid container>
                <Grid item xs={8}>
                  <Typography variant='body2' component='div'>
                    {urlData.site_name}
                    <br />
                    {urlData.description}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <img src={urlData.image} height={120} width={200} />
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
