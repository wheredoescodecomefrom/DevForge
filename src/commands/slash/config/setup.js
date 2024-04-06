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
    .setDescription('Setup the bot for your server')
    .addStringOption(o =>
      o.setName('id')
       .setDescription('Your group ID')
       .setRequired(true))
    .addStringOption(o =>
      o.setName('cookie')
       .setDescription('The cookie to use for your bot (required for ranking)')
       .setRequired(false)),
  run: async (client, interaction) => {
    const gid = interaction.options.getString('id');
    const token = interaction.option.getString('cookie')
    const s = await Schema.findOne({ id: interaction.guild.id });
    
    await interaction.deferReply({ ephemerial: true })

    const confirmBtn = new ButtonBuilder()
      .setCustomId('confirm-settings-btn')
      .setLabel('Confirm')
      .setStyle(ButtonStyle.Success)
      .setEmoji('✅');

    const cancelBtn = new ButtonBuilder()
      .setCustomId('cancel-settings-btn')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Danger)
      .setEmoji('❌')

    const row = new ActionRowBuilder()
      .addComponents(confirmBtn,cancelBtn)

    const e = new EmbedBuilder()
      .setTitle('Setup')
      .setDescription(`Please confirm the following info`)
      .addFields(
        {name:'Group ID',value:gid},
        {name:`Cookie`,value:`||${token}||`}
      )
      .setColor(client.color.normal)

    interaction.reply({ embeds: [e], components: [row], ephemerial: true,})
  }
}