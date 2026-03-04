import { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm, useStore } from '@tanstack/react-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@autoria/components/card'
import { Toolbar } from '@autoria/components/toolbar'
import { APP_ROUTE } from '@autoria/constants/app-route'
import { ProductRepository } from '@autoria/repositories/product-repository'
import { Button } from '@autoria/components/button'
import { ProductImageCard } from '@autoria/pages/products/components/product-image-card'
import { HTTP_STATUS } from '@autoria/constants/http-status'
import { errorHandler } from '@autoria/utils/errorHandler'
import { ToastService } from '@autoria/services/toast-service'
import { CloudArrowUpIcon } from '@phosphor-icons/react'
import type { HttpStatus } from '@autoria/constants/http-status'
import type { ProductImage } from '@autoria/interfaces/api-responses.interface'
import type { SubmitEvent } from 'react'
import type { FileRejection } from 'react-dropzone'

interface ProductImagesPage {
  productId: string
}

interface ProductImageDraft {
  key: string
  productImageId?: string
  previewUrl: string
  file?: File
  originalDisplayOrder: number
  isLocalPreview: boolean
}

const MAX_IMAGES_PER_PRODUCT = 4
const MAX_IMAGE_SIZE_IN_BYTES = 3 * 1024 * 1024

const UPDATE_PRODUCT_IMAGES_SUCCESS_MESSAGE =
  'Imagens do produto atualizadas com sucesso!'

const UPDATE_PRODUCT_IMAGES_ERROR_MESSAGES = {
  [HTTP_STATUS.unauthorized]: 'Ocorreu um erro ao atualizar as imagens!',
  [HTTP_STATUS.badRequest]: 'Ocorreu um erro ao atualizar as imagens!',
  [HTTP_STATUS.internal]:
    'Ocorreu algum erro inesperado. Tente novamente mais tarde.',
} as Record<HttpStatus, string>

function createDraftFromProductImage(image: ProductImage): ProductImageDraft {
  return {
    key: `existing-${image.id}`,
    productImageId: image.id,
    previewUrl: image.imageUrl,
    originalDisplayOrder: image.displayOrder,
    isLocalPreview: false,
  }
}

function createDraftFromFile(file: File): ProductImageDraft {
  return {
    key: crypto.randomUUID(),
    previewUrl: URL.createObjectURL(file),
    file,
    originalDisplayOrder: 0,
    isLocalPreview: true,
  }
}

function revokePreviewIfNeeded(image: ProductImageDraft) {
  if (image.isLocalPreview) {
    URL.revokeObjectURL(image.previewUrl)
  }
}

function reorderImages(
  images: Array<ProductImageDraft>,
  sourceKey: string,
  targetKey: string,
) {
  const sourceIndex = images.findIndex((image) => image.key === sourceKey)
  const targetIndex = images.findIndex((image) => image.key === targetKey)

  if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) {
    return images
  }

  const nextImages = [...images]
  const [movedImage] = nextImages.splice(sourceIndex, 1)
  nextImages.splice(targetIndex, 0, movedImage)

  return nextImages
}

function validateImageFile(file?: File) {
  if (!file) {
    return 'Nenhum arquivo foi selecionado.'
  }

  if (!file.type.startsWith('image/')) {
    return 'Selecione apenas arquivos de imagem.'
  }

  if (file.size > MAX_IMAGE_SIZE_IN_BYTES) {
    return 'Cada imagem deve ter no máximo 3MB.'
  }

  return null
}

function showDropzoneErrors(fileRejections: Array<FileRejection>) {
  for (const rejection of fileRejections) {
    for (const error of rejection.errors) {
      if (error.code === 'file-too-large') {
        ToastService.warning('Cada imagem deve ter no máximo 3MB.')
        return
      }

      if (error.code === 'file-invalid-type') {
        ToastService.warning('Selecione apenas arquivos de imagem.')
        return
      }
    }
  }
}

export function ProductImagesPage({ productId }: ProductImagesPage) {
  const queryClient = useQueryClient()
  const [draggedImageKey, setDraggedImageKey] = useState<string | null>(null)
  const imagesRef = useRef<Array<ProductImageDraft>>([])

  const productImagesForm = useForm({
    defaultValues: {
      images: [] as Array<ProductImageDraft>,
    },
    onSubmit: async ({ value }) => {
      if (value.images.length > MAX_IMAGES_PER_PRODUCT) {
        ToastService.warning('No máximo 5 imagens por produto.')
        return
      }

      const changedImages = value.images.reduce<
        Array<{ productImageId?: string; displayOrder: number; file?: File }>
      >((accumulator, image, index) => {
        const displayOrder = index + 1
        const orderChanged = image.originalDisplayOrder !== displayOrder
        const imageChanged = Boolean(image.file)

        if (!image.productImageId) {
          accumulator.push({
            displayOrder,
            file: image.file,
          })

          return accumulator
        }

        if (orderChanged || imageChanged) {
          accumulator.push({
            productImageId: image.productImageId,
            displayOrder,
            file: image.file,
          })
        }

        return accumulator
      }, [])

      if (changedImages.length === 0) {
        ToastService.info('Nenhuma alteração para salvar.')
        return
      }

      try {
        await ProductRepository.setImages(productId, changedImages)
        ToastService.success(UPDATE_PRODUCT_IMAGES_SUCCESS_MESSAGE)

        const updatedProduct =
          await ProductRepository.findByIdForAdmin(productId)
        queryClient.setQueryData(
          ['product-for-admin', productId],
          updatedProduct,
        )

        imagesRef.current.forEach(revokePreviewIfNeeded)
        productImagesForm.setFieldValue(
          'images',
          [...updatedProduct.productImages]
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map(createDraftFromProductImage),
        )
      } catch (error) {
        errorHandler(error, UPDATE_PRODUCT_IMAGES_ERROR_MESSAGES)
      }
    },
  })

  const { data: productData } = useQuery({
    queryKey: ['product-for-admin', productId],
    queryFn: () => ProductRepository.findByIdForAdmin(productId),
  })

  const {
    values: { images },
    isSubmitting,
  } = useStore(productImagesForm.store)

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxSize: MAX_IMAGE_SIZE_IN_BYTES,
    multiple: true,
    disabled: images.length >= MAX_IMAGES_PER_PRODUCT,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        showDropzoneErrors(fileRejections)
      }

      if (acceptedFiles.length === 0) {
        return
      }

      const availableSlots = MAX_IMAGES_PER_PRODUCT - images.length

      if (availableSlots <= 0) {
        ToastService.warning('No máximo 5 imagens por produto.')
        return
      }

      if (acceptedFiles.length > availableSlots) {
        ToastService.warning('No máximo 5 imagens por produto.')
      }

      const filesToAdd = acceptedFiles.slice(0, availableSlots)

      productImagesForm.setFieldValue('images', [
        ...images,
        ...filesToAdd.map(createDraftFromFile),
      ])
    },
  })

  function handleReplaceImage(imageKey: string, file: File) {
    const validationError = validateImageFile(file)

    if (validationError) {
      ToastService.warning(validationError)
      return
    }

    productImagesForm.setFieldValue(
      'images',
      images.map((image) => {
        if (image.key !== imageKey) {
          return image
        }

        revokePreviewIfNeeded(image)

        return {
          ...image,
          file,
          previewUrl: URL.createObjectURL(file),
          isLocalPreview: true,
        }
      }),
    )
  }

  function handleRemoveNewImage(imageKey: string) {
    const imageToRemove = images.find((image) => image.key === imageKey)

    if (imageToRemove) {
      revokePreviewIfNeeded(imageToRemove)
    }

    productImagesForm.setFieldValue(
      'images',
      images.filter((image) => image.key !== imageKey),
    )
  }

  async function handleSubmitProductImages(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    await productImagesForm.handleSubmit()
  }

  useEffect(() => {
    imagesRef.current = images
  }, [images])

  useEffect(() => {
    if (!productData) return

    imagesRef.current.forEach(revokePreviewIfNeeded)

    productImagesForm.setFieldValue(
      'images',
      [...productData.productImages]
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map(createDraftFromProductImage),
    )
  }, [productData])

  return (
    <>
      <Toolbar
        links={[
          {
            label: 'Lista de produtos',
            link: APP_ROUTE.private.products,
          },
        ]}
        page="Imagens do produto"
      />

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Atualizar imagens do produto</CardTitle>
          <CardDescription>
            Arraste e solte imagens no dropzone, troque imagens existentes e
            reorganize a ordem arrastando cada item.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmitProductImages}
          >
            <div
              {...getRootProps()}
              className={`border-input bg-muted/20 hover:bg-muted/40 flex h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed transition-colors ${
                isDragActive ? 'border-primary bg-primary/10' : ''
              } ${
                images.length >= MAX_IMAGES_PER_PRODUCT
                  ? 'cursor-not-allowed opacity-60'
                  : ''
              }`}
            >
              <input {...getInputProps()} />

              <CloudArrowUpIcon className="text-muted-foreground size-8" />
              <span className="text-sm font-medium">
                Arraste imagens aqui ou clique para selecionar
              </span>
              <span className="text-muted-foreground text-xs">
                Máximo de 5 imagens por produto e 3MB por imagem
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
              {images.map((image, index) => {
                return (
                  <ProductImageCard
                    key={image.productImageId}
                    image={image}
                    order={index + 1}
                    onDragStart={setDraggedImageKey}
                    onDropCard={(targetKey) => {
                      if (!draggedImageKey) {
                        return
                      }

                      productImagesForm.setFieldValue(
                        'images',
                        reorderImages(images, draggedImageKey, targetKey),
                      )
                      setDraggedImageKey(null)
                    }}
                    onDragEnd={() => setDraggedImageKey(null)}
                    onReplaceImage={handleReplaceImage}
                    onRemoveNewImage={handleRemoveNewImage}
                  />
                )
              })}
            </div>

            <Button className="max-w-lg" isLoading={isSubmitting} type="submit">
              Atualizar imagens do produto
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
