import { Locator, Page } from '@playwright/test'
import {Header} from "../components/header";


export class HomePage {
    private readonly page: Page
    private readonly headerContainer: Locator
    readonly addTaskButton: Locator
    header: Header

    constructor(page: Page) {
        this.page = page
        // Locators
        this.headerContainer = this.page.getByRole('navigation')
        this.addTaskButton = this.page.getByRole('button', { name: '+ Add Task' })

        // Components
        this.header = new Header(this.headerContainer)

    }

    async goto() {
        await this.page.goto('/web/index.html')
    }
}
