import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AuthAccount = {
  __typename?: 'AuthAccount';
  id: Scalars['Int']['output'];
  oauthId: Scalars['String']['output'];
  oauthProvider: Scalars['String']['output'];
  user: User;
};

export type CreateOrderInput = {
  currency: Scalars['String']['input'];
  orderItems: Array<CreateOrderItemInput>;
};

export type CreateOrderItemInput = {
  productId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreatePaymentGatewayInput = {
  config: Scalars['JSON']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type CreatePaymentIntentInput = {
  amount: Scalars['Int']['input'];
  currency: Scalars['String']['input'];
  email: Scalars['String']['input'];
  gatewayId: Scalars['Int']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  orderId: Scalars['Int']['input'];
};

export type CreateProductInput = {
  currency: Scalars['String']['input'];
  description: Scalars['String']['input'];
  imageUrls: Scalars['JSON']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  stock: Scalars['Int']['input'];
};

export type CreateReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['Int']['input'];
  rating: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder: Order;
  createPaymentGateway: PaymentGateway;
  createPaymentIntent: PaymentIntent;
  createProduct: Product;
  createReview: Review;
  removePaymentGateway: PaymentGateway;
  removeProduct: Product;
  removeReview: Review;
  updateOrder: Order;
  updatePaymentGateway: PaymentGateway;
  updateProduct: Product;
  updateReview: Review;
  updateUserInput: User;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationCreatePaymentGatewayArgs = {
  input: CreatePaymentGatewayInput;
};


export type MutationCreatePaymentIntentArgs = {
  input: CreatePaymentIntentInput;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};


export type MutationCreateReviewArgs = {
  createReviewInput: CreateReviewInput;
};


export type MutationRemovePaymentGatewayArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProductArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveReviewArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateOrderArgs = {
  updateOrderInput: UpdateOrderInput;
};


export type MutationUpdatePaymentGatewayArgs = {
  input: UpdatePaymentGatewayInput;
};


export type MutationUpdateProductArgs = {
  updateProductInput: UpdateProductInput;
};


export type MutationUpdateReviewArgs = {
  updateReviewInput: UpdateReviewInput;
};


export type MutationUpdateUserInputArgs = {
  updateUserInput: UpdateUserInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  orderItems?: Maybe<Array<OrderItem>>;
  status: OrderStatus;
  totalPrice: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  currency: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  order: Order;
  price: Scalars['Int']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED'
}

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Int']['output'];
  amountRefunded: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  gateway: PaymentGateway;
  gatewayId: Scalars['Int']['output'];
  gatewayPaymentId: Scalars['String']['output'];
  gatewaySignature?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  intent: PaymentIntent;
  intentId: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  refunds?: Maybe<Array<Refund>>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userEmail: Scalars['String']['output'];
};

export type PaymentGateway = {
  __typename?: 'PaymentGateway';
  config: Scalars['JSON']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  paymentIntents?: Maybe<Array<PaymentIntent>>;
  payments?: Maybe<Array<Payment>>;
  refunds?: Maybe<Array<Refund>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PaymentIntent = {
  __typename?: 'PaymentIntent';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  gateway: PaymentGateway;
  gatewayId: Scalars['Int']['output'];
  gatewayIntentId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  order: Order;
  orderId: Scalars['Int']['output'];
  payments?: Maybe<Array<Payment>>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userEmail: Scalars['String']['output'];
};

export type Product = {
  __typename?: 'Product';
  currency: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageUrls: Scalars['JSON']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  orderItems?: Maybe<Array<OrderItem>>;
  price: Scalars['Int']['output'];
  reviews?: Maybe<Array<Review>>;
  stock: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  activePaymentGateways: Array<PaymentGateway>;
  me: User;
  myOrders: Array<Order>;
  order: Order;
  orders: Array<Order>;
  paymentGateway: PaymentGateway;
  paymentGateways: Array<PaymentGateway>;
  paymentIntent: PaymentIntent;
  paymentIntentByOrder: PaymentIntent;
  paymentIntents: Array<PaymentIntent>;
  product: Product;
  products: Array<Product>;
  review: Review;
  reviews: Array<Review>;
  users: Array<User>;
};


export type QueryOrderArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPaymentGatewayArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPaymentIntentArgs = {
  id: Scalars['String']['input'];
};


export type QueryPaymentIntentByOrderArgs = {
  orderId: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryReviewArgs = {
  id: Scalars['Int']['input'];
};

export type Refund = {
  __typename?: 'Refund';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  gateway: PaymentGateway;
  gatewayRefundId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  payment: Payment;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Review = {
  __typename?: 'Review';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  product: Product;
  rating: Scalars['Int']['output'];
  user: User;
};

export type UpdateOrderInput = {
  id: Scalars['Int']['input'];
  status: OrderStatus;
};

export type UpdatePaymentGatewayInput = {
  config?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['Int']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  currency: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  imageUrls: Scalars['JSON']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  stock: Scalars['Int']['input'];
};

export type UpdateReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  productId?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  authAccounts?: Maybe<Array<AuthAccount>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  orders?: Maybe<Array<Order>>;
  phoneNumber: Scalars['String']['output'];
  reviews?: Maybe<Array<Review>>;
  /** User role for authorization */
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
};

/** User role types */
export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, name: string, description: string, price: number, currency: string, stock: number, imageUrls: any }> };

export type GetProductQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: number, name: string, description: string, price: number, currency: string, stock: number, imageUrls: any } };


export const GetProductsDocument = gql`
    query GetProducts {
  products {
    id
    name
    description
    price
    currency
    stock
    imageUrls
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export function useGetProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsSuspenseQueryHookResult = ReturnType<typeof useGetProductsSuspenseQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = gql`
    query GetProduct($id: Int!) {
  product(id: $id) {
    id
    name
    description
    price
    currency
    stock
    imageUrls
  }
}
    `;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables> & ({ variables: GetProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export function useGetProductSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductSuspenseQueryHookResult = ReturnType<typeof useGetProductSuspenseQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;