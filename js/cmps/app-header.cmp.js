export default {
    template: `
        <header class="app-header">
            <div class="logo" @click="redirectToHome">
                <img src="./imgs/Appsus1.png">
            </div>
            <button class="main-nav-btn" @click="isMenuOpen = !isMenuOpen"></button>
            <nav v-if="isMenuOpen"  @click="isMenuOpen = !isMenuOpen">
                <router-link to="/"><img class="menu-img" src="./imgs/home.png">Home</router-link>
                <router-link to="/apps/keep"><img class="menu-img" src="./imgs/keep.png">Keep</router-link>
                <router-link to="/apps/mail"><img class="menu-img" src="./imgs/mail.png">Mail</router-link>
                <router-link to="/apps/books"><img class="menu-img" src="./imgs/books.png">Books</router-link>
                <router-link to="/about"><img class="menu-img" src="./imgs/about.png">About</router-link>
            </nav>
        </header>
    `,
    data() {
        return {
            isMenuOpen: false
        }
    },
    methods: {
        redirectToHome() {
            this.$router.push({ path: '/' })
        }
    }
}