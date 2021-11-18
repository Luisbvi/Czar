const { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        if(interaction.isButton){
            if(interaction.customId === "tickets"){
                const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: "GUILD_TEXT",
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        },
                        {
                            id: everyone.id,
                            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        }
                    ]
                }).then(c => {
                    const message = new MessageEmbed()
                    .setTitle(`Welcome to your ticket ${interaction.user.username}`)
                    .setDescription("The support team will be with you shortly please be patient")

                    const close = new MessageActionRow()
                    new MessageButton()
                    .setCustomId("close")
                    .setStyle("DANGER")
                    .setEmoji("❌")
                    .setLabel("Close")
                    
                    c.send({embeds: [message]})
                });
                interaction.reply({content: `<@${interaction.user.id}> your ticket has been created`, ephemeral: true})
            }
            if(interaction.customId === "close"){
                interaction.channel.delete()

            }
        }
        if(interaction.isCommand()){
            const command = client.commands.get(interaction.commandName);
            if(!command)return interaction.reply({embeds:[
                new MessageEmbed()
                .setColor("RED")
                .setDescription("⛔ an error ocured while running this command.")
            ]}) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client)
        }
    }

}