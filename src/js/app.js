import { qs, qsa, on } from "./helpers";

document.addEventListener("DOMContentLoaded", () => {

  (() => {

    class Table {

      constructor(element) {
        this.element = element;
        this.events(element);
        this.css = "JS-confirm-action";
      }

      events(table) {
        let tableTrigger = qsa("[data-action-trigger]", table);
        let cancelTrigger = qs("[data-cancel-trigger]");

        on(tableTrigger, "click", this.confirmAction.bind(this));
        on(cancelTrigger, "click", this.cancelDeletion.bind(this));
      }

      confirmAction() {
        let element = event.target;
        let row = element.parentNode;

        if(element.classList.contains(this.css)) {
          this.deleteRow(this.row);
          return;
        }

        element.classList.add(this.css);


      }

      cancelDeletion() {
        let rows = qsa(".JS-confirm-action");
        rows.forEach(i => {
          i.classList.remove(this.css);
        });
      }

      deleteRow(row) {
        row.parentNode.removeChild(row);
      }

    }

    const table = qs("[data-flex-table]");
    const flexTab = new Table(table);

  })();

});
