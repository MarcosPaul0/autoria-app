import { Button, buttonVariants } from "@autoria/components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@autoria/components/dialog";
import type { HttpStatus } from "@autoria/constants/http-status";
import { HTTP_STATUS } from "@autoria/constants/http-status";
import { QUERY_KEYS } from "@autoria/constants/query-keys";
import type { QueryProductCategories } from "@autoria/interfaces/query-data.interface";
import { cn } from "@autoria/libs/cn";
import { deleteProductCategory } from "@autoria/repositories/product-category-repository";
import { ToastService } from "@autoria/services/toast-service";
import { errorHandler } from "@autoria/utils/errorHandler";
import { TrashIcon } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DELETE_PRODUCT_CATEGORY_ERROR = {
	[HTTP_STATUS.badRequest]:
		"Erro ao deletar a coleção. Tente nvamente mais tarde!",
	[HTTP_STATUS.internal]:
		"Erro ao deletar a coleção. Tente nvamente mais tarde!",
} as Record<HttpStatus, string>;

const DELETE_PRODUCT_CATEGORY_SUCCESS = "Categoria deletada com sucesso!";

interface DeleteProductCategoryDialogProps {
	productCategoryId: string;
}

export function DeleteProductCategoryDialog({
	productCategoryId,
}: DeleteProductCategoryDialogProps) {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["delete-product-category"],
		mutationFn: deleteProductCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.productCategoryOptions],
			});
			queryClient.setQueryData(
				[QUERY_KEYS.productCategories],
				(currentData: Array<QueryProductCategories>) =>
					currentData.filter(
						(productCategoryOption) =>
							productCategoryOption.id !== productCategoryId,
					),
			);
		},
	});

	async function handleDeleteProductCategory() {
		try {
			await mutateAsync(productCategoryId);

			ToastService.success(DELETE_PRODUCT_CATEGORY_SUCCESS);
		} catch (error) {
			errorHandler(error, DELETE_PRODUCT_CATEGORY_ERROR);
		}
	}

	return (
		<Dialog>
			<DialogTrigger className={cn(buttonVariants({ size: "icon" }))}>
				<TrashIcon />
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tem certeza que deseja deletar a coleção?</DialogTitle>

					<DialogDescription>
						Esta operação não poderá ser revertida e todos os dados referentes a
						ela serão permanentemente excluídos.
					</DialogDescription>
				</DialogHeader>

				<DialogClose asChild>
					<Button
						type="button"
						isLoading={isPending}
						onClick={handleDeleteProductCategory}
					>
						<TrashIcon />
						Deletar coleção
					</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}
