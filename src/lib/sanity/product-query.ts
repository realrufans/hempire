import { groq } from "next-sanity";
import client from "./client";

export async function getProducts() {
  return client.fetch(
    groq`*[_type == "product"] {
      _id,
      name,
      description,
      name,
      price,
      original_price,
      cover_image,
      images,
      tags,
      slug ,
      category
    }`
  );
}

export async function getUnder100kProducts() {
  return client.fetch(
    groq`*[_type == "product" && "under100k" in tags] {
      _id,
      name,
      description,
      price,
      original_price,
      cover_image,
      images,
      tags,
      slug,
      category
    }`
  );
}

export async function getSelectedProducts(selectedCategory: string) {
  return client.fetch(
    groq`*[_type == "product" && category->name == $selectedCategory] {
      _id,
      "categoryName": category->name,
      description,
      name,
      price,
      "productImage": {"alt": images[0].alt, "imageUrl": images[0].asset->url},
      "slug": slug.current
    }`,
    { selectedCategory }
  );
}
