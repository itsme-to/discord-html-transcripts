import { UserFlags } from 'discord.js';
export async function buildProfiles(messages) {
    const profiles = {};
    // loop through messages
    for (const message of messages) {
        // add all users
        const author = message.author;
        if (!profiles[author.id]) {
            // add profile
            profiles[author.id] = buildProfile(message.member, author);
        }
        // add interaction users
        if (message.interaction) {
            const user = message.interaction.user;
            if (!profiles[user.id]) {
                profiles[user.id] = buildProfile(null, user);
            }
        }
        // threads
        if (message.thread && message.thread.lastMessage) {
            profiles[message.thread.lastMessage.author.id] = buildProfile(message.thread.lastMessage.member, message.thread.lastMessage.author);
        }
    }
    // return as a JSON
    return profiles;
}
function buildProfile(member, author) {
    return {
        author: member?.nickname ?? author.displayName ?? author.username,
        avatar: member?.displayAvatarURL({ size: 64 }) ?? author.displayAvatarURL({ size: 64 }),
        roleColor: member?.displayHexColor,
        roleIcon: member?.roles.icon?.iconURL() ?? undefined,
        roleName: member?.roles.hoist?.name ?? undefined,
        bot: author.bot,
        verified: author.flags?.has(UserFlags.VerifiedBot),
    };
}
//# sourceMappingURL=buildProfiles.js.map