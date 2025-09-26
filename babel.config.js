module.exports = {
	presets: ["module:metro-react-native-babel-preset", "nativewind/babel"],
	plugins: [
		// [
		// 	"module-resolver",
		// 	{
		// 		root: ["./"],
		// 		alias: {
		// 			"@": "./src",
		// 		},
		// 	},
		// ],
		["@babel/plugin-proposal-decorators", { legacy: true }],
	],
};
