<template>
    <div class="content-wrapper">
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card mt-5">
                            <div class="card-header">
                                <h3 class="card-title">Books list</h3>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <table class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th>title</th>
                                        <th>owner</th>
                                        <th>approved</th>
                                        <th style="width: 40px">status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="book in books">
                                        <td>{{book.id}}</td>
                                        <td><router-link :to="'books/' + book.id">
                                            {{book.title}}
                                        </router-link></td>
                                        <td>{{book.owner_name}}</td>
                                        <td><span :class="book.approved ? 'badge bg-success' : 'badge bg-danger'">{{book.approved}}</span></td>
                                        <td><span :class="book.status == 'available' ? 'badge bg-success' : 'badge bg-danger'">{{book.status}}</span></td>
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
                books: [],
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
                this.$http.get('admin/books', {params: requestParams})
                .then(response => {
                    this.books = response.body.books
                    this.metadata = response.body.metadata
                })
            },
            paginateCallback (pageNumber) {
                this.fetchData(pageNumber)
            }
        }
    }
</script>