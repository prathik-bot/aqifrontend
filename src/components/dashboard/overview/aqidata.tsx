'use client';

import * as React from 'react';
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

  const getAQIColor = (aqi: number): string => {
    if (aqi <= 50) return '#00E400';
    if (aqi <= 100) return '#FFFF00';
    if (aqi <= 150) return '#FF7E00';
    if (aqi <= 200) return '#FF0000';
    if (aqi <= 300) return '#8F3F97';
    return '#7E0023';
  };

  React.useEffect(() => {
    fetch('http://localhost:5001/forecast-7day')
      .then((res) => res.json())
      .then((data) => {
        if (data.error || !data.forecast) {
          console.error('Error loading 7-day forecast:', data.error);
          return;
        }
        setChartSeries([{ name: 'Predicted AQI', data: data.forecast.map((d: any) => d.predicted_aqi) }]);
        setLabels(data.forecast.map((d: any) => d.date));
        setColors(data.forecast.map((d: any) => getAQIColor(d.predicted_aqi)));
      })
      .catch((error) => console.error('Error loading 7-day forecast:', error));
  }, []);

  const chartOptions: ApexOptions = {
    chart: { background: 'transparent', toolbar: { show: false } },
    plotOptions: { bar: { distributed: true, columnWidth: '80%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: labels, labels: { style: { colors: theme.palette.text.secondary } } },
    yaxis: { labels: { formatter: (value: number) => value.toFixed(0) } },
    colors,
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
