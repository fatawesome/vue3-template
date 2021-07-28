module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/typescript',
  ],
  plugins: [
    ["module-resolver", {
      root: ["./src"],
      alias: {
        "@components": "./src/components",
        "@": "./src"
      }
    }]
  ]
};
