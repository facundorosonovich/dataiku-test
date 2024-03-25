import { Locator, Page } from '@playwright/test'
import {Header} from "../components/header";
import {AddTaskModal} from "../components/add-task-modal";
import {TasksTable} from "../components/tasks-table";


export class HomePage {
    private readonly page: Page
    private readonly headerContainer: Locator
    readonly addTaskButton: Locator
    private readonly addTaskModalContainer: Locator
    private readonly tasksTableContainer: Locator

    header: Header
    taskTable: TasksTable

    constructor(page: Page) {
        this.page = page
        // Locators
        this.headerContainer = this.page.getByRole('navigation')
        this.addTaskButton = this.page.getByRole('button', { name: '+ Add Task' })
        this.addTaskModalContainer = this.page.locator('#add .modal-content')
        this.tasksTableContainer = this.page.locator('table tbody')

        // Components
        this.header = new Header(this.headerContainer)
        this.taskTable = new TasksTable(this.tasksTableContainer)

    }

    async goto() {
        await this.page.goto('/web/index.html')
    }

    async createTask(taskTitle: string, taskTags: string[]) {
        await this.addTaskButton.click()
        await this.addTaskModalContainer.waitFor()

        const createTaskModal = new AddTaskModal(this.addTaskModalContainer)
        await createTaskModal.enterTaskTitle(taskTitle)
        await createTaskModal.enterTaskTags(taskTags)
        await createTaskModal.createTask()



    }
}
