<template>
  <div>
    <nav class="nav">
      <div class="container nav-inner">
        <h1 class="logo">Form Generator</h1>
        <div class="links">
          <router-link to="/">Home</router-link>
          <router-link to="/simple">Simple Demo</router-link>
          <router-link to="/complex">Complex Demo</router-link>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  background: linear-gradient(90deg,#eef2ff,#fff);
  padding: 12px 0;
  border-bottom: 1px solid #e6e9ef;
  .nav-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.logo { margin: 0; font-size: 20px; color: #111827; }
.links a { margin-left: 14px; color: #4b5563; text-decoration: none; }
.links a.router-link-exact-active { font-weight: 700; color: #111827; }
</style>
