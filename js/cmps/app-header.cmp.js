export default {
    template: `
        <header class="app-header">
            <div class="logo">
                <img src="./imgs/Appsus1.png">
            </div>
            <nav>
                <router-link to="/">Home</router-link> |
                <router-link to="/apps/keep">Keep</router-link> |
                <router-link to="/apps/mail">Mail</router-link>
            </nav>
        </header>
    `,
}