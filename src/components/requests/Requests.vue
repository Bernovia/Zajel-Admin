<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card mt-5">
                            <div class="card-header">
                                <h3 class="card-title">Requests list</h3>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <table class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th>User Email</th>
                                        <th>Remote IP</th>
                                        <th>Controller</th>
                                        <th>Path</th>
                                        <th>Method</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="request in requests">
                                        <td>{{request.id}}</td>
                                        <td>{{request.user_email}}</td>
                                        <td>{{request.remote_ip}}</td>
                                        <td>{{request.controller_class}}</td>
                                        <td>{{request.original_path}}</td>
                                        <td>{{request.method}}</td>
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
                requests: [],
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
                this.$http.get('admin/requests', {params: requestParams})
                    .then(response => {
                        this.requests = response.body.requests
                        this.metadata = response.body.metadata
                    })
            },
            paginateCallback (pageNumber) {
                this.fetchData(pageNumber)
            }
        }
    }
</script>