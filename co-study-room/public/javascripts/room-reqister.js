var app = new Vue({
  el: '#app',
  data: {
    num: 1,
    numarray: [],
    s_1: 1,
  },
  methods: {
    addTableRow:function () {
      var n = parseInt(this.num);

      if (n > 4) {
        return;
      }

      this.numarray = [];

      for (var i = 1; i <= n; i++) {
        console.log(i);
        this.numarray.push(i);
      }
    },
  },
});