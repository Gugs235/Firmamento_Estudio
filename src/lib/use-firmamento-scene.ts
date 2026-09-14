import { RefObject, useEffect } from "react";

type Star = {
	x: number;
	y: number;
	z: number;
	previousZ: number;
	size: number;
};

export function useFirmamentoScene(stageRef: RefObject<HTMLElement | null>) {
	useEffect(() => {
		const stage = stageRef.current;
		const viewport = stage?.querySelector<HTMLElement>(".scroll-viewport");
		const canvas = stage?.querySelector<HTMLCanvasElement>(".starfield");
		const nodeLayer = stage?.querySelector<HTMLElement>(".tunnel-nodes");
		const cards = [...document.querySelectorAll<HTMLElement>("[data-project]")];
		const context = canvas?.getContext("2d");
		if (!stage || !viewport || !canvas || !nodeLayer || !context) return;

		const root = document.documentElement;
		const stars: Star[] = [];
		const nodes: HTMLElement[] = [];
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let width = 0;
		let height = 0;
		let depth = 0;
		let progress = 0;
		let targetProgress = 0;
		let frame = 0;
		let ticking = false;
		const projectNames = cards
			.map((card) => card.dataset.project)
			.filter((name): name is string => Boolean(name));
		const tunnelStart = 0.4;
		const tunnelEnd = 0.86;
		const windowSize = projectNames.length
			? (tunnelEnd - tunnelStart) / Math.max(projectNames.length - 0.35, 1)
			: 0;
		const clamp = (value: number, min = 0, max = 1) =>
			Math.min(Math.max(value, min), max);
		const remap = (value: number, start: number, end: number) =>
			clamp((value - start) / (end - start));

		const setupCanvas = () => {
			const ratio = Math.min(window.devicePixelRatio || 1, 2);
			width = viewport.clientWidth;
			height = viewport.clientHeight;
			canvas.width = width * ratio;
			canvas.height = height * ratio;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			context.setTransform(ratio, 0, 0, ratio, 0, 0);
		};
		const resetStar = (star: Star, initial = false) => {
			star.x = (Math.random() - 0.5) * width * 2.4;
			star.y = (Math.random() - 0.5) * height * 2.4;
			star.z = initial ? Math.random() * depth + 1 : depth;
			star.previousZ = star.z;
			star.size = Math.random() * 1.6 + 0.3;
		};
		const setupStars = () => {
			depth = Math.max(width, height) * 1.2;
			stars.length = 0;
			const count = Math.min(
				Math.max(Math.floor((width * height) / 9500), 90),
				240,
			);
			for (let index = 0; index < count; index += 1) {
				const star = { x: 0, y: 0, z: 0, previousZ: 0, size: 0 };
				resetStar(star, true);
				stars.push(star);
			}
		};
		const project = (star: Star, z = star.z) => {
			const scale = 128 / Math.max(z, 1);
			return { x: star.x * scale + width / 2, y: star.y * scale + height / 2 };
		};
		const drawStars = (speed: number) => {
			context.clearRect(0, 0, width, height);
			context.fillStyle = "rgba(242, 242, 245, 0.86)";
			stars.forEach((star) => {
				star.previousZ = star.z;
				star.z -= speed;
				if (star.z < 1) resetStar(star);
				const current = project(star);
				if (
					current.x < -20 ||
					current.x > width + 20 ||
					current.y < -20 ||
					current.y > height + 20
				) {
					resetStar(star);
					return;
				}
				if (speed > 6) {
					const previous = project(star, star.previousZ + speed * 3.5);
					context.strokeStyle = `rgba(140, 156, 255, ${Math.min(speed / 30, 0.8)})`;
					context.lineWidth = Math.min(star.size * speed * 0.12, 2.4);
					context.beginPath();
					context.moveTo(previous.x, previous.y);
					context.lineTo(current.x, current.y);
					context.stroke();
				} else {
					context.globalAlpha = Math.max(0.2, 1 - star.z / depth);
					context.beginPath();
					context.arc(current.x, current.y, star.size, 0, Math.PI * 2);
					context.fill();
					context.globalAlpha = 1;
				}
			});
		};
		const createNodes = () => {
			projectNames.forEach((name, index) => {
				const node = document.createElement("div");
				node.className = "tunnel-node";
				node.dataset.index = String(index);
				node.innerHTML = '<span class="project-dot"></span><span></span>';
				node.lastElementChild!.textContent = name;
				nodeLayer.appendChild(node);
				nodes.push(node);
			});
		};
		const updateNodes = () => {
			nodes.forEach((node, index) => {
				const start = tunnelStart + index * windowSize;
				const peak = start + windowSize * 0.58;
				const end = start + windowSize * 1.42;
				const entering = remap(progress, start, peak);
				const leaving = remap(progress, peak, end);
				const scale =
					progress < peak ? 0.15 + entering * 1.1 : 1.25 + leaving * 1.8;
				const opacity = progress < peak ? entering : 1 - leaving;
				const textFade = 1 - remap(progress, 0.7, 0.78);
				node.style.setProperty("--node-scale", scale.toFixed(3));
				node.style.setProperty(
					"--node-opacity",
					clamp(opacity * textFade).toFixed(3),
				);
				node.style.setProperty(
					"--node-rotate",
					`${(index % 2 ? -1 : 1) * leaving * 18}deg`,
				);
			});
		};
		const applyProgress = () => {
			const total = stage.offsetHeight - window.innerHeight;
			const rect = stage.getBoundingClientRect();
			targetProgress = total > 0 ? clamp(-rect.top / total) : 0;
			progress += (targetProgress - progress) * 0.12;
			const anchor = remap(progress, 0, 0.4);
			const warp = remap(progress, 0.32, 0.8);
			const flashIn = remap(progress, 0.82, 0.88);
			const flashOut = 1 - remap(progress, 0.92, 1);
			const flash = Math.min(flashIn, flashOut) * 0.78;
			const copyFade = 1 - remap(progress, 0, 0.35);
			root.style.setProperty("--stage-progress", progress.toFixed(3));
			root.style.setProperty("--orbit-scale", (1 + anchor * 3.2).toFixed(3));
			root.style.setProperty(
				"--orbit-rotation",
				`${(anchor * 140).toFixed(2)}deg`,
			);
			root.style.setProperty(
				"--orbit-opacity",
				Math.max(0, 1 - anchor * 1.6).toFixed(3),
			);
			root.style.setProperty("--copy-opacity", copyFade.toFixed(3));
			root.style.setProperty(
				"--copy-lift",
				`${(remap(progress, 0, 0.35) * 12).toFixed(2)}vh`,
			);
			root.style.setProperty(
				"--copy-scale",
				(1 - remap(progress, 0, 0.35) * 0.15).toFixed(3),
			);
			root.style.setProperty(
				"--copy-depth",
				`${-remap(progress, 0, 0.35) * 120}px`,
			);
			root.style.setProperty("--warp-progress", warp.toFixed(3));
			root.style.setProperty("--flash-opacity", Math.max(0, flash).toFixed(3));
			updateNodes();
		};
		const draw = () => {
			drawStars(reduce ? 0 : 1.2 + remap(progress, 0.38, 0.72) * 21.8);
			if (!reduce) {
				applyProgress();
				frame = requestAnimationFrame(draw);
			}
		};
		const revealCards = () => {
			if (reduce || !("IntersectionObserver" in window)) {
				cards.forEach((card) => card.classList.add("is-visible"));
				return;
			}
			const observer = new IntersectionObserver(
				(entries) =>
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add("is-visible");
							observer.unobserve(entry.target);
						}
					}),
				{ threshold: 0.2 },
			);
			cards.forEach((card, index) => {
				card.style.transitionDelay = `${index * 120}ms`;
				observer.observe(card);
			});
			cleanupObserver = () => observer.disconnect();
		};
		let cleanupObserver = () => {};
		const resize = () => {
			setupCanvas();
			setupStars();
		};
		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					applyProgress();
					ticking = false;
				});
				ticking = true;
			}
		};
		const onUnload = () => cancelAnimationFrame(frame);

		currentYear();
		createNodes();
		resize();
		revealCards();
		applyProgress();
		draw();
		window.addEventListener("resize", resize);
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("beforeunload", onUnload);
		return () => {
			cancelAnimationFrame(frame);
			cleanupObserver();
			window.removeEventListener("resize", resize);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("beforeunload", onUnload);
			nodes.forEach((node) => node.remove());
		};

		function currentYear() {
			const year = document.querySelector<HTMLElement>("[data-current-year]");
			if (year) year.textContent = String(new Date().getFullYear());
		}
	}, [stageRef]);
}
