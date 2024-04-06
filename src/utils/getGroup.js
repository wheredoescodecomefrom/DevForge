const axios = require('axios');

function getGroup(groupId) {
    return axios.get(`https://api.roblox.com/groups/${groupId}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error retrieving group data:", error);
            return null;
        });
}

