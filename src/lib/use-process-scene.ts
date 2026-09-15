import { RefObject, useEffect } from "react";
import { clamp, getStageProgress, getStepWindows, remap } from "./scroll-utils";

export function useProcessScene(stageRef: RefObject<HTMLElement | null>) {
	useEffect(() => {
		const stage = stageRef.current;
		if (!stage) return;

		const scene = stage.closest<HTMLElement>(".process-scene");
		const steps = [...stage.querySelectorAll<HTMLElement>(".process-step")];
		const railItems = [
			...stage.querySelectorAll<HTMLElement>(".process-rail-item"),
		];
		const progressLabel = stage.querySelector<HTMLElement>(
			".process-progress strong",
		);
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const windows = getStepWindows(steps.length, 0.12, 0.85);

		const updateScene = () => {
			const progress = getStageProgress(stage);
			const introOpacity = 1 - remap(progress, 0, 0.12);
			const darkProgress = remap(progress, 0.84, 1);
			const wipeProgress = remap(progress, 0, 0.1);
			const activeIndex = Math.min(
				steps.length - 1,
				Math.floor(remap(progress, 0.12, 0.85) * steps.length),
			);

			scene?.classList.toggle("is-dark", progress >= 0.925);
			scene?.classList.toggle("is-intro-hidden", introOpacity <= 0);
			stage.style.setProperty("--process-progress", progress.toFixed(3));
			stage.style.setProperty("--process-intro-opacity", introOpacity.toFixed(3));
			stage.style.setProperty("--process-dark-progress", darkProgress.toFixed(3));
			stage.style.setProperty("--process-wipe-progress", wipeProgress.toFixed(3));
			stage.style.setProperty(
				"--process-wipe-opacity",
				progress < 0.1 ? "1" : "0",
			);
			if (progressLabel)
				progressLabel.textContent = `${Math.round(progress * 100)}%`;

			steps.forEach((step, index) => {
				const windowState = windows[index];
				const enter = remap(progress, windowState.start, windowState.peak);
				const leave = remap(progress, windowState.peak, windowState.end);
				const isLastStep = index === steps.length - 1;
				const opacity = isLastStep
					? clamp(enter)
					: clamp(Math.min(enter, 1 - leave));
				const x = isLastStep
					? progress <= windowState.peak
						? 140 * (1 - enter)
						: 0
					: progress <= windowState.peak
						? 140 * (1 - enter)
						: -140 * leave;

				step.style.opacity = String(opacity);
				step.style.transform = `translate3d(calc(-50% + ${x}vw), -50%, 0)`;
				step.style.setProperty("--step-x", `${x}vw`);
			});

			railItems.forEach((item, index) => {
				item.classList.toggle("is-current", index === activeIndex);
				item.classList.toggle("is-past", index < activeIndex);
				item.classList.toggle("is-future", index > activeIndex);
			});
		};

		if (reduce) {
			scene?.classList.add("is-reduced", "is-dark");
			return;
		}

		updateScene();
		let frame = 0;
		const onScroll = () => {
			window.cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(updateScene);
		};
		const onResize = () => updateScene();

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onResize);

		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onResize);
		};
	}, [stageRef]);
}
