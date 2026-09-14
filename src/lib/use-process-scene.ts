import { RefObject, useEffect } from "react";
import { clamp, getStageProgress, getStepWindows, remap } from "./scroll-utils";

export function useProcessScene(stageRef: RefObject<HTMLElement | null>) {
	useEffect(() => {
		const stage = stageRef.current;
		if (!stage) return;

		const container = stage.closest<HTMLElement>(".process-scene");
		const steps = [...stage.querySelectorAll<HTMLElement>(".process-step")];
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const updateScene = () => {
			const progress = getStageProgress(stage);
			const entryProgress = clamp(remap(progress, 0, 0.12));
			const exitProgress = clamp(remap(progress, 0.88, 1));
			const isLight = progress > 0.08;

			container?.classList.toggle("is-light", isLight);
			stage.style.setProperty("--process-progress", progress.toFixed(3));
			stage.style.setProperty("--process-entry", entryProgress.toFixed(3));
			stage.style.setProperty("--process-exit", exitProgress.toFixed(3));

			const windows = getStepWindows(steps.length);
			steps.forEach((step, index) => {
				const windowState = windows[index];
				const reveal = clamp(remap(progress, windowState.start, windowState.peak));
				const leave = clamp(remap(progress, windowState.peak, windowState.end));
				const visible = clamp(Math.min(reveal, 1 - leave));
				const direction = index % 2 === 0 ? 1 : -1;
				const offsetX = (1 - visible) * 72 * direction;

				step.style.transform = `translate3d(${offsetX}px, 0, 0)`;
				step.style.opacity = String(visible);
				step.style.setProperty("--step-opacity", visible.toFixed(3));
				step.style.setProperty("--step-shift", `${offsetX}px`);
			});
		};

		if (reduce) {
			container?.classList.add("is-reduced");
			steps.forEach((step) => {
				step.style.opacity = "1";
				step.style.transform = "none";
			});
			return;
		}

		updateScene();
		const onScroll = () => {
			window.requestAnimationFrame(updateScene);
		};
		const onResize = () => updateScene();

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onResize);
		};
	}, [stageRef]);
}
