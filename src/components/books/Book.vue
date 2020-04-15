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
                            <p>Owned by: <router-link :to="'/users/' + this.book.owner_id">{{this.book.owner_name}}</router-link></p>
                            <hr>

                            <div class="mt-4">
                                <div class="btn btn-primary btn-lg btn-flat">
                                    <i class="fas fa-edit fa-lg mr-2"></i>
                                    Update
                                </div>

                                <div class="btn btn-success btn-lg btn-flat" v-if="!this.book.approved">
                                    <i class="fas fa-thumbs-up fa-lg mr-2"></i>
                                    Approve
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
            }
        }
    }
</script>

<style>
    .product-image {
        width: 300px
    }
</style>