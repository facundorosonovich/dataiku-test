import {APIResponse, expect, test} from '@playwright/test';
import ApiUtils from "../../src/api-utils";

const username = 'QA'
const password = 'willWin'

const username1: string = 'QA1';
const password1: string = 'willWin1';


test.beforeAll('Setup', async ({request}) => {
  const apiUtils: ApiUtils = new ApiUtils(request, username1, password1);

  // Action - Create user1
  await apiUtils.createUser();
})
test.describe('Task Management APIs', () => {
  test('Create, edit and delete a task', async ({request}) => {
    // Arrange
    const title: string = 'My title';
    const tags: string[] = ['tag1', 'tag2'];
    const apiUtils: ApiUtils = new ApiUtils(request, username, password);
    const newTitle: string =  'My new title';
    const newTags: string[] = ['tag3', 'tag4'];

    // Action - Create a new Task
    const taskId = await apiUtils.createTask(title, tags)

    // Action - Get Task by ID
    const task = await apiUtils.getTaskById(taskId)

    // Assertions 1 - TODO: Improve object comparison
    expect(task).toEqual(expect.objectContaining({ title: title }));

    // Action - Update Task
    const updatedTask = await apiUtils.updateTask(taskId, newTitle, newTags);

    // Assertion 2 - TODO: Improve object comparison
    expect(updatedTask).toEqual(expect.objectContaining({title: newTitle}));

    // Action - Delete Task
    await apiUtils.deleteTask(taskId);
  })

  test('Create a new user', async ({request}) => {
    // Arrange
    const username: string = 'NewUser';
    const password: string = 'willLose';
    const apiUtils: ApiUtils = new ApiUtils(request, username, password);

    // Action - Create User
    const newUser = await apiUtils.createUser();

    // Assert - Validate response
    expect(newUser).toEqual(expect.objectContaining({username: username}));

    // Action - Authenticate
    await apiUtils.authenticate();
    console.log(apiUtils.authToken)

    const title: string = 'My title';
    const tags: string[] = ['tag1', 'tag2'];

    await apiUtils.createTask(title, tags)
  })

  // This test should fail
  test('Delete task not owned by the user', async ({request}) => {
    // Arrange
    const title: string = 'Title';
    const tags: string[] = ['tag1', 'tag2'];
    const apiUtilsUser0: ApiUtils = new ApiUtils(request, username, password);
    const apiUtilsUser1: ApiUtils = new ApiUtils(request, username1, password1);

    // Action - Create Task with user0
    const task = await apiUtilsUser0.createTask(title, tags)

    // Action - Try to Delete Task with user1
    await apiUtilsUser1.deleteTask(task)

  })
})
test.afterAll('Teardown', async ({request}) => {
  console.log('Done with tests');
  const apiUtils = new ApiUtils(request, username, password)
  await apiUtils.reset()
});
