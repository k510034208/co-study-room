var app = new Vue({
  el: '#app',
  data: {
    num: 1,
    numarray: [],
    end_date:''
  },
  methods: {
    addTableRow:function () {
      var n = parseInt(this.num);

      if (n > 4) {
        return;
      }

      this.numarray = [];

      for (var i = 1; i <= n; i++) {
        this.numarray.push(i);
      }
    },
  },
});