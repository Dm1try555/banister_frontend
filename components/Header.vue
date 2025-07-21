<template>
  <nav class="navbar navbar-expand-lg p-3 bg-beige shadow-sm">
    <div class="navbar-brand text-dark d-flex align-items-center">
      <NuxtLink to="/" class="navbar-brand text-dark d-flex align-items-center" style="text-decoration: none;">
        <div class="d-flex flex-column">
          <span class="brand-title">BANISTER</span>
          <span class="brand-subtitle">staff</span>
        </div>
      </NuxtLink>
    </div>
    <div class="collapse navbar-collapse justify-content-center">
      <ul class="navbar-nav">
        <li class="nav-item">
          <NuxtLink to="/join/signin" class="nav-link btn btn-nav-primary text-white px-4 py-2 rounded me-3 btn-nav-text">
            Start now
          </NuxtLink>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark px-3 nav-text" href="#">How It Works</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark px-3 nav-text" href="#">About us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark px-3 nav-text" href="#">Blog</a>
        </li>
      </ul>
    </div>
    <div class="navbar-right d-flex align-items-center">
      <div class="d-flex align-items-center me-3">
        <Icon name="heroicons:globe-alt" class="me-1" />
        <span class="text-muted nav-text">EN</span>
      </div>
      <Icon name="heroicons:arrow-right-end-on-rectangle" class="mx-5" />
      <NuxtLink to="/join" class="btn-outline-secondary px-4 py-2 text-decoration-none">
        Sign Up
      </NuxtLink>
    </div>
  </nav>
</template>
