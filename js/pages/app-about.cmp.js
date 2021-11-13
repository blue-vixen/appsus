export default {
    template: `
        <section class="about-container">
            <h1>We came, we saw, we dragged it up!</h1>
            <h2>This app was created using Vue and alot of drag race references.</h2>
            <img class="logo" src="./imgs/Appsus2.png">
            <button class="about-btn" @click="shouldShow=!shouldShow">About us</button>
            <div class="about-team" v-if="shouldShow">
                <div class="team-card">
                    <img class="hero-img" src="./imgs/adi.jpg">
                    <h3>Adi Levy-Alalouf</h3>
                    <div class="hero-desc">
                        <p>37 years old, mother of two, CSS enthusiast and soon to be Fullstack Developer.</p>
                    </div>
                </div>
                <div class="team-card">
                    <img class="hero-img" src="./imgs/kobi.jpg">
                    <h3>Kobi Yamin</h3>
                    <div class="hero-desc">
                        <p>King of the world, soon to be a Fullstack Developer.</p>
                    </div>
                </div>
            </div>
            </div>
        </section>
    `,
    data() {
        return {
            shouldShow: false
        }
    }
}