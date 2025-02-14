'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { green, yellow, orange, red, purple, brown } from '@mui/material/colors';  // Ensure colors are correctly imported

export function SideNav(): React.JSX.Element {
  // Define AQI information with corresponding color codes
  const aqiData = [
    { range: '0 - 50', description: 'Good', color: green[500] },
    { range: '51 - 100', description: 'Moderate', color: yellow[500] },
    { range: '101 - 150', description: 'Unhealthy for Sensitive Groups', color: orange[500] },
    { range: '151 - 200', description: 'Unhealthy', color: red[500] },
    { range: '201 - 300', description: 'Very Unhealthy', color: purple[500] },
    { range: '301 - 500', description: 'Hazardous', color: brown[500] }, // brown can be used for hazardous AQI
  ];

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
        width: '300px',
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

      <Card>
        <CardHeader title="AQI Color Index Information" />
        <CardContent>
          <TableContainer>
            <Table sx={{ minWidth: 100 }}>
              <TableHead>
                <TableRow>
                  <TableCell><strong>AQI Range</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Color</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aqiData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>
                      {row.range}
                    </TableCell>
                    <TableCell sx={{ fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>
                      {row.description}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          width: '100%',  // Reduced the width to fit better
                          height: '20px',
                          bgcolor: row.color,
                          borderRadius: '4px',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
