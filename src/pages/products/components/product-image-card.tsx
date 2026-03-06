import { Button } from "@autoria/components/button";
import { TrashIcon } from "@phosphor-icons/react";
import type { ChangeEvent } from "react";
import { useRef } from "react";

interface ProductImageCardData {
	key: string;
	productImageId?: string;
	previewUrl: string;
}

interface ProductImageCardProps {
	image: ProductImageCardData;
	order: number;
	onDragStart: (imageKey: string) => void;
	onDropCard: (imageKey: string) => void;
	onDragEnd: () => void;
	onReplaceImage: (imageKey: string, file: File) => void;
	onRemoveNewImage: (imageKey: string) => void;
}

export function ProductImageCard({
	image,
	order,
	onDragStart,
	onDropCard,
	onDragEnd,
	onReplaceImage,
	onRemoveNewImage,
}: ProductImageCardProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleOpenFile = () => {
		inputRef.current?.click();
	};

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.item(0);

		if (file) {
			onReplaceImage(image.key, file);
		}

		event.target.value = "";
	}

	const isExisting = Boolean(image.productImageId);

	return (
		<article
			className="border-input bg-background flex flex-col gap-3 rounded-2xl border p-3"
			draggable
			onDragStart={() => onDragStart(image.key)}
			onDragOver={(event) => event.preventDefault()}
			onDrop={(event) => {
				event.preventDefault();
				onDropCard(image.key);
			}}
			onDragEnd={onDragEnd}
		>
			<div className="relative">
				<img
					src={image.previewUrl}
					alt={`Imagem ${order}`}
					className="h-72 w-full rounded-xl object-cover"
				/>

				<span className="bg-background/90 absolute top-2 left-2 rounded-lg px-2 py-1 text-xs font-semibold">
					Ordem {order}
				</span>
			</div>

			<div className="flex items-center gap-2">
				<input
					ref={inputRef}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleInputChange}
				/>

				<Button
					onClick={handleOpenFile}
					type="button"
					variant="outline"
					className="flex-1"
				>
					Trocar imagem
				</Button>

				{!isExisting && (
					<Button
						type="button"
						variant="destructive"
						size="icon"
						onClick={() => onRemoveNewImage(image.key)}
					>
						<TrashIcon />
					</Button>
				)}
			</div>
		</article>
	);
}
