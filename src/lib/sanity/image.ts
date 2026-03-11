import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

/**
 * Returns a Sanity image URL builder instance.
 *
 * @example
 * urlFor(project.coverImage).width(800).auto('format').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Convenience helper that returns a plain URL string.
 * Useful when you just need a src without further transformations.
 *
 * @example
 * <img src={imageUrl(post.coverImage, 1200, 630)} />
 */
export function imageUrl(
  source: SanityImageSource,
  width?: number,
  height?: number,
): string {
  let img = builder.image(source).auto('format').fit('crop')
  if (width) img = img.width(width)
  if (height) img = img.height(height)
  return img.url()
}
