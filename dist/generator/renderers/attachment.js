import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { AttachmentTypes } from '../../types.js';
import { formatBytes } from '../../utils/utils.js';
import { DiscordImageAttachment } from './components/DiscordImage.js';
/**
 * Renders all attachments for a message
 * @param message
 * @param context
 * @returns
 */
export async function Attachments(props) {
    if (props.message.attachments.size === 0)
        return _jsx(_Fragment, {});
    return props.message.attachments.map((attachment, id) => (_jsx(Attachment, { attachment: attachment, message: props.message, context: props.context }, id)));
}
/**
 * Renders one Discord Attachment
 * @param props - the attachment and rendering context
 */
export async function Attachment({ attachment, context, message, }) {
    let url = attachment.url;
    const attachmentType = getAttachmentType(attachment);
    const [bytes, bytesUnit] = formatBytes(attachment.size);
    // if the attachment is an image, download it to a data url
    switch (attachmentType) {
        case AttachmentTypes.Image: {
            const downloaded = await context.callbacks.resolveImageSrc(attachment.toJSON(), message.toJSON());
            if (downloaded !== null) {
                url = downloaded ?? url;
            }
            return _jsx(DiscordImageAttachment, { url: url, alt: attachment.name }, attachment.id);
        }
        case AttachmentTypes.Video: {
            return _jsx("discord-video-attachment", { slot: "attachments", href: url }, attachment.id);
        }
        case AttachmentTypes.Audio: {
            return (_jsx("discord-audio-attachment", { slot: "attachments", href: url, bytes: bytes, bytesUnit: bytesUnit, name: attachment.name }, attachment.id));
        }
        case AttachmentTypes.File: {
            return (_jsx("discord-file-attachment", { slot: "attachments", href: url, bytes: bytes, "bytes-unit": bytesUnit, name: attachment.name }, attachment.id));
        }
    }
}
/**
 * Parses the attachment content type.
 * @param attachment Discord.js attachment object
 * @returns
 */
function getAttachmentType(attachment) {
    switch (attachment.contentType?.split('/')?.[0]) {
        case 'audio':
            return AttachmentTypes.Audio;
        case 'image':
            return AttachmentTypes.Image;
        case 'video':
            return AttachmentTypes.Video;
        case undefined:
        default:
            return AttachmentTypes.File;
    }
}
//# sourceMappingURL=attachment.js.map