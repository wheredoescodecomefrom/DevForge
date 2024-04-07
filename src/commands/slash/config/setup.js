const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js")
const { readdirSync } = require("fs")
const Schema = require('../../../database/models/Server');

module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Setup the bot for your server'),
  run: async (client,interaction) => {
    const s = await Schema.findOne({ id: interaction.guild.id });
    
    await interaction.deferReply({ ephemiral: true });

    if (!s) {
      const newSer = new Schema({ id: interaction.guild.id })
      newSer.save();
    }

    const groupIdBtn = new ButtonBuilder()
      .setCustomId('gid-btn')
      .setLabel('Group ID')

    const cookieBtn = new ButtonBuilder()
      .setCustomId('cookie-btn')
      .setLabel('Cookie')

    const rankingPermsId = new ButtonBuilder()
      .setCustomId('rank-btn')
      .setLabel('Ranking Perms')

    const logChannrl = new ButtonBuilder()
      .setCustomId('log-chann-btn')
      .setLabel('Logging Channel')

    const row = new ActionRowBuilder()
      .addComponents(groupIdBtn,cookieBtn,rankingPermsId,logChannrl)

    const e = new EmbedBuilder()
      .setTitle('DevForge Config')
      .setDescription(`Thank you for having DevForge in ${interaction.guild}!\n\n To edit your configuration, press the corosponding button below!`)
      .addFields(
        {name:'Group ID',value:`${s.groupid || 'No groups linked'}`},
        {name:'Cookie',value:`${s.cookieSet}`},
        {name:'Ranking Perms ID',value:`${s.rankPermsRole}`},
        {name:'Log Channel ID',value: `${s.logChann}`}
      )
    .setColor(client.color)

    interaction.reply({ embeds: [e], components: [row], ephemiral: true })
  }
}