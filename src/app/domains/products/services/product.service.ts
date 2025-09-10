import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../../shared/models/Product.model';
import FiltersProducts from '../models/FiltersProducts';
import { Pagination } from '@app/shared/models/Pagination';
import { CreateProductDTO } from '../models/ProductsDTO';
import { Observable } from 'rxjs';

interface getProductsProps extends FiltersProducts, Pagination {}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly url: string = 'https://api.escuelajs.co/api/v1/products';
  /**
   * Obtiene una lista de todos los productos sin aplicar filtros.
   * Este método es ideal para obtener un listado completo y sin paginación.
   * @param props - (Opcional) Un objeto que contiene los filtros para la consulta.
   * @returns Un Observable que emite un array de objetos de tipo `Product`.
   * @example
   * // Uso básico para obtener todos los productos
   * this.productService.getProducts().subscribe(products => {
   * console.log(products);
   * });
   */
  getProducts(props: FiltersProducts) {
    return this.http.get<Product[]>(this.url);
  }

  /**
   * Obtiene un listado de productos aplicando filtros y/o paginación.
   * Este método es útil para consultas más específicas, permitiendo filtrar por categoría, título, rango de precios, y limitar los resultados.
   * @param {getProductsProps} filters - Un objeto que combina filtros (`FiltersProducts`) y opciones de paginación (`Pagination`).
   * @returns Un Observable que emite un array de objetos de tipo `Product`.
   * @example
   * // Ejemplo de uso para obtener productos con filtros y paginación
   * const params = { title: 'Laptop', price_min: 500, limit: 10, offset: 0 };
   * this.productService.getProductsByFilters(params).subscribe(products => {
   * console.log(products);
   * });
   */
  getProductsByFilters(params: getProductsProps): Observable<Product[]> {
    const url = new URL(this.url);
    const { limit = 20, offset = 0, ...filters } = params; // Agregar los filtros a la URL de forma genérica

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value.toString());
      }
    }
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('offset', offset.toString());

    return this.http.get<Product[]>(url.toString());
  }

  /**
   * Obtiene los detalles de un solo producto por su ID.
   * @param {string} id - El ID del producto que se desea buscar.
   * @returns Un Observable que emite un único objeto de tipo `Product`.
   * @example
   * // Uso para obtener un producto específico por su ID
   * this.productService.getOne('123').subscribe(product => {
   * console.log(product);
   * });
   */
  getOne(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }
  /**
   * Crea un nuevo producto.
   * Utiliza un DTO (`CreateProductDTO`) para asegurar que el objeto enviado
   * al servidor no contenga la propiedad `id`.
   * @param {CreateProductDTO} dto - Los datos del nuevo producto a crear.
   * @returns Un Observable que emite el objeto `Product` creado, incluyendo su nuevo ID.
   * @example
   * // Uso para crear un nuevo producto
   * const newProduct = {
   *   title: 'New Laptop',
   *   price: 1500,
   *   description: 'A powerful new laptop.',
   *   category: { id: 1, name: 'Electronics', image: 'url' },
   *   images: ['url1', 'url2']
   * };
   * this.productService.createProduct(newProduct).subscribe(product => {
   *   console.log('Producto creado:', product);
   * });
   */
  public createProduct(dto: CreateProductDTO): Observable<Product> {
    return this.http.post<Product>(this.url, dto);
  }
}
