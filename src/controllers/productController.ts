import { Request, Response } from 'express';
import { promisify } from 'util';
import * as aws from 'aws-sdk';
import * as path from 'path';
import CreateProduct from '../services/createProduct';
import ProductModel from '../models/productModel';
import { getRepository } from 'typeorm';

const s3 = new aws.S3();


export default class ProductController {
  public async create(request: Request, response: Response) {
    try {
      const {
        user_id,
        title,
        description,
        price,
        quantity_days,
        delivery_way,
        delivery_point,
        uf,
        city,
      } = request.body;

      const data = request.body;
      console.log(data);


      const createProduct = new CreateProduct();

      const product = await createProduct.execute({
        user_id,
        photo_id: request.file.key,
        title,
        description,
        price: Number(price),
        quantity_days: Number(quantity_days),
        delivery_way,
        delivery_point,
        uf,
        city,
      })



      return response.json({product, location: request.file.location});
    } catch (error) {
      s3.deleteObject({
        Bucket: 'upload-meempresta',
        Key: request.file.key,
      }).promise()
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
      // const deleteAsync = promisify(fs.unlink);
      // await deleteAsync(request.file.path);
      return response.status(500).json(error.message);
    }
  }

  public async store (request: Request, response: Response ) {
    const productRepository = getRepository(ProductModel);

    console.log(path.join(__dirname, '..'))


    const products = await productRepository.find()

    return response.json(products);
  }

  public async index (request: Request, response: Response) {
    try {
      const id = request.params;
      const productRepository = getRepository(ProductModel);

      const product = await productRepository.findOne({
        where: id,
      });

      if (!product) {
        return response.status(404).json({message: 'Product not found.'})
      }

      return response.json(product);

    } catch (error) {
      return response.status(500).json(error.message);
    }
  }
}
