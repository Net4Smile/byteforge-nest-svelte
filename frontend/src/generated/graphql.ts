export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreateUserDto = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signIn: Scalars['String']['output'];
};


export type MutationSignInArgs = {
  signInDto: CreateUserDto;
};

export type Product = {
  __typename?: 'Product';
  categories: Array<Category>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Array<ProductImage>;
  name: Scalars['String']['output'];
  price: Scalars['String']['output'];
  specs: Array<Spec>;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  alt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  productId: Scalars['String']['output'];
  src: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getProduct?: Maybe<Product>;
  getProducts: Array<Product>;
  getUserInfo: Scalars['String']['output'];
  hello: Scalars['String']['output'];
};


export type QueryGetProductArgs = {
  getCategories?: InputMaybe<Scalars['Boolean']['input']>;
  getImage?: InputMaybe<Scalars['Boolean']['input']>;
  getSpecs?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
};


export type QueryGetProductsArgs = {
  getCategories?: InputMaybe<Scalars['Boolean']['input']>;
  getImage?: InputMaybe<Scalars['Boolean']['input']>;
  getSpecs?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Spec = {
  __typename?: 'Spec';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};
