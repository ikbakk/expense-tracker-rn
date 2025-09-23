"use client";
import { vars } from "nativewind";

export const config = {
	light: vars({
		"--color-primary-0": "240 253 247",
		"--color-primary-50": "204 251 229",
		"--color-primary-100": "167 243 208",
		"--color-primary-200": "110 231 183",
		"--color-primary-300": "52 211 153",
		"--color-primary-400": "16 185 129",
		"--color-primary-500": "34 139 92", // Base from CSS primary
		"--color-primary-600": "5 150 105",
		"--color-primary-700": "4 120 87",
		"--color-primary-800": "3 102 74",
		"--color-primary-900": "2 84 61",
		"--color-primary-950": "1 67 48",

		/* Secondary  */
		"--color-secondary-0": "255 255 255",
		"--color-secondary-50": "249 250 251",
		"--color-secondary-100": "243 244 246",
		"--color-secondary-200": "229 231 235",
		"--color-secondary-300": "209 213 219",
		"--color-secondary-400": "156 163 175",
		"--color-secondary-500": "244 244 245", // Base from CSS secondary
		"--color-secondary-600": "161 161 170",
		"--color-secondary-700": "113 113 122",
		"--color-secondary-800": "82 82 91",
		"--color-secondary-900": "63 63 70",
		"--color-secondary-950": "39 39 42",

		/* Tertiary (from accent) */
		"--color-tertiary-0": "255 255 255",
		"--color-tertiary-50": "249 250 251",
		"--color-tertiary-100": "243 244 246",
		"--color-tertiary-200": "229 231 235",
		"--color-tertiary-300": "209 213 219",
		"--color-tertiary-400": "156 163 175",
		"--color-tertiary-500": "244 244 245", // Base from CSS accent
		"--color-tertiary-600": "161 161 170",
		"--color-tertiary-700": "113 113 122",
		"--color-tertiary-800": "82 82 91",
		"--color-tertiary-900": "63 63 70",
		"--color-tertiary-950": "39 39 42",

		/* Error (from destructive) */
		"--color-error-0": "254 242 242",
		"--color-error-50": "254 226 226",
		"--color-error-100": "254 202 202",
		"--color-error-200": "252 165 165",
		"--color-error-300": "248 113 113",
		"--color-error-400": "239 68 68",
		"--color-error-500": "239 68 68", // Base from CSS destructive
		"--color-error-600": "220 38 38",
		"--color-error-700": "185 28 28",
		"--color-error-800": "153 27 27",
		"--color-error-900": "127 29 29",
		"--color-error-950": "83 19 19",

		/* Success */
		"--color-success-0": "228 255 244",
		"--color-success-50": "202 255 232",
		"--color-success-100": "162 241 192",
		"--color-success-200": "132 211 162",
		"--color-success-300": "102 181 132",
		"--color-success-400": "72 151 102",
		"--color-success-500": "52 131 82",
		"--color-success-600": "42 121 72",
		"--color-success-700": "32 111 62",
		"--color-success-800": "22 101 52",
		"--color-success-900": "20 83 45",
		"--color-success-950": "27 50 36",

		/* Warning */
		"--color-warning-0": "255 251 235",
		"--color-warning-50": "254 243 199",
		"--color-warning-100": "253 230 138",
		"--color-warning-200": "252 211 77",
		"--color-warning-300": "251 191 36",
		"--color-warning-400": "245 158 11",
		"--color-warning-500": "217 119 6",
		"--color-warning-600": "180 83 9",
		"--color-warning-700": "146 64 14",
		"--color-warning-800": "120 53 15",
		"--color-warning-900": "101 44 13",
		"--color-warning-950": "67 20 7",

		/* Info */
		"--color-info-0": "236 248 254",
		"--color-info-50": "199 235 252",
		"--color-info-100": "162 221 250",
		"--color-info-200": "124 207 248",
		"--color-info-300": "87 194 246",
		"--color-info-400": "50 180 244",
		"--color-info-500": "13 166 242",
		"--color-info-600": "11 141 205",
		"--color-info-700": "9 115 168",
		"--color-info-800": "7 90 131",
		"--color-info-900": "5 64 93",
		"--color-info-950": "3 38 56",

		/* Typography (from foreground) */
		"--color-typography-0": "255 255 255",
		"--color-typography-50": "249 250 251",
		"--color-typography-100": "243 244 246",
		"--color-typography-200": "229 231 235",
		"--color-typography-300": "209 213 219",
		"--color-typography-400": "156 163 175",
		"--color-typography-500": "107 114 128",
		"--color-typography-600": "75 85 99",
		"--color-typography-700": "55 65 81",
		"--color-typography-800": "31 41 55",
		"--color-typography-900": "15 23 42",
		"--color-typography-950": "10 10 10", // Base from CSS foreground

		/* Outline (from border) */
		"--color-outline-0": "255 255 255",
		"--color-outline-50": "249 250 251",
		"--color-outline-100": "243 244 246",
		"--color-outline-200": "229 231 235",
		"--color-outline-300": "209 213 219",
		"--color-outline-400": "156 163 175",
		"--color-outline-500": "229 229 229", // Base from CSS border
		"--color-outline-600": "161 161 170",
		"--color-outline-700": "113 113 122",
		"--color-outline-800": "82 82 91",
		"--color-outline-900": "63 63 70",
		"--color-outline-950": "39 39 42",

		/* Background */
		"--color-background-0": "255 255 255", // Base from CSS background
		"--color-background-50": "249 250 251",
		"--color-background-100": "243 244 246",
		"--color-background-200": "229 231 235",
		"--color-background-300": "209 213 219",
		"--color-background-400": "156 163 175",
		"--color-background-500": "107 114 128",
		"--color-background-600": "75 85 99",
		"--color-background-700": "55 65 81",
		"--color-background-800": "31 41 55",
		"--color-background-900": "15 23 42",
		"--color-background-950": "3 7 18",

		/* Background Special */
		"--color-background-error": "254 241 241",
		"--color-background-warning": "255 243 234",
		"--color-background-success": "237 252 242",
		"--color-background-muted": "244 244 245", // From CSS muted
		"--color-background-info": "235 248 254",

		/* Focus Ring Indicator  */
		"--color-indicator-primary": "34 139 92", // From CSS ring/primary
		"--color-indicator-info": "83 153 236",
		"--color-indicator-error": "239 68 68",
	}),
	dark: vars({
		"--color-primary-0": "1 67 48",
		"--color-primary-50": "2 84 61",
		"--color-primary-100": "3 102 74",
		"--color-primary-200": "4 120 87",
		"--color-primary-300": "5 150 105",
		"--color-primary-400": "16 185 129",
		"--color-primary-500": "52 211 153", // Base from CSS dark primary
		"--color-primary-600": "110 231 183",
		"--color-primary-700": "167 243 208",
		"--color-primary-800": "204 251 229",
		"--color-primary-900": "240 253 247",
		"--color-primary-950": "248 255 252",

		/* Secondary  */
		"--color-secondary-0": "39 39 42",
		"--color-secondary-50": "63 63 70",
		"--color-secondary-100": "82 82 91",
		"--color-secondary-200": "113 113 122",
		"--color-secondary-300": "161 161 170",
		"--color-secondary-400": "209 213 219",
		"--color-secondary-500": "64 64 64", // Base from CSS dark secondary
		"--color-secondary-600": "156 163 175",
		"--color-secondary-700": "209 213 219",
		"--color-secondary-800": "229 231 235",
		"--color-secondary-900": "243 244 246",
		"--color-secondary-950": "249 250 251",

		/* Tertiary (from accent) */
		"--color-tertiary-0": "33 25 25",
		"--color-tertiary-50": "41 32 28",
		"--color-tertiary-100": "54 39 32",
		"--color-tertiary-200": "68 46 36",
		"--color-tertiary-300": "82 53 40",
		"--color-tertiary-400": "96 60 44",
		"--color-tertiary-500": "62 39 35", // Base from CSS dark accent
		"--color-tertiary-600": "124 78 70",
		"--color-tertiary-700": "186 117 105",
		"--color-tertiary-800": "217 178 168",
		"--color-tertiary-900": "242 229 225",
		"--color-tertiary-950": "251 245 243",

		/* Error (from destructive) */
		"--color-error-0": "83 19 19",
		"--color-error-50": "127 29 29",
		"--color-error-100": "153 27 27",
		"--color-error-200": "185 28 28",
		"--color-error-300": "220 38 38",
		"--color-error-400": "239 68 68",
		"--color-error-500": "156 42 42", // Base from CSS dark destructive
		"--color-error-600": "185 28 28",
		"--color-error-700": "220 38 38",
		"--color-error-800": "252 165 165",
		"--color-error-900": "254 202 202",
		"--color-error-950": "254 226 226",

		/* Success */
		"--color-success-0": "27 50 36",
		"--color-success-50": "20 83 45",
		"--color-success-100": "22 101 52",
		"--color-success-200": "32 111 62",
		"--color-success-300": "42 121 72",
		"--color-success-400": "52 131 82",
		"--color-success-500": "72 151 102",
		"--color-success-600": "102 181 132",
		"--color-success-700": "132 211 162",
		"--color-success-800": "162 241 192",
		"--color-success-900": "202 255 232",
		"--color-success-950": "228 255 244",

		/* Warning */
		"--color-warning-0": "67 20 7",
		"--color-warning-50": "101 44 13",
		"--color-warning-100": "120 53 15",
		"--color-warning-200": "146 64 14",
		"--color-warning-300": "180 83 9",
		"--color-warning-400": "217 119 6",
		"--color-warning-500": "245 158 11",
		"--color-warning-600": "251 191 36",
		"--color-warning-700": "252 211 77",
		"--color-warning-800": "253 230 138",
		"--color-warning-900": "254 243 199",
		"--color-warning-950": "255 251 235",

		/* Info */
		"--color-info-0": "3 38 56",
		"--color-info-50": "5 64 93",
		"--color-info-100": "7 90 131",
		"--color-info-200": "9 115 168",
		"--color-info-300": "11 141 205",
		"--color-info-400": "13 166 242",
		"--color-info-500": "50 180 244",
		"--color-info-600": "87 194 246",
		"--color-info-700": "124 207 248",
		"--color-info-800": "162 221 250",
		"--color-info-900": "199 235 252",
		"--color-info-950": "236 248 254",

		/* Typography (from foreground) */
		"--color-typography-0": "10 10 10",
		"--color-typography-50": "15 23 42",
		"--color-typography-100": "31 41 55",
		"--color-typography-200": "55 65 81",
		"--color-typography-300": "75 85 99",
		"--color-typography-400": "107 114 128",
		"--color-typography-500": "156 163 175",
		"--color-typography-600": "209 213 219",
		"--color-typography-700": "229 231 235",
		"--color-typography-800": "243 244 246",
		"--color-typography-900": "249 250 251",
		"--color-typography-950": "242 242 242", // Base from CSS dark foreground

		/* Outline (from border) */
		"--color-outline-0": "39 39 42",
		"--color-outline-50": "63 63 70",
		"--color-outline-100": "82 82 91",
		"--color-outline-200": "113 113 122",
		"--color-outline-300": "161 161 170",
		"--color-outline-400": "209 213 219",
		"--color-outline-500": "64 64 64", // Base from CSS dark border
		"--color-outline-600": "156 163 175",
		"--color-outline-700": "209 213 219",
		"--color-outline-800": "229 231 235",
		"--color-outline-900": "243 244 246",
		"--color-outline-950": "249 250 251",

		/* Background */
		"--color-background-0": "21 16 16", // Base from CSS dark background
		"--color-background-50": "15 23 42",
		"--color-background-100": "31 41 55",
		"--color-background-200": "55 65 81",
		"--color-background-300": "75 85 99",
		"--color-background-400": "107 114 128",
		"--color-background-500": "156 163 175",
		"--color-background-600": "209 213 219",
		"--color-background-700": "229 231 235",
		"--color-background-800": "243 244 246",
		"--color-background-900": "249 250 251",
		"--color-background-950": "255 255 255",

		/* Background Special */
		"--color-background-error": "83 27 27",
		"--color-background-warning": "67 39 20",
		"--color-background-success": "20 50 27",
		"--color-background-muted": "38 38 38", // From CSS dark muted
		"--color-background-info": "12 32 43",

		/* Focus Ring Indicator  */
		"--color-indicator-primary": "52 211 153", // From CSS dark ring/primary
		"--color-indicator-info": "161 199 245",
		"--color-indicator-error": "185 28 28",
	}),
};
