/** Contains the utility functions that we use in our interwiki redirects
 * backend for handling Breezewiki links a la Indie Wiki for Fandom wikis
 * not yet migrated off the platform. External users should use
 * {@linkcode generateBwUrl} to generate a properly-formatted Breezewiki
 * link pointing to a randomly-selected Breezewiki instance to balance
 * load between instances on a list we maintain.
 * 
 * @module
 */

/**
 * This is the internal list we maintain containing the Breezewiki instances
 * we recongize and use via the IndieWiki web extension. While we exported this
 * for those who needed the full list and do their own handling, we recommend to
 * use {@linkcode generateBwUrl} or {@linkcode bwHostRandomizer} instead.
 */
export const bwHosts = [
  "bw.projectsegfau.lt", // Project Segfault
  "breezewiki.pussthecat.org" // pussthecat.org
]

/**
 * Use this function to choose a random BreezeWiki instance to balance
 * between instances on a list we internally managed.
 * @returns {string} A random BreezeWiki hostname
 */
export function bwHostRandomizer(): string {
  const random = Math.floor(Math.random() * bwHosts.length);
  return bwHosts[random]
}

/**
 * Generates a HTTPS link of a Breezewiki-proxied Fandom/Wikia wiki-hosted page,
 * using {@linkcode bwHostRandomizer}.
 * 
 * ```ts
 * import { generateBwUrl } from "jsr:@recaptime-dev/meta-utils/wiki"
 * 
 * const meta = generateBwUrl("community", "Example_page")
 * console.log(meta)
 * ```
 * 
 * @param wiki - Slug of a Fandom-hosted wiki. Optionally include
 * @param page - A optional parameter pointing to a specific wiki page. See the
 * MediaWiki documentation regarding supported characters for page title in URLs.
 * @returns 
 */
export function generateBwUrl(wiki: string, page?: string): string {
  const randHost = bwHostRandomizer()
  if (page) {
    return `https://${randHost}/${wiki}/wiki/${page}`
  } else {
    return `https://${randHost}/${wiki}/wiki/`
  }
}