<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card mt-5">
                            <div class="card-header">
                                <h3 class="card-title">Users list</h3>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <table class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th>email</th>
                                        <th>name</th>
                                        <th style="width: 40px">Phone number</th>
                                        <th style="width: 40px">Confirmed</th>
                                        <th style="width: 40px">Registered at</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="user in users">
                                        <td>{{user.id}}</td>
                                        <td><router-link :to="'users/' + user.id">
                                            {{user.email}}
                                        </router-link></td>
                                        <td>{{user.full_name}}</td>
                                        <td>{{user.phone_number}}</td>
                                        <td><span :class="user.confirmed ? 'badge bg-success' : 'badge bg-danger'">{{user.confirmed}}</span></td>
                                        <td>{{moment(user.created_at)}}</td>

                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.card-body -->
                            <div class="card-footer clearfix">
                                <paginate
                                        :page-count="this.metadata.total_pages || 1"
                                        :click-handler="paginateCallback"
                                        containerClass="pagination pagination-sm m-0 float-right"
                                        page-class="page-item"
                                        page-link-class="page-link"
                                        prev-link-class="page-link"
                                        next-link-class="page-link"
                                        v-if="this.metadata.count">
                                </paginate>
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
                users: [],
                metadata: {}
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData(pageNumber){
                let requestParams = {
                    page: pageNumber,
                    per_page: 21
                }
                this.$http.get('admin/users', {params: requestParams})
                    .then(response => {
                        this.users = response.body.users
                        this.metadata = response.body.metadata
                    })
            },
            paginateCallback (pageNumber) {
                this.fetchData(pageNumber)
            }
        }
    }
</script>