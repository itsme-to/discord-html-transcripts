import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { prerenderToNodeStream } from 'react-dom/static';
import { buildProfiles } from '../utils/buildProfiles.js';
import { ggSansFont, revealSpoiler, scrollToMessage } from '../static/client.js';
import { readFileSync } from 'fs';
import path from 'path';
import { render as renderLit } from '@lit-labs/ssr';
import DiscordMessages from './transcript.js';
import { streamToString } from '../utils/utils.js';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import { globalStyles } from './renderers/components/styles.js';
import { DiscordAttachmentStyles } from './renderers/components/DiscordImage.js';
import { DiscordHighlightStyles } from './renderers/components/DiscordHighlightedCode.js';
// read the package.json file and get the @derockdev/discord-components-core version
let discordComponentsVersion = '^4.0.2';
try {
    const packagePath = path.join(__dirname, '..', '..', 'package.json');
    const packageJSON = JSON.parse(readFileSync(packagePath, 'utf8'));
    discordComponentsVersion = packageJSON.dependencies['@skyra/discord-components-core'] ?? discordComponentsVersion;
    // eslint-disable-next-line no-empty
}
catch { } // ignore errors
export default async function render({ messages, channel, callbacks, ...options }) {
    const profiles = buildProfiles(messages);
    const { prelude } = await prerenderToNodeStream(_jsxs("html", { children: [_jsxs("head", { children: [_jsx("meta", { charSet: "utf-8" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), _jsx("link", { rel: "preconnect", href: "https://cdn.jsdelivr.net/" }), _jsx("link", { rel: "preconnect", href: "https://cdn.discordapp.com" }), _jsx("style", { dangerouslySetInnerHTML: { __html: ggSansFont } }), _jsx("style", { dangerouslySetInnerHTML: { __html: globalStyles } }), _jsx("style", { dangerouslySetInnerHTML: { __html: DiscordAttachmentStyles } }), _jsx("style", { dangerouslySetInnerHTML: { __html: DiscordHighlightStyles } }), _jsx("link", { rel: "icon", type: "image/png", href: options.favicon === 'guild'
                            ? channel.isDMBased()
                                ? undefined
                                : (channel.guild.iconURL({ size: 16, extension: 'png' }) ?? undefined)
                            : options.favicon }), _jsx("title", { children: channel.isDMBased() ? 'Direct Messages' : channel.name }), _jsx("script", { dangerouslySetInnerHTML: {
                            __html: scrollToMessage,
                        } }), !options.hydrate && (_jsxs(_Fragment, { children: [_jsx("script", { dangerouslySetInnerHTML: {
                                    __html: `globalThis.$discordMessage={profiles:${JSON.stringify(await profiles)}}`,
                                } }), _jsx("script", { type: "module", src: `https://cdn.jsdelivr.net/npm/@skyra/discord-components-core@${discordComponentsVersion}/+esm` })] }))] }), _jsx("body", { style: {
                    margin: 0,
                    minHeight: '100vh',
                }, children: _jsx(DiscordMessages, { messages: messages, channel: channel, callbacks: callbacks, ...options }) }), options.hydrate && _jsx("script", { dangerouslySetInnerHTML: { __html: revealSpoiler } })] }));
    const markup = await streamToString(prelude);
    if (options.hydrate) {
        const result = renderLit(markup);
        // const result = await renderToString(markup, {
        //   beforeHydrate: async (document) => {
        //     document.defaultView.$discordMessage = {
        //       profiles: await profiles,
        //     };
        //   },
        // });
        return await collectResult(result);
    }
    return markup;
}
//# sourceMappingURL=index.js.map