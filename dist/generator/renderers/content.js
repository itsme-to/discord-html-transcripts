import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { parse } from 'discord-markdown-parser';
import { ChannelType } from 'discord.js';
import { parseDiscordEmoji } from '../../utils/utils.js';
import { DiscordHighlightedCode } from './components/DiscordHighlightedCode.js';
export var RenderType;
(function (RenderType) {
    RenderType[RenderType["EMBED"] = 0] = "EMBED";
    RenderType[RenderType["REPLY"] = 1] = "REPLY";
    RenderType[RenderType["NORMAL"] = 2] = "NORMAL";
    RenderType[RenderType["WEBHOOK"] = 3] = "WEBHOOK";
})(RenderType || (RenderType = {}));
/**
 * Renders discord markdown content
 * @param content - The content to render
 * @param context - The context to render the content in
 * @returns
 */
export default async function MessageContent({ content, context }) {
    if (context.type === RenderType.REPLY && content.length > 180)
        content = content.slice(0, 180) + '...';
    // parse the markdown
    const parsed = parse(content, context.type === RenderType.EMBED || context.type === RenderType.WEBHOOK ? 'extended' : 'normal');
    // check if the parsed content is only emojis
    const isOnlyEmojis = parsed.every((node) => ['emoji', 'twemoji'].includes(node.type) || (node.type === 'text' && node.content.trim().length === 0));
    if (isOnlyEmojis) {
        // now check if there are less than or equal to 25 emojis
        const emojis = parsed.filter((node) => ['emoji', 'twemoji'].includes(node.type));
        if (emojis.length <= 25) {
            context._internal = {
                largeEmojis: true,
            };
        }
    }
    return _jsx(MessageASTNodes, { nodes: parsed, context: context });
}
// This function can probably be combined into the MessageSingleASTNode function
async function MessageASTNodes({ nodes, context, }) {
    if (Array.isArray(nodes)) {
        return (_jsx(_Fragment, { children: nodes.map((node, i) => (_jsx(MessageSingleASTNode, { node: node, context: context }, i))) }));
    }
    else {
        return _jsx(MessageSingleASTNode, { node: nodes, context: context });
    }
}
export async function MessageSingleASTNode({ node, context }) {
    if (!node)
        return null;
    const type = node.type;
    switch (type) {
        case 'text':
            return node.content;
        case 'link':
            return (_jsx("discord-link", { href: node.target, children: _jsx(MessageASTNodes, { nodes: node.content, context: context }) }));
        case 'url':
        case 'autolink':
            return (_jsx("discord-link", { href: node.target, target: "_blank", rel: "noreferrer", children: _jsx(MessageASTNodes, { nodes: node.content, context: context }) }));
        case 'blockQuote':
            if (context.type === RenderType.REPLY) {
                return _jsx(MessageASTNodes, { nodes: node.content, context: context });
            }
            return (_jsx("discord-quote", { children: _jsx(MessageASTNodes, { nodes: node.content, context: context }) }));
        case 'br':
        case 'newline':
            if (context.type === RenderType.REPLY)
                return ' ';
            return _jsx("br", {});
        case 'channel': {
            const id = node.id;
            const channel = await context.callbacks.resolveChannel(id);
            return (_jsx("discord-mention", { type: channel ? (channel.isDMBased() ? 'channel' : getChannelType(channel.type)) : 'channel', children: channel ? (channel.isDMBased() ? 'DM Channel' : channel.name) : `<#${id}>` }));
        }
        case 'role': {
            const id = node.id;
            const role = await context.callbacks.resolveRole(id);
            return (_jsx("discord-mention", { type: "role", color: context.type === RenderType.REPLY ? undefined : role?.hexColor, children: role ? role.name : `<@&${id}>` }));
        }
        case 'user': {
            const id = node.id;
            const user = await context.callbacks.resolveUser(id);
            return _jsx("discord-mention", { type: "user", children: user ? (user.displayName ?? user.username) : `<@${id}>` });
        }
        case 'here':
        case 'everyone':
            return (_jsx("discord-mention", { type: 'role', highlight: true, children: `@${type}` }));
        case 'codeBlock':
            if (context.type !== RenderType.REPLY) {
                return _jsx(DiscordHighlightedCode, { language: node.lang, content: node.content });
            }
            return _jsx("discord-code", { children: node.content });
        case 'inlineCode':
            return _jsx("discord-code", { children: node.content });
        case 'em':
            return (_jsx("discord-italic", { children: _jsx(MessageASTNodes, { nodes: node.content, context: context }) }));
        case 'strong':
            return (_jsx("discord-bold", { children: _jsx(MessageASTNodes, { nodes: node.content, context: context }) }));
        case 'underline':
            return (_jsx("discord-underlined", { children: _jsx(MessageASTNodes, { nodes: node.content, context: context }) }));
        case 'strikethrough':
            return (_jsx("s", { children: _jsx(MessageASTNodes, { nodes: node.content, context: context }) }));
        case 'emoticon':
            return typeof node.content === 'string' ? (node.content) : (_jsx(MessageASTNodes, { nodes: node.content, context: context }));
        case 'spoiler':
            return (_jsx("discord-spoiler", { children: _jsx(MessageASTNodes, { nodes: node.content, context: context }) }));
        case 'emoji':
        case 'twemoji':
            return (_jsx("discord-custom-emoji", { name: node.name, url: parseDiscordEmoji(node), embedEmoji: context.type === RenderType.EMBED, jumbo: context._internal?.largeEmojis }));
        case 'timestamp':
            // TODO: Make this reactive
            // https://github.com/ItzDerock/discord-components/blob/main/packages/core/src/components/discord-time/discord-time.tsx
            return _jsx("discord-time", { children: new Date(node.timestamp).toISOString() });
        // return <DiscordTime timestamp={parseInt(node.timestamp) * 1000} format={node.format} />;
        default: {
            console.log(`[discord-html-transcripts] Unknown node type: ${type}`, node);
            return typeof node.content === 'string' ? (node.content) : (_jsx(MessageASTNodes, { nodes: node.content, context: context }));
        }
    }
}
export function getChannelType(channelType) {
    switch (channelType) {
        case ChannelType.GuildCategory:
        case ChannelType.GuildAnnouncement:
        case ChannelType.GuildText:
        case ChannelType.DM:
        case ChannelType.GroupDM:
        case ChannelType.GuildDirectory:
        case ChannelType.GuildMedia:
            return 'channel';
        case ChannelType.GuildVoice:
        case ChannelType.GuildStageVoice:
            return 'voice';
        case ChannelType.PublicThread:
        case ChannelType.PrivateThread:
        case ChannelType.AnnouncementThread:
            return 'thread';
        case ChannelType.GuildForum:
            return 'forum';
        default:
            return 'channel';
    }
}
//# sourceMappingURL=content.js.map