import { jsx as _jsx } from "react/jsx-runtime";
export const DiscordAttachmentStyles = `
  .discord-attachment-container {
    display: block;
    position: relative;
    max-width: min(100%, 525px);
  }

  .discord-attachment-container > img {
    max-width: 100%;
    border-radius: 8px;
  }
`;
export function DiscordImageAttachment(props) {
    return (_jsx("div", { slot: "attachments", className: "discord-attachment-container", children: _jsx("img", { src: props.url, alt: props.alt }) }));
}
//# sourceMappingURL=DiscordImage.js.map