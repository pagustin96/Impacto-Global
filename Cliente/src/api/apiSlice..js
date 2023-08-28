import { CreateApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../reducers/users";

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  credentials: 'include',
  prepareHeaders: (headers, { getState}) => {
    const token = getState().auth.token
    if(token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

