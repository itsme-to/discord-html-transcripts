import { jsx as _jsx } from "react/jsx-runtime";
function DiscordThumbnail({ url }) {
    return (_jsx("img", { src: url, alt: "Thumbnail", style: {
            width: '85px',
            height: '85px',
            objectFit: 'cover',
            borderRadius: '8px',
        } }));
}
export default DiscordThumbnail;
//# sourceMappingURL=Thumbnail.js.map