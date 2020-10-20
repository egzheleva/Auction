import React, { useEffect, useState } from 'react';
import CAMPAIGN_API from '../../service/campaigns-api-client';
import { useHistory } from "react-router-dom";
import './Campaigns.css';

function ExpiredCampaigns() {

const [campaigns, setCampaigns] = useState([]);
const history = useHistory();

useEffect(() => {
  async function fetchData() {
    setCampaigns(await CAMPAIGN_API.getAllCampaigns());
  }
  fetchData();
}, [])


return (
    <div className="expired-campaigns">
        <h4>Expired Campaigns</h4>
        {
            campaigns.map(camp => (
                <img key={camp.id} src={camp.imagesPaths[0]}/>
            ))
        }
    </div>
)
}


export default ExpiredCampaigns


