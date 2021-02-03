module.exports = {
  purge: {
    content: ["./src/**/*.svelte", "./src/**/*.ts"],
    enabled: false, // disable purge in dev
  },
  future: {
    // for tailwind 2.0 compat
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
};
