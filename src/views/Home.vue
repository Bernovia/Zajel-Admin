<template>
    <div>
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Dashboard</h1>
                        </div><!-- /.col -->
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->

            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <!-- Small boxes (Stat box) -->
                    <div class="row">
                        <div class="col-lg-3 col-6">
                            <!-- small box -->
                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3>{{usersCount}}</h3>

                                    <p>Users</p>
                                </div>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-6">
                            <!-- small box -->
                            <div class="small-box bg-success">
                                <div class="inner">
                                    <h3>{{booksCount}}</h3>

                                    <p>Books</p>
                                </div>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-6">
                            <!-- small box -->
                            <div class="small-box bg-warning">
                                <div class="inner">
                                    <h3>{{requestsCount}}</h3>

                                    <p>Requests</p>
                                </div>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-6">
                            <!-- small box -->
                            <div class="small-box bg-danger">
                                <div class="inner">
                                    <h3>{{conversationsCount}}</h3>

                                    <p>Conversations</p>
                                </div>
                            </div>
                        </div>
                        <!-- ./col -->
                    </div>
                    <!-- /.row -->

                  <div class="row">
                    <div class="col-lg-6 col-6">
                      <Chart v-if="loaded" :chart-data="perDayChartData" />
                    </div>

                    <div class="col-lg-6 col-6">
                      <Chart v-if="loaded" :chart-data="perCountryChartData" />
                    </div>
                  </div>

                </div><!-- /.container-fluid -->
            </section>
            <!-- /.content -->
        </div>
        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
        <!-- /.control-sidebar -->

    </div>
</template>

<script>

    import Chart from "../components/charts/Chart";

    export default {
      components: {Chart},
      data (){
          return {
            usersCount: 0,
            booksCount: 0,
            requestsCount: 0,
            conversationsCount: 0,
            requestPerDay: null,
            requestPerCountry: null,
            perDayChartData: null,
            perCountryChartData: null,
            loaded: false
          }
      },
      async mounted () {
        this.loaded = false
        try {
          await this.fetchData();
          this.loaded = true

          let perDayLabels = this.requestPerDay.map(request_date => request_date['date'])
          let perCountryLabels = this.requestPerCountry.map(request_date => request_date['country'])

          this.perDayChartData = {
            labels: perDayLabels,
            datasets: [
              {
                label: 'Requests Per Day',
                backgroundColor: '#f87979',
                data: this.requestPerDay.map(request_date => request_date['count'])
              }
            ]
          }

          this.perCountryChartData = {
            labels: perCountryLabels,
            datasets: [
              {
                label: 'Requests Per Country',
                backgroundColor: '#f87979',
                data: this.requestPerCountry.map(request_date => request_date['count'])
              }
            ]
          }
        } catch (e) {
          console.error(e)
        }
      },
      methods: {
          async fetchData(){
              await this.$http.get('admin/metadata')
                  .then(response => {
                      this.usersCount = response.body.metadata.users_count
                      this.booksCount = response.body.metadata.books_count
                      this.requestsCount = response.body.metadata.requests_count
                      this.conversationsCount = response.body.metadata.conversations_count
                      this.requestPerDay = response.body.metadata.request_per_day_count
                      this.requestPerCountry = response.body.metadata.request_per_country_count
                  })
          }
      }
    }
</script>
