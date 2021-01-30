var app = new Vue({
  el: '#app',
  data: {
    invitationUrl: '',
    keyword: '',
    expireddate:''
  },
  methods: {
    getInvitationUrl: function (roomid) {

      this.invitationUrl = '';
      this.keyword = '';
      this.expireddate = '';

      fetch(`/api/v1/user/geturl`, {
        method: 'post',
        mode:'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
          roomid:roomid,
        })        
      })
        .then(res => {
          return res.json();
        })
        .then(json => {
          if (location.port == 80 || location.port == 443) {
            this.invitationUrl = `${ location.protocol }//${ location.hostname }/${ json.data.url }`;
          } else {
            this.invitationUrl = `${ location.protocol }//${ location.hostname }:${ location.port }/${ json.data.url }`;            
          }
          this.keyword = json.data.keyword;
          this.expireddate = json.data.expiration;
        });
    }
  },
});