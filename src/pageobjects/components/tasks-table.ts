import { Locator } from '@playwright/test'

export class TasksTable {

    // Locators
    private readonly container: Locator

    readonly taskItem: Locator


    constructor(container: Locator) {
        this.container = container
        this.taskItem = this.container.locator('tr')

    }

    public getTaskByTitle(title: string) {
        return this.taskItem.filter({ hasText : title })
    }

}