import { qs } from "./helpers";
import Table from "./table";
import DynamicTable from "./dynamic-table";
import xhr from "./xhr";

document.addEventListener("DOMContentLoaded", () => {

	const table = qs("[data-flex-table]");
	const flexTab = new Table(table);
	const url = "http://localhost:3000/db";

	xhr("GET", url).then( (result) => {
	  const jsonTable = new DynamicTable(result);
	}).catch(function() {
	  throw Error;
	});
	
});
