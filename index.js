
const HtmlWebpackPlugin = require("html-webpack-plugin");
class WebpackpreloadWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('PreloadWebpackPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap('PreloadWebpackPlugin', (htmlData) => {
        const { publicPath, assetTags } = htmlData;
        const { entrypoints, moduleGraph, chunkGraph } = compilation;
        for (const entrypoint of entrypoints) {
          const preloaded = entrypoint[1].getChildrenByOrders(moduleGraph, chunkGraph).preload; // is ChunkGroup[] | undefined
          if (!preloaded) return;
          const chunks = new Set();
          for (const group of preloaded) {
            for (const chunk of group.chunks) chunks.add(chunk);
          }
          const files = new Set()
          for (const chunk of chunks) {
            for (const file of chunk.files) files.add(file);
          }
          const links = [];
          for (const file of files) {
            links.push({
              tagName: 'link',
              attributes: {
                rel: 'preload',
                href: `${publicPath}${file}`
              }
            });
          }
          assetTags.styles.unshift(...links);
        }
      });
    });
  }
}
module.exports = WebpackpreloadWebpackPlugin;