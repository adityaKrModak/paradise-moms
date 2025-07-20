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

export type Address = {
  __typename?: 'Address';
  addressType: AddressType;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  user: User;
  zip: Scalars['String']['output'];
};

export enum AddressType {
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY'
}

export type AuthAccount = {
  __typename?: 'AuthAccount';
  id: Scalars['Int']['output'];
  oauthId: Scalars['String']['output'];
  oauthProvider: Scalars['String']['output'];
  user: User;
};

export type BulkSyncPaymentsResponse = {
  __typename?: 'BulkSyncPaymentsResponse';
  failedSyncs: Scalars['Int']['output'];
  successfulSyncs: Scalars['Int']['output'];
  syncResults: Array<SyncPaymentStatusResponse>;
  totalPayments: Scalars['Int']['output'];
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
};

export type CreateAddressInput = {
  addressType?: AddressType;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  fullName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
  zip: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateOrderInput = {
  addressId: Scalars['Int']['input'];
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
  categoryIds: Array<Scalars['Int']['input']>;
  currency: Scalars['String']['input'];
  description: Scalars['String']['input'];
  imageUrls: Array<ProductImageInput>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  stock: Scalars['Int']['input'];
};

export type CreateReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['Int']['input'];
  rating: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAddress: Address;
  createCategory: Category;
  createOrder: Order;
  createPaymentGateway: PaymentGateway;
  createPaymentIntent: PaymentIntent;
  createProduct: Product;
  createReview: Review;
  createUser: User;
  removeAddress: Scalars['Boolean']['output'];
  removeCategory: Category;
  removePaymentGateway: PaymentGateway;
  removeProduct: Product;
  removeReview: Review;
  /** Sync all pending payments from Razorpay (Admin only) */
  syncAllPendingPayments: BulkSyncPaymentsResponse;
  /** Sync all payment statuses for a specific order from Razorpay */
  syncOrderPaymentsStatus: SyncOrderPaymentsStatusResponse;
  /** Sync payment status from Razorpay using Razorpay payment ID */
  syncPaymentStatusByGatewayId: SyncPaymentStatusResponse;
  /** Sync payment status from Razorpay using our internal payment ID */
  syncPaymentStatusFromRazorpay: SyncPaymentStatusResponse;
  updateAddress: Address;
  updateCategory: Category;
  updateOrder: Order;
  updatePaymentGateway: PaymentGateway;
  updateProduct: Product;
  updateReview: Review;
  updateUserByAdmin: User;
  updateUserInput: User;
  verifyRazorpayPayment: Payment;
};


export type MutationAddAddressArgs = {
  createAddressInput: CreateAddressInput;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationCreatePaymentGatewayArgs = {
  input: CreatePaymentGatewayInput;
};


export type MutationCreatePaymentIntentArgs = {
  createPaymentIntentInput: CreatePaymentIntentInput;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};


export type MutationCreateReviewArgs = {
  createReviewInput: CreateReviewInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveAddressArgs = {
  addressId: Scalars['Float']['input'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int']['input'];
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


export type MutationSyncOrderPaymentsStatusArgs = {
  orderId: Scalars['Int']['input'];
};


export type MutationSyncPaymentStatusByGatewayIdArgs = {
  gatewayPaymentId: Scalars['String']['input'];
};


export type MutationSyncPaymentStatusFromRazorpayArgs = {
  paymentId: Scalars['String']['input'];
};


export type MutationUpdateAddressArgs = {
  updateAddressInput: UpdateAddressInput;
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
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


export type MutationUpdateUserByAdminArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateUserInputArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationVerifyRazorpayPaymentArgs = {
  razorpayOrderId: Scalars['String']['input'];
  razorpayPaymentId: Scalars['String']['input'];
  razorpaySignature: Scalars['String']['input'];
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
  categories?: Maybe<Array<Maybe<Category>>>;
  currency: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageUrls: Array<ProductImage>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  orderItems?: Maybe<Array<OrderItem>>;
  price: Scalars['Int']['output'];
  reviews?: Maybe<Array<Review>>;
  stock: Scalars['Int']['output'];
};

export type ProductImage = {
  __typename?: 'ProductImage';
  rank: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type ProductImageInput = {
  rank: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  activePaymentGateways: Array<PaymentGateway>;
  categories: Array<Category>;
  category: Category;
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


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
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

export type SyncOrderPaymentsStatusResponse = {
  __typename?: 'SyncOrderPaymentsStatusResponse';
  orderId: Scalars['Int']['output'];
  syncResults: Array<SyncPaymentStatusResponse>;
  totalPayments: Scalars['Int']['output'];
};

export type SyncPaymentStatusResponse = {
  __typename?: 'SyncPaymentStatusResponse';
  currentStatus: Scalars['String']['output'];
  error?: Maybe<Scalars['String']['output']>;
  payment: Payment;
  previousStatus: Scalars['String']['output'];
  statusChanged: Scalars['Boolean']['output'];
};

export type UpdateAddressInput = {
  addressType?: InputMaybe<AddressType>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
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
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  currency?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  imageUrls?: InputMaybe<Array<ProductImageInput>>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  productId?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
};

export type User = {
  __typename?: 'User';
  addresses?: Maybe<Array<Address>>;
  authAccounts?: Maybe<Array<AuthAccount>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  orders?: Maybe<Array<Order>>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
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

export type AddAddressMutationVariables = Exact<{
  createAddressInput: CreateAddressInput;
}>;


export type AddAddressMutation = { __typename?: 'Mutation', addAddress: { __typename?: 'Address', id: number, fullName: string, phoneNumber?: string | null, street: string, city: string, state: string, zip: string, country: string } };

export type UpdateAddressMutationVariables = Exact<{
  updateAddressInput: UpdateAddressInput;
}>;


export type UpdateAddressMutation = { __typename?: 'Mutation', updateAddress: { __typename?: 'Address', id: number, fullName: string, phoneNumber?: string | null, street: string, city: string, state: string, zip: string, country: string } };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: number, name: string, description?: string | null } };

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryInput: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: number, name: string, description?: string | null } };

export type RemoveCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveCategoryMutation = { __typename?: 'Mutation', removeCategory: { __typename?: 'Category', id: number } };

export type CreateOrderMutationVariables = Exact<{
  createOrderInput: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', id: number, totalPrice: number, status: OrderStatus, orderItems?: Array<{ __typename?: 'OrderItem', quantity: number, price: number, product: { __typename?: 'Product', id: number, name: string } }> | null } };

export type CreatePaymentIntentMutationVariables = Exact<{
  createPaymentIntentInput: CreatePaymentIntentInput;
}>;


export type CreatePaymentIntentMutation = { __typename?: 'Mutation', createPaymentIntent: { __typename?: 'PaymentIntent', id: string, gatewayIntentId: string, status: string, amount: number, currency: string } };

export type SyncPaymentStatusByGatewayIdMutationVariables = Exact<{
  gatewayPaymentId: Scalars['String']['input'];
}>;


export type SyncPaymentStatusByGatewayIdMutation = { __typename?: 'Mutation', syncPaymentStatusByGatewayId: { __typename?: 'SyncPaymentStatusResponse', statusChanged: boolean, previousStatus: string, currentStatus: string, error?: string | null, payment: { __typename?: 'Payment', id: string, status: string, amount: number, currency: string, gatewayPaymentId: string, intent: { __typename?: 'PaymentIntent', id: string, status: string, order: { __typename?: 'Order', id: number, status: OrderStatus } } } } };

export type SyncOrderPaymentsStatusMutationVariables = Exact<{
  orderId: Scalars['Int']['input'];
}>;


export type SyncOrderPaymentsStatusMutation = { __typename?: 'Mutation', syncOrderPaymentsStatus: { __typename?: 'SyncOrderPaymentsStatusResponse', orderId: number, totalPayments: number, syncResults: Array<{ __typename?: 'SyncPaymentStatusResponse', statusChanged: boolean, previousStatus: string, currentStatus: string, error?: string | null, payment: { __typename?: 'Payment', id: string, status: string, gatewayPaymentId: string, intent: { __typename?: 'PaymentIntent', order: { __typename?: 'Order', id: number, status: OrderStatus } } } }> } };

export type CreateProductMutationVariables = Exact<{
  createProductInput: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: number, name: string, description: string, price: number, currency: string, stock: number, imageUrls: Array<{ __typename?: 'ProductImage', url: string, rank: number }>, categories?: Array<{ __typename?: 'Category', id: number, name: string } | null> | null } };

export type UpdateProductMutationVariables = Exact<{
  updateProductInput: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: number, name: string, description: string, price: number, currency: string, stock: number, imageUrls: Array<{ __typename?: 'ProductImage', url: string, rank: number }>, categories?: Array<{ __typename?: 'Category', id: number, name: string } | null> | null } };

export type RemoveProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutation', removeProduct: { __typename?: 'Product', id: number } };

export type CreateReviewMutationVariables = Exact<{
  createReviewInput: CreateReviewInput;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'Review', id: number, rating: number, comment?: string | null, product: { __typename?: 'Product', id: number }, user: { __typename?: 'User', id: number } } };

export type RemoveReviewMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveReviewMutation = { __typename?: 'Mutation', removeReview: { __typename?: 'Review', id: number } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, firstName: string, lastName?: string | null, email: string, role: UserRole } };

export type UpdateUserByAdminMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserByAdminMutation = { __typename?: 'Mutation', updateUserByAdmin: { __typename?: 'User', id: number, firstName: string, lastName?: string | null, email: string, role: UserRole } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUserInput: { __typename?: 'User', id: number, firstName: string, lastName?: string | null, email: string, role: UserRole, phoneNumber?: string | null } };

export type GetMyOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyOrdersQuery = { __typename?: 'Query', myOrders: Array<{ __typename?: 'Order', id: number, totalPrice: number, status: OrderStatus, currency: string, createdAt: any, updatedAt: any, orderItems?: Array<{ __typename?: 'OrderItem', id: number, quantity: number, price: number, currency: string, product: { __typename?: 'Product', id: number, name: string, description: string, imageUrls: Array<{ __typename?: 'ProductImage', url: string, rank: number }> } }> | null }> };

export type GetPaymentIntentByOrderQueryVariables = Exact<{
  orderId: Scalars['Int']['input'];
}>;


export type GetPaymentIntentByOrderQuery = { __typename?: 'Query', paymentIntentByOrder: { __typename?: 'PaymentIntent', id: string, status: string, amount: number, currency: string, gatewayIntentId: string, createdAt: any, updatedAt: any, payments?: Array<{ __typename?: 'Payment', id: string, status: string, amount: number, currency: string, gatewayPaymentId: string, createdAt: any }> | null } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, name: string, description: string, price: number, currency: string, stock: number, imageUrls: Array<{ __typename?: 'ProductImage', url: string, rank: number }>, categories?: Array<{ __typename?: 'Category', id: number, name: string } | null> | null }> };

export type GetProductQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: number, name: string, description: string, price: number, currency: string, stock: number, imageUrls: Array<{ __typename?: 'ProductImage', url: string, rank: number }>, categories?: Array<{ __typename?: 'Category', id: number, name: string } | null> | null } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name: string, description?: string | null }> };

export type GetReviewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReviewsQuery = { __typename?: 'Query', reviews: Array<{ __typename?: 'Review', id: number, rating: number, comment?: string | null, createdAt: any, user: { __typename?: 'User', id: number, email: string, firstName: string, lastName?: string | null }, product: { __typename?: 'Product', id: number, name: string, imageUrls: Array<{ __typename?: 'ProductImage', url: string }> } }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, firstName: string, lastName?: string | null, email: string, role: UserRole, createdAt: any }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, firstName: string, lastName?: string | null, email: string, phoneNumber?: string | null, role: UserRole, createdAt: any, addresses?: Array<{ __typename?: 'Address', id: number, fullName: string, phoneNumber?: string | null, street: string, city: string, state: string, zip: string, country: string, addressType: AddressType }> | null } };


export const AddAddressDocument = gql`
    mutation AddAddress($createAddressInput: CreateAddressInput!) {
  addAddress(createAddressInput: $createAddressInput) {
    id
    fullName
    phoneNumber
    street
    city
    state
    zip
    country
  }
}
    `;
export type AddAddressMutationFn = Apollo.MutationFunction<AddAddressMutation, AddAddressMutationVariables>;

/**
 * __useAddAddressMutation__
 *
 * To run a mutation, you first call `useAddAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAddressMutation, { data, loading, error }] = useAddAddressMutation({
 *   variables: {
 *      createAddressInput: // value for 'createAddressInput'
 *   },
 * });
 */
export function useAddAddressMutation(baseOptions?: Apollo.MutationHookOptions<AddAddressMutation, AddAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAddressMutation, AddAddressMutationVariables>(AddAddressDocument, options);
      }
export type AddAddressMutationHookResult = ReturnType<typeof useAddAddressMutation>;
export type AddAddressMutationResult = Apollo.MutationResult<AddAddressMutation>;
export type AddAddressMutationOptions = Apollo.BaseMutationOptions<AddAddressMutation, AddAddressMutationVariables>;
export const UpdateAddressDocument = gql`
    mutation UpdateAddress($updateAddressInput: UpdateAddressInput!) {
  updateAddress(updateAddressInput: $updateAddressInput) {
    id
    fullName
    phoneNumber
    street
    city
    state
    zip
    country
  }
}
    `;
export type UpdateAddressMutationFn = Apollo.MutationFunction<UpdateAddressMutation, UpdateAddressMutationVariables>;

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      updateAddressInput: // value for 'updateAddressInput'
 *   },
 * });
 */
export function useUpdateAddressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAddressMutation, UpdateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAddressMutation, UpdateAddressMutationVariables>(UpdateAddressDocument, options);
      }
export type UpdateAddressMutationHookResult = ReturnType<typeof useUpdateAddressMutation>;
export type UpdateAddressMutationResult = Apollo.MutationResult<UpdateAddressMutation>;
export type UpdateAddressMutationOptions = Apollo.BaseMutationOptions<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
  createCategory(createCategoryInput: $createCategoryInput) {
    id
    name
    description
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      createCategoryInput: // value for 'createCategoryInput'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
  updateCategory(updateCategoryInput: $updateCategoryInput) {
    id
    name
    description
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      updateCategoryInput: // value for 'updateCategoryInput'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const RemoveCategoryDocument = gql`
    mutation RemoveCategory($id: Int!) {
  removeCategory(id: $id) {
    id
  }
}
    `;
export type RemoveCategoryMutationFn = Apollo.MutationFunction<RemoveCategoryMutation, RemoveCategoryMutationVariables>;

/**
 * __useRemoveCategoryMutation__
 *
 * To run a mutation, you first call `useRemoveCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCategoryMutation, { data, loading, error }] = useRemoveCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCategoryMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCategoryMutation, RemoveCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCategoryMutation, RemoveCategoryMutationVariables>(RemoveCategoryDocument, options);
      }
export type RemoveCategoryMutationHookResult = ReturnType<typeof useRemoveCategoryMutation>;
export type RemoveCategoryMutationResult = Apollo.MutationResult<RemoveCategoryMutation>;
export type RemoveCategoryMutationOptions = Apollo.BaseMutationOptions<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($createOrderInput: CreateOrderInput!) {
  createOrder(createOrderInput: $createOrderInput) {
    id
    totalPrice
    status
    orderItems {
      quantity
      price
      product {
        id
        name
      }
    }
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      createOrderInput: // value for 'createOrderInput'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const CreatePaymentIntentDocument = gql`
    mutation CreatePaymentIntent($createPaymentIntentInput: CreatePaymentIntentInput!) {
  createPaymentIntent(createPaymentIntentInput: $createPaymentIntentInput) {
    id
    gatewayIntentId
    status
    amount
    currency
  }
}
    `;
export type CreatePaymentIntentMutationFn = Apollo.MutationFunction<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>;

/**
 * __useCreatePaymentIntentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentIntentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentIntentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentIntentMutation, { data, loading, error }] = useCreatePaymentIntentMutation({
 *   variables: {
 *      createPaymentIntentInput: // value for 'createPaymentIntentInput'
 *   },
 * });
 */
export function useCreatePaymentIntentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>(CreatePaymentIntentDocument, options);
      }
export type CreatePaymentIntentMutationHookResult = ReturnType<typeof useCreatePaymentIntentMutation>;
export type CreatePaymentIntentMutationResult = Apollo.MutationResult<CreatePaymentIntentMutation>;
export type CreatePaymentIntentMutationOptions = Apollo.BaseMutationOptions<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>;
export const SyncPaymentStatusByGatewayIdDocument = gql`
    mutation SyncPaymentStatusByGatewayId($gatewayPaymentId: String!) {
  syncPaymentStatusByGatewayId(gatewayPaymentId: $gatewayPaymentId) {
    payment {
      id
      status
      amount
      currency
      gatewayPaymentId
      intent {
        id
        status
        order {
          id
          status
        }
      }
    }
    statusChanged
    previousStatus
    currentStatus
    error
  }
}
    `;
export type SyncPaymentStatusByGatewayIdMutationFn = Apollo.MutationFunction<SyncPaymentStatusByGatewayIdMutation, SyncPaymentStatusByGatewayIdMutationVariables>;

/**
 * __useSyncPaymentStatusByGatewayIdMutation__
 *
 * To run a mutation, you first call `useSyncPaymentStatusByGatewayIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncPaymentStatusByGatewayIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncPaymentStatusByGatewayIdMutation, { data, loading, error }] = useSyncPaymentStatusByGatewayIdMutation({
 *   variables: {
 *      gatewayPaymentId: // value for 'gatewayPaymentId'
 *   },
 * });
 */
export function useSyncPaymentStatusByGatewayIdMutation(baseOptions?: Apollo.MutationHookOptions<SyncPaymentStatusByGatewayIdMutation, SyncPaymentStatusByGatewayIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SyncPaymentStatusByGatewayIdMutation, SyncPaymentStatusByGatewayIdMutationVariables>(SyncPaymentStatusByGatewayIdDocument, options);
      }
export type SyncPaymentStatusByGatewayIdMutationHookResult = ReturnType<typeof useSyncPaymentStatusByGatewayIdMutation>;
export type SyncPaymentStatusByGatewayIdMutationResult = Apollo.MutationResult<SyncPaymentStatusByGatewayIdMutation>;
export type SyncPaymentStatusByGatewayIdMutationOptions = Apollo.BaseMutationOptions<SyncPaymentStatusByGatewayIdMutation, SyncPaymentStatusByGatewayIdMutationVariables>;
export const SyncOrderPaymentsStatusDocument = gql`
    mutation SyncOrderPaymentsStatus($orderId: Int!) {
  syncOrderPaymentsStatus(orderId: $orderId) {
    orderId
    totalPayments
    syncResults {
      payment {
        id
        status
        gatewayPaymentId
        intent {
          order {
            id
            status
          }
        }
      }
      statusChanged
      previousStatus
      currentStatus
      error
    }
  }
}
    `;
export type SyncOrderPaymentsStatusMutationFn = Apollo.MutationFunction<SyncOrderPaymentsStatusMutation, SyncOrderPaymentsStatusMutationVariables>;

/**
 * __useSyncOrderPaymentsStatusMutation__
 *
 * To run a mutation, you first call `useSyncOrderPaymentsStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncOrderPaymentsStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncOrderPaymentsStatusMutation, { data, loading, error }] = useSyncOrderPaymentsStatusMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useSyncOrderPaymentsStatusMutation(baseOptions?: Apollo.MutationHookOptions<SyncOrderPaymentsStatusMutation, SyncOrderPaymentsStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SyncOrderPaymentsStatusMutation, SyncOrderPaymentsStatusMutationVariables>(SyncOrderPaymentsStatusDocument, options);
      }
export type SyncOrderPaymentsStatusMutationHookResult = ReturnType<typeof useSyncOrderPaymentsStatusMutation>;
export type SyncOrderPaymentsStatusMutationResult = Apollo.MutationResult<SyncOrderPaymentsStatusMutation>;
export type SyncOrderPaymentsStatusMutationOptions = Apollo.BaseMutationOptions<SyncOrderPaymentsStatusMutation, SyncOrderPaymentsStatusMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($createProductInput: CreateProductInput!) {
  createProduct(createProductInput: $createProductInput) {
    id
    name
    description
    price
    currency
    stock
    imageUrls {
      url
      rank
    }
    categories {
      id
      name
    }
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      createProductInput: // value for 'createProductInput'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($updateProductInput: UpdateProductInput!) {
  updateProduct(updateProductInput: $updateProductInput) {
    id
    name
    description
    price
    currency
    stock
    imageUrls {
      url
      rank
    }
    categories {
      id
      name
    }
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      updateProductInput: // value for 'updateProductInput'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const RemoveProductDocument = gql`
    mutation RemoveProduct($id: Int!) {
  removeProduct(id: $id) {
    id
  }
}
    `;
export type RemoveProductMutationFn = Apollo.MutationFunction<RemoveProductMutation, RemoveProductMutationVariables>;

/**
 * __useRemoveProductMutation__
 *
 * To run a mutation, you first call `useRemoveProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductMutation, { data, loading, error }] = useRemoveProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveProductMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProductMutation, RemoveProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProductMutation, RemoveProductMutationVariables>(RemoveProductDocument, options);
      }
export type RemoveProductMutationHookResult = ReturnType<typeof useRemoveProductMutation>;
export type RemoveProductMutationResult = Apollo.MutationResult<RemoveProductMutation>;
export type RemoveProductMutationOptions = Apollo.BaseMutationOptions<RemoveProductMutation, RemoveProductMutationVariables>;
export const CreateReviewDocument = gql`
    mutation CreateReview($createReviewInput: CreateReviewInput!) {
  createReview(createReviewInput: $createReviewInput) {
    id
    rating
    comment
    product {
      id
    }
    user {
      id
    }
  }
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      createReviewInput: // value for 'createReviewInput'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const RemoveReviewDocument = gql`
    mutation RemoveReview($id: Int!) {
  removeReview(id: $id) {
    id
  }
}
    `;
export type RemoveReviewMutationFn = Apollo.MutationFunction<RemoveReviewMutation, RemoveReviewMutationVariables>;

/**
 * __useRemoveReviewMutation__
 *
 * To run a mutation, you first call `useRemoveReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeReviewMutation, { data, loading, error }] = useRemoveReviewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveReviewMutation(baseOptions?: Apollo.MutationHookOptions<RemoveReviewMutation, RemoveReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveReviewMutation, RemoveReviewMutationVariables>(RemoveReviewDocument, options);
      }
export type RemoveReviewMutationHookResult = ReturnType<typeof useRemoveReviewMutation>;
export type RemoveReviewMutationResult = Apollo.MutationResult<RemoveReviewMutation>;
export type RemoveReviewMutationOptions = Apollo.BaseMutationOptions<RemoveReviewMutation, RemoveReviewMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    id
    firstName
    lastName
    email
    role
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserByAdminDocument = gql`
    mutation UpdateUserByAdmin($updateUserInput: UpdateUserInput!) {
  updateUserByAdmin(updateUserInput: $updateUserInput) {
    id
    firstName
    lastName
    email
    role
  }
}
    `;
export type UpdateUserByAdminMutationFn = Apollo.MutationFunction<UpdateUserByAdminMutation, UpdateUserByAdminMutationVariables>;

/**
 * __useUpdateUserByAdminMutation__
 *
 * To run a mutation, you first call `useUpdateUserByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserByAdminMutation, { data, loading, error }] = useUpdateUserByAdminMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserByAdminMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserByAdminMutation, UpdateUserByAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserByAdminMutation, UpdateUserByAdminMutationVariables>(UpdateUserByAdminDocument, options);
      }
export type UpdateUserByAdminMutationHookResult = ReturnType<typeof useUpdateUserByAdminMutation>;
export type UpdateUserByAdminMutationResult = Apollo.MutationResult<UpdateUserByAdminMutation>;
export type UpdateUserByAdminMutationOptions = Apollo.BaseMutationOptions<UpdateUserByAdminMutation, UpdateUserByAdminMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUserInput(updateUserInput: $updateUserInput) {
    id
    firstName
    lastName
    email
    role
    phoneNumber
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetMyOrdersDocument = gql`
    query GetMyOrders {
  myOrders {
    id
    totalPrice
    status
    currency
    createdAt
    updatedAt
    orderItems {
      id
      quantity
      price
      currency
      product {
        id
        name
        description
        imageUrls {
          url
          rank
        }
      }
    }
  }
}
    `;

/**
 * __useGetMyOrdersQuery__
 *
 * To run a query within a React component, call `useGetMyOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
      }
export function useGetMyOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
        }
export function useGetMyOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
        }
export type GetMyOrdersQueryHookResult = ReturnType<typeof useGetMyOrdersQuery>;
export type GetMyOrdersLazyQueryHookResult = ReturnType<typeof useGetMyOrdersLazyQuery>;
export type GetMyOrdersSuspenseQueryHookResult = ReturnType<typeof useGetMyOrdersSuspenseQuery>;
export type GetMyOrdersQueryResult = Apollo.QueryResult<GetMyOrdersQuery, GetMyOrdersQueryVariables>;
export const GetPaymentIntentByOrderDocument = gql`
    query GetPaymentIntentByOrder($orderId: Int!) {
  paymentIntentByOrder(orderId: $orderId) {
    id
    status
    amount
    currency
    gatewayIntentId
    createdAt
    updatedAt
    payments {
      id
      status
      amount
      currency
      gatewayPaymentId
      createdAt
    }
  }
}
    `;

/**
 * __useGetPaymentIntentByOrderQuery__
 *
 * To run a query within a React component, call `useGetPaymentIntentByOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentIntentByOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentIntentByOrderQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetPaymentIntentByOrderQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentIntentByOrderQuery, GetPaymentIntentByOrderQueryVariables> & ({ variables: GetPaymentIntentByOrderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentIntentByOrderQuery, GetPaymentIntentByOrderQueryVariables>(GetPaymentIntentByOrderDocument, options);
      }
export function useGetPaymentIntentByOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentIntentByOrderQuery, GetPaymentIntentByOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentIntentByOrderQuery, GetPaymentIntentByOrderQueryVariables>(GetPaymentIntentByOrderDocument, options);
        }
export function useGetPaymentIntentByOrderSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPaymentIntentByOrderQuery, GetPaymentIntentByOrderQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPaymentIntentByOrderQuery, GetPaymentIntentByOrderQueryVariables>(GetPaymentIntentByOrderDocument, options);
        }
export type GetPaymentIntentByOrderQueryHookResult = ReturnType<typeof useGetPaymentIntentByOrderQuery>;
export type GetPaymentIntentByOrderLazyQueryHookResult = ReturnType<typeof useGetPaymentIntentByOrderLazyQuery>;
export type GetPaymentIntentByOrderSuspenseQueryHookResult = ReturnType<typeof useGetPaymentIntentByOrderSuspenseQuery>;
export type GetPaymentIntentByOrderQueryResult = Apollo.QueryResult<GetPaymentIntentByOrderQuery, GetPaymentIntentByOrderQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts {
  products {
    id
    name
    description
    price
    currency
    stock
    imageUrls {
      url
      rank
    }
    categories {
      id
      name
    }
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
    imageUrls {
      url
      rank
    }
    categories {
      id
      name
    }
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
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    id
    name
    description
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetReviewsDocument = gql`
    query GetReviews {
  reviews {
    id
    rating
    comment
    createdAt
    user {
      id
      email
      firstName
      lastName
    }
    product {
      id
      name
      imageUrls {
        url
      }
    }
  }
}
    `;

/**
 * __useGetReviewsQuery__
 *
 * To run a query within a React component, call `useGetReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReviewsQuery(baseOptions?: Apollo.QueryHookOptions<GetReviewsQuery, GetReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsQuery, GetReviewsQueryVariables>(GetReviewsDocument, options);
      }
export function useGetReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsQuery, GetReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsQuery, GetReviewsQueryVariables>(GetReviewsDocument, options);
        }
export function useGetReviewsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetReviewsQuery, GetReviewsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReviewsQuery, GetReviewsQueryVariables>(GetReviewsDocument, options);
        }
export type GetReviewsQueryHookResult = ReturnType<typeof useGetReviewsQuery>;
export type GetReviewsLazyQueryHookResult = ReturnType<typeof useGetReviewsLazyQuery>;
export type GetReviewsSuspenseQueryHookResult = ReturnType<typeof useGetReviewsSuspenseQuery>;
export type GetReviewsQueryResult = Apollo.QueryResult<GetReviewsQuery, GetReviewsQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    firstName
    lastName
    email
    role
    createdAt
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
    lastName
    email
    phoneNumber
    role
    createdAt
    addresses {
      id
      fullName
      phoneNumber
      street
      city
      state
      zip
      country
      addressType
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;