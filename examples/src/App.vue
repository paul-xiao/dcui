<template>
  <div class="p-5">
    <div class="flex justify-between">
      <div>head</div>
      <div class="dropdown">
        <label for="">切换主题</label>
        <ul class="dropdown-content">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div>
    <div>
      <button class="btn btn-primary">111</button>
      <button class="btn btn-secondary">111</button>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
