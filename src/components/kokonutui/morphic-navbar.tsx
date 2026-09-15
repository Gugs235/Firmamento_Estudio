"use client";

import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const navRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleOutsidePointer = (event: PointerEvent) => {
			if (!navRef.current?.contains(event.target as Node)) {
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener("pointerdown", handleOutsidePointer);
		return () =>
			document.removeEventListener("pointerdown", handleOutsidePointer);
	}, []);

	const isActiveLink = (path: string) => {
		if (path === "/") {
			return activePath === "/";
		}
		return activePath.startsWith(path);
	};

	return (
		<nav ref={navRef} className={clsx("firmamento-navbar", className)}>
			{logo}
			<button
				className="morphic-mobile-toggle"
				type="button"
				aria-expanded={isMobileMenuOpen}
				aria-controls="firmamento-mobile-menu"
				aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
				onClick={() => setIsMobileMenuOpen((open) => !open)}
			>
				{isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
			</button>
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
							onClick={() => {
								setActivePath(path);
								setIsMobileMenuOpen(false);
							}}
						>
							{name}
						</a>
					);
				})}
			</div>
			<div
				className={clsx("morphic-mobile-panel", isMobileMenuOpen && "is-open")}
				id="firmamento-mobile-menu"
			>
				{Object.entries(items).map(([path, { name }]) => (
					<a
						className={clsx("morphic-mobile-link", isActiveLink(path) && "is-active")}
						href={path}
						key={path}
						onClick={() => {
							setActivePath(path);
							setIsMobileMenuOpen(false);
						}}
					>
						{name}
					</a>
				))}
			</div>
		</nav>
	);
}

export default MorphicNavbar;
