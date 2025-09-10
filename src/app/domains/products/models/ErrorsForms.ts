export interface ErrorCreateProduct {
  name: string | null;
  price: string | null;
  description: string | null;
}

export interface ErrorImagesCreateProduct {
  images: (string | null)[];
}
