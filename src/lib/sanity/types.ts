export type ProductType = {
  _id: string;
  name: string;
  cover_image: {
    alt: string;
    asset: {
      _ref: string;
    };
  };
  images: {
    alt: string;
    imageUrl: string;
  }[];
  slug: string;
  category: string;
  description: string;
  price: number;
  original_price: number;
  tags: string[];
};

export type CategoryType = {
  _id: string;
  name: string;
  description: string;
  cover_image: {
    alt: string;
    asset: {
      _ref: string;
    };
  };
};
export type CartProductType = ProductType & {
  quantity: number;
};