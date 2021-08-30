class MicroCssPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('Micro CSS plugin', (compilation) => {

    });
  }
}

module.exports = MicroCssPlugin;
