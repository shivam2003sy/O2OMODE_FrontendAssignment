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



export const ORDER_MUTATION = gql`
  mutation InsertOrderTable(
    $product_id: uuid,
    $variant_id: uuid,
    $quantity: numeric,
    $total_price: bigint,
    $buyer_id: bpchar!,
    $updated_inventory: numeric!
  ) {
    insert_Order_Table(objects: {
      product_id: $product_id,
      variant_id: $variant_id,
      quantity: $quantity,
      total_price: $total_price,
      buyer_id: $buyer_id
    }) {
      affected_rows
      returning {
        order_id
        product_id
        variant_id
        quantity
        total_price
        order_date
        buyer_id
      }
    }
    update_Variant_Table(
      where: { variant_id: { _eq: $variant_id } },
      _inc: { inventory_count: $updated_inventory }
    ) {
      affected_rows
    }
  }
`;

