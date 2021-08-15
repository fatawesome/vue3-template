class MicroCssPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('Micro CSS plugin', (compilation) => {
      // TODO: delete
      console.log('-'.repeat(80));
      console.log('hello');
      console.log('-'.repeat(80));
    });
  }
}

module.exports = MicroCssPlugin;
