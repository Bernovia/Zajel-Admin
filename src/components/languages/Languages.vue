<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card mt-5">
                            <div class="card-header">
                                <h3 class="card-title">Languages</h3>
                                <div class="float-right">
                                    <router-link :to="{name: 'LanguageNewForm'}" class="btn btn-primary">New Language</router-link>
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
                                    <tr v-for="language in languages">
                                        <td>{{language.id}}</td>
                                        <td> <router-link :to="{ name: 'LanguageEditForm', params: {id: language.id}, query: {name: language.name, type: 'edit'} }">{{language.name}}</router-link></td>
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
                languages: []
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData(){
                this.$http.get('admin/languages')
                    .then(response => {
                        this.languages = response.body.languages
                    })
            }
        }
    }
</script>