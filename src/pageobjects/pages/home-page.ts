import { Locator, Page } from '@playwright/test'


export class HomePage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.goto('/web/index.html')
    }
}
