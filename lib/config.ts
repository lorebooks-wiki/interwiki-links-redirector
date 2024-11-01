export default {
    port: Number(Deno.env.get("PORT")) || 3000,
    kvUrl: Deno.env.get("DENO_KV_URL"),
    repoUrl: Deno.env.get("INTERWIKI_REPO_URL") || "https://github.com/lorebooks-wiki/interwiki-redirector"
}