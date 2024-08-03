import client from "@/lib/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export function urlFor(source: string) {
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}
