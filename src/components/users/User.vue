<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">

                        <!-- Profile Image -->
                        <div class="card card-primary card-outline">
                            <div class="card-body box-profile">

                                <h3 class="profile-username text-center">{{user.name}}</h3>

                                <p class="text-muted text-center">{{user.email}}</p>

                                <ul class="list-group list-group-unbordered mb-3">
                                    <li class="list-group-item">
                                        <b>Confirmed</b> <a class="float-right">{{user.confirmed}}</a>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Mobile</b> <a class="float-right">{{user.mobile}}</a>
                                    </li>
                                    <li class="list-group-item">
                                        <b>Online</b> <a class="float-right">{{user.online}}</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->

                        <!-- About Me Box -->
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">About Me</h3>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <strong><i class="fas fa-book mr-1"></i> Phone number</strong>

                                <p class="text-muted">
                                    {{user.phone_number}}
                                </p>

                                <hr>

                                <strong><i class="fas fa-map-marker-alt mr-1"></i> Birth date</strong>

                                <p class="text-muted">{{user.birth_date}}</p>

                                <hr>

                                <strong><i class="fas fa-pencil-alt mr-1"></i> Registerd at</strong>

                                <p class="text-muted">{{user.created_at}}</p>

                                <hr>

                                <strong><i class="far fa-file-alt mr-1"></i> Location</strong>

                                <p class="text-muted">{{user.latitude}}, {{user.longitude}}</p>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                    <!-- /.col -->
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header p-2">
                                <ul class="nav nav-pills">
                                    <li class="nav-item"><a class="nav-link" @click.prevent="setActive('books')" :class="{ active: isActive('books') }" href="#books" data-toggle="tab">Books</a></li>
                                    <li class="nav-item"><a class="nav-link" @click.prevent="setActive('requests')" :class="{ active: isActive('requests') }" href="#requests" data-toggle="tab">Borrow requests</a></li>
                                </ul>
                            </div><!-- /.card-header -->
                            <div class="card-body">
                                <div class="tab-content">
                                    <div class="tab-pane" :class="{ 'active show': isActive('books') }" id="books">
                                        <div class="row">
                                            <p v-if="books.length === 0">no books added</p>
                                            <div class="col-6 mb-3" v-for="book in books">
                                                <div class="user-block">
                                                    <img class="img-bordered-sm" :src="book.image" alt="user image">
                                                    <span class="username">
                                                        <router-link :to="'/books/'+ book.id">
                                                            {{book.title}}
                                                        </router-link>
                                                     </span>
                                                     <span class="description">Added {{book.created_at}}</span>
                                                </div>
                                                <p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.tab-pane -->
                                    <div class="tab-pane" :class="{ 'active show': isActive('requests') }" id="requests">
                                        <!-- The timeline -->
                                        <div class="timeline timeline-inverse">
                                            <!-- timeline item -->
                                            <div v-for="borrowRequest in borrowRequests">
                                                <div class="timeline-item">
                                                    <span class="time"><i class="far fa-clock"></i> {{borrowRequest.created_at}}</span>

                                                    <h3 class="timeline-header border-0">
                                                        <router-link :to="'/books/'+ borrowRequest.book_id">{{borrowRequest.book_title}}</router-link>
                                                        | {{borrowRequest.status}}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.tab-pane -->
                                </div>
                                <!-- /.tab-content -->
                            </div><!-- /.card-body -->
                        </div>
                        <!-- /.nav-tabs-custom -->
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div><!-- /.container-fluid -->
        </section>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                user: {},
                books: [],
                borrowRequests: [],
                activeItem: 'books'
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData(){
                this.$http.get('admin/users/' + this.$route.params.id)
                    .then(response => {
                        this.user = response.body
                        this.books = response.body.books
                        this.borrowRequests = response.body.borrow_requests
                    })
            },
            isActive (menuItem) {
                return this.activeItem === menuItem
            },
            setActive (menuItem) {
                this.activeItem = menuItem
            }
        }
    }
</script>