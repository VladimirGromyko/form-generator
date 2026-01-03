<template>
  <div>
    <h2>Демонстрации</h2>
    <p>Примеры использования генератора форм.</p>
    <div class="cards">
      <router-link to="/form-generator/simple" class="card">
        <h3>Simple Form</h3>
        <p>Простая форма с инпутами и textarea.</p>
      </router-link>
      <router-link to="/form-generator/complex" class="card">
        <h3>Complex Form</h3>
        <p>Форма с select и группой checkbox и кастомизацией полей через слот.</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.cards { display: flex; gap: 12px; margin-top: 16px; }
.card {
  display: block;
  padding: 14px;
  background: #fff;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  width: 280px;
  box-shadow: 0 6px 18px rgba(16,24,40,0.04);
}
</style>
