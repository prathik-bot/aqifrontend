'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function MainNav(): React.JSX.Element {
  return (
    <Box
      component="header"
      sx={{
        borderBottom: '1px solid var(--mui-palette-divider)',
        backgroundColor: 'var(--mui-palette-background-paper)',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--mui-zIndex-appBar)',
        px: 2,
        py: 1,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', textAlign: 'center' }}
      >
        AQI (Air Quality Index) Forecasting: Leveraging Weather Data and Carbon Emissions Data
      </Typography>
    </Box>
  );
}
