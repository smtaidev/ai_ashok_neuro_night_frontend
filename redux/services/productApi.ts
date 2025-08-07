import { Category, Product } from "@/types/product";
import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET /products — all products
    getProducts: builder.query<{ data: Product[] }, void>({
      query: () => "/products",
      providesTags: ["Product"],
    }),

    // GET /products/:id — single product
    getProduct: builder.query<{ data: Product }, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // GET /products/category/:id — products by category
    getProductsByCategory: builder.query<{ data: Product[] }, string>({
      query: (categoryId) => `/category/${categoryId}`,
      providesTags: ["Product"],
    }),

    // GET /categories — all categories
    getAllCategories: builder.query<{ data: Category[] }, void>({
      query: () => "/category",
      providesTags: ["Product"],
    }),

    // GET /category/:id — single category by id
    getCategory: builder.query<{ data: Category }, string>({
      query: (id) => `/category/${id}`,
      providesTags: ["Product"],
    }),

    // POST /products — create a new product
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
  overrideExisting: false, // optional
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductsByCategoryQuery,
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useCreateProductMutation,
} = productApi;
