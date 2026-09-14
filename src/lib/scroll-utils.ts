export const clamp = (value: number, min = 0, max = 1) =>
	Math.min(Math.max(value, min), max);

export const remap = (value: number, start: number, end: number) =>
	clamp((value - start) / (end - start));

export const getStageProgress = (stage: HTMLElement | null) => {
	if (!stage) return 0;
	const total = stage.offsetHeight - window.innerHeight;
	const rect = stage.getBoundingClientRect();
	return total > 0 ? clamp(-rect.top / total) : 0;
};

export const getStepWindows = (count: number, start = 0.12, end = 0.88) => {
	const safeCount = Math.max(count, 1);
	const span = Math.max(end - start, 0.01);
	const stepWindow = span / safeCount;

	return Array.from({ length: safeCount }, (_, index) => {
		const itemStart = start + index * stepWindow;
		const peak = itemStart + stepWindow * 0.58;
		const itemEnd = itemStart + stepWindow * 1.32;

		return { start: itemStart, peak, end: itemEnd };
	});
};
