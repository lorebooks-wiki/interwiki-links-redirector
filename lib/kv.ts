import config from "./config.ts";

const kvApi = async (path?: string) => {
    if (!path || path == undefined || path == null) {
        return await Deno.openKv()
    } else {
        return await Deno.openKv(path)
    }
}

export const kv = await kvApi(config.kvUrl)

type interwikiData = {
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
  }
}
