import './bootstrap';

import { createApp } from 'vue/dist/vue.esm-bundler.js';

import 'vue-universal-modal/dist/index.css'
import VueUniversalModal from 'vue-universal-modal'

import Index from './components/Index.vue';
import Videos from './components/Videos.vue';
import Home from './components/Home.vue';
import Video from './components/Video.vue';

let app = createApp({})

app.component('home-component', Home);
app.component('videos-component', Videos);
app.component('index-component', Index);
app.component('video-component', Video);

app.use(VueUniversalModal, {
    teleportTarget: '#modals',
})

app.mount("#app")  