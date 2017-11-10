/**
 * https://
 * Flip Card JS
 * @version 0.0.1
 * @author Fabian Wiesner
 * @copyright ⓒ2017 Fabian Wiesner
 * Released under the MIT licence
 */

import {Card} from "./card.js";
import {Helper} from "./helper.js";

/**
 *
 * @type {{container: string, front: string, back: string, addCssBasic: boolean}}
 */
const defaults = {
    container: ".flip-card",
    front: ".flip-card-front",
    back: ".flip-card-back",
    addCssBasic: true,
    addCssPositioning: false,
    addTouchSupport: true,
    addMouseSupport: true,
    domObjects: {
        cardList: []
    },
};


/**
 *
 */
export default class FlipCard {
    constructor(options = {}) {
        this.options = Object.assign({}, defaults, options);
        this.updateDomObjects();
        if (this.options.addCssBasic) _addCssBasic(this.options);
        if (this.options.addCssPositioning) _addCssPositioning(this.options);
        if (this.options.addTouchSupport) this.touchSupport.add();
        if (this.options.addMouseSupport) this.mouseSupport.add();
        // setTimeout(() => this.touchSupport.remove(), 2000);
    }

    /**
     *
     */
    updateDomObjects() {
        // Check if there are already objects in list
        if (this.options.domObjects.cardList.length === 0) {
            // Iterate over all containers and add them
            let containerList = document.querySelectorAll(this.options.container);
            for (const container of containerList) {
                const front = container.querySelector(this.options.front);
                const back = container.querySelector(this.options.back);

                this.options.domObjects.cardList.push(new Card(container,front,back));
            }
        } else {
            // ToDo updateDomObjects - already have some
            console.error("ToDo! Not implemented yet, if there are already objects. updateDomObjects()");
        }
        return this;
    }


    get touchSupport() {
        const _this = this;
        return {
            add() {
                for (const card of _this.options.domObjects.cardList) {
                    card.addTouchSupport();
                }
                return _this;
            },
            remove() {
                for (const card of _this.options.domObjects.cardList) {
                    card.removeTouchSupport();
                }
                return _this;
            }
        }
    }

    get mouseSupport() {
        const _this = this;
        return {
            add() {
                for (const card of _this.options.domObjects.cardList) {
                    card.addMouseSupport();
                }
                return _this;
            },
            remove() {
                for (const card of _this.options.domObjects.cardList) {
                    card.removeMouseSupport();
                }
                return _this;
            }
        }
    }
}

/**
 * @private
 */
function _addCssBasic(options) {
    for (const card of options.domObjects.cardList) {
        card.container.style.perspective = "400px";
        card.front.style.backfaceVisibility = "hidden";
        card.back.style.backfaceVisibility = "hidden";
        Helper.updateTransformProperty(card.front, "rotateY(0)");
        Helper.updateTransformProperty(card.back, "rotateY(180deg)");
    }
}

/**
 * @private
 */
function _addCssPositioning(options) {
    for (const card of options.domObjects.cardList) {
        // Set container relative
        card.container.style.position = "relative";
        // Get dimensions from front/back
        let frontBounds = card.front.getBoundingClientRect();
        let backBounds = card.back.getBoundingClientRect();
        // Check max width/height and set container accordingly
        let width = Math.max(frontBounds.width, backBounds.width);
        let height = Math.max(frontBounds.height, backBounds.height);
        card.container.style.width = width + "px";
        card.container.style.height = height + "px";
        // Position front and back in container
        card.front.style.position = "absolute";
        card.front.style.top = "50%";
        card.front.style.left = "50%";
        card.front.style.transformOrigin = "left center";
        Helper.updateTransformProperty(card.front, "translate(-50%, -50%)");
        card.back.style.position = "absolute";
        card.back.style.top = "50%";
        card.back.style.left = "50%";
        card.back.style.transformOrigin = "left center";
        Helper.updateTransformProperty(card.back, "translate(-50%, -50%)");
    }
}
