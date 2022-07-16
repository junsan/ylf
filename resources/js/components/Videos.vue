<template>
    <div class="row">
        <video-component :videoUrl="videoUrl" ref="childComponentRef"></video-component>
        <div v-for="video in videos" :key="video.videoId" class="col-xl-2 col-md-4 col-sm-6">
            <div class="card mb-4" style="border: none">
                <div class="card-body">
                    <a style="color: black; text-decoration: none;" @click="showVideo(video.video)" href="#"><img :src="video.video.thumbnails[0].url" height="115"></a>
                    <a style="color: black; text-decoration: none;" @click="showVideo(video.video)" href="#"><h6 class="mt-2">{{video.video.title}}</h6></a>
                    <div>{{video.video.channelName}}</div>
                    <div>{{video.video.viewCountText}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Video from './Video.vue'
import { ref, onMounted } from 'vue'
const childComponentRef = ref()

    export default {
        data() {
            return {    
                videoUrl: null
            }
        },
        props: ['videos'],
        components: {Video},
        methods: { 
            showVideo(video) {
                this.$parent.show(video);
                this.videoUrl = 'https://www.youtube.com/embed/'+video.videoId
                this.$refs.childComponentRef.showModal( );
            }
        }
    }
</script>