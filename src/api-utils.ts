import {APIRequestContext, expect} from '@playwright/test'
import StatusCode from "status-code-enum";
import {getBasicAuthHeader} from "./utils";


export default class ApiUtils {
    authToken: string | undefined
    private readonly request: APIRequestContext
    private readonly username: string
    private readonly password: string

    constructor(request: APIRequestContext, username: string, password: string) {
        this.request = request
        this.username = username
        this.password = password
    }

    async authenticate() {
        const authenticateResponse = await this.request.post('/authenticate', {
            data: {
                'username': this.username,
                'password': this.password
            }
        });
        expect(authenticateResponse.status()).toBe(StatusCode.SuccessOK)

        this.authToken = await authenticateResponse.body().then((b) => {
            const data = JSON.parse(b.toString())
            return data.token
        })
    }

    async createTask(title: string, tags: string[]) {
        const newTaskResponse = await this.request.put('', {
            data: {
                title: title,
                tags: tags,
            },
            headers: {
                ...getBasicAuthHeader(this.username, this.password)
            },
        });
        expect(newTaskResponse.ok()).toBeTruthy();

        return await newTaskResponse.body().then((b) => {
            const data = JSON.parse(b.toString())
            return data['id']
        })
    }

    async getTaskById(id: string) {
        const getTask = await this.request.get(`/${id}`, {
            headers: {
                ...getBasicAuthHeader(this.username, this.password)
            },
        });
        expect(getTask.ok()).toBeTruthy();
        return await getTask.json()
    }

    async reset() {
        const reset = await this.request.get(`/reset`,);
        expect(reset.ok()).toBeTruthy();

    }

    async deleteTask(id: string) {
        const deleteTask = await this.request.delete(`/${id}`,
            { headers: {
                    ...getBasicAuthHeader(this.username, this.password)
                }

        });
        expect(deleteTask.ok()).toBeTruthy();
    }

    async updateTask(id: string, title?: string, tags?: string[], done?: boolean) {
        const payload: any = {}

        if (title) {
            payload['title'] = title
        }
        if (tags) {
            payload['tags'] = tags
        }
        if (done) {
            payload['done'] = done
        } else {
            payload['done'] = false
        }

        const updateTask = await this.request.patch(`/${id}`,
            {
                data: payload,
                headers: {
                    ...getBasicAuthHeader(this.username, this.password)
                }
            });

        expect(updateTask.ok()).toBeTruthy();

        return await updateTask.json();
    }

    async createUser() {
        const createUserResponse = await this.request.post('/users',
            {data: {username: this.username, password: this.password}})

        expect(createUserResponse.ok()).toBeTruthy()

        return await createUserResponse.json()
    }
}
