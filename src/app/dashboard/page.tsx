'use client';

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { HistoricAQI } from '@/components/dashboard/overview/historicaqi';
import Typography from '@mui/material/Typography';
import { Aqidata } from '@/components/dashboard/overview/aqidata';
import { getLiveAQI } from '../../services/aqiService';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';


const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
}));

const GroupItems = styled('ul')({ padding: 0 });

const ALLOWED_ZIP_CODES = [
  { code: '95112', location: 'San Jose' },
  { code: '95014', location: 'Cupertino' },
];

export default function Page() {
  const [zipCode, setZipCode] = useState(null);
  const [liveAQI, setLiveAQI] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [featureData, setFeatureData] = useState<(number | 'N/A')[]>([]);
  const [predictedAqi, setPredictedAqi] = useState<number | null>(null);
  const [asOfDate, setAsOfDate] = useState<string | null>(null);


  const handleClose = () => setOpen(false);

  const fetchLiveAQI = async (selectedZipCode) => {
    try {
      const data = await getLiveAQI(selectedZipCode.code);
      setLiveAQI(data);
    } catch (error) {
      setOpen(true);
    }
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/live-aqi`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Live AQI error:', data.error);
          return;
        }
        setFeatureData([
          data.live_aqi_estimate,
          data.pm2_5,
          data.temperature_c,
          data.humidity_pct,
          data.wind_speed_ms,
          data.pressure_hpa,
          data.precipitation_mm,
          data.cloud_cover_pct,
        ]);
        setPredictedAqi(data.model_predicted_aqi);
        setAsOfDate(data.date);
      })
      .catch(error => console.error('Error loading live AQI data:', error));
  }, []);

  const featureHeaders = [
    { name: 'AQI', icon: 'aqi.png' },
    { name: 'PM2.5', icon: 'pm25.png' },
    { name: 'Temperature (°C)', icon: 'tempF.png' },
    { name: 'Humidity (%)', icon: 'humidity.png' },
    { name: 'Wind Speed (m/s)', icon: 'wind.png' },
    { name: 'Pressure (hPa)', icon: 'pressure.png' },
    { name: 'Precipitation (mm)', icon: 'precipitation.png' },
    { name: 'Cloud Cover (%)', icon: 'cloud.png' },
  ];
  const options = ALLOWED_ZIP_CODES.map((option) => ({
    firstLetter: /[0-9]/.test(option.code[0]) ? '0-9' : option.code[0].toUpperCase(),
    ...option,
  }));

  return (
    <Grid container spacing={3}>
      <Grid container lg={12}>
        <Grid lg={3} md={6} xs={12}>
          <Autocomplete
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            getOptionLabel={(option) => `${option.code} - ${option.location}`}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Zip Code" />}
            onChange={(event, newValue) => {
              setZipCode(newValue);
              fetchLiveAQI(newValue);
            }}
          />
        </Grid>
        <Grid lg={9} md={6} xs={12}>
          {zipCode && (
            <Typography variant="h5" sx={{ fontSize: '1.9rem', fontFamily: 'sans-serif' }}>
             AQI information of {zipCode.location} - {new Date().toLocaleDateString()}
          </Typography>
          )}
        </Grid>
      </Grid>

      <Grid lg={6} md={6} xs={12}>
        <Aqidata chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
      </Grid>
          
      
      <Grid>
        <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 2 }}>
          <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', fontFamily: 'sans-serif', textAlign: 'center', mb: 2 }}
          >
            Today's AQI & Feature Data for Air Quality Prediction
          </Typography>
          {asOfDate && (
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 1, color: 'text.secondary' }}>
              San Jose - Jackson, CA · {asOfDate}
            </Typography>
          )}
          {predictedAqi !== null && (
            <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold' }}>
              Model's Predicted AQI: {predictedAqi}
            </Typography>
          )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Feature</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {featureHeaders.map((feature, index) => (
            <TableRow key={index}>
              <TableCell>
                <img
                  src={`assets/${feature.icon}`}
                  alt={feature.name}
                  style={{ width: 24, height: 24, marginRight: 8, verticalAlign: 'middle' }}
                />
                {feature.name}
              </TableCell>
              <TableCell>{featureData.length > index ? featureData[index] : 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Grid>
      <Grid lg={12} xs={12}>
        <HistoricAQI
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>

      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
        <DialogTitle>Incorrect Zipcode</DialogTitle>
        <DialogContent>
          <DialogContentText>Your entered zipcode is incorrect. Please input the correct zipcode.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
