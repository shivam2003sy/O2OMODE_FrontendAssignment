import { gql } from '@apollo/client';

export const GetProductDetailsQuery = gql`
  query GetProductDetails($product_id: uuid!) {
    Product_Table(where: { product_id: { _eq: $product_id } }) {
      product_id
      name
      description
      Variant_Tables {
        inventory_count
        price
        variant_name
      }
    }
  }
`;

export const CreateVariantMutation = gql`
  mutation InsertVariantTable($inventory_count: numeric!, $price: numeric!, $product_id: uuid!, $variant_name: name!) {
    insert_Variant_Table(objects: { inventory_count: $inventory_count, price: $price, product_id: $product_id, variant_name: $variant_name }) {
      affected_rows
      returning {
        variant_name
        inventory_count
        price
        product_id
        variant_id
      }
    }
  }
`;


export const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts {
    Variant_Table {
      product_id
      variant_id
      variant_name
      price
      inventory_count
      Product_Table {
        name
        description
      }
    }
  }
`;

