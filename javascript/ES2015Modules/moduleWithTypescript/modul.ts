import { DomModule } from './domModule.js';

// a simple function
export function showText(text, id) {
    const div = document.getElementById(id);
    div.innerText = text;
}
showText("I am from module.js", 'module');

// better with class
export class main {
    showText(text: string, id: string) {
        const div = document.getElementById(id);
        div.innerText = text;
    }

    addText(text: string) {
        const dom = new DomModule();
        dom.addToDom(text);
    }
}
