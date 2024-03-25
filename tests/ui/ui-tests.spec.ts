import {Page, expect, test} from '@playwright/test';
import {HomePage} from "../../src/pageobjects/pages/home-page";
import ApiUtils from "../../src/api-utils";


const username: string = 'QA';
const password: string = 'willWin';
test.describe('Task Management UI tests', () => {
    test('Login UI test', async ({page}) => {
        // Arrange
        const homePage = new HomePage(page);

        // Actions - Navigate to Home Page and sign in
        await homePage.goto();
        await homePage.header.login(username, password);

        // Assert - Get Username
        expect(await homePage.header.getUsername()).toContain(username)

        // Action - Logout
        await homePage.header.logout()
    })

    test('When logged in I can create a task', async ({page}) => {
        // Arrange
        const title: string = 'My new task';
        const tags: string[] = ['tag1', 'tag2'];
        const homePage = new HomePage(page);

        // Actions 1 - Navigate to Home Page
        await homePage.goto();

        // Assert 1 - I can't add a task when not logged in
        await expect(homePage.addTaskButton).toBeHidden();

        // Actions 2 - Login
        await homePage.header.login(username, password);

        // Assert 2 - I can add a task when logged in
        await expect(homePage.addTaskButton).toBeVisible()

        // Actions 3 - Create a Task
        await homePage.createTask(title, tags)

        // Assert 3 - Check task in list
        await expect(homePage.taskTable.getTaskByTitle(title)).toHaveCount(1)
    })

})
test.afterAll('Teardown', async ({request}) => {
    console.log('Done with tests');
    const apiUtils = new ApiUtils(request, username, password)
    await apiUtils.reset()
});