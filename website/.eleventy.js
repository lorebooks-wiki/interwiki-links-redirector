const { execSync } = require("child_process");
//const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.setServerOptions({
    watch: ['../public/css/styles.css']
  });
  //eleventyConfig.addPlugin(UpgradeHelper);

  return {
    htmlTemplateEngine: "njk",
    dir: {
      input: 'src',
      output: '../public'
    }
  }
}