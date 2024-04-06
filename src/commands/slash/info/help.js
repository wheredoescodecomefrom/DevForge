const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js")
const { readdirSync } = require("fs")
let image = "https://cdn.discordapp.com/attachments/1161005966712643584/1225824589238767637/A1425E58-C20A-40FF-BAAC-51EBB857B81E.png?ex=6622891c&is=6610141c&hm=4a0a56e1f1258c8222814fef9a31241102485b71dd2080177cac9613e6f43be7&"
module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("here are some of the available bot commands!"),
  run: async (client, interaction) => {

    await interaction.deferReply({ ephemeral: false })
    let { INVITE, SUPPORT } = client.config
    if(!INVITE.startsWith("https") || !SUPPORT.startsWith("https")) return await interaction.editReply({content: ":x: | please update the invite link url, or support url."})
    let dir = readdirSync("./src/commands/slash")

    let button1 = new ButtonBuilder()
      .setLabel("Invite Me")
      .setStyle(ButtonStyle.Link)
      .setURL(INVITE)

    let button2 = new ButtonBuilder()
      .setLabel("Support")
      .setStyle(ButtonStyle.Link)
      .setURL(SUPPORT)

    const row = new ActionRowBuilder()
      .addComponents(button1, button2)

    const opt = new StringSelectMenuBuilder()
      .setCustomId("help-select-menu")
      .setPlaceholder("Select by category")
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(dir.map((p) => {
          return new StringSelectMenuOptionBuilder().setLabel(client.capitalize(p)).setValue(p);
        })
      );

    let row2 = new ActionRowBuilder().addComponents(opt)
    const slash = (cmd) => {
      return `</${cmd}:${client.user.id}>`
    }

    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.capitalize(client.user.username + " help commands"),
        iconURL: client.user.displayAvatarURL({ dynamic: true, size: 1024 })
      })
      .setImage(image)
      .setColor(client.color.normal)
      .setDescription(`> Hello ${interaction.member}! I am DevForge, a discord to roblox management bot for your ranking and verification needs! Use the menu below to learn more about my commands`)
      .setTimestamp()
      .setFooter({ text: `DevForge Ranking | Version: 1.0.0-beta` })


    await interaction.editReply({ embeds: [embed], components: [row2, row] }).then(async (msg) => {

      let filter = (i) => i.isStringSelectMenu() && i.user && i.message.author.id == client.user.id;

      let collector = await msg.createMessageComponentCollector({
        filter,
        time: 120000,
      })
      let cEmbed = new EmbedBuilder()

      collector.on("collect", async (m) => {
        if (m.isStringSelectMenu()) {

          if (m.customId === "help-select-menu") {
            await m.deferUpdate()
            let choice = m.values[0]

            let command = readdirSync(`./src/commands/slash/${choice}`)

            let cmds = command.map((x) => {
              let cmd = require(`../../slash/${choice}/${x}`)

              return `\n> ${slash(cmd.data.name)}\n> \`${cmd.data.description}\``
            })

            cEmbed.setAuthor({
                name: client.capitalize(client.user.username + " help commands"),
                iconURL: client.user.displayAvatarURL({ dynamic: true, size: 1024 })
              })
              .setDescription(cmds.join("\n"))
              .setColor(client.color.normal)
              .setFooter({ text: `request from: ${m.user.username}` })
              .setTimestamp()

            return await msg.edit({ embeds: [cEmbed] })
          }

        }
      })
      collector.on("end", (p, g) => {
        cEmbed.setColor("000010")
        .setFooter({text: "menu is inactive"})
       return msg.edit({embeds: [cEmbed]})
      })

    })
  }
}