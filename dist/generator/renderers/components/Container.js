import { jsx as _jsx } from "react/jsx-runtime";
function DiscordContainer({ children }) {
    return (_jsx("div", { style: {
            display: 'flex',
            width: '500px',
            flexDirection: 'column',
            backgroundColor: '#3f4248',
            padding: '16px',
            border: '1px solid #4f5359',
            marginTop: '2px',
            marginBottom: '2px',
            borderRadius: '10px',
            gap: '8px',
        }, children: children }));
}
export default DiscordContainer;
//# sourceMappingURL=Container.js.map