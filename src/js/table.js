import { qs, qsa, on } from "./helpers";

export class Table {

    constructor(element) {
        this.element = element;
        this.events(element);
        this.cssConfirm = "JS-confirm-action";
		this.cssHighlight = "JS-highlight-row";
    }

    events(table) {
        const tableTrigger = qsa("[data-action-trigger]", table);
        const cancelTrigger = qs("[data-cancel-trigger]");

        on(tableTrigger, "click", this.confirmAction.bind(this));
        on(cancelTrigger, "click", this.cancelDeletion.bind(this));
    }

    confirmAction(event) {
        const element = event.target;
        const row = element.parentNode;
		const siblings = Array.from(row.children);

        if (element.classList.contains(this.cssConfirm)) {
            this.deleteRow(row);
            return;
        }

		element.classList.add(this.cssConfirm);
		this.highlightRow(siblings);

    }

	highlightRow(elements) {
		elements.forEach(i => {
			i.classList.toggle(this.cssHighlight);
		});
	}

    cancelDeletion() {
        const el = qsa(".JS-confirm-action");
		const row = qsa(".JS-highlight-row");

        el.forEach(i => {
            i.classList.remove(this.cssConfirm);
        });

		row.forEach(i => {
			i.classList.remove(this.cssHighlight);
		});
    }

    deleteRow(row) {
		row.classList.add("JS-remove-row");

		setTimeout(() => {
			row.parentNode.removeChild(row);
		}, 350);
    }

}
