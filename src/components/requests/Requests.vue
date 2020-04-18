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
                                        <th>Book</th>
                                        <th>Borrower</th>
                                        <th>Lender</th>
                                        <th>Status</th>
                                        <th>requested at</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="bookActivity in bookActivities">
                                        <td>{{bookActivity.id}}</td>
                                        <td><router-link :to="'books/' + bookActivity.book.id">
                                            {{bookActivity.book.title}}
                                        </router-link></td>
                                        <td><router-link :to="'users/' + bookActivity.borrower.id">
                                            {{bookActivity.borrower.name}}
                                        </router-link></td>
                                        <td><router-link :to="'users/' + bookActivity.lender.id">
                                            {{bookActivity.lender.name}}
                                        </router-link></td>
                                        <td v-if="bookActivity.status == 'accepted'"><span :class="'badge bg-success'">{{bookActivity.status}}</span></td>
                                        <td v-else-if="bookActivity.status == 'rejected'"><span :class="'badge bg-danger'">{{bookActivity.status}}</span></td>
                                        <td v-else><span :class="'badge bg-primary'">{{bookActivity.status}}</span></td>
                                        <td>{{moment(bookActivity.created_at)}}</td>
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
                bookActivities: [],
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
                this.$http.get('admin/book_activities', {params: requestParams})
                    .then(response => {
                        this.bookActivities = response.body.book_activities
                        this.metadata = response.body.metadata
                    })
            },
            paginateCallback (pageNumber) {
                this.fetchData(pageNumber)
            }
        }
    }
</script>