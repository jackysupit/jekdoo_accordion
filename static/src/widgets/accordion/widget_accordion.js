/** @odoo-module **/

import { X2ManyField } from '@web/views/fields/x2many/x2many_field';
import { registry } from '@web/core/registry';
import { ListRenderer } from '@web/views/list/list_renderer';

import { useRef } from '@odoo/owl';

const fieldRegistry = registry.category('fields');

let doNothing = (nomor) => {
	console.log('do nothing: ', nomor);
	// debugger;
};

export class AccordionRenderer extends ListRenderer {
	setup() {
		super.setup();
		this.accordion = useRef('accordion');
	}
	setDefaultColumnWidths() {
		doNothing(5);
	}
	freezeColumnWidths() {
		doNothing(6);
	}

	async updateIsOpen(record, val) {
        return;
        
		const editedRecord = this.props.list.editedRecord;
		if (editedRecord && editedRecord !== record) {
			const unselected = await this.props.list.unselectRecord(true);
			if (!unselected) {
				return;
			}
		}
		let updatedRecord = Object.assign({}, record); // Create a copy of the record
		updatedRecord.is_open = val; // Update the is_open property based on val
		$(this.props.list).trigger('update', updatedRecord);

        let updatedRecord2 = Object.assign({}, record, { is_open: true });
		$(this.props.list).trigger('update', updatedRecord2);

        record.data.is_open = val;
        this.saveMe(record);
	}

	async saveMe(record) {
		await record.model.root.save({ stayInEdition: true });
	}

	confirmDelete(record) {
		if (confirm('Are you sure?')) {
			this.onDeleteRecord(record);
		}
	}

	onHeaderClick(e, record) {
		let header = false;
		if (e.target.matches('.card-header')) header = e.target;
		if (e.target.parentNode.matches('.card-header'))
			header = e.target.parentNode;
		if (e.target.parentNode.parentNode.matches('.card-header'))
			header = e.target.parentNode.parentNode;

		if (!header) return;

		let elAccordion = this.accordion.el;
		let cardParent = header.parentNode;
		let collapseToShow = cardParent.querySelector('.collapse');
		let iconArrow = header.querySelector('.icon-arrow');

		let lama = 150;

		if (collapseToShow.classList.contains('show')) {
			$(collapseToShow).hide(lama);
			setTimeout(() => {
				collapseToShow.classList.remove('show');
				header.classList.remove('card-header-show');
			}, lama);

			iconArrow.classList.remove('fa-angle-down');
			iconArrow.classList.add('fa-angle-up');

			this.updateIsOpen(record, false);
		} else {
			var allCardHeaders =
				elAccordion.querySelectorAll('.card-header-show');
			if (allCardHeaders.length > 0) {
				allCardHeaders.forEach(function (h) {
					// setTimeout(() => {
					// 	h.classList.remove('card-header-show');
					// }, lama);

					// let iArrow = h.querySelector('.icon-arrow');
					// iArrow.classList.remove('fa-angle-down');
					// iArrow.classList.add('fa-angle-up');

					$(h).trigger('click');
				});

				this.updateIsOpen(record, true);
				var allCollapses =
					elAccordion.querySelectorAll('.collapse.show');
				allCollapses.forEach(function (collapse) {
					$(collapse).hide(lama);
					setTimeout(() => {
						collapse.classList.remove('show');
					}, lama);
				});
			}

			$(collapseToShow).show(lama);
			collapseToShow.classList.add('show');
			setTimeout(() => {
				header.classList.add('card-header-show');
			}, lama);

			iconArrow.classList.remove('fa-angle-up');
			iconArrow.classList.add('fa-angle-down');
		}
	}
}
AccordionRenderer.recordRowTemplate = 'jekdoo_accordion.ListRenderer.RecordRow';
AccordionRenderer.rowsTemplate = 'jekdoo_accordion.ListRenderer.Rows';
AccordionRenderer.template = 'jekdoo_accordion.ListRenderer';

export class AccordionWidget extends X2ManyField {
	setup() {
		super.setup();
		// this.columnWidths = [1, 2]; // Optionally set column widths
	}
}

AccordionWidget.components = {
	...X2ManyField.components,
	ListRenderer: AccordionRenderer,
};

fieldRegistry.add('accordion', AccordionWidget);