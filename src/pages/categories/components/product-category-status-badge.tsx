import { Badge } from "@autoria/components/badge";

interface ProductCategoryStatusBadgeProps {
	isActive: boolean;
}

export function ProductCategoryStatusBadge({
	isActive,
}: ProductCategoryStatusBadgeProps) {
	return (
		<Badge variant={isActive ? "default" : "destructive"}>
			{isActive ? "Ativado" : "Desativado"}
		</Badge>
	);
}
