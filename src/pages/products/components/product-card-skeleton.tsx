import { Card, CardContent, CardHeader } from "@autoria/components/card";
import { Skeleton } from "@autoria/components/sekeleton";

export function ProductCardSkeleton() {
	return (
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
				<Skeleton className="h-[22px] sm:h-[30px] w-1/3 rounded-full" />
			</CardHeader>

			<CardContent className="flex flex-col items-center gap-2 px-1 sm:px-4">
				<Skeleton className="h-[160px] sm:h-[360px] w-full rounded-lg" />

				<Skeleton className="h-[20px] sm:h-[34px] w-1/3" />

				<Skeleton className="h-[28px] sm:h-[36px] w-3/4" />
			</CardContent>
		</Card>
	);
}
