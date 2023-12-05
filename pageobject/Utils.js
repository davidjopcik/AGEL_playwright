const { expect } = require('@playwright/test');


export class UtilsClass {
    constructor(page) {
        this.page = page;
    }

    async setViewPortSize(viewPortSize){
        await this.page.setViewportSize({
            width: viewPortSize.width,
            height: viewPortSize.height
        })
    }


}