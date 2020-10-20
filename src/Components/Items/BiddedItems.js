import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CAMPAIGN_API from '../../service/campaigns-api-client';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import '../../App.css';

const BIDDER_ID = 1;

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

function BiddedItems(props) {
    const classes = useStyles();
    const [items, setItems] = useState();

    useEffect(() => {
        async function fetchData() {
          setItems(await CAMPAIGN_API.getUserBiddedItems(BIDDER_ID));
        }
        fetchData();
      }, [])



    return (
      <div className="container-height">
        <div className={classes.root}>
              <GridList cellHeight={200} className={classes.gridList} cols = {3}>
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                  <ListSubheader component="div">Bidded Items</ListSubheader>
                </GridListTile>
                {items && items.map((item) => (
                  <GridListTile key={item.id}>
                    <img src={item.imagesPaths[0]} alt={item.name}/>
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
      
        )
}

BiddedItems.propTypes = {

}

export default BiddedItems

