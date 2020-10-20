export const BASE_URL = 'http://localhost:9000/api/users';

class UsersApiClient{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    async getUsers() {
        const resp = await fetch(`${this.baseUrl}`);
        const users = await resp.json();
        return users;
    }

    async addUser(user) {
        const resp = await fetch(`${this.baseUrl}/add`,{
            method: 'POST',
            mode: 'cors',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               },
            body: JSON.stringify(user)
        });
        const added = await resp.json();
        return added;
    }


    async deleteUser(userId) {
        const resp = await fetch(`${this.baseUrl}/${userId}`,
        {
            method: 'DELETE',
            mode: 'cors'
        });
        return await resp.json();
    }
    // async getCampaignById(campaignId) {
    //     const resp = await fetch(`${this.baseUrl}/campaigns/${campaignId}`);
    //     return await resp.json();
    //     //console.log(lqlq);
    //     //return lqlq;
    // }

   
}

export default new UsersApiClient(BASE_URL);