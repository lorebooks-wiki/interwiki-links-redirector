import { interwikiData, setInterwikiData, setInterwikiShortcutData } from "../lib/kv.ts";
import iwMap from "../contrib/interwikimap.json" with { type: "json" }
import iwShortcuts from "../contrib/interwiki-shortcuts.json" with { type: "json" }

type InterwikiDataDump = interwikiData & {
  skip?: boolean,
  delete?: boolean
}

const wikis = Object.keys(iwMap);

for (const wiki of wikis) {
  const data: InterwikiDataDump = iwMap[wiki]
  const shortcuts: Map<string, string> = iwShortcuts[wiki]

  // skip if data.skip is true
  if (data.skip === true) {
    console.log(`skipping ${wiki}`)
    continue
  }

  if (data.delete === true)

  // if urlPrefix is null, use the homepage URL as base for now
  if (data.urlPrefix == null) {
    data.urlPrefix == data.homepage
  }

  console.log(`adding/updating ${wiki} to KV with data ${JSON.stringify(data)}`)
  
  try {
    await setInterwikiData(wiki, data.homepage, data.urlPrefix, data.cw, data.cwReason)
    const wikiShortcutKeys = Object.keys(iwShortcuts[wiki])

    for (const shortcut of wikiShortcutKeys) {
      console.log(`adding shortcut ${shortcut} for wiki ${wiki}`)
      await setInterwikiShortcutData(wiki, shortcut, iwShortcuts[wiki][shortcut])
    }
  } catch (error) {
    throw new Error(error)
  }
}