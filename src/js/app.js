import { qs } from "./helpers";
import { Table } from "./table";

document.addEventListener("DOMContentLoaded", () => {

  (() => {

	  const table = qs("[data-flex-table]");
	  const flexTab = new Table(table);

  })();

});
