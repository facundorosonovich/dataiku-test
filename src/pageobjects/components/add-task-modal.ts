import { Locator } from '@playwright/test'

export class AddTaskModal {

    // Locators
    private readonly container: Locator
    private readonly taskTitleField: Locator
    private readonly tagsField: Locator
    private readonly createButton: Locator


    constructor(container: Locator) {
        this.container = container
        this.taskTitleField = this.container.getByRole('textbox', { name: 'Task title' })
        this.tagsField = this.container.getByPlaceholder('Tags')
        this.createButton = this.container.getByRole('button', { name: 'Add task', exact: true })
    }

    async enterTaskTitle(title: string) {
        await this.taskTitleField.fill(title)
    }

    async enterTaskTags(tags: string[]) {
        await this.tagsField.fill(tags.join(' '))
    }

    async createTask() {
        await this.createButton.click()
    }


}