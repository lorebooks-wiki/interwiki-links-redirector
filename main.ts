import { Context, Hono, Next,  } from 'hono'
import { serveStatic } from 'hono/deno'
import config from "./lib/config.ts";
import { getInterwikiData } from "./lib/kv.ts";

const app = new Hono()

const NotFoundHandler = serveStatic({
  path: "./public/404/index.html",
  onFound(_path, c) {
    c.status(404)
  },
})
const staticFilesHandler = serveStatic({ root: "./public" })

const defaultRedirects = {
  homepage: "https://landing.lorebooks.wiki",
  urlPrefix: "https://landing.lorebooks.wiki/"
}

app.get("/", (c: Context, next: Next) => staticFilesHandler(c, next))
app.get("/abuse", (c: Context, next: Next) => serveStatic({ path: "./public/abuse/index.html" })(c, next))
app.get("/favicon.ico", (c: Context) => {
  return c.redirect("https://raw.githubusercontent.com/lorebooks-wiki/mkdocs-material-template/main/docs/assets/branding/default-favicon_512.png")
})
app.get("/css/*", (c: Context, next: Next) => staticFilesHandler(c, next))
app.get("/test-broken", (c: Context) => {
  throw Error("why")
})

app.get("/:wiki", async(c: Context, next: Next) => {
  const { wiki } = c.req.param()
  const {data: dbResult, error } = await getInterwikiData(wiki)

  if (dbResult?.value !== null) {
    const interwikiData = dbResult?.value || defaultRedirects
    return c.redirect(interwikiData.homepage)
  } else {
    return NotFoundHandler(c, next)
  }
})

app.notFound((c: Context, next: Next) => {
  const data = NotFoundHandler(c, next)
  return data
})

app.onError((err, c: Context) => {
  const data = serveStatic({ 
    path: "./public/500/index.html",
    onFound(_path, c) {
      c.status(500)
    },
  })(c)
  console.error(err)
  return data
})

Deno.serve({ port: config.port},app.fetch)
