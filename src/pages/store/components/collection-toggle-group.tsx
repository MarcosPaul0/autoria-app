import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@autoria/components/select'
import { ToggleGroup, ToggleGroupItem } from '@autoria/components/toggle-group'
import { QUERY_KEYS } from '@autoria/constants/query-keys'
import { ProductCategoryPresenter } from '@autoria/presenters/product-category-presenter'
import { ProductCategoryRepository } from '@autoria/repositories/product-category-repository'
import { FunnelSimpleIcon } from '@phosphor-icons/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'

interface CollectionToggleGroupProps {
  handleFilterByCategory: (newProductCategoryId?: string) => void
}

export function CollectionToggleGroup({
  handleFilterByCategory,
}: CollectionToggleGroupProps) {
  const { data: productCategoryOptionsData } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.productCategoryOptions],
    queryFn: async () => {
      const productCategoriesResponse =
        await ProductCategoryRepository.listAll()

      return ProductCategoryPresenter.optionsToUi(productCategoriesResponse)
    },
  })

  const search = useSearch({ strict: false })

  const productCategory = search.productCategory ?? 'all'

  return (
    <>
      <ToggleGroup
        type="single"
        size="lg"
        value={productCategory}
        spacing={2}
        className="justify-between hidden sm:flex"
      >
        <ToggleGroupItem
          value="all"
          aria-label="Filtrar por Todas coleções"
          onClick={() => handleFilterByCategory()}
        >
          Todos
        </ToggleGroupItem>

        {productCategoryOptionsData.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            aria-label={`Filtrar por coleção ${option.label}`}
            onClick={() => handleFilterByCategory(option.value)}
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Select
        value={productCategory}
        onValueChange={(value) =>
          value == 'all'
            ? handleFilterByCategory()
            : handleFilterByCategory(value)
        }
      >
        <SelectTrigger
          aria-invalid="false"
          className="w-full h-12 rounded-2xl px-2.5 py-4 text-base md:text-sm flex sm:hidden"
        >
          <FunnelSimpleIcon className="size-6" />
          <SelectValue placeholder="Filtre por coleção" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todas coleções</SelectItem>

          {productCategoryOptionsData.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
