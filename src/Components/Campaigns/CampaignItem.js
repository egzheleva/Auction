import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { HorizontalSplit } from '@material-ui/icons';
import './Campaigns.css';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    flexGrow: 4,
    display: 'inline-block',
    padding:10,
    margin:35
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 300,
    overflow: 'hidden',
    display: 'inline-block',
    width: '100%',
  },
}));

export default function CampaignItem({campaign, handleCampaignClick}) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = campaign.imagesPaths.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function onCampaignClick () {
    handleCampaignClick(campaign.id);
  }

  return (
    <div className={classes.root} >
      <Paper square elevation={0} className={classes.header}>
        <Typography>{campaign.imagesPaths[activeStep].label}</Typography>
      </Paper>
      <h4>{campaign.name}</h4>
      <img
        className={classes.img}
        src={campaign.imagesPaths[activeStep]}
        alt={campaign.imagesPaths[activeStep].name}
        onClick={onCampaignClick}
      />
    
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        orientation="horizontal"
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
        <div>{campaign.descr}
        
        </div>
        <Button className="campaign-item-button" onClick={onCampaignClick}>View More</Button>
    </div>
  );
}