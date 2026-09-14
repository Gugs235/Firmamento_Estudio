"use client";

import clsx from "clsx";
import { useState } from "react";
import type { ReactNode } from "react";

interface NavItem {
	name: string;
}

interface MorphicNavbarProps {
	items?: Record<string, NavItem>;
	defaultPath?: string;
	className?: string;
	logo?: ReactNode;
}

const DEFAULT_NAV_ITEMS: Record<string, NavItem> = {
	"/": { name: "home" },
	"/works": { name: "works" },
	"/blog": { name: "blog" },
	"/about": { name: "about" },
};

export function MorphicNavbar({
	items = DEFAULT_NAV_ITEMS,
	defaultPath = "/",
	className,
	logo,
}: MorphicNavbarProps) {
	const [activePath, setActivePath] = useState(defaultPath);

	const isActiveLink = (path: string) => {
		if (path === "/") {
			return activePath === "/";
		}
		return activePath.startsWith(path);
	};

	return (
		<nav className={clsx("firmamento-navbar", className)}>
			{logo}
			<div className="morphic-menu">
				{Object.entries(items).map(([path, { name }], index, array) => {
					const isActive = isActiveLink(path);
					const isFirst = index === 0;
					const isLast = index === array.length - 1;
					const prevPath = index > 0 ? array[index - 1][0] : null;
					const nextPath = index < array.length - 1 ? array[index + 1][0] : null;

					return (
						<a
							className={clsx(
								"morphic-link",
								isActive
									? "mx-2 rounded-xl font-semibold text-sm"
									: clsx(
											(isActiveLink(prevPath || "") || isFirst) && "rounded-l-xl",
											(isActiveLink(nextPath || "") || isLast) && "rounded-r-xl",
										),
							)}
							href={path}
							key={path}
							onClick={() => setActivePath(path)}
						>
							{name}
						</a>
					);
				})}
			</div>
		</nav>
	);
}

export default MorphicNavbar;
