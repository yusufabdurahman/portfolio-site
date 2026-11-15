// Client-side script, served from public/javascripts.
// Small enhancement: closes the mobile navbar after a link is tapped.
document.addEventListener('DOMContentLoaded', function () {
  var navCollapse = document.getElementById('mainNav');
  if (!navCollapse) return;

  document.querySelectorAll('#mainNav .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      // Only needed when the collapsed (mobile) menu is open
      if (navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });
});
