const postcssJs = require("postcss-js")
const postcssPrefix = require('./lib/postcss-prefixer')

const dcvInfo = require("../package.json");
const colors = require("./colors/index");
const utilities = require("../dist/utilities");
const base = require("../dist/base");
const styled = require("../dist/styles");
const themes = require("./colors/themes");
const colorFunctions = require("./colors/functions");

const mainFunction = ({ addBase, addComponents, addUtilities, config, postcss }) => {
  let dcvIncludedItems = [];
  let logs = false;
  if (config("dcv.logs") != false) {
    logs = true;
  }
  if (logs) {
    console.log();
    console.log(
      "\x1b[35m%s\x1b[0m",
      "dcv components " + dcvInfo.version,
      "\x1b[0m",
      dcvInfo.homepage
    );
    console.group();
  }

  // inject @base style
  if (config("dcv.base") != false) {
    addBase(base);
    dcvIncludedItems.push("base");
  }

  // inject components
  // because rollupjs doesn't supprt dynamic require
  let file = styled;
  if (config("dcv.styled") == false && config("dcv.rtl") != true) {
    dcvIncludedItems.push("unstyled components");
    file = unstyled;
  } else if (
    config("dcv.styled") == false &&
    config("dcv.rtl") == true
  ) {
    dcvIncludedItems.push("unstyled components");
    console.log("\x1b[36m%s\x1b[0m", " Direction:", "\x1b[0m", "RTL");
    file = unstyledRtl;
  } else if (
    config("dcv.styled") != false &&
    config("dcv.rtl") != true
  ) {
    dcvIncludedItems.push("components");
    file = styled;
  } else if (
    config("dcv.styled") !== false &&
    config("dcv.rtl") == true
  ) {
    dcvIncludedItems.push("components");
    console.log("\x1b[36m%s\x1b[0m", " Direction:", "\x1b[0m", "RTL");
    file = styledRtl;
  }

  // add prefix to class names if specified
  const prefix = config("dcv.prefix")
  let postcssJsProcess
  if (prefix) {
    try {
      postcssJsProcess = postcssJs.sync(postcssPrefix({ prefix, ignore: [] }))
    } catch (error) {
      logs && console.error(`Error occurred and prevent applying the "prefix" option:`, error)
    }
  }
  const shouldApplyPrefix = prefix && postcssJsProcess;
  if (shouldApplyPrefix) {
    file = postcssJsProcess(file)
  }

  addComponents(file);

  const themeInjector = colorFunctions.injectThemes(addBase, config, themes)
  themeInjector;

  dcvIncludedItems.push("themes[" + themeInjector.themeOrder.length + "]");

  // inject @utilities style needed by components
  if (config("dcv.utils") != false) {
    addComponents(utilities, { variants: ["responsive"] });

    // let toAdd = utilitiesUnstyled // shadow clone here to avoid mutate the original
    // if (shouldApplyPrefix) {
    //   toAdd = postcssJsProcess(toAdd);
    // }
    // addComponents(toAdd, { variants: ["responsive"] });

    // toAdd = utilitiesStyled
    // if (shouldApplyPrefix) {
    //   toAdd = postcssJsProcess(toAdd);
    // }
    // addComponents(toAdd, { variants: ["responsive"] });
    dcvIncludedItems.push("utilities");
  }
  if (logs) {
    console.log(
      "\x1b[32m%s\x1b[0m",
      "✔︎ Including:",
      "\x1b[0m",
      "" + dcvIncludedItems.join(", ")
    );
    console.log();
    console.groupEnd();
  }
};

module.exports = require("tailwindcss/plugin")(mainFunction, {
  theme: { extend: { colors } },
});
