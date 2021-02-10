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

          if (json.result == 'errror') {
            this.invitationUrl = '';
            this.keyword = '';
            this.expireddate = '';
            return;
          }

          if (location.port == 80 || location.port == 443) {
            this.invitationUrl = `${ location.protocol }//${ location.hostname }/${ json.data.url }`;
          } else {
            this.invitationUrl = `${ location.protocol }//${ location.hostname }:${ location.port }/${ json.data.url }`;            
          }
          this.keyword = json.data.keyword;
          this.expireddate = json.data.expiration;
        });
    },
    deleteRoom: function (roomid) {
      console.log('deleteRoom');
      fetch(`/api/v1/room/delete`, {
        method: 'DELETE',
        mode: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomid: roomid,
        })
      })
        .then(res => {
          console.log('BBBBBB');
          return res.json();
        })
        .then(json => {

          if (json.result == 'success') {
            alert('ルームを削除しました');
            window.location.reload();
            return;
          }

          // error時の処理
          return;
        });
    }
  },
});