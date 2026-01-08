import { jsx as _jsx } from "react/jsx-runtime";
function SectionAccessory({ children }) {
    if (!children)
        return null;
    return (_jsx("div", { style: {
            display: 'flex',
            width: '100%',
            maxWidth: '500px',
            justifyContent: 'flex-end',
            alignItems: 'center',
        }, children: children }));
}
export default SectionAccessory;
//# sourceMappingURL=SectionAccessory.js.map