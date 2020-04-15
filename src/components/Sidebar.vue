<template>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <router-link to="/" class="brand-link">
            <img src="../assets/img/AdminLTELogo.png"
                 alt="AdminLTE Logo"
                 class="brand-image img-circle elevation-3"
                 style="opacity: .8">
            <span class="brand-text font-weight-light">Zajel Admin</span>
        </router-link>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <!-- Add icons to the links using the .nav-icon class
                         with font-awesome or any other icon font library -->
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>Home</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/books" class="nav-link">
                            <i class="nav-icon fas fa-book"></i>
                            <p>Books list</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/users" class="nav-link">
                            <i class="nav-icon fas fa-users"></i>
                            <p>Users list</p>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/genres" class="nav-link">
                            <i class="nav-icon fa fa-list-alt"></i>
                            <p>Genres</p>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/languages" class="nav-link">
                            <i class="nav-icon fas fa-language"></i>
                            <p>Languages</p>
                        </router-link>
                    </li>

                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>