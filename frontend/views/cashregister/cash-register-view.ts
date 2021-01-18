import {css, customElement, html, LitElement} from "lit-element";
import {showNotification} from "@vaadin/flow-frontend/a-notification";


@customElement('cash-register-view')
export class HelloWorldView extends LitElement {
    name: string = '';

    static get styles() {
        return css`
      :host {
        display: block;
        padding: 1em;
      }
    `;
    }

    render() {
        return html`
      <vaadin-text-field label="Your name" @value-changed="${this.nameChanged}"></vaadin-text-field>
      <vaadin-button @click="${this.sayHello}">Say hello</vaadin-button>
    `;
    }
    nameChanged(e: CustomEvent) {
        this.name = e.detail.value;
    }

    sayHello() {
        showNotification('Hello ' + this.name);
    }

}