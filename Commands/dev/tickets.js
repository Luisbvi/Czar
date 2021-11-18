const {CommandInteraction, MessageButton, MessageEmbed, MessageActionRow, Client} = require("discord.js");

module.exports = {
    name: "tickets",
    description: "A ticket system",

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    execute(interaction, client){

        const embed = new MessageEmbed()
        .setTitle("Tickets")
        .setDescription("Click the buttom to open a ticket")
        .setColor("GREEN")
        .setFooter("Powered by BottingHub.com");

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("tickets")
            .setLabel("Make a Ticket")
            .setStyle("SUCCESS")
            .setEmoji("🎫")
        )
        interaction.channel.send({embeds: [embed], components: [row]})

    }
}