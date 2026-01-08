import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function TranscriptHeader(props) {
    // If guild has no icon, we take first letter of guild name words
    // i.e. Guild A -> GA
    // and OneWordGuildName -> O
    const split = props.guildName.split(' ');
    const placeholder = split.length > 1 ? split[0][0] + split[1][0] : split[0][0];
    return (_jsxs("div", { className: "discord-header", children: [_jsx("div", { className: "discord-header-icon", children: props.guildIcon ? (_jsx("img", { src: props.guildIcon, alt: "guild icon" })) : (_jsx("div", { children: _jsx("span", { children: placeholder }) })) }), _jsxs("div", { className: "discord-header-text", children: [_jsx("div", { className: "discord-header-text-guild", children: props.guildName }), _jsxs("div", { className: "discord-header-text-channel", children: ["#", props.channelName] }), props.children] })] }));
}
//# sourceMappingURL=TranscriptHeader.js.map