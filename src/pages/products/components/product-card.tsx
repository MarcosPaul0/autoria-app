import { Badge } from '@autoria/components/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@autoria/components/card'
import { APP_ROUTE } from '@autoria/constants/app-route'
import { Link } from '@tanstack/react-router'

interface ProductCardProps {
  product: {
    id: string
    price: string
    priceWithDiscount: string
    category: string
    name: string
    imageUrl?: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={APP_ROUTE.public.product}
      params={{
        productId: product.id,
      }}
      className="group block h-full outline-none"
    >
      <Card
        className={`
          w-full h-full rounded-lg sm:rounded-3xl py-2 sm:py-4
          transform-gpu will-change-transform
          transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:scale-[1.02] hover:shadow-xl
          active:scale-[0.97] active:duration-300 active:ease-out
          group-focus-visible:ring-2 group-focus-visible:ring-primary/50
        `}
      >
        <CardHeader className="flex items-center justify-between px-1 sm:px-4">
          <Badge>{product.category}</Badge>

          {/* <Toggle>
            <HeartIcon />
          </Toggle> */}
        </CardHeader>

        <CardContent className="flex flex-col gap-2 px-1 sm:px-4">
          <img
            src={product.imageUrl}
            className={`
              h-[160px] sm:h-[360px] rounded-lg object-cover bg-product-image
            `}
            alt="logo"
          />

          <CardTitle className="mx-auto my-0 text-sm sm:text-base text-center">
            {product.name}
          </CardTitle>

          <div className="flex items-center gap-1 justify-center">
            <span className="text-sm sm:text-xl text-das line-through">
              {product.price}
            </span>
            <strong className="text-xl sm:text-3xl font-bold">
              {product.priceWithDiscount}
            </strong>
          </div>

          {/* <WhatsappProductLink productName={product.name} /> */}
        </CardContent>
      </Card>
    </Link>
  )
}
