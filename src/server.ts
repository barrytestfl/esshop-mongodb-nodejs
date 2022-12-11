import 'dotenv/config';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import PostsController from './posts/posts.controller';
import attributesController from 'attributes/attribute.controller';
import attributeValuesModel from 'attributes/attributeValues.model';
import attributeDetailessController from 'attributes/attributeDetails.controller';
import BrandsController from 'brands/brand.controller';
import groupsController from 'groups/group.controller';
import productsController from 'products/product.controller';
import productImagesController from 'ProductImages/productImage.controller';

import validateEnv from './utils/validateEnv';
import attributeValuessController from './attributes/attributeValues.controller';

validateEnv();

const app = new App(
    [
        new AuthenticationController(),
        new PostsController(),

        new attributesController(),
        new attributeValuessController(),
        new attributeDetailessController(),
        new BrandsController(),
        new groupsController(),
        new productImagesController(),
        new productsController(),
    ],
);

app.listen();