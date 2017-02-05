import { qs } from "./helpers";

export default class DynamicTable {

    constructor(table) {
        this.table = table;
        this.buildTable(this.table);
    }

    buildTable(data) {
        const staticTab = qs("[data-static-table]");
        this.appendTemplate(this.template(), staticTab);
        const dynamicTab = qs("[data-dynamic-table-body]");

        for (const item in data) {
            const info = data[item];
            const template = `
			<div class="row">
				<div class="small-8 column">${info.name}</div>
				<div class="small-5 medium-6 column">${info.age}</div>
				<div class="small-5 column">${info.zodiac}</div>
				<div class="small-6 medium-5 column" data-action-trigger><i class="fa fa-trash-o" aria-hidden="true"></i></div>
			</div>`;

			this.appendTemplate(template, dynamicTab);

        }
    }

    template() {
        return `<section class="flex-table flex-table__section" data-dynamic-table>
				<main>
					<div class="flex-table flex-table__wrapper">
						<div class="flex-table flex-table__head" data-flex-table>
							<div class="small-24 column">
								<div class="row">
									<div class="small-8">Name</div>
									<div class="small-5 medium-6">Age</div>
									<div class="small-5">Zodiac</div>
									<div class="small-6 medium-5">Action</div>
								</div>
							</div>
						</div>
						<div class="flex-table flex-table__body" data-dynamic-table-body>
						</div>
					</div>
					<i class="fa fa-power-off fa-4x JS-cancel-action" aria-hidden="true" data-cancel-trigger></i>
				</main>
			</section>`;
    }

    appendTemplate(template, HTML) {
        HTML.insertAdjacentHTML("beforeend", template);
    }

}
