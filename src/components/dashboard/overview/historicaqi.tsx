// 'use client';

// import * as React from 'react';
// import Papa from 'papaparse';
// import dayjs from 'dayjs';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
// import Divider from '@mui/material/Divider';
// import { alpha, useTheme } from '@mui/material/styles';
// import type { SxProps } from '@mui/material/styles';
// import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
// import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
// import type { ApexOptions } from 'apexcharts';

// import { Chart } from '@/components/core/chart';

// export interface HistoricAQIProps {
//   chartSeries: { name: string; data: number[] }[];
//   sx?: SxProps;
// }


// export function HistoricAQI({ sx }: HistoricAQIProps): React.JSX.Element {
//   const [chartSeries, setChartSeries] = React.useState<{ name: string; data: number[] }[]>([]);
//   const [categories, setCategories] = React.useState<string[]>([]);
//   const [colors, setColors] = React.useState<string[]>([]);
//   const [isDataLoaded, setIsDataLoaded] = React.useState(false); // Track if data is loaded

//   // Fetch chart options dynamically with seriesColors
//   // const chartOptions = useChartOptions(categories, colors.length > 0 ? colors : ['grey']);
//   // Remove the fallback to 'grey' for colors
// const chartOptions = useChartOptions(categories, colors);

//   React.useEffect(() => {
//     // Load CSV and process data
//     console.log("useEffect triggered");
//     Papa.parse('/historic_aqi.csv', {
//       download: true,
//       header: true,
//       complete: (result) => {
//         try {
//           const data = result.data as { date: string; aqi: string }[];

//           // Process and validate data
//           const last30Days = data
//             .map((item) => ({
//               date: dayjs(item.date, 'YYYY-MM-DD').isValid()
//                 ? dayjs(item.date).format('MMM D') // Format date for display
//                 : null,
//               aqi: parseFloat(item.aqi),
//             }))
//             .filter(
//               (item) =>
//                 item.date && !isNaN(item.aqi) && dayjs().diff(dayjs(item.date, 'MMM D'), 'day') <= 30
//             )
//             .reverse();

//           // Color logic for bars based on AQI range
//           const aqiColors = last30Days.map((item) => {
//             return 'blue'; 
//           });

//           setChartSeries([
//             {
//               name: 'AQI',
//               data: last30Days.map((item) => item.aqi),
//             },
//           ]);
//           setCategories(last30Days.map((item) => item.date!));
//           setColors(aqiColors); // Set colors for each bar
//           setIsDataLoaded(true); // Mark data as loaded
//         } catch (error) {
//           console.error('Error processing CSV data:', error);
//         }
//       },
//       error: (error) => {
//         console.error('Error loading CSV:', error);
//       },
//     });
//   }, []);

  
//   // Ensure valid series structure
//   const seriesData = chartSeries.length ? chartSeries : [{ name: 'AQI', data: [] }];
//   const seriesColors = colors.length ? colors : ['blue']; // Fallback color if no colors are loaded

//   console.log('Chart Series:', seriesData); // Debugging series data
//   console.log('Series Colors:', seriesColors); // Debugging colors

//   // Only render Chart if data is loaded
//   if (!isDataLoaded) {
//     return (
//       <Card sx={sx}>
//         <CardHeader title="Historic AQI Data" />
//         <CardContent>Loading...</CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card sx={sx}>
//       <CardHeader
//         action={
//           <Button
//             color="inherit"
//             size="small"
//             startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}
//           >
//             Sync
//           </Button>
//         }
//         title="Historic AQI Data"
//       />
//       <CardContent>
//         <Chart
//           height={350}
//           options={chartOptions}
//           series={seriesData} // Using valid data or empty array if no data
//           type="bar"
//           width="100%"
//         />
//       </CardContent>
//       <Divider />
//       <CardActions sx={{ justifyContent: 'flex-end' }}>
//         <Button
//           color="inherit"
//           endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
//           size="small"
//         >
//           AQIPrediction
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }

// function useChartOptions(categories: string[]): ApexOptions {
//   const theme = useTheme();

//   return {
//     chart: {
//       background: 'transparent',
//       stacked: false,
//       toolbar: { show: false },
//     },
//     dataLabels: { enabled: false },
//     fill: {
//       opacity: 1,
//       type: 'solid',
//     },
//     grid: {
//       borderColor: theme.palette.divider,
//       strokeDashArray: 2,
//       xaxis: { lines: { show: false } },
//       yaxis: { lines: { show: true } },
//     },
//     legend: { show: false },
//     plotOptions: {
//       bar: {
//         columnWidth: '60%', // Adjust bar width to leave space
//         distributed: false, // Ensure uniform width
//         horizontal: false, // Vertical bars
//         barHeight: '75%', // Only if using horizontal bars
//       },
//     },
//     stroke: {
//       colors: ['transparent'], // No border
//       show: true,
//       width: 2,
//     },
//     theme: { mode: theme.palette.mode },
//     xaxis: {
//       axisBorder: { color: theme.palette.divider, show: true },
//       axisTicks: { color: theme.palette.divider, show: true },
//       categories,
//       labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
//     },
//     yaxis: {
//       labels: {
//         formatter: (value) => value.toFixed(0),
//         offsetX: -10,
//         style: { colors: theme.palette.text.secondary },
//       },
//     },
//   };
// }



'use client';

import * as React from 'react';
import Papa from 'papaparse';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

export interface HistoricAQIProps {
  sx?: SxProps;
}

export function HistoricAQI({ sx }: HistoricAQIProps): React.JSX.Element {
  const [chartSeries, setChartSeries] = React.useState<{ name: string; data: number[] }[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [colors, setColors] = React.useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false); // Track if data is loaded
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
    // Load CSV and process data
    console.log("useEffect triggered");
    Papa.parse('/historic_aqi.csv', {
      download: true,
      header: true,
      complete: (result) => {
        try {
          const data = result.data as { date: string; aqi: string }[];

          // Process and validate data
          const last30Days = data
            .map((item) => ({
              date: dayjs(item.date, 'YYYY-MM-DD').isValid()
                ? dayjs(item.date).format('MMM D') // Format date for display
                : null,
              aqi: parseFloat(item.aqi),
            }))
            .filter(
              (item) =>
                item.date && !isNaN(item.aqi) && dayjs().diff(dayjs(item.date, 'MMM D'), 'day') <= 30
            )
            .reverse();

          // Color logic for bars based on AQI range
          const aqiColors = last30Days.map((item) => getAQIColor(item.aqi));

          setChartSeries([
            {
              name: 'AQI',
              data: last30Days.map((item) => item.aqi),
            },
          ]);
          setCategories(last30Days.map((item) => item.date!));
          setColors(aqiColors); // Set colors for each bar
          setIsDataLoaded(true); // Mark data as loaded
        } catch (error) {
          console.error('Error processing CSV data:', error);
        }
      },
      error: (error) => {
        console.error('Error loading CSV:', error);
      },
    });
  }, []);

  // Ensure valid series structure
  const seriesData = chartSeries.length ? chartSeries : [{ name: 'AQI', data: [] }];
  const seriesColors = colors.length ? colors : ['blue']; // Fallback color if no colors are loaded

  const chartOptions: ApexOptions = {
    chart: { background: 'transparent', stacked: false, toolbar: { show: false } },
    plotOptions: { bar: { distributed: true, columnWidth: '60%' } },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: { style: { colors: theme.palette.text.secondary } },
    },
    yaxis: {
      labels: { formatter: (value: number) => value.toFixed(0) },
    },
    colors: seriesColors, // Apply AQI-based colors
  };

  // Only render Chart if data is loaded
  if (!isDataLoaded) {
    return (
      <Card sx={sx}>
        <CardHeader title="Historic AQI Data" />
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <Button
            color="inherit"
            size="small"
            startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}
          >
            Sync
          </Button>
        }
        title="Historic AQI Data"
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={seriesData} // Using valid data or empty array if no data
          type="bar"
          width="100%"
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
        >
          AQIPrediction
        </Button>
      </CardActions>
    </Card>
  );
}
