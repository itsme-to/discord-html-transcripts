import { jsx as _jsx } from "react/jsx-runtime";
import { SeparatorSpacingSize } from 'discord.js';
function DiscordSeparator({ divider, spacing }) {
    return (_jsx("div", { style: {
            width: '100%',
            height: divider ? '1px' : '0px',
            backgroundColor: '#4f5359',
            margin: spacing === SeparatorSpacingSize.Large ? '8px 0' : '0',
        } }));
}
export default DiscordSeparator;
//# sourceMappingURL=Spacing.js.map