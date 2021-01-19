import {customElement, html, LitElement, property, query, unsafeCSS} from "lit-element";
import {GridDataProviderCallback, GridDataProviderParams, GridElement} from "@vaadin/vaadin-grid";
import * as CashRegisterEndpoint from "../../generated/CashRegisterEndpoint";
import CashRegister from "../../generated/kskowronski/data/entity/egeria/CashRegister";
import { Binder } from '@vaadin/form';
import CashRegisterModel from "../../generated/kskowronski/data/entity/egeria/CashRegisterModel";
import { CSSModule } from '@vaadin/flow-frontend/css-utils';

import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-icons';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-upload';

import styles from './cash-register-view.css';


@customElement('cash-register-view')
export class CashRegisterView extends LitElement {
    static get styles() {
        return [CSSModule('lumo-typography'), unsafeCSS(styles)];
    }


    @query('#grid2')
    private grid2!: GridElement;

    @property({ type: Number })
    private gridSize = 0;

    private gridDataProvider = this.getGridDataCash.bind(this);

    private binder = new Binder<CashRegister, CashRegisterModel>(this, CashRegisterModel);

    render() {
        return html`<div>${this.gridSize}</div>
          <vaadin-split-layout class="full-size">
              <div class="grid-wrapper">
                  <vaadin-grid id="grid2" class="full-size" theme="no-border"
                          .size="${this.gridSize}"
                          .dataProvider="${this.gridDataProvider}"
                          @active-item-changed=${this.itemSelected}
                  >
                      <vaadin-grid-sort-column auto-width path="casName" header="KASA"></vaadin-grid-sort-column>
                  </vaadin-grid>
              </div>
              <div id="cash-report-layout">
                  Raporyt Kasowe
              </div>
          </vaadin-split-layout>
    `;
    }

    private async getGridDataCash(params: GridDataProviderParams, callback: GridDataProviderCallback) {
        const index = params.page * params.pageSize;
        const data = await CashRegisterEndpoint.list(index, params.pageSize, params.sortOrders as any);
        //const data2 = await CashRegisterEndpoint.getAllCashRegister();
        console.log(data);
        //console.log(data2);
        callback(data);
    }

    async connectedCallback() {
        super.connectedCallback();
        this.gridSize = await CashRegisterEndpoint.count();
    }

    private async itemSelected(event: CustomEvent) {
        const item: CashRegister = event.detail.value as CashRegister;
        //console.log(item);
        this.grid2.selectedItems = item ? [item] : [];
        if (item) {
            const fromBackend = await CashRegisterEndpoint.get(item.casId!);
            fromBackend ? this.binder.read(fromBackend) : this.refreshGrid();
        } else {
            this.clearForm();
        }
    }

    private clearForm() {
        this.binder.clear();
    }


    private refreshGrid() {
        this.grid2.selectedItems = [];
        this.grid2.clearCache();
    }

}