import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from '../../components.js';
import SectionContent from './SectionContent.js';
import SectionAccessory from './SectionAccessory.js';
function DiscordSection({ children, accessory, id }) {
    return (_jsxs("div", { style: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            maxWidth: '500px',
        }, children: [_jsx(SectionContent, { children: children }), _jsx(SectionAccessory, { children: accessory && _jsx(Component, { component: accessory, id: id }) })] }));
}
export default DiscordSection;
//# sourceMappingURL=Section.js.map