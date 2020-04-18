<template>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Book title</h1>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <!-- Main content -->
        <section class="content">

            <!-- Default box -->
            <div class="card card-solid">
                <div class="card-body">
                    <div class="row">
                        <div class="col-3">
                            <div class="col-12">
                                <img :src="this.book.image" class="product-image" alt="Product Image">
                            </div>
                        </div>
                        <div class="col-9">
                            <h3 class="my-3">{{this.book.title}}</h3>
                            <small>{{this.book.page_count}} pages</small>
                            <small> | by: <b>{{this.book.author}}</b></small>
                            |
                            <div v-if="this.book.approved === false" class="badge badge-primary" role="alert">
                                Under review
                            </div>
                            <div v-else-if="this.book.status === 'available'" class="badge badge-success" role="alert">
                                {{this.book.status}}
                            </div>
                            <div v-else-if="this.book.status === 'unavailable'" class="badge badge-danger" role="alert">
                                {{this.book.status}}
                            </div>
                            <div v-else class="badge badge-info" role="alert">
                                {{this.book.status}}
                            </div>

                            <p>Language: {{this.book.language}}</p>
                            <p>Genre: {{this.book.genre}}</p>
                            <p>Published at: {{this.book.published_at}}</p>
                            <p>Added at: {{moment(this.book.created_at)}}</p>
                            <p>Owned by: <router-link :to="'/users/' + this.book.owner_id">{{this.book.owner_name}}</router-link></p>
                            <hr>

                            <div class="mt-4">
                                <router-link class="btn btn-primary btn-lg btn-flat" :to="'/books/' + this.book.id + '/edit'">
                                    <i class="fas fa-edit fa-lg mr-2"></i>
                                    Update
                                </router-link>

                                <div class="btn btn-success btn-lg btn-flat" v-if="!this.book.approved" @click="approve()">
                                    <i class="fas fa-thumbs-up fa-lg mr-2"></i>
                                    Approve
                                </div>

                                <div class="btn btn-danger btn-lg btn-flat" v-if="this.book.status == 'available'" @click="hide()">
                                    <i class="fas fa-ban fa-lg mr-2"></i>
                                    Hide
                                </div>

                                <div class="btn btn-success btn-lg btn-flat" v-else @click="show()">
                                    <i class="fas fa-eye fa-lg mr-2"></i>
                                    Show
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="row mt-4">
                        <nav class="w-100">
                            <div class="nav nav-tabs" id="product-tab" role="tablist">
                                <a class="nav-item nav-link active" id="product-desc-tab" data-toggle="tab" href="#product-desc" role="tab" aria-controls="product-desc" aria-selected="true">Description</a>
                            </div>
                        </nav>
                        <div class="tab-content p-3" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="product-desc" role="tabpanel" aria-labelledby="product-desc-tab"> {{this.book.description}}</div>
                        </div>
                    </div>
                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->

        </section>
        <!-- /.content -->
    </div>
</template>

<script>
    export default {
        data (){
            return {
                book: {}
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData(){
                this.$http.get('admin/books/' + this.$route.params.id)
                    .then(response => {
                        this.book = response.body
                    })
            },
            approve(){
                this.$http.put('admin/books/' + this.$route.params.id, { approved: true })
                    .then(response => {
                        this.book = response.body
                    })
            },
            hide(){
                this.$http.put('admin/books/' + this.$route.params.id, { status: 'unavailable' })
                    .then(response => {
                        this.book = response.body
                    })
            },
            show(){
                this.$http.put('admin/books/' + this.$route.params.id, { status: 'available' })
                    .then(response => {
                        this.book = response.body
                    })
            }
        }
    }
</script>

<style>
    .product-image {
        width: 300px
    }
</style>