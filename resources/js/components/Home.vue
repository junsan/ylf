<template>
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand-->
        <a class="navbar-brand ps-3" href="#" @click="changeType('n')">Youtube Lite Fun</a>
        <!-- Sidebar Toggle-->
        <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
        <!-- Navbar Search-->
        <div class="d-none d-md-inline-block me-0 me-md-3 my-2 my-md-0">
            <div class="input-group">
                <input v-model.lazy="query" @change="searchVideos" class="form-control search-box" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                <button class="btn btn-default" @click="searchVideos" style="background-color: #ccc;" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
            </div>
        </div>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">Videos</div>
                        <a class="nav-link" :class="allActive" href="#" @click="changeType('n')">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            All
                        </a>
                        <a class="nav-link" href="#" :class="allMusic" @click="changeType('mu')">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Music
                        </a>
                        <a class="nav-link" href="#" :class="allMovie" @click="changeType('mo')">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Movie
                        </a>
                        <a class="nav-link" href="#" :class="allGame" @click="changeType('g')">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Gaming
                        </a>
                        <div class="sb-sidenav-menu-heading">Channel</div>
                        
                    </div>
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">
            <main>
                <div v-if="startVideos">
                    <index-component :type="type" :changeVideos="changeVideos"></index-component>
                </div>
                <div v-else-if="loader">
                    <content-loader
                        viewBox="0 0 1600 800"
                        :speed="2"
                        primaryColor="#ccc"
                        secondaryColor="#ecebeb"
                    >
                        <rect x="350" y="37" rx="0" ry="0" width="333" height="210" /> 
                        <rect x="700" y="44" rx="0" ry="0" width="271" height="19" />
                        <rect x="700" y="82" rx="0" ry="0" width="156" height="18" /> 
                        <rect x="700" y="120" rx="0" ry="0" width="271" height="19" /> 
                        <rect x="700" y="160" rx="0" ry="0" width="156" height="18" />

                        <rect x="350" y="287" rx="0" ry="0" width="333" height="210" /> 
                        <rect x="700" y="332" rx="0" ry="0" width="156" height="18" /> 
                        <rect x="700" y="294" rx="0" ry="0" width="271" height="19" /> 
                        <rect x="700" y="370" rx="0" ry="0" width="271" height="19" /> 
                        <rect x="700" y="410" rx="0" ry="0" width="156" height="18" />

                        <rect x="350" y="537" rx="0" ry="0" width="333" height="210" />
                        <rect x="700" y="544" rx="0" ry="0" width="271" height="19" /> 
                        <rect x="700" y="582" rx="0" ry="0" width="156" height="18" /> 
                        <rect x="700" y="620" rx="0" ry="0" width="271" height="19" /> 
                        <rect x="700" y="660" rx="0" ry="0" width="156" height="18" />

                    </content-loader>
                </div>
                <div v-else-if="showSearch">
                    <video-component :videoUrl="videoUrl" ref="childComponentRef"></video-component>
                    <div class="container mt-5">
                        <div v-for="video in videos" :key="video.video.videoId" class="row mb-5">
                            <div class="col-lg-4">
                                <a style="color: black; text-decoration: none;" @click="showVideo(video.video)" href="#"><img :src="video.video.thumbnails[0].url" height="200"></a>
                            </div>
                            <div class="col-lg-8">
                                <a style="color: black; text-decoration: none;" @click="showVideo(video.video)" href="#"><h5>{{video.video.title}}</h5></a>
                                <div class="mb-2">{{video.video.viewCountText}} | {{video.video.publishedTimeText}}</div>
                                <p>{{video.video.description}}</p>
                                <div>{{video.video.lengthText}} | {{video.video.channelName}}</div>
                            </div>
                        </div>
                        <button class="btn btn-dark btn-lg mb-5" type="button" @click="getNextVideos()">Next</button>
                        <br><br>
                    </div>
                </div>
                
            </main>
        </div>
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
    data() {
        return {
            type: 'n',
            changeVideos: false,
            allActive: 'active',
            allMusic: null,
            allMovie: null,
            allGame: null,
            query: null,
            showSearch: false,
            videos: [],
            videoUrl: null,
            loader: false,
            startVideos: true,
            next: null,
            v: []
        }
    },
    components: {
        ContentLoader
    },
    methods: {
        searchVideos() {
            this.startVideos = false
            this.loader = true
            if(!this.query) this.query = "Search";
            let options = {
                method: 'GET',
                url: 'https://youtube-search-and-download.p.rapidapi.com/search',
                params: { query: this.query, hl: 'en', upload_date: 'y', type: 'v', sort: 'v'},
                headers: {
                    'X-RapidAPI-Key': '56abf6c3a7msh886dd817de618e8p1ff469jsn06fe796817cc',
                    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
                }
            };

            axios.request(options).then((response) => {
                this.showSearch = true
                this.loader = false
                this.next = response.data.next
                this.videos = Object.freeze(response.data.contents)
            }).catch(function (error) {
                console.error(error);
            });
        },
        changeType(type) {
            this.changeVideos = false;
            this.type = type;
            this.startVideos = true
            this.showSearch = false;
            this.loader = false;
            if (this.type == 'n') {
                this.allActive = 'active';
                this.allMusic = '';
                this.allMovie = '';
                this.allGame = '';
            } else if (this.type == 'mu') {
                this.allMusic = 'active';
                this.allActive = '';
                this.allMovie = '';
                this.allGame = '';
            } else if (this.type == 'mo')  {
                this.allMusic = '';
                this.allActive = '';
                this.allMovie = 'active';
                this.allGame = '';
            } else if (this.type == 'g') {
                this.allMusic = '';
                this.allActive = '';
                this.allMovie = '';
                this.allGame = 'active';
            }
        },
        showVideo(video) {
            this.videoUrl = 'https://www.youtube.com/embed/'+video.videoId
            this.$refs.childComponentRef.showModal( );
        },
        getNextVideos() {        
            console.log('next')
            this.loader = true
            this.showSearch = false
            window.scrollTo(0, 0);
            let options = {
                method: 'GET',
                url: 'https://youtube-search-and-download.p.rapidapi.com/search',
                params: { next: this.next },
                    headers: {
                        'X-RapidAPI-Key': '56abf6c3a7msh886dd817de618e8p1ff469jsn06fe796817cc',
                        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
                    }
            };

            axios.request(options).then((response) => {
                this.next = response.data.next
                this.videos = Object.freeze(response.data.contents)
                this.showSearch = true
                this.loader = false 
            }).catch(function (error) {
                console.error(error);
            });    
        }
    }
}

</script>


<style scoped>
.search-box {
    position: relative;
    align-items: center;
    border: 1px solid var(--ytd-searchbox-legacy-border-color);
    border-right: none;
    border-radius: 2px 0 0 2px;
    box-shadow: inset 0 1px 2px var(--ytd-searchbox-legacy-border-shadow-color);
    color: var(--ytd-searchbox-text-color);
    margin-left: 334px;
    flex: 1;
    flex-basis: 0.000000001px;
    display: flex;
    flex-direction: row;
    width: 600px;
}
</style>