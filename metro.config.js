const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = mergeConfig(getDefaultConfig(__dirname), {
	resolver: {
		/* optional custom resolver config */
	},
});

module.exports = withNativeWind(config, { input: "./src/global.css" });
