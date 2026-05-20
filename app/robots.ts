import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://codarti.com/sitemap.xml",
    host: "https://codarti.com",
  };
}
