<template>
    <div class="content-wrapper mt-5">
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Update book</h3>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form @submit.prevent="submit">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="title">Title</label>
                                        <input type="text" class="form-control" id="title" placeholder="Title" v-model="title" required>
                                    </div>

                                    <div class="form-group">
                                        <label for="author">Author</label>
                                        <input type="text" class="form-control" id="author" placeholder="Author" v-model="author" required>
                                    </div>

                                    <div class="form-group">
                                        <label for="page_count">Page count</label>
                                        <input type="number" class="form-control" id="page_count" placeholder="page_count" v-model="page_count" required>
                                    </div>

                                    <div class="form-group">
                                        <label for="published_at">Published at</label>
                                        <input type="number" class="form-control" id="published_at" placeholder="published_at" v-model="published_at" required>
                                    </div>

                                    <div class="form-group">
                                        <label for="Language">Language</label>
                                        <v-select id="language" :options="languages" placeholder="Select book language" @input="setLanguage" v-model="language"></v-select>
                                    </div>

                                    <div class="form-group">
                                        <label for="genre">Genre</label>
                                        <v-select :options="genres"
                                                  id="genre"
                                                  placeholder="Select genre"
                                                  label="name"
                                                  @input="setGenre"
                                                  v-model="genre"></v-select>
                                    </div>

                                    <div class="form-group">
                                        <label for="description">Description</label>
                                        <textarea class="form-control" id="description" placeholder="description" v-model="description" required></textarea>
                                    </div>
                                    <div class="form-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="file-upload" accept="image/*" @change="uploadImage($event)">
                                            <label class="custom-file-label" for="file-upload">Choose file</label>
                                        </div>
                                    </div>

                                </div>

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
                genres: [],
                languages: [],
                genre: null,
                current_image: '',
                id: '',
                title: '',
                description: '',
                author: '',
                page_count: '',
                language: '',
                image: '',
                published_at: '',
                genre_id: ''
            }
        },
        created () {
            this.$http.get('metadata/')
                .then(response => {
                    this.genres = response.data['genres'];
                    this.languages = response.data['languages'];
                })
            this.$http.get('admin/books/'+ this.$route.params.id)
                .then(response => {
                    let book = response.data
                    this.id = book.id
                    this.title = book.title
                    this.author = book.author
                    this.page_count = book.page_count
                    this.language = book.language
                    this.genre_id = book.genre_id
                    this.genre = this.genres.filter(function(genre) {
                        return genre.id === book.genre_id
                    })
                    this.published_at = book.published_at
                    this.description = book.description
                    this.current_image = book.image
                    fetch(book.image)
                        .then(res => res.blob()) // Gets the response and returns it as a blob
                        .then(blob => {
                            this.image = blob
                        });
                })
        },
        methods: {
            setLanguage(value){
                this.language = value
            },
            setGenre(value){
                this.genre_id = value.id

            },
            submit () {
                let data = new FormData();
                data.append('title', this.title);
                data.append('description', this.description);
                data.append('author', this.author);
                data.append('page_count', this.page_count);
                data.append('language', this.language);
                data.append('published_at', this.published_at);
                data.append('genre_id', this.genre_id);
                data.append('image', this.image, this.image.name);
                this.$http.put('admin/books/' + this.id, data).then(response => {
                    this.$router.replace('/books/' + response.body.id);
                })
            },
            uploadImage (event) {
                $('#file-selected').text(event.target.files[0].name);
                this.image = event.target.files[0];
                this.current_image = URL.createObjectURL(event.target.files[0])
            }
        }
    }
</script>