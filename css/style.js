<script>
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Carrega tema salvo
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    // Salva no navegador
    if (body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙";
    }
  });
</script>