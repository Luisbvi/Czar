const {CommandInteraction, Client, MessageEmbed} = require("discord.js")

module.exports = {
    name: "delete",
    description: "Delete a ticket",
   
   /**
    * 
    * @param {CommandInteraction} interaction 
    * @param {Client} client 
    */
    execute(interaction, client){
        const name = interaction.channel.name
        if(name.startsWith("ticket")){
            const embed = new MessageEmbed()
            .setDescription("This channel will be deleted in **10s**")
            setTimeout(() => {
                interaction.channel.delete()
            }, 10000);
            interaction.reply({content: "Channel will be deleted soon", ephemeral: true})
            interaction.channel.send({embeds: [embed]})
            
        }else{
            interaction.reply({content: "You can't delete this channel", ephemeral: true})
        }

    }
}