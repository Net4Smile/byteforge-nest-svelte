import type { Query } from "../../../generated/graphql";
import { type ApolloQueryResult } from "@apollo/client/core";

export type FetchType = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export type QueryResult<T extends keyof Query> = ApolloQueryResult<Pick<Query, T>>