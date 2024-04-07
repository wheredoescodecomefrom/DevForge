const axios = require('axios');

/**
 * Promotes a user in a Roblox group.
 * @param {number} userId - The ID of the user to promote.
 * @param {number} groupId - The ID of the group where the promotion will happen.
 * @param {string} rankId - The ID of the new rank for the user.
 * @param {string} botToken - The bot token used for authentication.
 * @returns {Promise<void>} - A promise that resolves when the promotion is complete.
 */
async function promoteUserInRobloxGroup(userId, groupId, rankId, botToken) {
  const url = `https://groups.roblox.com/v1/groups/${groupId}/users/${userId}`;
  const data = {
    roleId: rankId
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${botToken}`
    }
  };

  try {
    const response = await axios.patch(url, data, config);
    console.log(`User ${userId} promoted to rank ${rankId} in group ${groupId}.`);
  } catch (error) {
    console.error(`Failed to promote user ${userId}:`, error);
  }
}


/**
 * Demotes a user in a Roblox group.
 * @param {number} userId - The ID of the user to demote.
 * @param {number} groupId - The ID of the group where the demotion will happen.
 * @param {string} rankId - The ID of the new rank for the user after demotion.
 * @param {string} botToken - The bot token used for authentication.
 * @returns {Promise<void>} - A promise that resolves when the demotion is complete.
 */
async function demoteUserInRobloxGroup(userId, groupId, rankId, botToken) {
  const url = `https://groups.roblox.com/v1/groups/${groupId}/users/${userId}`;
  const data = {
    roleId: rankId
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${botToken}`
    }
  };

  try {
    const response = await axios.patch(url, data, config);
    console.log(`User ${userId} demoted to rank ${rankId} in group ${groupId}.`);
  } catch (error) {
    console.error(`Failed to demote user ${userId}:`, error);
  }
}