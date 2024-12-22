"use client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:3000/graphql",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }),
    cache: new InMemoryCache()})
export default client
