import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Button, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './ItemDetails.css';
import CAMPAIGN_API from '../../service/campaigns-api-client';
import Alert from '@material-ui/lab/Alert';
import '../../App.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      margin: 50
    },
    gridList: {
      width: 500,
      height: 'auto',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

  const useTextFieldStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        width: '25ch',
      },
    },
  }));

function ItemDetails(props) {
    const classes = useStyles();
    const TextFieldClasses = useTextFieldStyles();
    const location = useLocation();
    const [item, setItem] = useState({imagesPaths: []});
    const [bid, setBid] = useState(0);
    const [wrongBid, setWrongBid] = useState(false);
    const [showAllert, setShowAllert] = useState(false);

    const itemId = location.state.item.id;
    const campaignId =location.state.campaignId;

    useEffect(() => {
        async function fetchData() {
          setItem(await CAMPAIGN_API.getItemById(itemId, campaignId));
        } 
        fetchData();
        }, [location]);


    const handleBidChange = (event) => {
      setShowAllert(false);
      setWrongBid(false);
      setBid(parseInt(event.target.value) || bid);
    }


    async function handleEditItem() {
      if(bid > item.currentPrice) {
        item.currentPrice = bid;
        item.campaignId = campaignId;
        const updatedItem = await CAMPAIGN_API.updateItem(item);
        setItem(updatedItem);
        setWrongBid(false);
        setShowAllert(true);
      }
      else {
        setWrongBid(true);
      }
    }

    return (
      <>
       <div className="container-height">
        <div className="item-detais-img-container">
            <div className={classes.root}>
              <GridList cellHeight={200} className={classes.gridList} cols = {2}>
                {item && item.imagesPaths.map((img) => (
                <GridListTile key={img}>
                    <img src={img}/>
                </GridListTile>
                ))}
              </GridList>
            </div>
        </div>
        <div className="item-details-container">
            <h3>{item.name}</h3>
            <p>{item.descr}</p>
            <h4>Current Price: {item.currentPrice}&euro;</h4>
            <form className={TextFieldClasses.root} autoComplete="off">
                <TextField error={wrongBid} helperText={wrongBid ? 'Your bid must be higher than the item price' : ''} id="standard-basic" type="number" label="Place Your Bid"  value={bid} onChange={handleBidChange}/>
                <Button className="item-details-butttons" variant="outlined" color="primary" onClick={handleEditItem}>Bid</Button>
            </form>
            {showAllert && <Alert severity="success">You successfully placed a bid!</Alert>} 

        </div>
        </div>
     </>
    )
}

export default ItemDetails

