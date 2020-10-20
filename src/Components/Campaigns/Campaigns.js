import React, { useEffect, useState } from 'react';
import CampaignItem from './CampaignItem';
import CAMPAIGN_API from '../../service/campaigns-api-client';
import { useHistory } from "react-router-dom";

function Campaigns() {

const [campaigns, setCampaigns] = useState([]);
const history = useHistory();

useEffect(() => {
  async function fetchData() {
    setCampaigns(await CAMPAIGN_API.getAllCampaigns());
  }
  fetchData();
}, [])


function handleCampaignClick(campaignId) {
  history.push(`/campaigns/${campaignId}`);
}

return (
    <div className="Campaigns">
      <h2 className="headling-campaigns">Active Campaigns</h2>
        {
            campaigns.map(camp => (
                <CampaignItem key={camp.id} campaign={camp} handleCampaignClick={handleCampaignClick}/>
            ))
        }
    </div>
)
}


export default Campaigns


