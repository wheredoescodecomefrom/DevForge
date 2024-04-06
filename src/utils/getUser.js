const axios = require('axios');

function getUserById(userId) {
    return axios.get(`https://api.roblox.com/users/${userId}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error retrieving user data:", error);
            return null;
        });
}

function getUserByUsername(username) {
    return axios.get(`https://api.roblox.com/users/get-by-username?username=${username}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error retrieving user data by username:", error);
            return null;
        });
}

function getUserRankInGroup(userId, groupId) {
    return axios.get(`https://api.roblox.com/groups/${groupId}/users/${userId}/rank`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error retrieving user rank in group:", error);
            return null;
        });
}

module.exports = {
  getUserById,
  getUserByUsername,
  getUserRankInGroup
}