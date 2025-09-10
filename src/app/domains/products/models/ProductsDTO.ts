import { Product } from '@app/shared/models/Product.model';

// Omit permite tomar como base otro tipo e ignorar keys de estas
// para omitir varios key los debemos separar con (|)
export type CreateProductDTO = Omit<Product, 'id' | 'slug'>;
