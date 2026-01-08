import {
  ComponentType,
  type ThumbnailComponent,
  type MessageActionRowComponent,
  type TopLevelComponent,
} from 'discord.js';
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
import type { RenderMessageContext } from '../index.js';
import { ButtonStyleMapping } from './components/styles.js';

export default function ComponentRow({
  component,
  id,
  context,
}: {
  component: TopLevelComponent;
  id: number;
  context: RenderMessageContext;
}) {
  switch (component.type) {
    case ComponentType.ActionRow:
      return (
        <discord-action-row key={id}>
          <>
            {component.components.map((nestedComponent, id) => (
              <Component component={nestedComponent} id={id} key={id} />
            ))}
          </>
        </discord-action-row>
      );

    case ComponentType.Container:
      return (
        <DiscordContainer key={id}>
          <>
            {component.components.map((nestedComponent, id) => (
              <ComponentRow component={nestedComponent} id={id} key={id} context={context} />
            ))}
          </>
        </DiscordContainer>
      );

    case ComponentType.File: {
      const attachmentComponent = <discord-file-attachment href={component.file.url} />;

      if (component.spoiler) {
        return (
          <discord-spoiler key={component.id} slot="attachment">
            {attachmentComponent}
          </discord-spoiler>
        );
      } else {
        return attachmentComponent;
      }
    }

    case ComponentType.MediaGallery:
      return <DiscordMediaGallery component={component} key={id} />;

    case ComponentType.Section:
      return (
        <DiscordSection key={id} accessory={component.accessory} id={id}>
          {component.components.map((nestedComponent, id) => (
            <ComponentRow component={nestedComponent} id={id} key={id} context={context} />
          ))}
        </DiscordSection>
      );

    case ComponentType.Separator:
      return <DiscordSeparator key={id} spacing={component.spacing} divider={component.divider} />;

    case ComponentType.TextDisplay:
      return <MessageContent key={id} content={component.content} context={{ ...context, type: RenderType.NORMAL }} />;

    default:
      return null;
  }
}

export function Component({
  component,
  id,
}: {
  component: MessageActionRowComponent | ThumbnailComponent;
  id: number;
}) {
  switch (component.type) {
    case ComponentType.Button:
      return (
        <DiscordButton
          key={id}
          type={ButtonStyleMapping[component.style as keyof typeof ButtonStyleMapping]}
          url={component.url ?? undefined}
          emoji={component.emoji ? parseDiscordEmoji(component.emoji) : undefined}
        >
          {component.label}
        </DiscordButton>
      );

    case ComponentType.StringSelect:
    case ComponentType.UserSelect:
    case ComponentType.RoleSelect:
    case ComponentType.MentionableSelect:
    case ComponentType.ChannelSelect:
      return <DiscordSelectMenu key={id} component={component} />;

    case ComponentType.Thumbnail:
      return <DiscordThumbnail key={id} url={component.media.url} />;

    default:
      return undefined;
  }
}
