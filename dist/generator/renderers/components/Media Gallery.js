import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getGalleryLayout, getImageStyle } from './utils.js';
function DiscordMediaGallery({ component }) {
    if (!component.items || component.items.length === 0) {
        return null;
    }
    const count = component.items.length;
    const imagesToShow = component.items.slice(0, 10);
    const hasMore = component.items.length > 10;
    return (_jsx("div", { style: getGalleryLayout(count), children: imagesToShow.map((media, idx) => (_jsxs("div", { style: getImageStyle(idx, count), children: [_jsx("img", { src: media.media.url, alt: media.description || 'Media content', style: {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    } }), hasMore && idx === imagesToShow.length - 1 && (_jsxs("div", { style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }, children: ["+", component.items.length - 10] }))] }, idx))) }));
}
export default DiscordMediaGallery;
//# sourceMappingURL=Media%20Gallery.js.map