<template>
    <div class="content-wrapper mt-5">
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">{{formHeader}}</h3>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form @submit.prevent="submit">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="name">Language</label>
                                        <input type="text" class="form-control" id="name" placeholder="Language" v-model="name" required>
                                    </div>
                                </div>
                                <!-- /.card-body -->

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                name: this.$route.query.name,
                type: this.$route.query.type || 'new',
                formHeader: this.$route.query.type == 'edit' ? 'Update language' : 'Add new language'
            }
        },
        methods: {
            submit () {
                if (this.type == 'new'){
                    this.$http.post('admin/languages', {name: this.name}).then(response => {
                        this.$router.replace('/languages');
                    })
                } else {
                    this.$http.put('admin/languages/' + this.$route.params.id, {name: this.name}).then(response => {
                        this.$router.replace('/languages');
                    })
                }
            }
        }
    }
</script>