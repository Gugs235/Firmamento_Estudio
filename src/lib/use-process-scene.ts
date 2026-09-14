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
			const titleOpacity = 1 - clamp(remap(progress, 0.08, 0.26));
			const titleRise = clamp(remap(progress, 0.08, 0.28));
			const sceneLight = clamp(remap(progress, 0.14, 0.42));
			const finalTone = clamp(remap(progress, 0.74, 0.94));
			const isLight = progress > 0.08;
			const viewportWidth = window.innerWidth;
			const windows = getStepWindows(steps.length, 0.2, 0.82);

			container?.classList.toggle("is-light", isLight);
			stage.style.setProperty("--process-step-count", String(steps.length));
			stage.style.setProperty("--process-progress", progress.toFixed(3));
			stage.style.setProperty("--process-entry", sceneLight.toFixed(3));
			stage.style.setProperty("--process-title-opacity", titleOpacity.toFixed(3));
			stage.style.setProperty(
				"--process-title-rise",
				`${(1 - titleRise) * 110}px`,
			);
			stage.style.setProperty("--process-exit", finalTone.toFixed(3));
			stage.style.setProperty("--process-scene-light", sceneLight.toFixed(3));
			stage.style.setProperty("--process-final-tone", finalTone.toFixed(3));

			steps.forEach((step, index) => {
				const windowState = windows[index];
				const local = clamp(
					(progress - windowState.start) / (windowState.end - windowState.start),
				);
				const reveal = clamp(remap(progress, windowState.start, windowState.peak));
				const leave = clamp(remap(progress, windowState.peak, windowState.end));
				const opacity = clamp(Math.min(reveal, 1 - leave));
				const x = viewportWidth * 1.35 * (1 - local) - viewportWidth * 1.35 * local;

				step.style.transform = `translate3d(${x}px, 0, 0)`;
				step.style.opacity = String(Math.max(opacity, 0.04));
				step.style.setProperty("--step-x", `${x}px`);
				step.style.setProperty("--step-opacity", opacity.toFixed(3));
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
