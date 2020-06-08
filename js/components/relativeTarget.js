function relativeTarget(target, relativeElement) {
	let node = target;
	let parent = node.parentNode;

	if (node !== relativeElement) {
		while (parent && parent !== relativeElement) {
			parent = parent.parentNode;
		}
		return (parent === relativeElement);
	}else {
		return true;
	}
}
module.exports = relativeTarget;