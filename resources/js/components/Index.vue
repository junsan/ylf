<template>
    <div class="containercontainer-fluid px-4">
        <br>
        <content-loader v-if="!myData"
                viewBox="0 0 1600 800"
                :speed="2"
                primaryColor="#ccc"
                secondaryColor="#ecebeb"
            >
                <rect x="2" y="37" rx="0" ry="0" width="250" height="170" />
                <rect x="2" y="220" rx="0" ry="0" width="250" height="19" /> 
                <rect x="2" y="248" rx="0" ry="0" width="156" height="18" /> 

                <rect x="302" y="37" rx="0" ry="0" width="250" height="170" />
                <rect x="302" y="220" rx="0" ry="0" width="250" height="19" /> 
                <rect x="302" y="248" rx="0" ry="0" width="156" height="18" /> 

                <rect x="602" y="37" rx="0" ry="0" width="250" height="170" />
                <rect x="602" y="220" rx="0" ry="0" width="250" height="19" /> 
                <rect x="602" y="248" rx="0" ry="0" width="156" height="18" /> 

                <rect x="902" y="37" rx="0" ry="0" width="250" height="170" />
                <rect x="902" y="220" rx="0" ry="0" width="250" height="19" /> 
                <rect x="902" y="248" rx="0" ry="0" width="156" height="18" />
                
                <rect x="1202" y="37" rx="0" ry="0" width="250" height="170" />
                <rect x="1202" y="220" rx="0" ry="0" width="250" height="19" /> 
                <rect x="1202" y="248" rx="0" ry="0" width="156" height="18" />
                
                <rect x="2" y="317" rx="0" ry="0" width="250" height="170" />
                <rect x="2" y="500" rx="0" ry="0" width="250" height="19" /> 
                <rect x="2" y="528" rx="0" ry="0" width="156" height="18" />
                
                <rect x="302" y="317" rx="0" ry="0" width="250" height="170" />
                <rect x="302" y="500" rx="0" ry="0" width="250" height="19" /> 
                <rect x="302" y="528" rx="0" ry="0" width="156" height="18" />

                <rect x="602" y="317" rx="0" ry="0" width="250" height="170" />
                <rect x="602" y="500" rx="0" ry="0" width="250" height="19" /> 
                <rect x="602" y="528" rx="0" ry="0" width="156" height="18" />

                <rect x="902" y="317" rx="0" ry="0" width="250" height="170" />
                <rect x="902" y="500" rx="0" ry="0" width="250" height="19" /> 
                <rect x="902" y="528" rx="0" ry="0" width="156" height="18" />

                <rect x="1202" y="317" rx="0" ry="0" width="250" height="170" />
                <rect x="1202" y="500" rx="0" ry="0" width="250" height="19" /> 
                <rect x="1202" y="528" rx="0" ry="0" width="156" height="18" />
                
                <rect x="2" y="597" rx="0" ry="0" width="250" height="170" />
                <rect x="2" y="780" rx="0" ry="0" width="250" height="19" /> 
                <rect x="2" y="800" rx="0" ry="0" width="156" height="18" />

                <rect x="302" y="597" rx="0" ry="0" width="250" height="170" />
                <rect x="302" y="780" rx="0" ry="0" width="250" height="19" /> 
                <rect x="302" y="800" rx="0" ry="0" width="156" height="18" />

                <rect x="602" y="597" rx="0" ry="0" width="250" height="170" />
                <rect x="602" y="780" rx="0" ry="0" width="250" height="19" /> 
                <rect x="602" y="800" rx="0" ry="0" width="156" height="18" />

                <rect x="902" y="597" rx="0" ry="0" width="250" height="170" />
                <rect x="902" y="780" rx="0" ry="0" width="250" height="19" /> 
                <rect x="902" y="800" rx="0" ry="0" width="156" height="18" />

                <rect x="1202" y="597" rx="0" ry="0" width="250" height="170" />
                <rect x="1202" y="780" rx="0" ry="0" width="250" height="19" /> 
                <rect x="1202" y="800" rx="0" ry="0" width="156" height="18" />

            </content-loader>
            <div v-else class="my-real-content">
                <videos-component :videos="videos"></videos-component>
            </div>
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

    export default {
        data() {
            return {
                videos: [],
                video: [],
                showVideo: false,
                videoId: null,
                videoUrl: null,
                myData: false
            }
        },
        components: {
            ContentLoader
        },
        props: {
            type: String,
            changeVideos: Boolean
        },
        methods: {
            getTrending() {         
                const options = {
                method: 'GET',
                url: 'https://youtube-search-and-download.p.rapidapi.com/trending',
                params: {type: this.type, hl: 'en', gl: 'US'},
                headers: {
                    'X-RapidAPI-Key': '2a8f21215amsh48d4f97a647ab3bp1fe2f7jsn44db1900cee3',
                    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
                }
                };

                axios.request(options).then((response) => {
                    this.videos = Object.freeze(response.data.contents)
                    this.myData = true;
                }).catch(function (error) {
                    console.error(error)
                });
            },
            show(video) {
                this.videoUrl = 'https://www.youtube.com/embed/'+video.videoId
                this.showVideo = true
                this.video = video
            }
        },
        created() {
            this.getTrending();
        },
        watch: {
            type() {
                this.myData = this.changeVideos;
                this.getTrending();
                this.showVideo = false
                
            }
        },
    } 
</script>
 