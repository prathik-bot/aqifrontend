import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface LogoProps {
  color?: 'dark' | 'light';
  height?: number;
  width?: number;
}

export function Logo({ color = 'dark', height = 32, width = 122 }: LogoProps): React.JSX.Element {
  return (
    <Box sx={{ alignItems: 'center', display: 'flex', gap: 1, height, width, overflow: 'hidden' }}>
      <Box component="img" src="/assets/aqi.png" alt="AQI Prediction" sx={{ height, width: 'auto' }} />
      <Typography
        variant="subtitle1"
        noWrap
        sx={{ color: color === 'light' ? 'common.white' : 'text.primary', fontWeight: 700 }}
      >
        AQI Prediction
      </Typography>
    </Box>
  );
}
