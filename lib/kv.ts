import config from "./config.ts";

const kvApi = async (path?: string) => {
    if (!path || path == undefined || path == null) {
        return await Deno.openKv()
    } else {
        return await Deno.openKv(path)
    }
}

export const kv = await kvApi(config.kvUrl)

export type interwikiData = {
  homepage: string,
  urlPrefix: string,
  cw?: boolean,
  cwReason?: string
}

type interwikiDataDb = {
  data: Deno.KvEntryMaybe<interwikiData> | null,
  // deno-lint-ignore no-explicit-any
  error?: any
}

export async function getInterwikiData(wiki: string): Promise<interwikiDataDb> {
  try {
    const data = await kv.get<interwikiData>(["interwiki", wiki])
    console.log("[db-lookup]", JSON.stringify(data))

    return {
      data,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error
    }
  }
}

export async function setInterwikiData(
  wiki: string,
  homepage: string,
  urlPrefix: string,
  cw?: boolean,
  cwReason?: string
) {
  const request: interwikiData = {
    homepage,
    urlPrefix
  }

  if (cw == true) {
    request.cw = true;
    request.cwReason = cwReason || "no reason provided"
  } else {
    request.cw = false;
  }

  try {
    return await kv.set(["interwiki", wiki], request)
  } catch (error) {
    throw new Error(error)
  }
}

export async function getInterwikiShortcutData(
  wiki: string,
  shortcut: string
) {
  const key = ["interwiki_shortcuts", wiki, shortcut]

  try {
    return await kv.get(key)
  } catch (error) {
    throw new Error(error)
  }
}

export async function setInterwikiShortcutData(
  wiki: string,
  shortcut: string,
  url: string,
) {
  const key = ["interwiki_shortcuts", wiki, shortcut]

  try {
    return await kv.set(key, url)
  } catch (error) {
    throw new Error(error)
  }
}
