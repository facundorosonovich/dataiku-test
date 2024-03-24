import { Locator, Page } from '@playwright/test'
import {Header} from "../components/header";


export class HomePage {
    private readonly page: Page
    private readonly headerContainer: Locator
    header: Header

    constructor(page: Page) {
        this.page = page
        // Locators
        this.headerContainer = this.page.getByRole('navigation')

        // Components
        this.header = new Header(this.headerContainer)

    }

    async goto() {
        await this.page.goto('/web/index.html')
    }
}
