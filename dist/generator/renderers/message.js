import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { parseDiscordEmoji } from '../../utils/utils.js';
import { Attachments } from './attachment.js';
import ComponentRow from './components.js';
import MessageContent, { RenderType } from './content.js';
import { DiscordEmbed } from './embed.js';
import MessageReply from './reply.js';
import DiscordSystemMessage from './systemMessage.js';
export default async function DiscordMessage({ message, context, }) {
    if (message.system)
        return _jsx(DiscordSystemMessage, { message: message });
    const isCrosspost = message.reference && message.reference.guildId !== message.guild?.id;
    return (_jsxs("discord-message", { id: `m-${message.id}`, timestamp: message.createdAt, edited: message.editedAt !== null, server: isCrosspost ?? undefined, highlight: message.mentions.everyone, profile: message.author.id, children: [_jsx(MessageReply, { message: message, context: context }), message.interaction && (_jsx("discord-command", { slot: "reply", profile: message.interaction.user.id, command: '/' + message.interaction.commandName })), message.content && (_jsx(MessageContent, { content: message.content, context: { ...context, type: message.webhookId ? RenderType.WEBHOOK : RenderType.NORMAL } })), _jsx(Attachments, { message: message, context: context }), message.embeds.map((embed, id) => (_jsx(DiscordEmbed, { embed: embed, context: { ...context, index: id, message } }, id))), message.components.length > 0 && (_jsx("discord-attachments", { slot: "components", children: message.components.map((component, id) => (_jsx(ComponentRow, { id: id, component: component, context: context }, id))) })), message.reactions.cache.size > 0 && (_jsx("discord-reactions", { slot: "reactions", children: message.reactions.cache.map((reaction, id) => (_jsx("discord-reaction", { name: reaction.emoji.name, emoji: parseDiscordEmoji(reaction.emoji), count: reaction.count }, `${message.id}r${id}`))) })), message.hasThread && message.thread && (_jsx("discord-thread", { slot: "thread", name: message.thread.name, cta: message.thread.messageCount
                    ? `${message.thread.messageCount} Message${message.thread.messageCount > 1 ? 's' : ''}`
                    : 'View Thread', children: message.thread.lastMessage ? (_jsx("discord-thread-message", { profile: message.thread.lastMessage.author.id, children: _jsx(MessageContent, { content: message.thread.lastMessage.content.length > 128
                            ? message.thread.lastMessage.content.substring(0, 125) + '...'
                            : message.thread.lastMessage.content, context: { ...context, type: RenderType.REPLY } }) })) : (`Thread messages not saved.`) }))] }, message.id));
}
//# sourceMappingURL=message.js.map