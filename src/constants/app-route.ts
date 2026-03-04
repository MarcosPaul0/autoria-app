export const APP_ROUTE = {
  private: {
    products: '/produtos',
    addProduct: '/produtos/registrar',
    updateProduct: '/produtos/editar/$productId',
    imagesProduct: '/produtos/imagens/$productId',
    categories: '/categorias',
    addCategory: '/categorias/registrar',
    updateCategory: '/categorias/editar/$categoryId',
  },
  public: {
    landingPage: '/',
    terms: '/termos-de-uso',
    login: '/login',
    exchangesAndReturns: '/trocas-e-devolucoes',
    deliveryAndShipping: '/entrega-e-frete',
    product: '/produtos/$productId',
    privacyPolicies: '/politicas-de-privacidade',
  },
} as const

export type PrivateRoutes =
  (typeof APP_ROUTE.private)[keyof typeof APP_ROUTE.private]

export type PublicRoutes =
  (typeof APP_ROUTE.public)[keyof typeof APP_ROUTE.public]

export type AppRoutes = PublicRoutes | PrivateRoutes
