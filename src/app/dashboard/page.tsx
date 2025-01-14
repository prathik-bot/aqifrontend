'use client';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { HistoricAQI } from '@/components/dashboard/overview/historicaqi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Aqidata } from '@/components/dashboard/overview/aqidata';
import { red } from '@mui/material/colors';
import { getLiveAQI, getAQIForecast } from '../../services/aqiService';
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
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  ...theme.applyStyles('dark', {
    backgroundColor: darken(theme.palette.primary.main, 0.8),
  }),
}));
const GroupItems = styled('ul')({
  padding: 0,
});

export default function Page(): React.JSX.Element {
  const [zipCode, setZipCode] = useState('');
  const [liveAQI, setLiveAQI] = useState(null);
  const [open, setOpen] = useState(false);
  const [pollution,setPollution] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClose = () => {
    setOpen(false);
  };
  const fetchLiveAQI = async (selectedZipCode) => {
    try {
      const data = await getLiveAQI(selectedZipCode.code);
      setLiveAQI(data);
    } catch (error) {
      setOpen(true);     
    }
  };
  const options = ALLOWED_ZIP_CODES.map((option) => {
    const firstLetter = option.code[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  

  useEffect(() => { 
      var i = 0;   
      while (i>100) {
        setInterval(()=>{setPollution(i);}, 400);
        i++;
      }
      
      
  }, []);

  function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}
  
  return (
    <Grid container spacing={3}>
      <Grid container lg={12} >
        <Grid lg={3} md={6} xs={12}>
          <Autocomplete
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            getOptionLabel={(option) =>  `${option.code} -  ${option.location}`}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Zip Code" />}
            onChange={(event, newValue) => {
              console.log("Selected value:", newValue); // Log the selected value
              setZipCode(newValue); // Set the new zip code value
              fetchLiveAQI(newValue);
            }}
          />
        </Grid>
        <Grid lg={9} md={6} xs={12}>
          {/* <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "2.9rem", fontFamily: 'sans-serif' }}>
            {zipCode.location ? `AQI information of ${zipCode.location}` : "Please input zipcode"}
          </Typography> */}
        </Grid>
        
      </Grid>
      <Grid lg={6} md={6} xs={12}>
       
            <GaugeContainer
              width={400}
              height={400}
              startAngle={-110}
              endAngle={110}
              value={pollution}
            >
              <GaugeReferenceArc />
              <GaugeValueArc />
              <GaugePointer />
            </GaugeContainer>
       
      </Grid>
      <Grid lg={6} md={6} xs={12}>
        <Aqidata chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
      </Grid>
      <Grid container lg={12} md={6} xs={12}>
        <Grid lg={4} md={6}>
        <CardActionArea>
          <Card sx={{ borderLeft: '9px solid  #E95478' }}>
            <Grid container lg={12} md={6} xs={12}>
              <Grid lg={9}>
                  <CardContent >
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1.4rem" }}>
                      Particulate Matter
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "1.3rem" }} >
                      (PM2.5)
                    </Typography>
                  </CardContent>
              </Grid>
              <Grid lg={3}>
                  <CardContent >
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1.4rem" }}>
                    {liveAQI?liveAQI.components.pm2_5:'0'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "1.3rem" }} >
                      µg/m³
                    </Typography>
                  </CardContent>
              </Grid>
            </Grid>
          </Card>
          </CardActionArea>
        </Grid>
        <Grid lg={4}>
          <CardActionArea>
            <Card sx={{ borderLeft: '9px solid  #EA8C34' }}>
              <Grid container lg={12} md={6} xs={12}>
                <Grid lg={9} md={6}>
                  
                    <CardContent >
                      <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1.4rem" }}>
                        Particulate Matter
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "1.3rem" }} >
                        (PM10)
                      </Typography>
                    </CardContent>
                  
                </Grid>
                <Grid lg={3} md={6}>
                    <CardContent >
                      <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1.4rem" }}>
                      {liveAQI?liveAQI.components.pm10:'0'}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "1.3rem" }} >
                        µg/m³
                      </Typography>
                    </CardContent>
                </Grid>
              </Grid>
            </Card>
          </CardActionArea>
        </Grid>
        <Grid lg={4}>
          <Card sx={{ borderLeft: '9px solid  #59b61f','&:hover': {backgroundColor: '#dcdfe4' }  }}>
            <CardActionArea>
              <Grid container lg={12} md={6} xs={12}>
                  <Grid lg={9} md={6}>
                      <CardContent >
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1.4rem" }}>
                          Carbon Monoxide
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "1.3rem" }} >
                          (CO)
                        </Typography>
                      </CardContent>
                  </Grid>
                  <Grid lg={3} md={6}>
                      <CardContent >
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1.4rem" }}>
                        {liveAQI?liveAQI.components.co:'0'}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "1.3rem" }} >
                          ppb
                        </Typography>
                      </CardContent>
                  </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Grid container lg={12} md={6} xs={12}>
        <Grid lg={4}>
          <Card sx={{ borderLeft: '9px solid  #59b61f','&:hover': {backgroundColor: '#dcdfe4' }  }}>
            <CardActionArea>
              <Grid container lg={12} md={6} xs={12}>
                  <Grid lg={9} md={6}>
                      <CardContent >
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1.4rem" }}>
                          Sulfur Dioxide
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "1.3rem" }} >
                          (SO2)
                        </Typography>
                      </CardContent>
                  </Grid>
                  <Grid lg={3} md={6}>
                      <CardContent >
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1.4rem" }}>
                        {liveAQI?liveAQI.components.so2:'0'}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "1.3rem" }} >
                          ppb
                        </Typography>
                      </CardContent>
                  </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid lg={4}>
          <Card sx={{ borderLeft: '9px solid  #59b61f','&:hover': {backgroundColor: '#dcdfe4' }  }}>
            <CardActionArea>
              <Grid container lg={12} md={6} xs={12}>
                  <Grid lg={9} md={6}>
                      <CardContent >
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1.4rem" }}>
                          Ditrogen Dioxide
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "1.3rem" }} >
                          (NO2)
                        </Typography>
                      </CardContent>
                  </Grid>
                  <Grid lg={3} md={6}>
                      <CardContent >
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1.4rem" }}>
                        {liveAQI?liveAQI.components.no2:'0'}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "1.3rem" }} >
                          ppb
                        </Typography>
                      </CardContent>
                  </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid lg={4}>
          <Card sx={{ borderLeft: '9px solid  #59b61f','&:hover': {backgroundColor: '#dcdfe4' }  }}>
            <CardActionArea>
              <Grid container lg={12} md={6} xs={12}>
                  <Grid lg={9} md={6}>
                      <CardContent >
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1.4rem" }}>
                        Ozon
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "1.3rem" }} >
                        (O3)
                        </Typography>
                      </CardContent>
                  </Grid>
                  <Grid lg={3} md={6}>
                      <CardContent >
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "1.4rem" }}>
                        {liveAQI?liveAQI.components.o3:'0'}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "1.3rem" }} >
                          ppb
                        </Typography>
                      </CardContent>
                  </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        </Grid>
       
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
      <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Incorrect Zipcode"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Your entired zipcode is incorrect.
           Please input correct zipcode.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Grid>

  );
}
const ALLOWED_ZIP_CODES = [
  { code: '95014', location: "Cupertino" },
  { code: '92501', location: "Riverside" },
  { code: '94536', location: "Fremont" },
  { code: '30274', location: "Holtville" },
  { code: '94110', location: "Riverdale" },
  { code: "90805", location: "San Francisco" },
  { code: '90201', location: "Long Beach" },
  { code: '95630', location: "Bell Gardens" },
  { code: '92231', location: "Folsom" },
 
 
];
