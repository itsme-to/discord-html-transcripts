import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ComponentType } from 'discord.js';
import { parseDiscordEmoji } from '../../../utils/utils.js';
import { getSelectTypeLabel } from './utils.js';
function DiscordSelectMenu({ component, }) {
    const isStringSelect = component.type === ComponentType.StringSelect;
    const placeholder = component.placeholder || getSelectTypeLabel(component.type);
    return (_jsxs("div", { className: "discord-select-menu", children: [_jsx("div", { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: placeholder }), _jsx("div", { style: { display: 'flex', alignItems: 'center', marginLeft: '8px' }, children: _jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", children: _jsx("path", { fill: "currentColor", d: "M7 10L12 15L17 10H7Z" }) }) }), isStringSelect && component.options && component.options.length > 0 && (_jsx("div", { style: {
                    display: 'none',
                    position: 'absolute',
                    top: '44px',
                    left: '0',
                    width: '100%',
                    backgroundColor: '#2b2d31',
                    borderRadius: '4px',
                    zIndex: 10,
                    border: '1px solid #1e1f22',
                    maxHeight: '320px',
                    overflowY: 'auto',
                }, children: component.options.map((option, idx) => (_jsxs("div", { style: {
                        padding: '8px 12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: idx < component.options.length - 1 ? '1px solid #1e1f22' : 'none',
                    }, children: [option.emoji && _jsx("span", { style: { marginRight: '8px' }, children: parseDiscordEmoji(option.emoji) }), _jsx("span", { children: option.label })] }, idx))) }))] }));
}
export default DiscordSelectMenu;
//# sourceMappingURL=Select%20Menu.js.map