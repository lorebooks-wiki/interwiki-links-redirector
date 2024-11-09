# `open.lorebooks.wiki` - Interwiki link redirector service

[![Hack Club](https://badges.api.lorebooks.wiki/badges/hackclub/hackclub?style=flat-square)](https://hackclub.com)

Instead of updating wiki links everytime the page or even the domain itself
has changed, we'll update them here (via [`contrib/interwikimap.json`](./contrib/interwikimap.json)
and/or [`contrib/interwiki-shortcuts.json`](contrib/interwiki-shortcuts.json) files)
and synchorize with the backing Deno KV for production.

## Why running a seperate interwiki link redirector service?

We want to do this seperately from the website itself to keep it lean and
to not overwelm Cloudflare Pages with a lot of lines in the `_redirect` file.

## License

MPL-2.0
