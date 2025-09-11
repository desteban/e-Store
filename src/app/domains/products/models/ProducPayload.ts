import { Product } from '@app/shared/models/Product.model';

export interface ProductDeletionPayload {
  product: Product;
  index: number;
}
