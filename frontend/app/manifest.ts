import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "ACPL MDR",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#020713",
    theme_color: "#020713",
  };
}
