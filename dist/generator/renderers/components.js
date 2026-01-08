import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ComponentType, } from 'discord.js';
import { parseDiscordEmoji } from '../../utils/utils.js';
import DiscordSelectMenu from './components/Select Menu.js';
import DiscordContainer from './components/Container.js';
import DiscordSection from './components/section/Section.js';
import DiscordMediaGallery from './components/Media Gallery.js';
import DiscordSeparator from './components/Spacing.js';
import DiscordButton from './components/Button.js';
import DiscordThumbnail from './components/Thumbnail.js';
import MessageContent from './content.js';
import { RenderType } from './content.js';
import { ButtonStyleMapping } from './components/styles.js';
export default function ComponentRow({ component, id, context, }) {
    switch (component.type) {
        case ComponentType.ActionRow:
            return (_jsx("discord-action-row", { children: _jsx(_Fragment, { children: component.components.map((nestedComponent, id) => (_jsx(Component, { component: nestedComponent, id: id }, id))) }) }, id));
        case ComponentType.Container:
            return (_jsx(DiscordContainer, { children: _jsx(_Fragment, { children: component.components.map((nestedComponent, id) => (_jsx(ComponentRow, { component: nestedComponent, id: id, context: context }, id))) }) }, id));
        case ComponentType.File: {
            const attachmentComponent = _jsx("discord-file-attachment", { href: component.file.url });
            if (component.spoiler) {
                return (_jsx("discord-spoiler", { slot: "attachment", children: attachmentComponent }, component.id));
            }
            else {
                return attachmentComponent;
            }
        }
        case ComponentType.MediaGallery:
            return _jsx(DiscordMediaGallery, { component: component }, id);
        case ComponentType.Section:
            return (_jsx(DiscordSection, { accessory: component.accessory, id: id, children: component.components.map((nestedComponent, id) => (_jsx(ComponentRow, { component: nestedComponent, id: id, context: context }, id))) }, id));
        case ComponentType.Separator:
            return _jsx(DiscordSeparator, { spacing: component.spacing, divider: component.divider }, id);
        case ComponentType.TextDisplay:
            return _jsx(MessageContent, { content: component.content, context: { ...context, type: RenderType.NORMAL } }, id);
        default:
            return null;
    }
}
export function Component({ component, id, }) {
    switch (component.type) {
        case ComponentType.Button:
            return (_jsx(DiscordButton, { type: ButtonStyleMapping[component.style], url: component.url ?? undefined, emoji: component.emoji ? parseDiscordEmoji(component.emoji) : undefined, children: component.label }, id));
        case ComponentType.StringSelect:
        case ComponentType.UserSelect:
        case ComponentType.RoleSelect:
        case ComponentType.MentionableSelect:
        case ComponentType.ChannelSelect:
            return _jsx(DiscordSelectMenu, { component: component }, id);
        case ComponentType.Thumbnail:
            return _jsx(DiscordThumbnail, { url: component.media.url }, id);
        default:
            return undefined;
    }
}
//# sourceMappingURL=components.js.map