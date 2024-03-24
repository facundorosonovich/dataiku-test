import { Locator, Page } from '@playwright/test'

export class Header {

    // Locators
    private readonly container: Locator
    private readonly usernameInput: Locator
    private readonly passwordInput: Locator
    private readonly signInButton: Locator
    private readonly logoutButton: Locator


    constructor(container: Locator) {
        this.container = container
        this.usernameInput = this.container.getByPlaceholder('Username')
        this.passwordInput = this.container.getByPlaceholder('Password')
        this.signInButton = this.container.getByRole('button', {name: 'Sign in'})

        this.logoutButton = this.container.getByRole('button').filter({hasText: "Sign out"})
    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.signInButton.click()
    }

    async logout(){
        await this.logoutButton.click()
    }

    async getUsername() {
        return await this.logoutButton.textContent()
    }


}