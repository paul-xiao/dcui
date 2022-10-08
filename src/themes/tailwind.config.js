module.exports = {
  content: [
    { raw: '' },
  ],
  corePlugins: {
    preflight: false,
  },
  dcv: {
    base: false,
  },
  plugins: [require("../index")],
};
