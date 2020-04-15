<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card mt-5">
                            <div class="card-header">
                                <h3 class="card-title">Genres</h3>
                                <div class="float-right">
                                    <router-link :to="{name: 'GenreNewForm'}" class="btn btn-primary">New Genre</router-link>
                                </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <table class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th>name</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="genre in genres">
                                        <td>{{genre.id}}</td>
                                        <td> <router-link :to="{ name: 'GenreEditForm', params: {id: genre.id}, query: {name: genre.name, type: 'edit'} }">{{genre.name}}</router-link></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <!-- /.card -->
                    </div>
                    <!-- /.col -->
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                genres: []
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData(){
                this.$http.get('admin/genres')
                    .then(response => {
                        this.genres = response.body.genres
                    })
            }
        }
    }
</script>