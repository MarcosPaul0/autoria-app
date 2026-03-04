export const API_ROUTES = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
  },
  productCategory: {
    create: '/api/product-category',
    findById: '/api/product-category/',
    findAll: '/api/product-category',
    delete: '/api/product-category/',
    update: '/api/product-category/',
  },
  product: {
    create: '/api/product',
    delete: '/api/product/',
    findById: '/api/product/',
    update: '/api/product/',
    setImages: '/api/product/images/',
    findAll: '/api/product/list',
    findByIdForAdmin: '/api/product/for-admin/',
    findAllForAdmin: '/api/product/list/for-admin',
  },
  user: {
    findById: '/api/user/',
    delete: '/api/user/',
    update: '/api/user/',
    findAll: '/api/user/list',
    create: '/api/user',
  },
} as const
