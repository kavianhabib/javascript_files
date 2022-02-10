
(function (win, doc) {
    'use strict'
    const slideBlock = function (options) {

        const settings = {
            elementID: '',
            overlay: false,
            startMove: false,
            delayStart: 500,
            elementsActivateID: [],
            elementsDisableID: [],
            slideBlockOverlayHTML: `<div class="slide-block slide-block--overlay" id="slideBlockOverlay""></div>`
        },
            listener = function (obj, arr, disable = false) {
                if (Array.isArray(arr)) {
                    arr.forEach(item => {
                        const elementEvent = document.getElementById(item)
                        if (elementEvent) {
                            elementEvent.addEventListener('click', () => {
                                if (disable) {
                                    obj.disableBlock()
                                } else {
                                    obj.activateBlock()
                                }
                            })
                        }
                    })
                }
            }

        Object.assign(settings, options)
        listener(this, settings.elementsActivateID)
        listener(this, settings.elementsDisableID, true)

        const element = document.getElementById(settings.elementID)
        this.element = element
        this.settings = settings

        if (settings.startMove) {
            setTimeout(() => { this.activateBlock() }, settings.delayStart)
        }
    }

    slideBlock.prototype.activateBlock = function () {
        const element = this.element
        const settings = this.settings
        if (element) {
            element.classList.add('slide-block--active')
            if (settings.overlay) {
                element.insertAdjacentHTML("afterEnd", settings.slideBlockOverlayHTML)
                doc.body.classList.add('slide-block--overflow')
                const slideBlockOverlay = document.getElementById('slideBlockOverlay')
                slideBlockOverlay.addEventListener('click', () => {
                    this.disableBlock()
                })
            }
        }
    }

    slideBlock.prototype.disableBlock = function () {
        const element = this.element
        const settings = this.settings
        if (element) {
            element.classList.remove('slide-block--active')
            if (settings.overlay) {
                const slideBlockOverlay = document.getElementById('slideBlockOverlay')
                slideBlockOverlay.parentNode.removeChild(slideBlockOverlay)
                doc.body.classList.remove('slide-block--overflow')
            }
        }
    }

    win.slideBlock = slideBlock
})(window, document)

function addHtmlElements(){
    var div = document.createElement('div');
    div.setAttribute('class','slide-block slide-block--left');
    div.setAttribute('id', 'slideBlockLeft');
    div.innerHTML =    ` <div style = "display: flex; flex-direction: row;justify-content: left;">
        <button id = "close-btn" style="z-index: 2000000000; position: fixed; left: 350px; border: 0cm;">X</button>
        <iframe width="400" height="450"
        src="https://numberanalytics.com/survey/20072800001" title="Feedback" frameBorder="0" >
        </iframe>
        <button role="button" style=" visibility: visible; cursor: pointer; border: none; background-color: transparent; padding: 0px; margin: 0px; bottom: 649px; width: 45px; transition: all 0.5s ease 0s;" 
        id="QSIFeedbackButton-btn" aria-expanded="false" aria-controls="QSIFeedbackButton-target-container">
        <div style="background: rgb(39, 39, 39); color: rgb(255, 255, 255); padding: 10px; position: relative; font-size: 15px; display: flex; flex-direction: row; 
        z-index: -1; writing-mode: vertical-rl; transform: rotateZ(180deg); border-top-right-radius: 0px; border-bottom-right-radius: 0px;"><div><div></div></div><div>Feedback</div></div></button>
    </div>`
    document.body.appendChild(div);
}
function addCSS(){
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'slideBlock.css';
    document.getElementsByTagName('head')[0].appendChild(link);
}
addCSS();
addHtmlElements();
const slideBlockLeft = new slideBlock({
    elementID: 'slideBlockLeft',
    overlay: true,
    elementsActivateID: ['QSIFeedbackButton-btn'],
    elementsDisableID: ['close-btn']
})
