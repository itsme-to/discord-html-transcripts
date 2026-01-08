import { jsx as _jsx } from "react/jsx-runtime";
import { UserFlags } from 'discord.js';
import MessageContent, { RenderType } from './content.js';
export default async function MessageReply({ message, context }) {
    if (!message.reference)
        return null;
    if (message.reference.guildId !== message.guild?.id)
        return null;
    const referencedMessage = context.messages.find((m) => m.id === message.reference.messageId);
    if (!referencedMessage)
        return _jsx("discord-reply", { slot: "reply", children: "Message could not be loaded." });
    const isCrossPost = referencedMessage.reference && referencedMessage.reference.guildId !== message.guild?.id;
    const isCommand = referencedMessage.interaction !== null;
    return (_jsx("discord-reply", { slot: "reply", edited: !isCommand && referencedMessage.editedAt !== null, attachment: referencedMessage.attachments.size > 0, author: referencedMessage.member?.nickname ?? referencedMessage.author.displayName ?? referencedMessage.author.username, avatar: referencedMessage.author.avatarURL({ size: 32 }) ?? undefined, roleColor: referencedMessage.member?.displayHexColor ?? undefined, bot: !isCrossPost && referencedMessage.author.bot, verified: referencedMessage.author.flags?.has(UserFlags.VerifiedBot), op: message?.channel?.isThread?.() && referencedMessage.author.id === message?.channel?.ownerId, server: isCrossPost ?? undefined, command: isCommand, children: referencedMessage.content ? (_jsx("span", { "data-goto": referencedMessage.id, className: "reply-inline", children: _jsx(MessageContent, { content: referencedMessage.content, context: { ...context, type: RenderType.REPLY } }) })) : isCommand ? (_jsx("em", { "data-goto": referencedMessage.id, children: "Click to see command." })) : (_jsx("em", { "data-goto": referencedMessage.id, children: "Click to see attachment." })) }));
}
//# sourceMappingURL=reply.js.map