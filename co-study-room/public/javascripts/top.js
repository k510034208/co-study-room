var app = new Vue({
  el: '#app',
  data: {
    invitationUrl: '',
  },
  computed : {
    getInvitationUrl:function () {
      var url = '';

      fetch('/api/v1/getInvitationUrl', {
        method: 'post',
        mode: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        })
      })
        .then(res => {
          return res.json();
        })
        .then(json => {
        
      })
    })
  },
})