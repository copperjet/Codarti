import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Codarti — Software Development Studio",
    short_name: "Codarti",
    description:
      "Software development company in Lusaka, Zambia — custom web and mobile apps.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF5",
    theme_color: "#FAFAF5",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
