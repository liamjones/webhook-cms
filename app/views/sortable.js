export default Ember.View.extend({
  tagName : "ol",

  didInsertElement : function () {
    this.makeSortable();
  },

  makeSortable: function () {

    var controller = this.get('controller');

    var originalindex;

    this.$().sortable({
      items      : "> li:not([data-locked])",
      placeholder: 'wh-form-control-placeholder',
      helper     : 'clone',
      axis       : 'y',

      start: function (event, ui) {

        ui.helper.find('.wy-control-group-edit').removeClass('wy-control-group-edit');
        ui.helper.find('.wy-tooltip').remove();

        originalindex = ui.item.parent().children('li').index(ui.item);

      },
      update: function  (event, ui) {

        var newindex = ui.item.parent().children(':not(script)').index(ui.item);

        if (ui.item.hasClass('ui-draggable')) {

          var type = ui.item.data('id');

          $(this).sortable('cancel');
          ui.item.remove();

          controller.addControlAtIndex(type, newindex);

        } else {

          $(this).sortable('cancel');

          controller.updateOrder(originalindex, newindex);

        }

      }
    });

  }
});
