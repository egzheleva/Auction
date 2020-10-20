import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { useHistory, useParams } from 'react-router-dom';
import CAMPAIGN_API from '../../service/campaigns-api-client';
import '../../App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: 50
  },
  gridList: {
    width: 1000,
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function Items() {
    const classes = useStyles();
    const {campaignId} = useParams();
    const history = useHistory();


    const [campaign, setCampaign] = useState({items: []});
    
   
    useEffect(() => {
    async function fetchData() {
        console.log(campaignId);
        setCampaign(await CAMPAIGN_API.getCampaignById(campaignId));
       
    }
    fetchData();
    }, [])

    function onClickItem(item) {
        history.push({
        pathname: `/item/${item.id}`,
        state: { item: item, campaignId: campaignId }
        })

    }

  return (
    <div className="container-height">
      <div className={classes.root}>
        <GridList cellHeight={200} className={classes.gridList} cols = {3}>
          <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
            <ListSubheader component="div">{campaign.name}</ListSubheader>
          </GridListTile>
          {campaign && campaign.items && campaign.items.map((item) => (
            <GridListTile key={item.id}>
              <img src={item.imagesPaths[0]} alt={item.name} onClick={() => onClickItem(item)}/>
              <GridListTileBar
                title={item.name}
                subtitle={<span>by: {item.descr}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${item.name}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}
