'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Logo } from '@/components/core/logo';

export function SideNav(): React.JSX.Element {
  return (
    <Box
      sx={{
        bgcolor: 'white',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'fixed',
        top: 0,
        width: '200px', // Adjust width as needed
        zIndex: 10,
        paddingTop: 2,
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Stack sx={{ p: 2, alignItems: 'center' }}>
        {/* Logo or Icon on top */}
        <Box component={RouterLink} href="/" sx={{ display: 'inline-flex' }}>
          <img src="/assets/aqi.png" alt="AQI Logo" style={{ width: 100, height: 'auto' }} />
        </Box>
      </Stack>
    </Box>
  );
}


