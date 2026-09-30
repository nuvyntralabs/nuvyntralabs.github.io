import localFont from "next/font/local";

// Checked in so the Pages build does not download Google Fonts CSS.
// next/font crashes when that CSS names a file without a .woff2 suffix.
export const fontDisplay = localFont({
  src: "./fonts/outfit-latin.woff2",
  weight: "500 800",
  variable: "--font-display",
  display: "swap",
});

export const fontSans = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  weight: "400 700",
  variable: "--font-sans",
  display: "swap",
});
