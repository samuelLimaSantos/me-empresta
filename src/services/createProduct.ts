import { getRepository } from 'typeorm';
import Error from '../errors/AppError';
import ProductModel from '../models/productModel';


interface ProductData {
  user_id: string,
  photo_id: string;
  title: string;
  description: string;
  price: number;
  quantity_days: number;
  delivery_way: string;
  delivery_point?: string;
  uf?: string;
  city?: string;
}

export default class CreateProduct {
  public async execute (productData: ProductData) {

      const productRepository = getRepository(ProductModel);


      const product = productRepository.create(productData);


      await productRepository.save(product);
      console.log(product);;

      return product;

  }
};
