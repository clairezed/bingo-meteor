Handlebars.registerHelper('activeIfTemplateIs', function(template) {
    var currentRoute = Router.current();
    console.log(template);
    if(_.isArray(template)) {
      console.log(template);
      console.log(_.isArray(template));
    }else {
      return currentRoute && template === currentRoute.lookupTemplate() ? 'active' : '';
    }
});