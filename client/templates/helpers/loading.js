Template.loading.rendered = function () {
  if ( !Session.get('loadingSplash') ) {
    this.loading = window.pleaseWait({
      backgroundColor: '#cccccc',
      loadingHtml: message + spinner
    });
    Session.set('loadingSplash', true);
  }
};

Template.loading.destroyed = function () {
  if (this.loading) {
    this.loading.finish();
  }
};

var message = '<p class="loading-message">Cargando...</p>';
var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';
