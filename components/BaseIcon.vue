<template>
    <svg xmlns="http://www.w3.org/2000/svg"
    :height="height"
    :width="width"
    :viewBox="viewbox"
    :id="id"
    :aria-labelledby="title"
    :aria-describedby="desc"
    :role="role"
    v-if="component">
        <title :xml:lang="lang" v-if="title">{{ title }}</title>
        <desc v-if="desc">{{desc}}</desc>

        <g :fill="color" :style="iconStyle" v-else>
            <component :is="component" @onMounted="getViewbox"></component>
        </g>

    </svg>
</template>

<script>

export default {
    name: 'v-icon',
    data() {
        return {
            component: () =>
                /* specify path to generated templates here */
                import('./templates/' + this.it + ".vue")
                .then((template) => {
                    return template;
                }),
            viewbox: '0 0 20 20'
        }
    },
    props: {
        it: {
            type: String,
            default: "default"
        },
        id: {
            type: String,
        },
        desc: {
            type: String,
        },
        role: {
            type: String,
            default: "img"
        },
        tabindex: {
            type: [Number, String],
            default: 0
        },
        title: {
            type: String,
            default: ""
        },
        iconStyle: {
            type: String,
            default: ""
        },
        lang: {
            type: [String],
            default: "en"
        },
        width: {
            type: [Number, String],
            default: 24
        },
        height: {
            type: [Number, String],
            default: 24
        },
        color: {
            type: [String],
            default: "#333"
        }
    },
    methods: {
        getViewbox(viewbox) {
            this.viewbox = viewbox;
        }
    },
};
</script>