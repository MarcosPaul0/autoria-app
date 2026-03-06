interface WorksItemProps {
	item: string;
	title: string;
	description: string;
}

export function WorksItem({ item, description, title }: WorksItemProps) {
	return (
		<li className="flex items-center gap-4">
			<span
				className={`
          size-12 sm:size-16 flex items-center justify-center rounded-full bg-secondary
          font-bold text-xl sm:text-2xl text-card
        `}
			>
				{item}
			</span>

			<div className="flex flex-col gap-1 text-card">
				<strong className="text-base sm:text-xl font-bold">{title}</strong>
				<span className="text-sm sm:text-base">{description}</span>
			</div>
		</li>
	);
}
