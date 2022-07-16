<template>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">Videos</div>
                        <a class="nav-link" href="#" @click="changeType('n')">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            All
                        </a>
                        <a class="nav-link" href="#" @click="changeType('mu')">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Music
                        </a>
                        <a class="nav-link" href="#" @click="changeType('mo')">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Movie
                        </a>
                        <a class="nav-link" href="#" @click="changeType('g')">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Gaming
                        </a>
                        <div class="sb-sidenav-menu-heading">Channel</div>
                        
                    </div>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="small">Logged in as:</div>
                    Start Bootstrap
                </div>
            </nav>
        </div>
        <div id="layoutSidenav_content">
            <main>
                
                <index-component :type="type" :changeVideos="changeVideos"></index-component>
                
            </main>
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; Your Website 2022</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            type: 'n',
            changeVideos: false
        }
    },
    methods: {
        changeType(type) {
            this.changeVideos = false;
            this.type = type;
        }
    }
}

</script>
