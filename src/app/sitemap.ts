import { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { groq } from "next-sanity";

/**
 * Next.js Dynamic Sitemap Generator
 * Fetches all static and dynamic routes from Sanity CMS.
 *
 * Base URL: https://remadein.org
 */

const BASE_URL = "https://remadein.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Routes
  const staticRoutes = [
    "",
    "/about",
    "/blueprint",
    "/stories",
    "/partner",
    "/privacy",
    "/terms",
    "/cookies",
    "/impact",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Dynamic Stories (Articles, Videos, Events)
  let storyRoutes: MetadataRoute.Sitemap = [];
  try {
    const stories = await client.fetch<
      { slug: string; _updatedAt: string; _type: string; imageUrl: string | null }[]
    >(
      groq`*[_type in ["article", "video", "event"] && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt,
        _type,
        "imageUrl": select(
          _type == "article" => coverImage.asset->url,
          _type == "video"   => thumbnail.asset->url,
          _type == "event"   => coverImage.asset->url,
          null
        )
      }`,
    );

    storyRoutes = stories.map((story) => ({
      url: `${BASE_URL}/stories/${story.slug}`,
      lastModified: new Date(story._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
      images: story.imageUrl ? [story.imageUrl] : [],
    }));
  } catch (error) {
    console.error("Sitemap: Error fetching stories", error);
  }

  // 3. Dynamic Community Voices
  let communityRoutes: MetadataRoute.Sitemap = [];
  try {
    const voices = await client.fetch<{ slug: string; _updatedAt: string; imageUrl: string | null }[]>(
      groq`*[_type == "communityVoice" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt,
        "imageUrl": photo.asset->url
      }`,
    );

    communityRoutes = voices.map((voice) => ({
      url: `${BASE_URL}/community/${voice.slug}`,
      lastModified: new Date(voice._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
      images: voice.imageUrl ? [voice.imageUrl] : [],
    }));
  } catch (error) {
    console.error("Sitemap: Error fetching community voices", error);
  }

  return [...staticRoutes, ...storyRoutes, ...communityRoutes];
}
