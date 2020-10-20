export const BASE_URL = 'http://localhost:9000/api';

class CampaignApiClient{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    async getAllCampaigns() {
        const resp = await fetch(`${this.baseUrl}/campaigns`);
        const campaigns = await resp.json();
        return campaigns;
    }

    async getCampaignById(campaignId) {
        const resp = await fetch(`${this.baseUrl}/campaigns/${campaignId}`);
        return await resp.json();
    }

    async getItemById(itemId, campaignId) {
        const resp = await fetch(`${this.baseUrl}/campaigns/${campaignId}/items/${itemId}`);
        return await resp.json();
    }

    async updateItem(currentItem) {
        const resp = await fetch(`${this.baseUrl}/item/${currentItem.id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(currentItem)
        });
        return await resp.json();
    }

    async getUserBiddedItems(userId) {
        const resp = await fetch(`${this.baseUrl}/items/bid/${userId}`);
        return await resp.json();
    }
}

export default new CampaignApiClient(BASE_URL);