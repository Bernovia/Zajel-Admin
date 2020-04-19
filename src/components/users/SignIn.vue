<template>
    <div class="hold-transition login-page">
        <div class="login-box">
            <div class="login-logo">
                <b>Zajel</b>Admin
            </div>
            <!-- /.login-logo -->
            <div class="card">
                <div class="card-body login-card-body">
                    <p class="login-box-msg">Sign in to start your session</p>
                    <form class="form-signin" @submit.prevent="signIn">
                        <div class="input-group mb-3">
                            <input type="email" v-model="user.email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>

                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" v-model="user.password" id="inputPassword" class="form-control" placeholder="Password" required>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <div class="icheck-primary">
                                    <input type="checkbox" id="remember">
                                    <label for="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-4">
                                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>
    </div>
</template>

<script>
    import store from "../../store";

    export default {
        data (){
            return {
                user: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            signIn() {
                this.$http.post('admin/auth/sign_in', this.user )
                    .then(response => {
                        localStorage.accessToken = response.headers['map']['access-token'];

                        localStorage.client = response.headers['map']['client'];

                        localStorage.uid = response.headers['map']['uid'];

                        localStorage.expiry = response.headers['map']['expiry'];

                        localStorage.bearer = response.headers['map']['token-type'];

                        this.$store.commit('signIn', {
                            user_id: response.data.data.id,
                            accessToken: localStorage.accessToken,
                            client: localStorage.client,
                            uid: localStorage.uid,
                            expiry: localStorage.expiry,
                            bearer: localStorage.bearer
                        })

                        this.$router.replace('/');
                    }, error => {
                        this.$refs.form.setErrors({
                            email: [error.body.errors[0]]
                        });
                    }).then(data => {
                    this.headers = data
                })
            },
        }
    }
</script>