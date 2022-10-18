import type { NextPage } from "next";
import { Button } from "@mui/material";
import { css } from "@emotion/react";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const hello = css`
  color: red;
`;

type Props = {
  name: string;
};

const Home: NextPage = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Button>Save</Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained">Hello World</Button>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}>
          <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
          </Box>
        </Grid>
      </Grid>

      <h1 css={hello}>Hello</h1>
    </>
  );
};

export default Home;
