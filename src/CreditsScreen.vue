<template>
    <div class="h-100">
        <div class="h-100 p-3 d-flex flex-column justify-content-around text-center credits-animation">
            <div>
                <h2 class="text-secondary light">A game by</h2>
                <h1 class="light">
                    <i class="fa fa-fw fa-file-o"></i>
                    Carte Blanche
                </h1>
            </div>

            <a href="mailto:gokie.wiegers@student.uva.nl" class="lead">
                <img src="assets/images/avatar_gokie.jpg">
                Gokie Wiegers
            </a>

            <a href="mailto:jop.brandenburg@student.uva.nl" class="lead">
                <img src="assets/images/avatar_jop.jpg">
                Jop Brandenburg
            </a>

            <a href="http://www.clearfieldssix.nl/profile/jerom-fernig/" class="lead">
                <img src="assets/images/avatar_jerom.jpg">
                Jerom Fernig
            </a>

            <a href="mailto:maaike.koolbergen@student.uva.nl" class="lead">
                <img src="assets/images/avatar_maaike.jpg">
                Maaike Koolbergen
            </a>

            <a href="https://marc.vornetran.de" class="lead">
                <img src="assets/images/avatar_marc.jpg">
                Marc Vornetran
            </a>

            <p class="lead hide-xxs">
                Intelligent Interactive Systems <br>
                Human Centred Multimedia <br>
                <a href="http://gss.uva.nl/content/masters/information-studies-information-systems/study-programme/study-programme.html">M.Sc. Information Studies</a>
            </p>

            <p class="lead">
                <a href="http://www.uva.nl/home">University of Amsterdam</a> <br>
                Amsterdam, The Netherlands
            </p>

            <div>
                <router-link :to="{ name: 'MainMenuScreen' }" class="btn btn-dark">
                    <i class="fa fa-fw fa-chevron-left" aria-hidden="true"></i>
                    Back
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CreditsScreen',
        methods: {
            back() {
                this.$router.push({ name: 'MainMenuScreen' });
            }
        }
    };
</script>

<style scoped>
    .light {
        font-weight: 300;
    }

    img {
        width: 28px;
        height: 40px;
        margin-right: 10px
    }

    .credits-animation {
        transform: translateY(100%);
        animation-name: credits;
        animation-duration: 4s;
        animation-delay: .5s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
    }

    @keyframes credits {
        0% {
            transform: translateY(100%);
        }

        100% {
            transform: translateY(0);
        }
    }

    @media (max-height: 500px) {
        .hide-xxs {
            display: none;
        }
    }
</style>