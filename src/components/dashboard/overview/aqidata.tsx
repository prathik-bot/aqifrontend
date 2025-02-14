'use client';

import * as React from 'react';
import Papa from 'papaparse';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

export interface AqidataProps {
  sx?: SxProps;
}

export function Aqidata({ sx }: AqidataProps): React.JSX.Element {
  const [chartSeries, setChartSeries] = React.useState<{ name: string; data: number[] }[]>([]);
  const [labels, setLabels] = React.useState<string[]>([]);
  const [colors, setColors] = React.useState<string[]>([]);
  const theme = useTheme();

  // Function to get AQI color
  const getAQIColor = (aqi: number): string => {
    if (aqi <= 50) return '#00E400'; // Green (Good)
    if (aqi <= 100) return '#FFFF00'; // Yellow (Moderate)
    if (aqi <= 150) return '#FF7E00'; // Orange (Unhealthy for Sensitive)
    if (aqi <= 200) return '#FF0000'; // Red (Unhealthy)
    if (aqi <= 300) return '#8F3F97'; // Purple (Very Unhealthy)
    return '#7E0023'; // Maroon (Hazardous)
  };

  React.useEffect(() => {
    Papa.parse('/aqi_trend.csv', {
      download: true,
      header: true,
      complete: (result) => {
        try {
          const data = result.data as { date: string; aqi: string }[];

          const trendData = data
            .map((item) => ({
              date: item.date,
              aqi: parseFloat(item.aqi),
            }))
            .filter((item) => !isNaN(item.aqi));

          setChartSeries([{ name: 'AQI', data: trendData.map((item) => item.aqi) }]);
          setLabels(trendData.map((item) => item.date));
          setColors(trendData.map((item) => getAQIColor(item.aqi)));
        } catch (error) {
          console.error('Error processing CSV data:', error);
        }
      },
    });
  }, []);

  const chartOptions: ApexOptions = {
    chart: { background: 'transparent', toolbar: { show: false } },
    plotOptions: { bar: { distributed: true, columnWidth: '80%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: labels, labels: { style: { colors: theme.palette.text.secondary } } },
    yaxis: { labels: { formatter: (value: number) => value.toFixed(0) } },
    colors, // Apply AQI-based colors
  };

  return (
    <Card sx={sx}>
      <CardHeader title="AQI Seven Day Forecasting" />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={300} options={chartOptions} series={chartSeries} type="bar" width="100%" />
        </Stack>
      </CardContent>
    </Card>
  );
}
