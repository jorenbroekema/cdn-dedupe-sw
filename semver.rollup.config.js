import commonjs from "@rollup/plugin-commonjs";
import nodeResolvePlugin from "@rollup/plugin-node-resolve";

const BROWSERIFY_ALIASES = {
  util: "node_modules/util/util.js",
};

const nodeResolve = nodeResolvePlugin({ preferBuiltins: false });

export default {
  input: "./node_modules/semver/index.js",
  output: { file: "semver.js" },
  plugins: [
    commonjs(),
    {
      name: "browserify",
      resolveId(source, importer) {
        if (source in BROWSERIFY_ALIASES) {
          return BROWSERIFY_ALIASES[source];
        }
        return null;
      },
    },
    nodeResolve,
  ],
};
