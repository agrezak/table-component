import { qs, qsa, on } from "./helpers";

document.addEventListener("DOMContentLoaded", () => {

  (() => {

    class Table {

      constructor(element) {
        this.element = element;
        this.events(element);
      }

      events(table) {
        let tableTrigger = qsa("[data-action-trigger]", table);
        on(tableTrigger, "click", this.confirmAction.bind(this));
      }

      confirmAction() {
        let row = event.target.parentNode;
        this.deleteRow(row);
      }

      deleteRow(row) {
        row.parentNode.removeChild(row);
      }

    }

    const table = qs("[data-flex-table]");
    const flexTab = new Table(table);

  })();

});
