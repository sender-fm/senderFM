var $$ = Dom7;

var app = new Framework7({
  root: '#app', // App root element
  id: 'io.senderfm.testapp', // App bundle ID
  name: 'sender.fm', // App name
  theme: 'auto', // Automatic theme detection
  mainView: {
    passRouteQueryToRequest: true,
    passRouteParamsToRequest: true,
    allowDuplicateUrls: true,
    xhrCache: false,
  },
  data: function() {
    return {
      isuser: {
        img: null
      },
      user: {
        logged: false,
        login: '',
        username: '',
        status: '',
        id: 0,
        member: '',
        mail: '',
        img: '',
        interval: null
      },
      profil: {
        loadProfilUserData: null,
        loadProfilBeitrag: null,
        loadProfilAudio: null,
        loadProfilRedaktion: null,
        loadProfilAbo: null,
        loadProfilAbonnenten: null
      },
      redaktion: {
        thisRID: null,
        thisRNAME: null,
        thisRIDsprecher: null
      },
      admin: {
        loadBeitrag: null,
      },
      radioHTML: '<div class="playerbox-textbox row">' +
        '        <div class="col-0 playerbox-text-left"></div>' +
        '        <div class="col-90 playerbox-text">' +
        '            <div id="station0" class="station">' +
        '                <div id="icons0"  > </div>' +
        '                <div class="title">' +
        '                    <div id="title0"  class="marquee3k" > </div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '        <div class="col-0 playerbox-text-right"></div>' +
        '    </div>' +
        '    <div class="buttonbox row text-align-center">' +
        '        <div class="col button-box-m button-box-menu" onclick="app.panel.left.open()"><i class="fa fa-bars fa-2x" aria-hidden="true"></i> </div>' +
        '          <div class="col button-box-m button-box-users"  onclick="app.router.navigate(\'/sendeplan/\')"><i class="fa fa-calendar fa-2x"></i></div> ' +
        '        <div class="col button-box-m button-box-tree"  onclick="app.router.navigate(\'/login/\' )"><i class="fa fa-lock fa-2x"></i> </div>' +
        '         <div class="col button-box-m button-box-img"  onclick=""></div> ' +
        '        <div class="col button-box-m button-box-play radio-play-button"><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i></div>' +
        '    </div>',
      radioHTMLonline: '<div class="playerbox-textbox row">' +
        '        <div class="col-0 playerbox-text-left"></div>' +
        '        <div class="col-90 playerbox-text">' +
        '            <div id="station0" class="station">' +
        '                <div id="icons0"  >  </div>' +
        '                <div class="title">' +
        '                    <div id="title0"  class="marquee3k" > </div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '        <div class="col-0 playerbox-text-right"></div>' +
        '    </div>' +
        '    <div class="buttonbox row text-align-center">' +
        '        <div class="col button-box-m button-box-menu" onclick="app.panel.left.open()"><i class="fa fa-bars fa-2x" aria-hidden="true"></i> </div>' +

        '          <div class="col button-box-m button-box-users"  onclick="app.router.navigate(\'/mitglieder/\' )"><i class="fa fa-users fa-2x"></i> </div> ' +
        '        <div class="col button-box-m button-box-tree"  onclick="app.router.navigate(\'/chronik/\' )"><i class="fa fa-podcast fa-fw fa-2x"></i> </div>' +
        '         <div class="col button-box-m button-box-img"  onclick=""></div> ' +
        '        <div class="col button-box-m button-box-play radio-play-button"><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i></div>' +
        '    </div>',
      radio: null,
      player: null,
      preview: null,
      letzterStand: false,
      playerIsPause: false,
      playerHTML2: '<div class=" ">' +
        '   <div class="row"> ' +
        '          <div class="col progressBox "> ' +
        '                 <div id="title_player" class="col-100 marquee3k" style="position:absolute;margin-left:50px"> </div>   ' +
        '                  <div id="backduration" style="backgroundcolor:red">    ' +
        '                      <i id="_durationLive" class="size-15" style="position:absolute; background-color:#194ede;opacity:0.7;" ></i>   ' +
        '                  </div>' +
        '           </div>' +
        '    </div>' +
        '    <div class="row text-align-center"> ' +
        '         <div class="col button-box-m button-box-menu" onclick="app.panel.left.open()"><i class="fa fa-bars fa-2x" aria-hidden="true"></i> </div>' +
        '         <div id="howler-stop" class="col button-box-m"><i class="fa fa-stop fa-2x"></i></div>' +
        '         <div class="col button-box-m button-box-tree"  onclick="app.router.navigate(\'/chronik/\' )"><i class="fa fa-podcast fa-fw fa-2x"></i> </div>' +
        '         <div id="howler-info" class="col button-box-m"></div>' +
        '          <div id="howler-play" class="col button-box-m"><i class="fa fa-spinner fa-spin fa-2x"></i></div>' +
        '    </div>' +

        '</div>',
      quill: null,
      inputLocalImage: null,
      streamTitleRequest: null,
      streamTitleInterval: null,
      monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      linkID: null,
      userID_chatReciver: null,
      txtID_chatANSWER: null,
    }
  },
  methods: {
    log: function(txt, colo) {
      'use strict';
      if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || app.data.user.status === "admin") {

        if (colo) {

          if (colo == "green") {
            console.log('%c request> ' + txt, 'background: green; color: white; display: block;');
          }
          if (colo == "red") {
            console.log('%c >> ' + txt, 'background: red; color: white; display: block;');
          }

          if (colo == "grew") {
            console.log('%c >> ' + txt, 'background: gainsboro; color: black; display: block;');
          }

          if (colo == "lila") {
            console.log('%c info> ' + txt, 'background: #9c27b0; color: white; display: block;');
          }
          if (colo == "pink") {
            console.log('%c work> ' + txt, 'background: #fb05dd; color: white; display: block;');
          }
          if (colo == "orange") {
            console.log('%c start> ' + txt, 'background: orange; color: black; display: block;');
          }
          if (colo == "blue") {
            console.log('%c >> ' + txt, 'background: blue; font-size:22px; color: white; display: block;');
          }
          if (colo == "todo") {
            console.log('%c TODO >>>>>> ' + txt, 'background: purple; font-size:20px; color: black; display: block;');
          }
        } else {
          // txt = " NICHTS DEFINIERT";
          app.methods.log("farbparameter fehlt >> " + txt, "grew");
        }
        return;
      }
    },
    userIMG: function() {
      if (app.data.user.img != "") {
        return '<img src="useruploads/profilbilder/' + app.data.user.img + '" height="29" >  ';
      } else {
        return '<i class="fa fa-user-circle " aria-hidden="true"> </i>';
      }
    },
    userIMGload: function(userid) {


      app.request.get('useruploads/profilbilder/' + userid + '_u.png', function(data) {
        if (data == "undefined") {} else {
          app.data.isuser.img = '<img src="useruploads/profilbilder/' + userid + '_u.png" width="34" height="34"/>';
        }

      }, function(error) {
        app.request.get('useruploads/profilbilder/' + userid + '_u.jpg', function(data) {

          app.data.isuser.img = '<img src="useruploads/profilbilder/' + userid + '_u.png" width="34" height="34"/>';

        }, function(error) {
          app.request.get('useruploads/profilbilder/' + userid + '_u.gif', function(data) {

            app.data.isuser.img = '<img src="useruploads/profilbilder/' + userid + '_u.gif" width="34" height="34"/>';

          }, function(error) {
            app.request.get('useruploads/profilbilder/' + userid + '_u.jpeg', function(data) {

              app.data.isuser.img = '<img src="useruploads/profilbilder/' + userid + '_u.jpeg" width="34" height="34"/>';

            }, function(error) {
              app.data.isuser.img = '<i class="fa fa-user-circle " aria-hidden="true"> </i>';

            });
          });
        });
      });
    },
    device: function() {
      var device = Framework7.device;
      return {
        ios: JSON.parse(device)[0],
        android: JSON.parse(device)[1],
        androidChrome: JSON.parse(device)[2],
        desktop: JSON.parse(device)[3],
        windowsPhone: JSON.parse(device)[4]
      }

    },
    checksession: function(typ) {
      // checksession prüft ob user angemeldet
      // typ = logged | username | id | mail | status | all
      //  console.log('%c checksession', 'background: black; color: orange');
      app.request.post('php/checksession.php', {
        typ: typ
      }, function(data) {
        // console.log(data);
        if (JSON.parse(data)[0]) {
          // console.log("session ja " );                    
          app.data.user.logged = true;
          app.data.user.login = JSON.parse(data)[1];
          app.data.user.id = JSON.parse(data)[2];
          app.data.user.username = JSON.parse(data)[3];
          app.data.user.status = JSON.parse(data)[4];
          app.data.user.mail = JSON.parse(data)[5];
          app.data.user.member = JSON.parse(data)[6];
          app.data.user.img = JSON.parse(data)[7];


          $$(".button-box-tree").attr("onclick", "app.router.navigate(\'/chronik/\')").html('<i class="fa fa-podcast fa-2x"></i>');
          $$(".button-box-users").attr("onclick", "app.router.navigate(\'/mitglieder/\')").html('<i class="fa fa-users fa-2x"></i>');
          $$(".button-box-img").attr("onclick", "app.router.navigate(\'/profil/\')").html(app.methods.userIMG());


          $$(".navbar .right_").html('<i class="fa fa-unlock open-confirm-logout " aria-hidden="true"></i>');
          //$$(".navbar .right_").html(html);  


          app.request.post('pages/menu_left_logged.html', function(data) {
            $$("#panel-content-left").html(data);
          });


          // adminfunctions werden angehangen
          if (app.data.user.member == "admin") {
            $$(".navbar .center_").attr("onclick", "app.router.navigate(\'/admin-board/\')").html('<i class="fa fa-universal-access" aria-hidden="true"></i>');

            app.request.post('pages/menu_right_profil_admin.html', function(data) {
              $$("#panel-content-right").html(data);
            });
          } else {
            $$(".navbar .center_").attr("onclick", "").html('');
          }
          app.methods.checkTalkMessages();
        }


        if (!JSON.parse(data)[0]) {

          //   console.log("keine session  " );
          $$(".button-box-tree").attr("onclick", "app.router.navigate(\'/login/\')").html('<i class="fa fa-lock fa-2x"></i>');
          $$(".button-box-users").attr("onclick", "app.router.navigate(\'/sendeplan/\')").html('<i class="fa fa-calendar fa-2x"></i>');
          $$(".button-box-img").attr("onclick", "").html("");
          $$(".navbar .center_").attr("onclick", "").attr("onclick", "").html('');
          $$(".navbar .right_").attr("onclick", "").html('');

          app.data.user.logged = false;

          app.request.post('pages/menu_left_unlogged.html', function(data) {
            $$("#panel-content-left").html(data);
          });
          app.data.user.logged = false;
          app.data.user.login = JSON.parse(data)[1];
          app.data.user.id = 0;
          app.data.user.username = '';
          app.data.user.status = 'gast';
          app.data.user.mail = '';
          app.data.user.member = '';
          app.data.user.img = '';
        }
      });

    },
    checkTalkMessages: function(typ) {
      // typ = user || admin 
      app.request.post('php/checkTalkMessages.php', {
        typ: "user"
      }, function(data1) {
        //  console.log( "offene Chat Nachrichten => " + data1 );
      });

    },
    radioINIT: function() {
      app.methods.log("radioINIT", "red");
      // Cache references to DOM elements.
      //var elms = ['station0', 'title0', 'live0', 'playing0', 'station1', 'title1', 'live1', 'playing1', 'station2', 'title2', 'live2', 'playing2', 'station3', 'title3', 'live3', 'playing3', 'station4', 'title4', 'live4', 'playing4'];
      var elms = ['station0', 'title0'];
      elms.forEach(function(elm) {
        window[elm] = document.getElementById(elm);
      });

      /**
       * Radio class containing the state of our stations.
       * Includes all methods for playing, stopping, etc.
       * @ param {Array} stations Array of objects with station details ({title, src, howl, ...}).
       */
      var Radio = function(stations) {
        var self = this;

        self.stations = stations;
        self.index = 0;

        // Setup the display for each station.
        for (var i = 0; i < self.stations.length; i++) {
          window['title' + i].innerHTML = self.stations[i].title;
          window['station' + i].addEventListener('click', function(index) {
            var isNotPlaying = (self.stations[index].howl && !self.stations[index].howl.playing());

            // Stop other sounds or the current one.
            app.data.radio.stop();


            // If the station isn't already playing or it doesn't exist, play it.
            if (isNotPlaying || !self.stations[index].howl) {
              app.data.radio.play(index);
            }
          }.bind(self, i));
        }
      };
      Radio.prototype = {
        /**
         * Play a station with a specific index.
         * @ param  {Number} index Index in the array of stations.
         */
        play: function(index) {
          var self = this;
          var sound;


          index = typeof index === 'number' ? index : self.index;
          var data = self.stations[index];

          // If we already loaded this track, use the current one.
          // Otherwise, setup and load a new Howl.
          if (data.howl) {
            sound = data.howl;
          } else {
            sound = data.howl = new Howl({
              src: data.src,
              html5: true, // A live stream can only be played through HTML5 Audio.
              format: ['mp3', 'aac'],
              onload: function() {
                var totalSoundDuration = sound.duration();
                // console.log("totalSoundDuration=> " + totalSoundDuration);
                $$(".radio-play-button i").removeClass("fa-spinner fa-spin fa-fw").addClass("fa-pause-circle-o");
                $$(".left_scroll_play").attr("src", "images/site/leftscroll_pause.png");

                if (app.data.user.logged) {
                  $$(".button-box-tree").attr("onclick", "app.router.navigate(\'/chronik/\' )").html("<i class='fa fa-podcast fa-2x'></i>");
                  $$(".button-box-img").attr("onclick", "app.router.navigate(\'/profil/\' )").html(app.methods.userIMG());
                } else {
                  $$(".button-box-tree").html("<i class='fa fa-lock fa-2x'></i>");
                  $$(".button-box-img").html("");
                  $$(".button-box-users").attr("onclick", "app.router.navigate(\'/sendeplan/\' )").html("<i class='fa fa-calendar fa-2x'></i>");
                }
              },
              onpause: function() {
                $$(".radio-play-button i").removeClass("fa-pause-circle-o").addClass("fa-play-circle-o");
                $$(".left_scroll_play").attr("src", "images/site/leftscroll_toPlay.png");
              },
              onstop: function() {
                $$(".radio-play-button i").removeClass("fa-pause-circle-o").addClass("fa-play-circle-o");
                $$(".left_scroll_play").attr("src", "images/site/leftscroll_toPlay.png");

              }
            });
          }

          sound.play();
          self.toggleStationDisplay(index, true);
          self.index = index;
        },

        /**
         * Stop a station's live stream.
         */
        stop: function() {
          var self = this;
          $$(".radio-play-button i").removeClass("fa-pause-circle-o").addClass("fa-play-circle-o");
          $$(".left_scroll_play").attr("src", "images/site/leftscroll_toPlay.png");
          $$("#siri-container").html("");


          // Get the Howl we want to manipulate.
          var sound = self.stations[self.index].howl;

          // Toggle the display.
          self.toggleStationDisplay(self.index, false);

          // Stop the sound.
          if (sound) {
            sound.stop();
            sound.unload();
            sound = null;
          }

        },

        /**
         * Toggle the display of a station to off/on.
         * @ param  {Number}  index Index of the station to toggle.
         * @ param  {Boolean} state true is on and false is off.
         */
        toggleStationDisplay: function(index, state) {
          var self = this;
          window['station' + index].style.backgroundColor = state ? 'rgba(255, 255, 255, 0.33)' : '';
        },
      };



      // Setup our new radio and pass in the stations.
      app.data.radio = new Radio([{
        freq: '',
        title: "sender.fm Radio",
        src: ['https://senderfm.out.airtime.pro/senderfm_a'],
        howl: null
      }]);
    },
    radioINITMusik: function() {
      app.methods.log("radioINITMusik", "red");
      var sound2 = false;

      $(".radio-play-button2").click(function() {
        console.log("sound2.howl.playing", sound2.howl);
        if (isset(sound2.howl)) {
          sound2.stop();
          return;
        } else {

          sound2 = new Howl({
            src: 'http://142.93.152.82:8000/_a',
            html5: true, // A live stream can only be played through HTML5 Audio.
            //format: ['mp3', 'aac'],
            onload: function() {

              console.log("onload2");
              $$(".radio-play-button2 i").removeClass("fa-spinner fa-spin fa-fw").addClass("fa-pause-circle-o");


            },
            onpause: function() {
              console.log("onpause2");
              $$(".radio-play-button2 i").removeClass("fa-pause-circle-o").addClass("fa-play-circle-o");

            },
            onstop: function() {
              console.log("onstop2");
              $$(".radio-play-button2 i").removeClass("fa-pause-circle-o").addClass("fa-play-circle-o");
              sound2 = false;
            }
          });

          console.log("bbb");

          sound2.play();
        }
      });


    },
    imageHandler: function() {

      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      // Listen upload local image and save to server
      input.onchange = function() {
        var file = input.files[0];
        if (file.size / 1024 / 1024 > 1) {}

        // to base64
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          var base64string = reader.result;
          app.request.post('php/action_save-img-profil-beitrag.php', {
            base64: base64string,
            filename: file.name,
            filetype: file.type,
            filesize: file.size
          }, function(data) {
            var a = JSON.parse(data);

            var currentPosition = 0;
            $$(".ql-editor").append("<img src='archiv/" + a[0].name + "' class='imageInPost' >");

          });
        };
      }
    },
    linkHandler: function() {

      var Link = Quill.import('formats/link');

      class MyLink extends Link {
        static create(value) {
          let node = Link.create(value);
          value = Link.sanitize(value);
          node.setAttribute('href', value);
          if (value.startsWith("https://quilljs.com")) {
            node.removeAttribute('target');
          } else {
            node.setAttribute("target", "_blank");
            node.setAttribute("class", "link external");
          }
          return node;
        }

        format(name, value) {
          super.format(name, value);

          if (name !== this.statics.blotName || !value) {
            return;
          }
          this.domNode.setAttribute("target", "_blank");
          this.domNode.setAttribute("class", "link external");
        }
      }

      Quill.register(MyLink);
    },
    initQuill: function(elem, c, data) {
      app.data.quill = null;
      $$("" + elem + "").html("");

      var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{
          'header': 1
        }, {
          'header': 2
        }], // custom button values
        [{
          'list': 'ordered'
        }, {
          'list': 'bullet'
        }],
        [{
          'script': 'sub'
        }, {
          'script': 'super'
        }], // superscript/subscript
        [{
          'indent': '-1'
        }, {
          'indent': '+1'
        }], // outdent/indent
        [{
          'direction': 'rtl'
        }], // text direction
        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{
          'color': []
        }, {
          'background': []
        }], // dropdown with defaults from theme
        // [{ 'font': [] }],
        //  [{ 'align': [] }],
        ['clean'], // remove formatting button
        ['image', 'video'],
        ['showHtml']
      ];

      app.data.quill = new Quill('' + elem + '', {
        theme: 'snow',
        formula: true,
        syntax: true,
        modules: {
          magicUrl: {
            globalRegularExpression: /(https?:\/\/|www\.|mailto:|tel:)[\S]+/g,
            urlRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|(mailto:[\S]+)|(tel:[\S]+)/
          },
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: app.methods.imageHandler
            },
          },
        },
        placeholder: 'Dein Text hier...',

      });


      if (c == "setHTML") {
        app.data.quill.clipboard.dangerouslyPasteHTML(5, data);
      }
      var txtArea = document.createElement('textarea');
      txtArea.style.cssText = "width: 100%;margin: 0px;background: rgb(29, 29, 29);box-sizing: border-box;color: rgb(204, 204, 204);font-size: 15px;outline: none;padding: 20px;line-height: 24px;font-family: Consolas, Menlo, Monaco, &quot;Courier New&quot;, monospace;position: absolute;top: 0;bottom: 0;border: none;display:none"

      var htmlEditor = app.data.quill.addContainer('ql-custom')
      htmlEditor.appendChild(txtArea)




      var myEditor = document.querySelector('.senderfm_editor')
      app.data.quill.on('text-change', (delta, oldDelta, source) => {
        var html = myEditor.children[0].innerHTML;
        txtArea.value = html;


        if (source == 'api') {} else if (source == 'user') {
          $$(".vorschauEditor").html($$(".ql-editor").html());
        }

      })

      // editor code anzeigen
      var customButton = document.querySelector('.ql-showHtml');
      customButton.addEventListener('click', function() {
        if (txtArea.style.display === '') {
          var html = txtArea.value
            //self.quill.pasteHTML(html);
          self.app.data.quill.pasteHTML(html)
        }
        txtArea.style.display = txtArea.style.display === 'none' ? '' : 'none'
      });

      app.data.quill.focus();



    },
    logoutText: function() {
      var toastTop = app.toast.create({
        text: 'Du bist nicht angemeldet im Forum!',
        position: 'bottom',
        closeTimeout: 2000,
      });
      toastTop.open();
    },
    openX: function() {
      $$(document).find("#_file").click();
    },
    senderpreloader_open: function() {
      $$('#loader-wrapper').css("display", "block");
    },
    senderpreloader_close: function() {
      $$('#loader-wrapper').css("display", "none");
    },
    uploader_mp3_open: function() {
      $$('#uploader-wrapper-mp3').css("display", "block");
    },
    uploader_mp3_close: function() {
      $$('#uploader-wrapper-mp3').css("display", "none");
    },
    streamTitle: function() {
      clearInterval(app.data.streamTitleInterval);
      app.data.streamTitleRequest = app.request.get('php/action_livestream-title.php', {}, function(data) {

        var tarr = data.split('#||#');
        var tdata = tarr[1].split('#$#');

        $$("#title0, #title00").html("bis " + moment(tdata[2]).format('HH:mm') + " Uhr läuft:   <b>" + tarr[0] + "</b>");
        // $$(".jetztLauft-time").html(  "bis " +moment(tdata[2] ).format('HH:mm') + " Uhr <b>");
        $$(".jetztLauft-title").html("<b>" + tarr[0] + "</b>");
        $('.marquee3k').marquee({
          //duration in milliseconds of the marquee
          duration: 9500,
          //gap in pixels between the tickers
          gap: 100,
          //time in milliseconds before the marquee will start animating
          delayBeforeStart: 600,
          //'left' or 'right'
          direction: 'left',
          //true or false - should the marquee be duplicated to show an effect of continues flow
          duplicated: true
        });
        return data;

      });
      //app.data.streamTitleRequest;

      app.data.streamTitleInterval = setInterval(function() {
        app.data.streamTitleRequest;
      }, 10000);



    },
    loadGoodNews: function() {
      app.request.post('php/action_admin_goodnews.php', {
        typ: "news"
      }, function(data) {
        // console.log('loadGoodNews data => '+ data);
        if (data != "") {

          //    0`id`, 1`ag_id`, 2`ag_name`, 3`title`, 4`txt`, 5 date`, `creator`, 7`creator_id`, 8gn-pos,  9userimg, 0anrede, 11countComment 

          var tarr = data.split('#|#'),
            i = 0,
            l = tarr.length,
            tdata,
            html = '',
            html_left = '',
            html_right = '';


          for (i; i < l; i++) {
            tdata = tarr[i].split('#$#');
            html = '';
            if (tdata[8] === "left") {
              html += '<div class="block elevation-1" style="margin 0px 0px">';
            } else {
              html += '<div class="block elevation-1" style="margin 0px 0px">';
            }
            if (tdata[8] === "left") {
              html += '<div  ><img src="images/site/logo120_trans.png" width="34"  /></div>';
            }
            html += '<div class="siteContentAndImages">' + tdata[4] + '</div>';
            if (tdata[8] === "left") {
              html += '   <button  data-clipboard-text="https://sender.fm?g=' + tdata[0] + '" class="button copyToClipboard" > <i class="fa fa-share-alt" aria-hidden="true"></i> teilen </button>';
            }
            html += '</div>';

            if (tdata[8] === "left") {
              html_left += html;
            } else {
              html_right += html;
            }


          }

          $$("#goodnews_content_box_left").html(html_left);
          $$("#goodnews_content_box_right").html(html_right);
          app.methods.clipboardINIT();
        } else {
          $$("#goodnews_content_box_left").html("<h2>Willkommen bei sender.fm</h2>");
        }
      });

    },
    editorFocus: function() {},
    clipboardINIT: function() {

      var clipboard = new ClipboardJS('.copyToClipboard');

      clipboard.on('success', function(e) {
        e.clearSelection();
      });
      clipboard.on('error', function(e) {});

    },
    loadTalkMessages: function(userid, typ) {
      if (userid == "") {
        userid = app.data.user.id;
      }
      app.request.post('php/action-talk-Messages.php', {
        typ: "loadMessages",
        userid: userid
      }, function(data) {

        if (data != "") {
          var tarr = data.split('#|#'),
            i = 0,
            l = tarr.length,
            tdata, html = '';

          for (i; i < l; i++) {
            tdata = tarr[i].split('#$#');

            if (tdata[1] == 999999 && tdata[4] == userid) {
              html += '  <li class="other">';
              html += '       <div class="avatar"><img src="images/site/logo120_trans.png" draggable="false"/></div>';
              html += '     <div class="msg">';
              html += '       <p>' + tdata[2] + '</p>';
              html += '       <time>' + moment(tdata[3]).format("HH:mm") + '</time>';
              html += '     </div>';
              html += '   </li>';
            }

            // message vom user
            if (tdata[1] == userid) {
              html += '  <li class="self">';
              if (typ == "user") {
                if (app.data.user.img != "") {
                  html += '       <div class="avatar"><img src="useruploads/profilbilder/' + app.data.user.img + '" draggable="false"/></div>';
                } else {
                  html += '       <div class="avatar"><i class="fa fa-user fa-3x" aria-hidden="true"></i></div>';
                }
              }
              if (typ == "admintalk") {
                if (tdata[8] != "") {
                  html += '       <div class="avatar"><img src="useruploads/profilbilder/' + tdata[8] + '" draggable="false"/></div>';
                } else {
                  html += '       <div class="avatar"><i class="fa fa-user fa-3x" aria-hidden="true"></i></div>';
                }
              }

              html += '     <div class="msg">';
              html += '       <p>' + tdata[2] + '</p>';
              html += '       <time>' + moment(tdata[3]).format("HH:mm") + '</time>';
              html += '     </div>';
              html += '   </li>';
            }
          }



          $$("ol.chat").html(html);

        } else {
          $$("ol.chat").html("Du schreibst mit sender.fm direkt. Andere Mitglieder können dies nicht einsehen!");
        }
      });

    },
    loadAdminTalkMessages: function() {
      if (app.data.user.status != "admin") {
        return;
      } else {
        app.request.post('php/action-talk-Messages.php', {
          typ: "loadAdminTalkMessages"
        }, function(data) {

          if (data != "") {

            var tarr = data.split('#|#'),
              i = 0,
              l = tarr.length,
              tdata, html = '';

            for (i; i < l; i++) {
              tdata = tarr[i].split('#$#');

              if (tdata[8] != "") {

                var userimg = '<div class="item-media"><img src="useruploads/profilbilder/' + tdata[8] + '" width="80"/></div>';
              } else {
                var userimg = "<i class='fa fa-user fa-3x'></i>";
              }



              html += ' <li class="admin_goToTalk" data-txtid="' + tdata[0] + '" data-userid="' + tdata[1] + '" >';

              html += '       <a href="#" class="item-link item-content">';
              html += userimg;
              html += '         <div class="item-inner">';
              html += '           <div class="item-title-row">';
              html += '             <div class="item-title">' + tdata[6] + ' ' + tdata[7] + '</div>';
              html += '           <div class="size-10 item-after">' + moment(tdata[3]).format("DD.MM.YYYY HH:mm") + ' Uhr</div>';
              html += '           </div>';

              html += '           <div class="size-15">' + tdata[2] + '</div>';
              html += '         </div>';
              html += '       </a>';
              html += '     </li>';

            }

            $$("ul.messagesListBox").html(html);

          }
          $$("ol.chat").html("Klicke eine Nachricht an um in den Talk mit dem Mitglied zu wechseln!");

        });
      }
    },
    showImageinPost: function(bilder) {
      var filename = [];
      bilder.each(function(v, i) {
        filename.push('' + $$(i).attr("src").replace("thumb_", "") + '');
      });
      app.photoBrowser.create({
        photos: filename
      }).open();
    },
    calendarInline: function() {
      app.calendar.create({
        containerEl: '#demo-calendar-inline-container',
        value: [new Date()],
        weekHeader: false,
        renderToolbar: function() {
          return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
            '<div class="toolbar-inner">' +
            '<div class="left">' +
            '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
            '</div>' +
            '<div class="center"></div>' +
            '<div class="right">' +
            '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
            '</div>' +
            '</div>' +
            '</div>';
        },
        on: {
          init: function(c) {
            $$('.calendar-custom-toolbar .center').text(app.data.monthNames[c.currentMonth] + ', ' + c.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function() {
              calendarInline.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function() {
              calendarInline.nextMonth();
            });
            $$('.calendar-day').on('click', function() {
              app.methods.loadDay_Programmplan($$(this).data('day'), parseInt($$(this).data('month')) + 1, $$(this).data('year'));
            });
          },
          monthYearChangeStart: function(c) {
            $$('.calendar-custom-toolbar .center').text(app.data.monthNames[c.currentMonth] + ', ' + c.currentYear);
          }
        }
      });

    },
    loadDay_Programmplan: function(day, mon, year) {
      app.request.post('php/action_sendeplan_future.php', {
        day: day,
        mon: parseInt(mon),
        year: year
      }, function(data) {
        //console.log(data);

        if (data != "") {

          var tarr = data.split('#|#'),
            i = 0,
            l = tarr.length,
            tdata, html = '';

          for (i; i < l; i++) {

            tdata = tarr[i].split('#$#');
            html += '<div class="timeline-item item-active">';
            html += '  <div class="timeline-item-date t' + moment(tdata[3]).format("HH") + '">' + moment(tdata[3]).format("HH:mm") + ' <small>Uhr</small></div>';
            html += '  <div class="timeline-item-divider"></div>';
            html += '  <div class="timeline-item-content card">';
            html += '     <div class="card-header">' + tdata[4] + '</div>';
            html += '     <div class="card-content card-content-padding">' + urlify(tdata[10]) + ' <br> ' + urlify(tdata[11]) + '</div>';

            html += '  </div>';
            html += ' </div>';
          }

          $$("#programmplan_box").html(html);
          $$("#arccordion-date").html("" + day + "." + mon + "." + year + "").click();

          var i = 0,
            l = moment().format('HH'),
            now = $$(".t" + moment().format('HH') + ""),
            elem;
          for (i; i < l; i++) {
            elem = $$('.page-content .timeline-item-date')[i];

            if (i < 10) {
              var zahl = "0" + (i + 1);
            }

            if ($$(elem).hasClass("t" + zahl + "")) {
              document.querySelector(".t" + zahl + "").scrollIntoView();
            }


          }
          //mover scroll posicion, duracion          

        }
      });
    },
    playerAudioPlay: function(elem) {
      clearInterval(app.data.streamTitleInterval);
      //  console.log(".player-play-button click" + elem);
      // data-file  data-id  data-uid  data-agid 

      // wenn radio läuft abstellen 
      if (app.data.radio.stations[0].howl != null) {
        if (app.data.radio.stations[0].howl.playing()) {
          app.data.radio.stop();
        }
      }

      if (app.data.player != null) {
        //console.log("LÄUFT WIRD PAUSE UND NULL");
        app.data.player.pause();
        app.data.player = null;
        return;
      }



      // HTML in toolbar setzen
      $$(document).find("#toolbar_radio").html(app.data.playerHTML2);


      var elm = $$(elem),
        id = $$(elem).attr("data-id"),
        userimg = $$(elem).parent().parent().find(".demo-facebook-avatar").html(),
        file = $$(elem).attr("data-file"),
        agid = $$(elem).attr("data-agid"),
        uid = $$(elem).attr("data-uid"),
        media_elm = $$(elem).find('i'),
        zahl = 0,
        totalWidth = $$(".progressBox")[0].clientWidth;


      if (agid === undefined) {
        //var src_quelle = "/useruploads/u"+sha1(uid)+"/"+ file; 
        var src_quelle = decodeURI("../archiv/" + file);
      } else {
        var src_quelle = decodeURI("../archiv/" + file);
      }
      //  console.log("src_quelle=>" +src_quelle);

      app.data.player = new Howl({
        src: [src_quelle],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onload: function() {
          $$(elem).find('i').removeClass('fa-play').addClass("fa-spinner fa-spin")
          $$("#howler-play").find("i").removeClass('fa-play').addClass("fa-spinner fa-spin");

          $$("#title_player").html(file);
          app.data.player.play();
        },
        onplay: function() {

          $$(elem).find('i').removeClass('fa-spinner fa-spin').removeClass('fa-play').addClass("fa-pause");
          $$("#howler-play").find("i").removeClass('fa-spinner fa-spin').removeClass('fa-play').addClass("fa-pause");
          $$("#howler-info").addClass("showUser").html(userimg).attr("data-uid", uid);

          // INTERVAL
          app.data.user.interval = setInterval(function() {
            if (!app.data.playerIsPause) {
              if (app.data.letzterStand) {
                zahl = app.data.letzterStand + 0.1;
                app.data.letzterStand = false;
              } else {
                zahl = zahl + 0.1;
              }

              $$("#_durationLive").html(zahl.toFixed(0) + " / " + app.data.player.duration().toFixed(0));
              var pixel = ((($$('.progressBox')[0].clientWidth) / (app.data.player.duration().toFixed(0))) * zahl);
              $$("#backduration").css("width", "" + pixel + "px");
            } else {
              app.data.letzterStand = zahl;
            }
          }, 100);

          app.data.playerIsPause = false;


        },
        onend: function() {
          clearInterval(app.data.user.interval);
          app.data.player.stop();
          app.data.player = null;
          $$(elem).find('i').removeClass('fa-pause').addClass("fa-play");
          $$("#howler-play").find("i").removeClass('fa-pause').addClass("fa-play");

          app.data.playerIsPause = false;
          if (app.data.user.logged) {
            $$(document).find("#toolbar_radio").html(app.data.radioHTMLonline);
          } else {
            $$(document).find("#toolbar_radio").html(app.data.radioHTML);
          }


        },
        onpause: function() {
          $$(elem).find('i').removeClass('fa-pause').addClass("fa-play");
          $$("#howler-play").find("i").removeClass('fa-pause').addClass("fa-play");
          app.data.playerIsPause = true;
          clearInterval(app.data.user.interval);

        },
        onstop: function() {
          clearInterval(app.data.user.interval);
          $$(elem).find('i').removeClass('fa-pause').addClass("fa-play");
          $$("#howler-play").find("i").removeClass('fa-pause').addClass("fa-play");
          app.data.player = null;
          app.data.playerIsPause = false;
          if (app.data.user.logged) {
            $$(document).find("#toolbar_radio").html(app.data.radioHTMLonline);
          } else {
            $$(document).find("#toolbar_radio").html(app.data.radioHTML);
          }
          app.methods.checksession('logged');


        },
        onseek: function() {
          // Start upating the progress of the track.           
        }
      });


      $("#howler-play").on("click", function() {
        if (!app.data.playerIsPause) {
          //console.log("LÄUFT WIRD PAUSE UND NULL");
          app.data.player.pause();
          $$(elem).find('i').removeClass('fa-pause').addClass("fa-play");
          $$("#howler-play").find("i").removeClass('fa-pause').addClass("fa-play");
        } else {
          app.data.player.play();
        }


      });

      $("#howler-pause").on("click", function() {
        app.data.player.pause();
        app.data.playerIsPause = true;
        $$(elem).find('i').removeClass('fa-pause').addClass("fa-play");
        $$("#howler-play").find("i").removeClass('fa-pause').addClass("fa-play");
      });

      $("#howler-stop").on("click", function() {
        app.data.player.stop();
        app.data.player = null;
        $$(elem).find('i').removeClass('fa-pause').addClass("fa-play");
        $$("#howler-play").find("i").removeClass('fa-pause').addClass("fa-play");
      });

    },
    load_allRedaktionen: function() {
      app.request.post('php/action_admin_load_allRedaktionen.php', {}, function(data) {

        var tarr = data.split('#|#'),
          i = 0,
          l = tarr.length,
          tdata, html = '';

        for (i; i < l; i++) {
          tdata = tarr[i].split('#$#');


          if (tdata[6] == 0) {
            html += ' <li class="libox offen">';
          } else {
            html += ' <li class="libox geschlossen">';
          }
          html += '  <div class="item-content">';
          html += '    <div class="item-media showRedaktion" data-rid="' + tdata[0] + '"><img src="/useruploads/redaktionHeaderImg/' + tdata[2] + '" width="100px"></div>';
          html += '    <div class="item-inner " >';
          html += '      <div class="item-title showRedaktion" data-rid="' + tdata[0] + '" >' + tdata[1] + ' ' + tdata[2] + ' </div>';
          html += '      <div class="item-after">';

          html += '        <label class="toggle toggle-init">';
          if (tdata[6] == 0) {
            html += '        <input type="checkbox">';
          } else {
            html += '        <input type="checkbox" checked>';
          }

          html += '          <span class="toggle-icon"></span>';
          html += '        </label>';
          html += '      <i class="fa fa-trash deleteRedaktion" data-rid="' + tdata[0] + '" style="margin-left:20px"> </i>';
          html += '      </div>';
          html += '    </div>';
          html += '  </div>';
          html += '</li>';
        }

        $$('#list_box').html(html);

      });
    },
    loadProfilBeitrag: function() {
      app.request.post('php/action_load_profil_beitrag.php', {
        typ: "all_forUser"
      }, function(data1) {

        if (data1 != "") {
          var tarr = data1.split('#|#'),
            i = 0,
            l = tarr.length,
            tdata1, html = '',
            html3 = '',
            audio_elm;

          for (i; i < l; i++) {
            tdata1 = tarr[i].split('#$#');

            if (tdata1[5] == "UPLOAD-AUDIO") {
              // es kommt ein beitrag mit einer zeile DIV + DATA wo alles
              // zum audiofile drin ist
              audio_elm = tdata1[1].split('#$$#');

              var audio_file = audio_elm[0],
                audio_id = audio_elm[1],
                audio_uid = audio_elm[2],
                audio_agid = audio_elm[3],
                audio_filetitle = audio_elm[4],
                audio_fileundertitle = audio_elm[5],
                audio_filesize = audio_elm[6],
                audio_playtime = audio_elm[7];



              html3 += '    <div id="profil_contentBOX' + tdata1[0] + '" class="card demo-facebook-card audioBeitrag">';
              html3 += '     <div class="card-header">';
              html3 += '         <div class="demo-facebook-avatar">' + moment(tdata1[4]).format("DD.MM.YYYY - HH:mm") + ' Uhr</div>';
              html3 += '         <div class="demo-facebook-name"></div>';
              html3 += '         <div class="demo-facebook-date size-10"></div>';
              html3 += '     </div>';
              html3 += '     <div   class="card-content card-content-padding row siteContentAndImages">';
              html3 += '     <div class="col-20 player-play-button"  data-file="' + audio_file + '" data-id="' + audio_id + '" data-uid="' + audio_uid + '" data-agid=""> ';
              html3 += '         <i class=" fa fa-play fa-3x text-color-orange"></i>';
              html3 += '     </div> ';
              html3 += '         <div class="col-80">' + audio_filetitle + '';
              html3 += '             <h3>' + audio_filetitle + '</h3>';
              html3 += '             <div>' + audio_fileundertitle + '</div>';
              html3 += '         </div>';
              html3 += '     </div>';
              html3 += '     <div class="card-footer">';
              html3 += '          <a href="#" class="link postDelete" data-id="' + tdata1[0] + '"><i class="fa fa-trash-o text-color-orange" aria-hidden="true"></i></a>';
              html3 += '     </div>';
              html3 += '   <button  data-clipboard-text="https://sender.fm?c=' + tdata1[0] + '" class="button copyToClipboard" > <i class="fa fa-share-alt" aria-hidden="true"></i> teilen </button>';

              html3 += ' </div>';

            } else {

              html3 += '     <div id="profil_contentBOX' + tdata1[0] + '" class="card demo-facebook-card textBeitrag">';
              html3 += '        <div class="card-header">';
              html3 += '          <div class="demo-facebook-avatar">' + moment(tdata1[4]).format("DD.MM.YYYY - HH:mm") + ' Uhr</div>';
              html3 += '          <div class="demo-facebook-name"> </div>';
              html3 += '          <div class="demo-facebook-date size-10"></div>';
              html3 += '      </div>';
              html3 += '      <div id="profil_content' + tdata1[0] + '" class="card-content card-content-padding siteContentAndImages"> ';
              html3 += '         ' + tdata1[1] + ' ';
              html3 += '      </div>';
              html3 += '      <div class="card-footer">';
              html3 += '          <a href="#" class="link postDelete" data-id="' + tdata1[0] + '"><i class="fa fa-trash-o text-color-orange" aria-hidden="true"></i></a>';
              html3 += '          <a href="#" class="link postEdit" data-id="' + tdata1[0] + '"><i class="fa fa-pencil text-color-orange" aria-hidden="true"></i></a>';
              html3 += '          </div>';
              html3 += '   <button  data-clipboard-text="https://sender.fm?c=' + tdata1[0] + '" class="button copyToClipboard" > <i class="fa fa-share-alt" aria-hidden="true"></i> teilen </button>';

              html3 += '  </div>';

            }
          }

          $$('#user_beitrag_box').html(html3);


        } else {
          $$('#user_beitrag_box').html("Du kannst Beiträge schreiben welche für alle Mitglieder von sender.fm in der Chronik zu sehen sind. ");
        }

      });
    },
    loadRedaktionBeitrag: function(rid) {
      app.request.post('php/action_load_redaktion_beitrag.php', {
        rid: rid
      }, function(data) {

        if (data.length > 3) {

          var tarr = data.split('#|#'),
            i = 0,
            l = tarr.length,
            tdata, html = '';

          for (i; i < l; i++) {
            tdata = tarr[i].split('#$#');

            if (tdata[3] == "UPLOAD-AUDIO") {
              // es kommt ein beitrag mit einer zeile DIV + DATA wo alles
              // zum audiofile drin ist
              //  console.log( "tdata1[1] => " + tdata1[1] );
              var audio_elm = tdata[4].split('#$$#');

              //  console.log( "audio_elm0=> " + audio_elm[1] );

              var audio_file = audio_elm[0],
                audio_id = audio_elm[1],
                audio_uid = audio_elm[2],
                audio_agid = audio_elm[3],
                audio_filetitle = audio_elm[4],
                audio_fileundertitle = audio_elm[5],
                audio_filesize = audio_elm[6],
                audio_playtime = audio_elm[7];

              html += '<div class="card demo-facebook-card">';
              html += '     <div class="card-header">';
              html += '           <div class="demo-facebook-avatar">';
              html += '               <img src="images/site/logo120_trans.png" width="34" height="34"/>';
              html += '           </div>';
              html += '           <div class="demo-facebook-name">sender.fm</div>';
              html += '           <div class="demo-facebook-date">' + moment(tdata[5]).format('DD.MMMM.YYYY, HH:mm') + ' Uhr</div>';
              html += '     </div>';
              html += '     <div class="siteContentAndImages"> ';
              html += '<div class="col-20 player-play-button"  data-file="' + audio_file + '" data-id="' + audio_id + '" data-uid="' + audio_uid + '" data-agid=""> ';
              html += '         <i class=" fa fa-play fa-3x text-color-orange"></i>';
              html += '     </div> ';
              html += '         <div class="col-80">' + audio_filetitle + '';
              html += '             <h3>' + audio_filetitle + '</h3>';
              html += '             <div>' + audio_fileundertitle + '</div>';
              html += '         </div>';
              html += '     </div>';

              if (app.data.user.status == "admin") {
                html += '<button class="col button open-confirm delete-redaktionsBeitrag" data-id="' + tdata[0] + '">löschen</button>';
              }
              html += '</div><br><br>';

            } else {
              html += '<div class="card demo-facebook-card">';
              html += '     <div class="card-header">';
              html += '           <div class="demo-facebook-avatar">';
              html += '               <img src="images/site/logo120_trans.png" width="34" height="34"/>';
              html += '           </div>';
              html += '           <div class="demo-facebook-name">sender.fm</div>';
              html += '           <div class="demo-facebook-date">' + moment(tdata[5]).format('DD.MMMM.YYYY, HH:mm') + ' Uhr</div>';
              html += '     </div>';
              html += '     <div class="siteContentAndImages"> ';
              html += '           ' + tdata[4] + '';
              html += '     </div>';

              if (app.data.user.status == "admin") {
                html += '<button class="col button open-confirm delete-redaktionsBeitrag" data-id="' + tdata[0] + '">löschen</button>';
              }
              html += '</div><br><br>';
            }
          }
          $$("#content_box").html(html);
        } else {
          $$("#content_box").html("Noch keine Beiträge geschrieben.");
        }
      });
    },
    loadMitgliederDatum: function(elem) {
      app.request.post('php/action_load_mitglieder.php', {
        filter: "datum"
      }, function(data) {

        var tarr = data.split('#|#'),
          i = 0,
          l = tarr.length,
          tdata, html = '';
        for (i; i < l; i++) {
          tdata = tarr[i].split('#$#');
          html += ' <li class="item-content">';
          html += '<div class="userevent item-inner  showUser" data-uid="' + tdata[0] + '">';
          if (tdata[4] != "") {
            html += '  <div class="item-title"><img  src="useruploads/profilbilder/' + tdata[4] + '" height="40px" >  ' + tdata[1] + ' ' + tdata[2] + '</div>';
          } else {
            html += '  <div class="item-title"><i class="fa fa-user-circle " aria-hidden="true"> </i>  ' + tdata[1] + ' ' + tdata[2] + '</div>';
          }
          html += '</div>';
          html += '</li>';
        }

        $$(elem).html(html);

        var searchbar = app.searchbar.create({
          el: '.searchbar',
          searchContainer: '.list',
          searchIn: '.item-title',
          on: {
            search(sb, query, previousQuery) {}
          }
        });
      });
    },
    loadMitgliederAlphabet: function(elem) {
      app.request.post('php/action_load_mitglieder.php', {
        filter: "alphabet"
      }, function(data) {

        var tarr = data.split('#|#'),
          i = 0,
          l = tarr.length,
          tdata, html = '';

        for (i; i < l; i++) {
          tdata = tarr[i].split('#$#');
          html += ' <li class="item-content">';
          html += '<div class="userevent item-inner showUser" data-uid="' + tdata[0] + '">';
          if (tdata[4] != "") {
            html += '  <div class="item-title"><img  src="useruploads/profilbilder/' + tdata[4] + '" height="40px" >  ' + tdata[1] + ' ' + tdata[2] + '</div>';
          } else {
            html += '  <div class="item-title"><i class="fa fa-user-circle " aria-hidden="true"> </i>  ' + tdata[1] + ' ' + tdata[2] + '</div>';
          }
          html += '</div>';
          html += '</li>';

        }

        $$(elem).html(html);



        var searchbar = app.searchbar.create({
          el: '.searchbar',
          searchContainer: '.list',
          searchIn: '.item-title',
          on: {
            search(sb, query, previousQuery) {}
          }
        });

      });
    },
    loadRedaktionMitglieder: function(elem, rid) {
      app.request.post('php/action_load_redaktion_mitglieder.php', {
        rid: rid
      }, function(data) {
        // Trenner = '#@#' >> mitglieder #@# mitglieder unbestätigt 
        var teile = data.split('#@#');

        var mitgliederData = teile[0];
        var openMitgliederData = teile[1];
        var tarr = mitgliederData.split('#|#'),
          i = 0,
          l = tarr.length,
          tdata, html = '';

        for (i; i < l; i++) {
          tdata = tarr[i].split('#$#');

          // sprecher einfärben 
          if (tdata[6] == "Sprecher") {
            var classColor = "text-color-red";
          } else {
            var classColor = "";
          }
          html += ' <li class="item-content">';
          html += '<div class="item-inner ' + classColor + ' UserRedaktionStatus" data-uid="' + tdata[2] + '">';
          if (tdata[5] != "") {
            html += '  <div class="item-title"><img  src="useruploads/profilbilder/' + tdata[5] + '" height="40px" >  ' + tdata[3] + ' ' + tdata[4] + ' (' + tdata[6] + ')</div>';
          } else {
            html += '  <div class="item-title"><i class="fa fa-user-circle " aria-hidden="true"> </i>  ' + tdata[3] + ' ' + tdata[4] + ' (' + tdata[6] + ')</div>';
          }
          html += '</div>';
          html += '</li>';
        }

        $$(elem).html(html);


      });
    },
    show_NOT_Mitglieder_Redaktion: function(elem, rid) {
      app.request.post('php/action_load_mitglieder.php', {
        filter: "show_NOT_Mitglieder_Redaktion",
        rid: rid
      }, function(data) {

        if (data != "") {
          var tarr = data.split('#|#'),
            i = 0,
            l = tarr.length,
            tdata, html = '';
          for (i; i < l; i++) {
            tdata = tarr[i].split('#$#');

            html += ' <li class="item-content">';
            html += '<div class="item-inner  UserToRedaktion" data-uid="' + tdata[1] + '">';
            if (tdata[4] != "") {
              html += '  <div class="item-title"><img  src="useruploads/profilbilder/' + tdata[4] + '" height="40px" >  ' + tdata[2] + ' ' + tdata[3] + ' </div>';
            } else {
              html += '  <div class="item-title"><i class="fa fa-user-circle " aria-hidden="true"> </i>  ' + tdata[2] + ' ' + tdata[3] + ' </div>';
            }
            html += '</div>';
            html += '</li>';



          }

          $$(elem).html(html);
        } else {
          $$(elem).html("Alle Mitglieder von sender.fm sind in der Redaktion ;) ");
        }

      });
    },
    showUser: function(uid) {

      if (uid == app.data.user.id) {
        app.router.navigate("/profil/");
      } else {
        app.router.navigate("/profil_showUser/?uid=" + uid + "");
      }
    },
    allArchivfileForRedaktion: function(rid) {
      app.request.post('php/action_load_redaktion_archivfile.php', {
        rid: rid
      }, function(data) {

        if (data != "") {

          $$(".filterselect").removeClass("hidden");
          var tarr = data.split('#|#'),
            i = 0,
            l = tarr.length,
            tdata, html = '';

          for (i; i < l; i++) {
            tdata = tarr[i].split('#$#');

            switch (tdata[3]) {
              case "audio":
                html += ' <li class="t_file  t_Audio">';
                break;
              case "image":
                html += ' <li class="t_file  t_Bild">';
                break;
              case "aplication":
                html += ' <li class="t_file  t_Document">';
                break;
              case "video":
                html += ' <li class="t_file  t_Video">';
                break;
            }

            html += '            <a href="#" class="item-link item-content">';

            switch (tdata[3]) {
              case "audio":
                html += ' <div class="item-media"><i class="fa fa-music" aria-hidden="true"></i></div>';
                break;
              case "image":
                html += ' <div class="item-media"><i class="fa fa-picture-o" aria-hidden="true"></i></div>';
                break;
              case "aplication":
                html += ' <div class="item-media"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></div>';
                break;
              case "video":
                html += ' <div class="item-media"><i class="fa fa-video-camera" aria-hidden="true"></i></div>';
                break;
            }

            html += '                <div class="item-inner">';
            html += '                    <div class="item-title">';
            html += '                        <div class="item-header">' + tdata[5] + '</div>';
            html += '                        | ' + tdata[1] + '';

            switch (tdata[3]) {
              case "audio":
                html += '<div class="col-20 player-play-button"  data-file="' + tdata[7] + '" data-id="' + tdata[0] + '" data-uid="' + tdata[6] + '" data-agid="' + tdata[8] + '"> ';
                html += '         <i class=" fa fa-play fa-2x text-color-orange"></i>';
                html += '     </div> ';
                break;
              case "image":
                html += ' <img src="archiv/' + tdata[7] + '" class="imageInPost" height="80">';
                break;
              case "aplication":
                html += ' <div class="item-media"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></div>';
                break;
              case "video":
                html += ' <video width="320" height="240"  controls>>';
                html += '    <source src="archiv/' + tdata[7] + '" type="video/mp4">';
                html += '</video>';
                break;
            }




            html += '                         <div class="item-footer">' + moment(tdata[10]).format("DD.MM.YYYY MM:HH") + '</div>';
            html += '                    </div>';
            html += '                    <div class="item-after fileDelete" data-aid="' + tdata[0] + '" data-file="' + tdata[7] + '">löschen</div>';
            html += '                </div>';
            html += '            </a>';
            html += '        </li>';

          }
          $$('#archiv-filelist').html(html);
        } else {
          $$('#archiv-filelist').html("Keine Archiv Daten gespeichert.");
        }

      });

    },
    adminAllArchivfile: function() {
      app.request.post('php/action_load_allArchivfile.php', {}, function(data) {

        var tarr = data.split('#|#'),
          i = 0,
          l = tarr.length,
          tdata, html = '';

        for (i; i < l; i++) {
          tdata = tarr[i].split('#$#');

          switch (tdata[3]) {
            case "audio":
              html += ' <li class="t_file  t_Audio">';
              break;
            case "image":
              html += ' <li class="t_file  t_Bild">';
              break;
            case "aplication":
              html += ' <li class="t_file  t_Document">';
              break;
            case "video":
              html += ' <li class="t_file  t_Video">';
              break;
          }

          html += '            <a href="#" class="item-link item-content">';

          switch (tdata[3]) {
            case "audio":
              html += ' <div class="item-media"><i class="fa fa-music" aria-hidden="true"></i></div>';
              break;
            case "image":
              html += ' <div class="item-media"><i class="fa fa-picture-o" aria-hidden="true"></i></div>';
              break;
            case "aplication":
              html += ' <div class="item-media"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></div>';
              break;
            case "video":
              html += ' <div class="item-media"><i class="fa fa-video-camera" aria-hidden="true"></i></div>';
              break;
          }

          html += '                <div class="item-inner">';
          html += '                    <div class="item-title">';
          html += '                        <div class="item-header">' + tdata[5] + '</div>';
          html += '                        | ' + tdata[1] + '';
          html += '                         <div class="item-footer">' + moment(tdata[10]).format("DD.MM.YYYY MM:HH") + '</div>';
          html += '                    </div>';
          html += '                    <div class="item-after fileDelete" data-aid="' + tdata[0] + '" data-file="' + tdata[7] + '">löschen</div>';
          html += '                </div>';
          html += '            </a>';
          html += '        </li>';

        }
        $$('#archiv-admin-filelist').html(html);


      });

    },
    singlePostFromUserOpen: function(tid, elem) {
      app.request.post('php/action_load_newUserPosts.php', {
        typ: "einzeln",
        tid: tid
      }, function(data) {

        if (data != "") {


          var tarr = data.split('#|#'),
            i = 0,
            l = tarr.length,
            tdata1, html = '',
            html3 = '',
            audio_elm;


          for (i; i < l; i++) {
            tdata1 = tarr[i].split('#$#');

            if (tdata1[5] == "UPLOAD-AUDIO") {
              // es kommt ein beitrag mit einer zeile DIV + DATA wo alles
              // zum audiofile drin ist
              audio_elm = tdata1[1].split('#$$#');

              var audio_file = audio_elm[0],
                audio_id = audio_elm[1],
                audio_uid = audio_elm[2],
                audio_agid = audio_elm[3],
                audio_filetitle = audio_elm[4],
                audio_fileundertitle = audio_elm[5],
                audio_filesize = audio_elm[6],
                audio_playtime = audio_elm[7];



              html3 += '    <div id="profil_contentBOX' + tdata1[0] + '" class="card demo-facebook-card audioBeitrag">';
              html3 += '     <div class="card-header">';
              html3 += '         <div class="demo-facebook-avatar showUser" data-uid="' + tdata1[2] + '"><img src="useruploads/profilbilder/' + tdata1[6] + '" width="34" height="34"/></div>';
              html3 += '         <div class="demo-facebook-name">' + tdata1[3] + '</div>';
              html3 += '         <div class="demo-facebook-date size-10">' + moment(tdata1[4]).format("DD.MM.YYYY - HH:mm") + ' Uhr</div>';
              html3 += '     </div>';
              html3 += '     <div class="card-content card-content-padding row siteContentAndImages">';
              html3 += '            <div class="col-20 player-play-button"  data-file="' + audio_file + '" data-id="' + audio_id + '" data-uid="' + audio_uid + '" data-agid=""> ';
              html3 += '                 <i class=" fa fa-play fa-3x text-color-orange"></i>';
              html3 += '            </div> ';
              html3 += '            <div class="col-80">' + audio_filetitle + '';
              html3 += '                <h3>' + audio_filetitle + '</h3>';
              html3 += '                <div>' + audio_fileundertitle + '</div>';
              html3 += '            </div>';
              html3 += '            <div   style="background-color: #36bef421; width:100%">';
              html3 += '                  <div  >Kommentare:</div>';
              html3 += '                 <div class="list media-list">';
              html3 += '                     <ul class="commentsBox">';
              html3 += '                    </ul>';
              html3 += '                 </div>';
              html3 += '            </div>';
              html3 += '     </div>';
              html3 += '     <div class="card-footer">';



              html3 += ' </div>';
              html3 += '                    <img src="useruploads/profilbilder/' + app.data.user.img + '" width="34" height="34">';

              html3 += '                   <textarea id="cominput' + tdata1[0] + '" class="resizable" placeholder="Dein Kommentar hier ... " style="width: 100%"></textarea>';

              html3 += '        <div class="block"><a class="button fill-form-from-data saveComment" data-pid="' + tdata1[0] + '" data-creatorid="' + tdata1[2] + '" href="#">speichern</a></div>';

            } else {

              html3 += '     <div id="profil_contentBOX' + tdata1[0] + '" class="card demo-facebook-card textBeitrag">';
              html3 += '        <div class="card-header">';
              html3 += '          <div class="demo-facebook-avatar showUser" data-uid="' + tdata1[2] + '"><img src="useruploads/profilbilder/' + tdata1[6] + '" width="34" height="34"/></div>';
              html3 += '          <div class="demo-facebook-name">' + tdata1[3] + '</div>';
              html3 += '          <div class="demo-facebook-date size-10">' + moment(tdata1[4]).format("DD.MM.YYYY - HH:mm") + ' Uhr</div>';
              html3 += '      </div>';
              html3 += '      <div class="card-content siteContentAndImages"> ';
              html3 += '         ' + tdata1[1] + ' ';
              html3 += '          <div   style="background-color: #36bef421; width:100%">';
              html3 += '               <div >Kommentare:</div>';
              html3 += '                <div class="list media-list">';
              html3 += '                    <ul class="commentsBox">';
              html3 += '                   </ul>';
              html3 += '                </div>';
              html3 += '           </div>';
              html3 += '      </div>';
              html3 += '      <div class="card-footer">';
              html3 += '  </div>';
              html3 += '                    <img src="useruploads/profilbilder/' + app.data.user.img + '" width="34" height="34">';

              html3 += '                   <textarea id="cominput' + tdata1[0] + '" class="resizable" placeholder="Dein Kommentar hier ... " style="width: 100%"></textarea>';

              html3 += '        <div class="block"><a class="button fill-form-from-data saveComment" data-pid="' + tdata1[0] + '" data-creatorid="' + tdata1[2] + '" href="#">speichern</a></div>';


            }
          }

          $$(elem).html(html3);
          app.methods.senderpreloader_close();
          app.methods.singlePostFromUserComments(tdata1[0]);


        } else {
          $$(elem).html("<div>Leider keinen Beitrag gefunden.</div>");
          app.methods.senderpreloader_close();
        }
      });


    },
    singlePostFromUserComments: function(tid) {
      app.request.post('php/action_load_newUserPosts.php', {
        typ: "einzelnComments",
        tid: tid
      }, function(data) {
        $$(".commentsBox").html("");
        // KOMMETARE 

        if (data != "") {



          var tarr = data.split('#|#'),
            i = 0,
            l = tarr.length,
            tdata, html = '',
            html = '';


          for (i; i < l; i++) {
            tdata = tarr[i].split('#$#');

            html += '  <li>';
            html += '       <div class="item-content">';
            html += '           <div class="item-media">';
            if (tdata[7] != "") {
              html += '   <img  src="useruploads/profilbilder/' + tdata[7] + '" height="30" style="height:40px">   ';
            } else {
              html += '  <i class="fa fa-user-circle " aria-hidden="true"> </i>  ';
            }
            html += '       </div>';
            html += '       <div class="item-inner">';
            html += '           <div class="">';
            html += '               <div class="item-title">' + tdata[2] + '</div>';
            html += '           </div>';
            html += '           <div class="item-subtitle"> <small>' + moment(tdata[4]).format("DD.MM.YYYY - HH:mm") + ' von ' + tdata[5] + ' ' + tdata[6] + ' </small></div>';
            html += '       </div>';
            html += '   </li>';

          }

          $$(".commentsBox").html(html);
        } else {
          $$(".commentsBox").html("keine Kommentare.");
        }


      });
    },
    saveComment: function(pid, creatorid, txt) {


      app.request.post('php/action_profil_content.php', {
        typ: "save_comment",
        pid: pid,
        creatorid: creatorid,
        txt: txt
      }, function(data) {
        app.methods.singlePostFromUserComments(pid);

      });
    },
    loadChatUser2User: function(uidReciver) {
      app.request.post('php/action-talk-Messages.php', {
        typ: "loadChatUser2User",
        uidReciver: uidReciver
      }, function(data) {
        if (data != "") {

          var tarr = data.split('#|#'),
            i = 0,
            l = tarr.length,
            tdata, html = '';

          for (i; i < l; i++) {

            tdata = tarr[i].split('#$#');

            // messages fremduser, nachricht zu mir
            if (tdata[1] == uidReciver) {

              html += '  <li class="other">';

              if (tdata[8] != "") {
                html += '       <div class="avatar"><img src="useruploads/profilbilder/' + tdata[8] + '" draggable="false"/></div>';
              } else {
                html += '       <div class="avatar"><i class="fa fa-user fa-3x" aria-hidden="true"></i></div>';
              }

              html += '     <div class="msg">';
              html += '       <p>' + tdata[4] + '</p>';
              html += '       <time>' + moment(tdata[3]).format("HH:mm") + '</time>';
              html += '     </div>';
              html += '   </li>';
            }

            // message zum fremden / nachricht von mir
            if (tdata[1] == app.data.user.id) {
              html += '  <li class="self">';

              if (app.data.user.img != "") {
                html += '       <div class="avatar"><img src="useruploads/profilbilder/' + app.data.user.img + '" draggable="false"/></div>';
              } else {
                html += '       <div class="avatar"><i class="fa fa-user fa-3x" aria-hidden="true"></i></div>';
              }


              html += '     <div class="msg">';
              html += '       <p>' + tdata[4] + '</p>';
              html += '       <time>' + moment(tdata[3]).format("HH:mm") + '</time>';
              html += '     </div>';
              html += '   </li>';
            }

          }
          $$("ol.chat").html(html);

        } else {
          $$("ol.chat").html("Du schreibst mit sender.fm direkt. Andere Mitglieder können dies nicht einsehen!");
        }

      });
    },
    loadChatUser2UserOverview: function() {
      app.request.post('php/action-talk-Messages.php', {
        typ: "loadChatUser2UserOverview"
      }, function(datas) {
        if (datas != "") {
          var from_me = datas.split("#@@#")[0];
          var to_me = datas.split("#@@#")[1];

          var data = from_me + '#|#' + to_me

          var tarr = data.split('#|#'),
            i = 0,
            l = tarr.length,
            tdata, html = '';

          for (i; i < l; i++) {

            tdata = tarr[i].split('#$#');

            if (tdata[2] == app.data.user.id) {
              // nachrichten an mich
              html += '<li class="chat_to_me " style="background-color: #e91e6326!important;">';
              html += '    <a href="#"  onclick="app.router.navigate(\'/profil-talk-user2user/?uidReciver=' + tdata[1] + '\')" class="item-link item-content">';
              html += '        <div class="item-media"> ';
              if (tdata[8] != "") {
                html += '       <div class="avatar"><img src="useruploads/profilbilder/' + tdata[8] + '" width="34" height="34"  draggable="false"/></div>';
              } else {
                html += '       <div class="avatar"><i class="fa fa-user fa-3x" aria-hidden="true"></i></div>';
              }
              if (tdata[11] != "") {
                html += '       <div class="avatar"><img src="useruploads/profilbilder/' + tdata[11] + '" width="24" height="24"  draggable="false"/></div>';
              } else {
                html += '       <div class="avatar"><i class="fa fa-user fa-2x" aria-hidden="true"></i></div>';
              }

              html += '         </div>';
              html += '        <div class="item-inner">';
              html += '                <div class="item-title-row">';
              html += '                    <div class="item-title">' + tdata[6] + ' ' + tdata[7] + '</div>';
              html += '                    <div class="item-after">' + moment(tdata[3]).format("DD-MM-YYYY HH:mm") + '</div>';
              html += '                </div>';
              html += '                <div class="item-subtitle">an ' + tdata[9] + ' ' + tdata[10] + ' gesendet</div>';
              html += '                <div class="item-text">';
              html += tdata[4];

              html += '                </div>';
              html += '        </div>';
              html += '    </a>';
              html += '</li>';
            } else {
              // nachrichten von mir
              html += '<li class="chat_from_me  "  style="background-color: #ff98003d!important;">';
              html += '    <a href="#" onclick="app.router.navigate(\'/profil-talk-user2user/?uidReciver=' + tdata[2] + '\')" class="item-link item-content">';
              html += '        <div class="item-media"> ';
              if (tdata[8] != "") {
                html += '       <div class="avatar"><img src="useruploads/profilbilder/' + tdata[8] + '" width="34" height="34"  draggable="false"/></div>';
              } else {
                html += '       <div class="avatar"><i class="fa fa-user fa-3x" aria-hidden="true"></i></div>';
              }
              if (tdata[11] != "") {
                html += '       <div class="avatar"><img src="useruploads/profilbilder/' + tdata[11] + '" width="24" height="24"  draggable="false"/></div>';
              } else {
                html += '       <div class="avatar"><i class="fa fa-user fa-2x" aria-hidden="true"></i></div>';
              }
              html += '         </div>';
              html += '        <div class="item-inner">';
              html += '                <div class="item-title-row">';
              html += '                    <div class="item-title">' + app.data.user.username + '</div>';
              html += '                    <div class="item-after">' + moment(tdata[3]).format("DD-MM-YYYY HH:mm") + '</div>';
              html += '                </div>';
              html += '                <div class="item-subtitle">an ' + tdata[9] + ' ' + tdata[10] + ' gesendet</div>';
              html += '                <div class="item-text">';
              html += tdata[4];

              html += '                </div>';
              html += '        </div>';
              html += '    </a>';
              html += '</li>';
            }

          }
          $$("#chatUserOverview").html(html);

        } else {
          $$("#chatUserOverview").html("0 Chats");
        }


      });
    },
    loadChatRedaktion: function(rid) {
      // console.log("loadChatRedaktion rid => " + rid); 
      app.request.post('php/action-talk-Messages.php', {
        typ: "loadChatRedaktion",
        rid: rid
      }, function(data) {

        if (data != "") {

          var tarr = data.split('#|#'),
            i = 0,
            l = tarr.length,
            tdata, html = '';

          for (i; i < l; i++) {

            tdata = tarr[i].split('#$#');

            // messages fremduser, nachricht zu mir
            if (tdata[2] != app.data.user.id) {

              html += '  <li class="other">';

              if (tdata[8] != "") {
                html += '       <div class="avatar"><img src="useruploads/profilbilder/' + tdata[8] + '" draggable="false"/></div>';
              } else {
                html += '       <div class="avatar"><i class="fa fa-user fa-3x" aria-hidden="true"></i></div>';
              }

              html += '     <div class="msg">';
              html += '       <p>' + tdata[3] + '</p>';
              html += '       <time>von: ' + tdata[6] + ' ' + tdata[7] + '' + moment(tdata[4]).format("HH:mm") + '</time>';
              html += '     </div>';
              html += '   </li>';
            }

            // message zum fremden / nachricht von mir
            if (tdata[2] == app.data.user.id) {
              html += '  <li class="self">';

              if (app.data.user.img != "") {
                html += '       <div class="avatar"><img src="useruploads/profilbilder/' + app.data.user.img + '" draggable="false"/></div>';
              } else {
                html += '       <div class="avatar"><i class="fa fa-user fa-3x" aria-hidden="true"></i></div>';
              }

              html += '     <div class="msg">';
              html += '       <p>' + tdata[3] + '</p>';
              html += '       <time>' + moment(tdata[4]).format("HH:mm") + '</time>';
              html += '     </div>';
              html += '   </li>';
            }

          }
          $$("ol.chat").html(html);

        } else {
          $$("ol.chat").append("Gruppenchat ist lehr. Hier kannst du innerhalb der Redaktion schreiben. Dies ist nur für Mitglieder der Redaktion sichtbar.");
        }

      });
    },

  },
  // Toolbarhide on scroll

  toolbar: {
    hideOnPageScroll: true,
  },
  statusbar: {
    iosOverlaysWebView: true,
  },

  navbar: {
    hideOnPageScroll: true,
  },

  // App routes
  routes: routes,
});



var mainView = app.views.create('.view-main', {
  url: '/',
  on: {
    pageBeforeIn: function(event, page) {
      app.methods.checksession('logged');
    },
    pageInit: function(event, page) {

      app.popup.close();
      app.panel.close();
      app.toast.close();
    },
    pageBeforeRemove: function(event, page) {
      app.panel.close();
    },
  }
});


/*
+
+  TOASTs dialog
*/
// gespeichert
var toast_saved = app.toast.create({
  text: 'gespeichert',
  closeTimeout: 3000,
  closeButton: true,
  on: {
    close: function() {
      app.popup.close();
    },
  }
});

// upload abgelschlossen
var toastUploadCallback = app.toast.create({
  text: 'Dein Upload ist abgeschlossen!',
  closeTimeout: 3000,
  closeButton: true,
  on: {
    close: function() {
      app.popup.close();
      app.loadProfilAudios;
    },
  }
});

// Beitrag gelöscht
var BeitragDeleteCallback = app.toast.create({
  text: 'Der Beitrag wurde gelöscht!',
  closeTimeout: 3000,
  closeButton: true,
  on: {
    close: function() {
      app.popup.close();

    },
  }
});

// Audio gelöscht
var ArchivDeleteCallback = app.toast.create({
  text: 'Die Datei wurde aus dem Archiv gelöscht!',
  closeTimeout: 3000,
  closeButton: true,
  on: {
    close: function() {
      app.popup.close();

    },
  }
});

// Es gab einen Fehler beim speichern
var toastSaveErrorCallback = app.toast.create({
  text: 'Es gab einen unerwarteten Fehler beim speichern!',
  closeTimeout: 3000,
  closeButton: true,
  on: {
    close: function() {
      app.popup.close();
      toastsendErrorToSenderfm.open();
    },
  }
});

// AudioTaggen
var toastAudioTaggenOK = app.toast.create({
  text: 'ok! findest du auf deiner "Merkelist"',
  closeTimeout: 3000,
  closeButton: true,
  on: {
    close: function() {

      app.popup.close();
    },
  }
});

// User in Redaktion
var toastUserInRedaktion = app.toast.create({
  text: 'User ist der Redaktion hinzugefügt!',
  closeTimeout: 3000,
  closeButton: true,
  on: {
    close: function() {

      app.popup.close();
    },
  }
});

// User aus Redaktion entfernt
var toastUserOutRedaktion = app.toast.create({
  text: 'User wurde aus der Redaktion entfernt!"',
  closeTimeout: 3000,
  closeButton: true,
  on: {
    close: function() {

      app.popup.close();
    },
  }
});


// User aus Redaktion entfernt
var toastUserIsActiv = app.toast.create({
  text: 'User ist jetzt aktiviert und das Profil ist freigegeben! Bitte lade die Seite neu!',
  closeTimeout: 10000,
  closeButton: true,
  on: {
    close: function() {

      app.popup.close();
    },
  }
});



// Eine Fehlermeldung wurde an sender.fm gesendet
var toastsendErrorToSenderfm = app.toast.create({
  text: 'Eine Fehlermeldung wurde an sender.fm gesendet!',
  closeTimeout: 3000,
  closeButton: true,
  on: {
    close: function() {
      // app.dialog.alert('Danke');
      app.popup.close();

    },
  }
});

// Create dynamic Popup
var defaultPopup = app.popup.create({
  content: '<div class="popup" style="overflow:auto">' +
    '<div class="navbar">' +
    '<div class="navbar-inner sliding">' +
    '    <div class="left defaultPopup-nav-left"></div>' +
    '    <div class="title defaultPopup-nav-title"></div>' +
    '    <div class="righ defaultPopup-nav-right"><a href="#" class="link popup-close">Schließen</a></div>' +
    '</div>' +
    '</div>' +
    '<div class="page-content">' +
    '<div class="block content-block  defaultPopup-content ">' +
    '  <p>Scroll page down</p>' +
    ' </div>' +
    '</div>' +
    '</div>',
  // Events
  on: {
    open: function(popup) {
      //  console.log('Popup open');
    },
    opened: function(popup) {
      // console.log('Popup opened');
    },
  }
});
// Events also can be assigned on instance later
defaultPopup.on('close', function(popup) {
  //  console.log('Popup close');
});



$$(document).on('page:init', '.page[data-name="home"]', function(e) {


  app.methods.loadGoodNews();
  app.methods.streamTitle();
  app.methods.radioINIT();
  app.methods.radioINITMusik();
  setTimeout(function() {

    app.request.post('php/action_sendeplan_future.php', {}, function(data) {

      var tarr = data.split('#|#'),
        i = 0,
        l = tarr.length,
        tdata, html = '';

      for (i; i < l; i++) {
        tdata = tarr[i].split('#$#');

        html += '  <div class="card card-outline elevation-demo elevation-6 elevation-hover-24 elevation-pressed-12 elevation-transition"  data-id="' + tdata[0] + '" >';
        html += '     <div class="card-header"><b>' + moment(tdata[3]).format('HH:mm') + '&nbsp;-&nbsp;' + tdata[4] + '</b></div>';
        html += '     <div class="card-content card-content-padding">  ';
        html += '        <div>' + urlify(tdata[5]) + '</div> <br> ';
        html += '        <div>' + urlify(tdata[7]) + '</div> <br> ';

        if (tdata[6] != "https://sender.fm") {
          html += '         <a href="' + tdata[6] + '" class="link external" target="_blank"> ';
          html += '    <div class="chip">';
          html += '         <div class="chip-media bg-color-green">';
          html += '           <i class="fa fa-link"></i>';
          html += '         </div>';
          html += '         <div class="chip-label">' + tdata[6] + '</div>';
          html += '       </div></a>';
        }
        html += '     </div>';

        html += ' </div><br>';

      }

      //$$('#next_sendung_main_box').html(html);
      $$('#loader-wrapper').css("display", "none");
      $$(".button-box-users").attr("onclick", "app.router.navigate(\'/sendeplan/\')").html('<i class="fa fa-calendar fa-2x"></i>');

    });

  }, 300);

});



$$(document).on('page:init', '.page[data-name="admin-talk-senderfm"]', function(e) {
  app.methods.loadAdminTalkMessages();

});

$$(document).on('page:init', '.page[data-name="admin-talk-userchat-senderfm"]', function(userid) {

});


// admin talk zum talk mit user laden

$$(document).on("click", ".admin_goToTalk", function() {
  app.data.user.txtID_chatANSWER = $$(this).attr("data-txtid");
  app.data.user.userID_chatReciver = $$(this).attr("data-userid");
  app.router.navigate("/admin-talk-userchat-senderfm/");
  app.methods.loadTalkMessages(app.data.user.userID_chatReciver, "admintalk");
  $$(".adminsendbutton_").data("txtid", app.data.user.txtID_chatANSWER);
  $$(".adminsendbutton_").data("userid", app.data.user.userID_chatReciver);

});



// admin talk zum talk mit user laden
$$(document).on("click", ".goToTalk", function() {
  app.user.userIDchatANSWER = $$(this).attr("data-userid");
  app.methods.loadTalkMessages(app.user.userIDchatANSWER, "user");
});


$$(document).on("click", ".adminsendbutton_", function() {

  var text = $$("input.textarea_").val();
  var txtid = app.data.user.txtID_chatANSWER;
  var userid = app.data.user.userID_chatReciver;


  app.request.post('php/action-talk-Messages.php', {
    typ: "saveAdminAnswerMessages",
    userid: userid,
    text: text,
    txtid: txtid
  }, function(data) {

    var html = '  <li class="self">';
    if (app.data.user.img != "") {
      html += '       <div class="avatar"><img src="images/site/logo120_trans.png" draggable="false"/></div>';
    }
    html += '     <div class="msg">';
    html += '       <p>' + text + '</p>';
    html += '       <time>' + moment().format("HH:mm") + '</time>';
    html += '     </div>';
    html += '   </li>';

    $$("ol.chat").append(html);
    $$("input.textarea_").val("");

  });


});




// CHAT USER 2 USER, wenn ich einen user besuche und 1 zu 1 chat
$$(document).on('click', '.newUserChat', function() {
  var uid = $$(this).data("uid");

  //app.data.user.txtID_chatANSWER = $$(this).attr("data-txtid");
  app.data.user.userID_chatReciver = uid;

  app.router.navigate("/profil-talk-user2user/?uidReciver=" + app.data.user.userID_chatReciver + "");

});



$$(document).on('page:init', '.page[data-name="profil-talk-user2user"]', function(e) {
  app.data.user.userID_chatReciver = e.detail.route.query.uidReciver;
  app.methods.loadChatUser2User(app.data.user.userID_chatReciver);

});




// CHAT USER 2 USER, wenn ich in meinem profil die chat übersicht offene wo mehrer chats zur auswahl stehen
$$(document).on('click', '.newUserChat_Overview', function() {

  app.router.navigate("/profil-talk-user2userOverview/");

});


$$(document).on('page:init', '.page[data-name="profil-talk-user2userOverview"]', function(e) {
  app.methods.loadChatUser2UserOverview();
});




$$(document).on("click", ".profilsendbutton_", function() {
  var text = $$(".profiltextarea_").val();

  var uidReciver = app.data.user.userID_chatReciver;
  var uidSend = app.data.user.id;


  app.request.post('php/action-talk-Messages.php', {
    typ: "saveUser2UserMessages",
    uidReciver: uidReciver,
    text: text,
    uidSend: uidSend
  }, function(data) {

    var html = '  <li class="self">';
    if (app.data.user.img != "") {
      html += '       <div class="avatar"><img src="useruploads/profilbilder/' + app.data.user.img + '" draggable="false"/></div>';
    }
    html += '     <div class="msg">';
    html += '       <p>' + text + '</p>';
    html += '       <time>' + moment().format("HH:mm") + '</time>';
    html += '     </div>';
    html += '   </li>';

    $$("ol.chat").append(html);
    $$("input.profiltextarea_").val("");

  });


});




// CHAT USER 2 USER, wenn ich einen user besuche und 1 zu 1 chat
$$(document).on('click', '#chat_Redaktion', function() {
  var rid = app.data.redaktion.thisRID;

  app.router.navigate("/redaktion-talk-user2user/");

});


$$(document).on('page:init', '.page[data-name="redaktion-talk-user2user"]', function(e) {
  app.methods.loadChatRedaktion(app.data.redaktion.thisRID);
});




$$(document).on("click", ".groupsendbutton_", function() {
  var text = $$(".grouptextarea_").val();

  var rid = app.data.redaktion.thisRID;

  app.request.post('php/action-talk-Messages.php', {
    typ: "saveChatTextRedaktion",
    text: text,
    rid: rid
  }, function(data) {

    var html = '  <li class="self">';
    if (app.data.user.img != "") {
      html += '       <div class="avatar"><img src="useruploads/profilbilder/' + app.data.user.img + '" draggable="false"/></div>';
    }
    html += '     <div class="msg">';
    html += '       <p>' + text + '</p>';
    html += '       <time>' + moment().format("HH:mm") + '</time>';
    html += '     </div>';
    html += '   </li>';

    $$("ol.chat").append(html);
    $$("input.grouptextarea_").val("");

  });


});




$$(document).on('click', '.copyToClipboard', function() {
  var toastBottom = app.toast.create({
    text: '<h3>Der Link ist in die Zwischenablage kopiert.</h3> Danke für\'s teilen <i class="fa fa-heart-o" aria-hidden="true"></i>',
    closeTimeout: 3000,
  });
  toastBottom.open();
});



$$(document).on('page:init', '.page[data-name="chat-senderfm"]', function() {
  app.methods.loadTalkMessages(app.data.user.id, "user");
});



$$(document).on("click", ".sendbutton_", function() {
  var text = $$("input.textarea_").val();

  app.request.post('php/action-talk-Messages.php', {
    typ: "saveMessages",
    userid: app.data.user.id,
    text: text
  }, function(data) {

    var html = '  <li class="self">';
    if (app.data.user.img != "") {
      html += '       <div class="avatar"><img src="useruploads/profilbilder/' + app.data.user.img + '" draggable="false"/></div>';
    } else {
      html += '       <div class="avatar"><i class="fa fa-user fa-3x" aria-hidden="true"></i></div>';
    }
    html += '     <div class="msg">';
    html += '       <p>' + text + '</p>';
    html += '       <time>' + moment().format("HH:mm") + '</time>';
    html += '     </div>';
    html += '   </li>';

    $$("ol.chat").append(html);
    $$("input.textarea_").val("");

  });


});




// FOCUS editor
$$(document).on("click", ".senderfm_editor", function() {
  app.data.quill.focus();
});




// AUDIO PLAY 
$$(document).on("click", ".player-play-button", function() {
  app.methods.playerAudioPlay($$(this));

});


// RADIO PLAY 
// INIT wird beim start der seite gemacht .. 
$$(document).on("click", ".radio-play-button", function() {
  clearInterval(app.data.streamTitleInterval);

  if (app.data.player != null && app.data.player !== undefined) {
    app.data.player.stop();
    app.data.player = null;

  }

  clearInterval(app.data.user.interval);
  // HTML in toolbar setzen
  //Wenn läuft und pause geklickt
  if (app.data.radio.stations[0].howl != null) {
    if (app.data.radio.stations[0].howl.playing()) {
      app.data.radio.stop();
      return;
    } else {
      //  console.log("radio play" );
      if (app.data.user.logged) {
        $$(document).find("#toolbar_radio").html(app.data.radioHTMLonline);
      } else {
        $$(document).find("#toolbar_radio").html(app.data.radioHTML);
      }

      app.data.radio.play(0);
      app.methods.streamTitle();
      $$(".radio-play-button i").removeClass("fa-play-circle-o").addClass("fa-spinner fa-spin fa-fw");
    }
  } else {
    if (app.data.user.logged) {
      $$(document).find("#toolbar_radio").html(app.data.radioHTMLonline);
    } else {
      $$(document).find("#toolbar_radio").html(app.data.radioHTML);
    }
    app.data.radio.play(0);
    app.methods.streamTitle();
    $$(".radio-play-button i").removeClass("fa-play-circle-o").addClass("fa-spinner fa-spin fa-fw");

  }



});



$$(document).on("click", ".imageInPost", function() {
  var is = $$(this).closest(".siteContentAndImages").html();
  var images = $$(is).find('.imageInPost');
  app.methods.showImageinPost(images);
});




/*
+  Hauptbereich
*/




$$(document).on('page:init', '.page[data-name="login"]', function(e) {

  app.request.post('php/action_admin_texte.php', {
    typ: "login"
  }, function(data) {
    $$("#siteText_login").html(data);
  });

  $$('#login-button').on('click', function() {

    var mail_ = $$('#login-name').val();
    var pwd_ = SHA512($$('#login-pwd').val());
    if (mail_ == "") {
      app.dialog.alert('Bitte E-Mail eintragen!');
      return;
    }
    if (pwd_ == "") {
      app.dialog.alert('Bitte Passwort eintragen!');
      return;
    }
    if (mail_ != "" && pwd_ != "") {
      app.request.post('php/login.php', {
        mail: mail_,
        pwd: pwd_
      }, function(data) {
        if (data == "OK") {
          app.data.user.logged = true;

          app.router.navigate('/profil/');

        } else {
          app.data.user.logged = false;

          app.dialog.alert('Es gab ein problem mit der Anmeldung! Bitte versuche es noch einmal!');
        }
      });

    } // if mail && pwd
  });

  // passwort ändern
  $$('#pwd-change-button').on('click', function() {
    var mail_ = $$('#login-name').val();
    if (mail_ == "") {
      app.dialog.alert('Bitte E-Mail eintragen!');
      return;
    }

    if (mail_ != "") {
      app.request.post('php/action_login_pwd_change.php', {
        mail: mail_
      }, function(data) {
        if (data == "Message sent") {
          app.dialog.alert('Bitte schaue in deinem E-Mail Postfach nach und folge dem Link in unserer Mail.');
        }
        if (data == "nixzufinden") {
          app.dialog.alert('Diese E-Mail ist nicht in unserem System gespeichert.');
        }


      });

    } // if mail && pwd
  });




});

// LOGOUT
$$(document).on('click', '.open-confirm-logout', function() {
  app.dialog.confirm('Abmelden?', function() {

    app.request.post('php/logout.php', {}, function(data) {
      app.popup.close();
      app.panel.close();
      app.data.user.logged = false;
      app.methods.checksession();
      app.router.navigate('/');
    });
  });
});



$$(document).on('page:init', '.page[data-name="registrieren"]', function() {

  app.request.post('php/action_admin_texte.php', {
    typ: "register"
  }, function(data) {
    $$("#siteText_register").html(data);
  });




  $$('input[type="checkbox"]').on('change', function() {

    if (this.checked) {

      $$('#submitbox').html('<button id="register_save" class="col button button-fill color-pink">registrieren</button>')

    } else {

      $$('#register_save').remove();
    }
  });


  $$(document).on('click', '#register_save', function(e) {

    var vorname = $$("#form_reg_vorname").val();
    var nachname = $$("#form_reg_nachname").val();
    var mail = $$("#form_reg_email").val();
    var pwd = $$("#form_reg_pwd").val();
    var pwd2 = $$("#form_reg_pwd2").val();
    var gender = "";
    var agb_check = $$('#form_reg_agb_check').prop('checked');

    if (vorname == "") {
      return;
    }

    if (nachname == "") {
      return;
    }
    if (mail == "") {
      return;
    }


    if (pwd == "") {
      return;
    } else {}

    if (pwd2 == "") {
      return;
    } else {}



    if (!agb_check) {} else {}


    if (pwd != pwd2) {
      return;
    } else {


      app.request.post('php/action_save_register.php', {
        vorname: vorname,
        nachname: nachname,
        mail: mail,
        gender: gender,
        pwd: SHA512(pwd)
      }, function(data) {

        if (data == "Mail in DB") {
          app.dialog.alert('Diese Daten (E-Mail) sind schon in unserer Datenbank gespeichert!');
          app.router.navigate('/login/', 'reloadAll');
        }

        if (data == "Message sent") {
          app.dialog.alert('Danke! Eine Mail wurde an dich gesendet. Bitte bestätige noch deine E-Mail.');
          app.router.navigate('/login/', 'reloadAll');
        }
      });
    }
  });
});


$$(document).on('page:init', '.page[data-name="sendeplan"]', function(e) {
  app.accordion.open('.accordion-list');


  app.methods.calendarInline();

  app.methods.loadDay_Programmplan(moment().format('D'), moment().format('MM'), moment().format('YYYY'));

  $$('.calenderToggle').on('click', function() {
    $$('.accordion-item-toggle').click();
  });
  $$('.accordion-item-toggle').click();

});




$$(document).on('page:init', '.page[data-name="chronik"]', function(e) {
  app.methods.senderpreloader_open();

  // Beiträge
  app.request.post('php/action_load_newUserPosts.php', {
    typ: "news"
  }, function(data) {

    if (data != "") {
      var tarr = data.split('#|#'),
        i = 0,
        l = tarr.length,
        tdata1, html = '',
        html3 = '',
        audio_elm;

      for (i; i < l; i++) {
        tdata1 = tarr[i].split('#$#');

        if (tdata1[5] == "UPLOAD-AUDIO") {
          // es kommt ein beitrag mit einer zeile DIV + DATA wo alles
          // zum audiofile drin ist
          audio_elm = tdata1[1].split('#$$#');

          var audio_file = audio_elm[0],
            audio_id = audio_elm[1],
            audio_uid = audio_elm[2],
            audio_agid = audio_elm[3],
            audio_filetitle = audio_elm[4],
            audio_fileundertitle = audio_elm[5],
            audio_filesize = audio_elm[6],
            audio_playtime = audio_elm[7];


          html3 += '    <div id="profil_contentBOX' + tdata1[0] + '" class="card demo-facebook-card audioBeitrag">';
          html3 += '     <div class="card-header">';
          html3 += '         <div class="demo-facebook-avatar showUser" data-uid="' + tdata1[2] + '"> ';
          if (tdata1[8] != "") {
            html3 += '        <img src="useruploads/profilbilder/' + tdata1[8] + '" width="34" height="34" draggable="false"/> ';
          } else {
            html3 += '       < <i class="fa fa-bars fa-3x" aria-hidden="true"></i>';
          }

          html3 += '          </div>';
          html3 += '         <div class="demo-facebook-name">' + tdata1[3] + '</div>';
          html3 += '         <div class="demo-facebook-date size-10">' + moment(tdata1[4]).format("DD.MM.YYYY - HH:mm") + ' Uhr</div>';
          html3 += '     </div>';
          html3 += '     <div class="card-content card-content-padding row siteContentAndImages">';
          html3 += '     <div class="col-20 player-play-button"  data-file="' + audio_file + '" data-id="' + audio_id + '" data-uid="' + audio_uid + '" data-agid=""> ';
          html3 += '         <i class=" fa fa-play fa-3x text-color-orange"></i>';
          html3 += '     </div> ';
          html3 += '         <div class="col-80">' + audio_filetitle + '';
          html3 += '             <h3>' + audio_filetitle + '</h3>';
          html3 += '             <div>' + audio_fileundertitle + '</div>';
          html3 += '         </div>';
          html3 += '     </div>';
          html3 += '     <div class="card-footer">';
          html3 += '         <a href="#" class="link tdiamonds"><i class="fa fa-diamond text-color-orange" aria-hidden="true"></i></a>';
          html3 += '         <a href="#" class="link tcomments" data-uid="' + tdata1[0] + '"><i class="fa fa-comment-o text-color-orange" aria-hidden="true">' + tdata1[9] + '</i></a>';
          html3 += '         <a href="#" class="link audioTaggen"><i class="fa fa-tag text-color-orange" aria-hidden="true"></i></a>';
          html3 += '     </div>';
          html3 += ' </div>';


        } else {

          html3 += '     <div id="profil_contentBOX' + tdata1[0] + '" class="card demo-facebook-card textBeitrag">';
          html3 += '        <div class="card-header">';
          html3 += '          <div class="demo-facebook-avatar showUser" data-uid="' + tdata1[2] + '">';
          if (tdata1[8] != "") {
            html3 += '       <div class="avatar"><img src="useruploads/profilbilder/' + tdata1[8] + '" width="34" height="34" draggable="false"/></div>';
          } else {
            html3 += '       <div class="avatar"><i class="fa fa-user fa-3x" aria-hidden="true"></i></div>';
          }
          html3 += '          </div>';
          html3 += '          <div class="demo-facebook-name">' + tdata1[3] + '</div>';
          html3 += '          <div class="demo-facebook-date size-10">' + moment(tdata1[4]).format("DD.MM.YYYY - HH:mm") + ' Uhr</div>';
          html3 += '      </div>';
          html3 += '      <div class="card-content siteContentAndImages"> ';
          html3 += '         ' + tdata1[1] + ' ';
          html3 += '      </div>';
          html3 += '      <div class="card-footer">';
          html3 += '          <a href="#" class="link tdiamonds"><i class="fa fa-diamond text-color-orange" aria-hidden="true"></i></a>';
          html3 += '          <a href="#" class="link tcomments" data-uid="' + tdata1[0] + '"><i class="fa fa-comment-o text-color-orange" aria-hidden="true">' + tdata1[9] + '</i></a>';
          html3 += '          <a href="#" class="link audioTaggen"><i class="fa fa-share-alt text-color-orange" aria-hidden="true"></i></a></div>';
          html3 += '  </div>';

        }
      }

      $$('#content-box').html(html3);
      app.methods.senderpreloader_close();

    } else {
      $$("#content-box").html("<div>0 Beiträge von Mitgliedern</div>");
      app.methods.senderpreloader_close();
    }


  });


  $$(".chronikShowAudio").on("click", function() {
    $$(".chronikShowBeitrag").removeClass("button-fill")
    $$(this).addClass("button-fill");
    $$(".textBeitrag").hide();
    $$(".textAudio").show()

  });
  $$(".chronikShowBeitrag").on("click", function() {
    $$(".chronikShowAudio").removeClass("button-fill")
    $$(this).addClass("button-fill");
    $$(".textAudio").hide();
    $$(".textBeitrag").show();

  });

});


$$(document).on("click", ".tcomments", function() {
  var uid = $$(this).attr("data-uid");
  console.log("tcomments uid=> " + uid);
  defaultPopup.open();
  $$(".defaultPopup-nav-left").html();
  $$(".defaultPopup-nav-title").html("Userbeitrag (" + uid + ")");
  $$(".defaultPopup-nav-right").html();

  app.methods.singlePostFromUserOpen(uid, ".defaultPopup-content");



});



$$(document).on('page:init', '.page[data-name="mitglieder"]', function(e) {
  // nach anmeldedatum sortiert
  app.methods.loadMitgliederDatum("#mitglieder_box_ul");


  $$(document).on("click", ".filters", function() {
    var filter = $$(this).data("filter");
    if (filter == "alphabet") {
      $$(this).data("filter", "datum");
      $$(".filters i").removeClass("fa-sort-alpha-asc").addClass("fa-sort-amount-desc");
      app.methods.loadMitgliederAlphabet("#mitglieder_box_ul");
    } else {
      $$(this).data("filter", "alphabet");
      $$(".filters i").removeClass("fa-sort-amount-desc").addClass("fa-sort-alpha-asc");
      app.methods.loadMitgliederDatum("#mitglieder_box_ul");
    }
  });
});


$$(document).on('page:init', '.page[data-name="spenden"]', function(e) {



  app.request.post('php/action_admin_texte.php', {
    typ: "spenden"
  }, function(data) {
    $$("#siteText_spenden").html(data);
  });


  app.request.post('php/spenden.php', {
    typ: "loadCountDonate"
  }, function(data) {
    var tarr = data.split('#$$#');

    var tdata = tarr[0].split('#$#');
    var html = '<div>Insgesamt haben wir ' + tdata[0] + ' Spenden erhalten.</div>';
    html += '<div>Die Spendesumme beträgt bis jetzt ' + tdata[1] + ' € (Euro).</div>';
    $$("#donate-count").html(html);


    var dtarr = tarr[1].split('#|#'),
      i = 0,
      l = dtarr.length,
      tdata, html = '';

    for (i; i < l; i++) {
      tdata = dtarr[i].split('#$#');
      html += '<li>';
      html += '<div class="item-content">';
      html += '            <div class="item-media">';
      html += '              <b class="size-30">' + (i + 1) + ' </b> ';
      html += '            </div>';
      html += '            <div class="item-inner">';
      html += '              <div class="item-title-row">';
      html += '                <div class="item-title"> ID: <b>.... ' + tdata[0] + '</b></div>';
      html += '                <div class="item-after"> ' + tdata[1] + ' 	&ensp;<i class="fa fa-eur" aria-hidden="true"></i></div>';
      html += '              </div>';
      html += '              <div class="item-subtitle">' + moment(tdata[2]).format("DD.MM.YYYY") + '</div>';
      html += '            </div>';
      html += '          </div>';
      html += '        </li>';
    }
    $$("#donate-last").html(html);
  });

  var stepper = app.stepper.create({
    el: '.stepper',
    on: {
      change: function() {
        setTimeout(function() {
          var betrag = app.stepper.get(".stepper").getValue();
          $$('#amount').val(betrag);
        }, 250);
      }
    }
  });
});

$$(document).on('page:init', '.page[data-name="newsletter"]', function(e) {


  $$("#input_mail").on("keyup", function(e) {
    if (!$$("#input_mail").hasClass("input-invalid")) {

      $$("#saveNewsletter").css("color", "#ffe69e");

      $$("#saveNewsletter").on("click", function(e) {
        var data = app.request.get('php/action_add_newsletter-mail.php', {}, function(data) {});

      });
    }

  });


});


$$(document).on('page:init', '.page[data-name="kontakt"]', function() {

  app.request.post('php/action_admin_texte.php', {
    typ: "kontakt"
  }, function(data) {
    $$("#siteText_kontakt").html(data);
  });



});

$$(document).on('page:init', '.page[data-name="kontakt_login"]', function() {

  app.request.post('php/action_admin_texte.php', {
    typ: "kontakt_login"
  }, function(data) {
    $$("#siteText_kontakt_login").html(data);
  });

  $$(".username").html("" + app.data.user.username + " > Kontakt zu sender.fm");

  $$("#toggleMail").val("no");

  var toggle = app.toggle.create({
    el: '.toggle',
    on: {
      change: function() {


        if ($$("#toggleMail").val() == 0) {
          $$("#toggleMail").val(1);
        } else {
          $$("#toggleMail").val(0);
        }
      }
    }
  });

});


$$(document).on('page:init', '.page[data-name="impressum"]', function(e) {

  app.request.post('php/action_admin_texte.php', {
    typ: "impressum"
  }, function(data) {
    $$("#siteText_impressum").html(data);
  });

});

$$(document).on('page:init', '.page[data-name="ueber"]', function(e) {

  app.request.post('php/action_admin_texte.php', {
    typ: "ueber"
  }, function(data) {
    $$("#siteText_ueber").html(data);
  });

});

$$(document).on('page:init', '.page[data-name="agb"]', function(e) {

  app.request.post('php/action_admin_texte.php', {
    typ: "agb"
  }, function(data) {
    $$("#siteText_agb").html(data);
  });

});

$$(document).on('page:init', '.page[data-name="datenschutz"]', function(e) {

  app.request.post('php/action_admin_texte.php', {
    typ: "datenschutz"
  }, function(data) {
    $$("#siteText_datenschutz").html(data);
  });

});

$$(document).on('page:init', '.page[data-name="dsgvo"]', function(e) {

  app.request.post('php/action_admin_texte.php', {
    typ: "dsgvo"
  }, function(data) {
    $$("#siteText_dsgvo").html(data);
  });

});


$$(document).on('page:init', '.page[data-name="goodnews_einzelbeitrag"]', function(e) {


  app.request.post('php/action_admin_goodnews.php', {
    typ: "einzeln",
    id: app.data.linkID
  }, function(data) {

    var tarr = data.split('#|#'),
      i = 0,
      l = tarr.length,
      tdata, html = '';



    for (i; i < l; i++) {
      tdata = tarr[i].split('#$#');

      html += '<div class="block elevation-7">';

      html += '<div  ><img src="images/site/logo120_trans.png" width="34"  /></div>';
      html += '<div class="siteContentAndImages">' + tdata[4] + '</div>';
      html += '   <button  data-clipboard-text="https://sender.fm?g=' + tdata[0] + '" class="button copyToClipboard" > <i class="fa fa-share-alt" aria-hidden="true"></i> teilen </button>';
      html += '</div>';
    }

    var html1 = '<h3>sender.fm goodnews vom ' + moment(tdata[5]).format("DD.MM.YYYY") + ' Uhr</h3>' + html;

    $$("#goodnews_content_einzeln_box").html(html1);
    app.methods.clipboardINIT();
  });

});


$$(document).on('page:init', '.page[data-name="chronik_einzelbeitrag"]', function(e) {
  app.methods.singlePostFromUserOpen(app.data.linkID, '#content-box');
});


/*
+  PROFIL des Users "self"
*/


$$(document).on('page:init', '.page[data-name="profil-edit"]', function(e) {
  var uid = app.data.user.id;
  var loadData = app.request.post('php/action_load-showUser.php', {
    uid: uid
  }, function(data) {
    var tdata = data.split('#$#');
    $$('#u-edit-vorname').val(tdata[5]);
    $$('#u-edit-nachname').val(tdata[6]);
    $$('#u-edit-ort').val(tdata[11]);
    $$('#u-edit-www').val(tdata[7]);
    $$('#u-edit-plz').val(tdata[10]);
    $$('#u-edit-text').html(tdata[8]);
  });
});



// profil des users der eingelogt ist
$$(document).on('page:init', '.page[data-name="profil"]', function(e) {
  app.data.profil.loadProfilUserData = function() {
    app.request.post('php/action_load_profildata.php', {}, function(data) {
      $$('.newUserChat').attr("data-uid", app.data.user.id);
      if (data != "") {
        var tdata = data.split('#$#');

        $$(".navbar .title").html(app.data.user.username);
        $$("#user_name").html(tdata[4] + " " + tdata[5]);
        $$("#user_des").html(tdata[8]);
        $$("#user_www").html(tdata[6]).attr("href", tdata[6]);


        var html = '<div class="block">' +

          '<div class="size-20"><b>' + tdata[4] + ' ' + tdata[5] + '</b></div>' +
          '<div>' + tdata[8] + '</div>' +
          '<div>' + tdata[6] + '</div>' +
          '<div class="user_redaktionen"></div>' +
          '</div>' +
          '<div class="block">' +
          '   <button  data-clipboard-text="https://sender.fm?u=' + tdata[0] + '" class="button copyToClipboard" > <i class="fa fa-share-alt" aria-hidden="true"></i> Profil teilen </button>' +

          '</div>' +
          '<div class="row"> ' +
          '<a id="profil_diamant" href="" class="col button link"><i class="fa fa-diamond"></i></a>' +
          '<a id="profil_abotab" class="col button link">Abos</a>' +
          '<a href="/profil-edit/" class="col button link"><i class="fa fa-cog"></i></a>' +
          '</div>';

        $$("#indexMenuBox").html(html);

        app.methods.clipboardINIT();

        // profil daten ändern
        var dynamicSheet_img = app.sheet.create({
          content: '<div class="sheet-modal">' +
            '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
            '<div class="left"> Profilbild ändern</div>' +
            '<div class="right">' +
            '<a class="link sheet-close">schließen</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="sheet-modal-inner">' +
            '<div class="block event hidden">' +
            '<div class="row">' +
            '<div class="col">' +
            '<img id="vorschau" src="" height="80">' +
            '</div>' +
            '<div class="col">' +
            '<a id="_submit" class="button button-round"><i class="fa fa-floppy-o fa-2x" aria-hidden="true"></i>speichern </a>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="block">' +
            '<input id="_file_p" type="file" name="file"  accept="image/gif, image/jpeg, image/jpg, image/png" >' +
            '</div>' +
            '</div>' +
            '</div>',
          on: {
            open: function(sheet) {},
            opened: function(sheet) {},
          }
        });

        dynamicSheet_img.on('close', function(sheet) {});
        dynamicSheet_img.on('closed', function(sheet) {});
        $$(document).on("click", "#userimg_edit", function() {
          dynamicSheet_img.open();
        });
        // profilbild bearbeiten
        $$("#user_img").attr("data-src", "useruploads/profilbilder/" + app.data.user.img + "").on("click", function() {
          dynamicSheet_img.open();
        });
      }
    });
  }
  app.data.profil.loadProfilUserData();


  // in welchen redaktionen ist der user
  app.data.profil.loadProfilRedaktion = function() {
    app.request.post('php/action_load_profil_redaktionen.php', {
      userid: app.data.user.id
    }, function(data) {
      if (data != "") {

        var tarr = data.split('#|#'),
          i = 0,
          l = tarr.length,
          tdata, html = '';


        html += ' <b> Redaktionen | </b> ';

        for (i; i < l; i++) {
          tdata = tarr[i].split('#$#');

          if (i > 0) {
            html += ' | ';
          }
          html += '<div class="chip showRedaktion" data-rid="' + tdata[0] + '">';
          if (tdata[6] == "0") {
            html += '           <div class="chip-media bg-color-blue">';
            html += '              <i class="fa fa-unlock" aria-hidden="true"></i>';
          } else {
            html += '           <div class="chip-media bg-color-orange">';
            html += '              <i class="fa fa-lock" aria-hidden="true"></i>';
          }

          html += '           </div>';
          html += '           <div class="chip-label">' + tdata[1] + '</div>';
          html += '       </div> ';

        }
        $$(".user_redaktionen").html(html);
      } else {
        $$(".user_redaktionen").html("");
      }
    });
  }

  setTimeout(function() {
    app.data.profil.loadProfilRedaktion();
  }, 500);


  // lädt alle Beiträge eines Users

  app.methods.loadProfilBeitrag();



  // lädt alle öffentlichen Audios eines Users
  app.data.profil.loadProfilAudios = function() {
    app.request.post('php/action_load_profil_audios.php', {}, function(data2) {
      // console.log("action_load_profil_audios.php data => " + data2);  


      if (data2 != "") {

        var tarr2 = data2.split('#|#'),
          i = 0,
          l = tarr2.length,
          tdata2, html2 = '',
          html3 = '';


        for (i; i < l; i++) {
          tdata2 = tarr2[i].split('#$#');

          html3 += ' <li class="swipeout">';
          html3 += '          <div class="swipeout-content">';
          html3 += '            <a href="#" class="item-link item-content">';
          html3 += '              <div class="item-inner">';
          html3 += '                <div class="item-title-row">';
          html3 += '                  <div class="item-title"> </div>';
          html3 += '                  <div class="item-after"><img src="images/site/leftscroll_toPlay.png"  class="icon-right" height="35"></div>';
          html3 += '                </div>';
          html3 += '                <div class="item-subtitle"></div>';
          html3 += '             <div class="item-text" style="word-break: break-all;">';
          html3 += '                ' + tdata2[4] + ' <br> ' + (parseInt(tdata2[11]) / 1048576).toFixed(1) + ' MB';
          html3 += '                    </div>';
          html3 += '              </div>';
          html3 += '            </a>';
          html3 += '          </div>';
          html3 += '          <div class="swipeout-actions-left">';
          html3 += '            <a href="#" class="color-green swipeout-overswipe player-play-button"  data-file="' + tdata2[7] + '" data-id="' + tdata2[0] + '" data-uid="' + tdata2[6] + '" data-agid="' + tdata2[9] + '"><i class="fa fa-play fa-2x" aria-hidden="true"></i></a>';
          html3 += '            <a href="#" class="color-blue alert-forward"><i class="fa fa-diamond" aria-hidden="true"></i></a>';
          html3 += '          </div>';
          html3 += '          <div class="swipeout-actions-right">';
          html3 += '            <a href="#"  class="color-orange audioTaggen" data-id="' + tdata2[0] + '"><i class="fa fa-tag" aria-hidden="true"></i></a>';
          html3 += '            <a href="#"   class="audioDelete swipeout-overswipe color-red" data-id="' + tdata2[0] + '" data-file="' + tdata2[7] + '" ><i class="fa fa-trash-o" aria-hidden="true"></i></a>';
          html3 += '          </div>';
          html3 += '        </li>';
        }
        $$('#user_audios_box').html('');
        $$('#profil_audio_list').html(html3);

      } else {
        var html = "<div class='size-20'>Du kannst Audio-Datein hochladen. Die Datei darf maximal 300 MB groß sein. Dein Audio ";
        html += "ist dann in der Chronik für alle Mitglieder von sender.fm sichtbar.</div> ";
        html += '<br><br>Wir unterstützen die folgenden Formate:  ';
        html += '<br>("<b>mp3</b>", "<b>ogg</b>", "<b>m4a</b>"") ';
        html += '<hr><i><b>MP3</b> - Kompaktes Format für Audio-Dateien</i> ';
        html += '<hr><i><b>Ogg</b> ist ein Container-Dateiformat für Multimedia-Dateien, kann also gleichzeitig Audio-, Video- sowie Textdaten enthalten. Ogg wurde mit dem Ziel konzipiert, eine freie und von Softwarepatenten unbeschränkte Alternative zu proprietären Formaten zu bieten, um Multimedia-Inhalte effizient zu speichern und zu streamen.</i> ';
        html += '<hr><i><b>MPEG-4</b> Audio. Mit <b>m4a</b> werden mp4 Dateien bezeichnet, die nur Audio-Daten beinhalten.</i> ';
        $$('#user_audios_box').html(html);
      }
    });
  }
  app.data.profil.loadProfilAudios();



  // die abos des users
  app.data.profil.loadProfilAbo = function() {
      app.request.post('php/action_load_member_abo.php', {
        typ: "myabos"
      }, function(data) {

        $$(".button.button-raised").removeClass("button-fill");
        $$(".button.button-raised.abos").addClass("button-fill");

        if (data != "") {
          var tarr = data.split('#|#'),
            i = 0,
            l = tarr.length,
            tdata, html = '';

          for (i; i < l; i++) {
            tdata = tarr[i].split('#$#');
            html += ' <div class="chip showUser" data-uid="' + tdata[1] + '"">';
            if (tdata[4] != "") {
              html += '  <div class="chip-media"><img src="useruploads/profilbilder/' + tdata[4] + '"></div>';
            }

            html += '  <div class="chip-label">' + tdata[2] + '' + tdata[3] + '</div>';
            html += '</div>';

          }

          $$("#abo_box_list").html(html);
        } else {
          $$("#abo_box_list").html("Du hast niemand abonniert.");
        }
      });
    }
    // die aonnenten des users
  app.data.profil.loadProfilAbonnenten = function() {
    app.request.post('php/action_load_member_abo.php', {
      typ: "abonnenten"
    }, function(data) {
      $$(".button.button-raised").removeClass("button-fill");
      $$(".button.button-raised.abonnenten").addClass("button-fill");
      if (data != "") {
        var tarr = data.split('#|#'),
          i = 0,
          l = tarr.length,
          tdata, html = '';

        for (i; i < l; i++) {
          tdata = tarr[i].split('#$#');
          html += ' <div class="chip showUser" data-uid="' + tdata[1] + '">';
          if (tdata[4] != "") {
            html += '  <div class="chip-media"><img src="useruploads/profilbilder/' + tdata[4] + '"></div>';
          }

          html += '  <div class="chip-label">' + tdata[2] + '' + tdata[3] + '</div>';
          html += '</div>';

        }

        $$("#abo_box_list").html(html);

      } else {
        $$("#abo_box_list").html("Dich hat niemand abonniert.");
      }
    });
  }




});



$$(document).on("click", "#profil_abotab", function() {

  // Create dynamic Popup
  var aboPopup = app.popup.create({
    content: '<div class="popup">' +
      '<div class="navbar">' +
      '<div class="navbar-inner">' +
      '    <div class="left"></div>' +
      '    <div class="title">Abos & Abonnenten</div>' +
      '    <div class="right link popup-close"><i class="fa fa-times fa-2x" aria-hidden="true"></i></div>' +
      '</div>' +
      '</div>' +

      '<div class="block">' +
      '   <div class="row">' +
      '       <a href="javascript: app.data.profil.loadProfilAbo()"    class="col button button-raised abos">abonniert</a>' +
      '       <a href="javascript: app.data.profil.loadProfilAbonnenten()" class="col button button-raised abonenten">abonnenten</a>' +
      '   </div>' +
      '   <br>' +
      '   <div id="abo_box_list"></div>' +
      '</div>' +

      '</div>',
    // Events
    on: {
      open: function(popup) {},
      opened: function(popup) {},
    }
  });
  // Events also can be assigned on instance later
  aboPopup.on('close', function(popup) {});
  aboPopup.on('closed', function(popup) {});
  aboPopup.open();
  app.data.profil.loadProfilAbo();
});


$$(document).on("click", "#profil_diamant", function() {
  // console.log("#profil_diamant");
  if (app.data.user.status != "admin") {
    app.dialog.alert("Diese Funktion ist in arbeit!");
    return;
  }
  // Create dynamic Popup
  var aboPopup = app.popup.create({
    content: '<div class="popup" style="overflow:auto">' +
      '<div class="navbar">' +
      '<div class="navbar-inner">' +
      '    <div class="left"></div>' +
      '    <div class="title">Diamanten</div>' +
      '    <div class="right link popup-close"><i class="fa fa-times fa-2x" aria-hidden="true"></i></div>' +
      '</div>' +
      '</div>' +
      '<div class="block">' +
      '<div class="size-15">Deine Diamanten</div><br>' +
      '<div class="row text-align-center">' +
      '<div class="col"><i class="fa fa-diamond fa-5x" aria-hidden="true"></i></div>' +
      '<div class="col size-50">100</div>' +
      '</div>' +
      '</div>' +
      '<div class="block">' +
      '<div class="size-15">Diamanten erhalten</div><br>' +
      '<div id="diamant_li_erhalten">' +
      '0 Diamanten erhalten' +
      '</div>' +
      '</div>' +
      '<div class="block">' +
      '<div class="size-15">Diamanten vergeben</div><br>' +
      '<div id="diamant_li_vergeben">' +
      '0 Diamanten vergeben' +
      '</div>' +
      '</div>' +

      '<div class="block">' +
      '<div class="size-15">Diamanten bekommen</div><br>' +
      '<div>User können dir Diamanten für Audio und Textbeiträge geben ;)</div> <br>' +
      'Ansonsten kannst du wie folgt Diamanten bekommen. <br>' +
      '<div class="row">' +
      '<div class="col">tägliches anmelden</div>' +
      '<div class="col">1 Diamanten pro Tag</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col">Audio hochladen</div>' +
      '<div class="col">10 Diamanten pro Audio nach 14 Tagen</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col">Text veröffentlichen</div>' +
      '<div class="col">1 Diamanten nach 2 Tagen</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col">Spende (pro Euro)</div>' +
      '<div class="col">5 Diamanten</div>' +
      '</div>' +
      '<br><br><div>Das abschalten der dezenten Werbung kostet einen Diamanten pro Tag nach Anmeldung.</div>' +
      '</div>' +


      '</div>',
    // Events
    on: {
      open: function(popup) {
        //   console.log('Popup open');
      },
      opened: function(popup) {
        //   console.log('Popup opened');
      },
    }
  });
  // Events also can be assigned on instance later
  aboPopup.on('close', function(popup) {
    // console.log('Popup close');
  });
  aboPopup.on('closed', function(popup) {
    // console.log('Popup closed');
  });
  aboPopup.open();
  // app.data.profil.loadProfilDiamanten();
});


$$(document).on("click", "#profil_audioBox_show", function() {
  $$(".profil_beitragBox").hide();
  $$(".profil_audioBox").show();
});


$$(document).on("click", "#profil_beitragBox_show", function() {
  $$(".profil_beitragBox").show();
  $$(".profil_audioBox").hide();

});


// Profil Menüleiste (Z.Z: ABGESTELLT !! )
$$(document).on('click', '#navbar-profilbutton', function() {
  //  console.log( '#navbar-profilbutton => ' + app.data.user.logged );

  if (app.data.user.logged == true) {
    app.request.post('pages/menu_right_profil.html', function(data) {
      $$("#panel-content-right").html(data);
      var userimg = app.data.user.img;

      if (userimg) {
        $$(".userimg").html('<img src="useruploads/profilbilder/' + userimg + '" height="80">');
      } else {
        $$(".userimg").html(' <i class="fa fa-bars fa-3x" aria-hidden="true"></i>');
      }


      $$("#panel-content-right").append("<ol>")
      $$("#panel-content-right").append("<li>logged:" + app.data.user.logged + "</li>")
      $$("#panel-content-right").append("<li>login:" + app.data.user.login + "</li>")
      $$("#panel-content-right").append("<li>id:" + app.data.user.id + "</li>")
      $$("#panel-content-right").append("<li>username:" + app.data.user.username + "</li>")
      $$("#panel-content-right").append("<li>status:" + app.data.user.status + "</li>")
      $$("#panel-content-right").append("<li>mail:" + app.data.user.mail + "</li>")
      $$("#panel-content-right").append("<li>member:" + app.data.user.member + "</li>")
      $$("#panel-content-right").append(":</ol>")

    });


  } else {
    $$("#panel-content-right").html("Login");

  }

});


// profil neuer Beitrag erstellen
$$(document).on('click', '#newBeitrag', function(e) {
  defaultPopup.close();
  // Create dynamic Popup
  app.popup.create({
    content: '<div class="popup" style="overflow: auto">' +
      ' <div class="navbar">' +
      '    <div class="navbar-inner">' +
      '        <div class="left"> </div>' +
      '        <div class="title link">Beitrag schreiben</div>' +
      '        <div class="right"> <div class="link popup-close"><i class="fa fa-times fa-2x" aria-hidden="true"></i></div></div>' +
      '    </div>' +
      '</div>' +
      '<div class="block">' +
      '<br>' +
      '   <div id="editor-container-profilNewBeitrag" class="senderfm_editor" style="min-height:250px; "></div>' +
      ' <button id="saveNewUserText" class="col button button-fill">speichern</button>' +
      '</div>' +
      '<div class="block vorschauEditor">' +
      '</div>' +
      '</div>',
    // Events
    on: {
      open: function(popup) {
        // console.log('Popup open');                 

        app.methods.initQuill("#editor-container-profilNewBeitrag", null, null);

      },
      opened: function(popup) {
        //  console.log('Popup opened');
      },
    }
  }).open();


});

// profil-beitrag-speichern
$$(document).on('click', '#saveNewUserText', function(e) {

  $(".ql-editor").find("a").addClass("link").addClass("external").css("font-style", "italic").css("font-family", "serif");

  var text = $$(".ql-editor").html();
  // text =     text.replace(/(<p)/igm, '<div').replace(/<\/p>/igm, '</div>')                     

  // app.methods.log (  text, "lila"); 


  app.request.post('php/action_profil_content.php', {
    typ: "profil_save",
    text: text
  }, function(data) {
    //  console.log("save data=> " + data); 
    if (data != "ERROR") {
      toast_saved.open();
      app.popup.close();
      app.methods.loadProfilBeitrag();
    } else {
      toastSaveErrorCallback.open();
    }
  });
});


// save profil comment
$$(document).on("click", ".saveComment", function() {
  var pid = $$(this).data("pid");
  var creatorid = $$(this).data("creatorid");
  var txt = $$("#cominput" + pid + "").val();
  //  console.log("saveComment pid => " + pid);
  // console.log("saveComment creatorid => " + creatorid);
  //  console.log("saveComment txt => " + txt);
  app.methods.saveComment(pid, creatorid, txt);
});

// profil beitrag bearbeiten
$$(document).on('click', '.postEdit', function() {
  var id = $$(this).attr("data-id");
  //  console.log('id=>' + id); 
  var data_html = $$("#profil_content" + id + "").html();
  //  console.log('data_html=>' + data_html); 

  app.request.post('php/action_load_profil_beitrag.php', {
    typ: "einenBeitrag_forUser",
    id: id
  }, function(data) {


    app.popup.create({
      content: '<div class="popup" style="overflow: auto; background-color: #d9feff;">' +
        ' <div class="navbar">' +
        '    <div class="navbar-inner">' +
        '        <div class="left"> </div>' +
        '        <div class="title link">Beitrag bearbeiten</div>' +
        '        <div class="right"> <div class=" popup-close">schließen</div></div>' +
        '    </div>' +
        '</div>' +
        '<div class="block">' +
        '<br>' +
        '   <div id="editor-container-profilEditBeitrag" class="senderfm_editor" style="min-height:250px; "></div>' +
        ' <button id="updateUserText" data-id="' + id + '" class="col button button-fill">speichern</button>' +
        '</div>' +
        '<div class="block vorschauEditor">' +
        data +
        '</div>' +
        '</div>',
      // Events
      on: {
        open: function(popup) {

          // console.log('Popup open');                 
          app.methods.initQuill("#editor-container-profilEditBeitrag", "setHTML", data);

        },
        opened: function(popup) {
          //console.log('Popup opened');

        },
      }
    }).open();

  }); // POST




});


// beitrag löschen
$$(document).on('click', '.postDelete', function() {
  var id = $$(this).attr("data-id");
  //  console.log("data-id=> " + id);
  //prüfen ob file im post
  //  console.log("$$('#profil_contentBOX"+id+"') html=> " + $$("#profil_contentBOX"+id+"").find(".player-play-button").html());

  app.dialog.confirm('Deinen Beitrag wirklich löschen ?', function() {

    app.request.post('php/action_profil_content.php', {
      typ: "profil_BeitragDelete",
      id: id
    }, function(data) {
      //   console.log(data);
      if (data == "OK") {
        //BeitragDeleteCallback.open();

        if ($$(".page.page-current").attr("data-name") == "admin-chronik") {
          app.data.admin.loadBeitrag();
        }
        if ($$(".page.page-current").attr("data-name") == "profil") {
          app.methods.loadProfilBeitrag();
        }

      };
    });
  });
});


$$(document).on('click', '#newMP3', function(e) {
  defaultPopup.close();
  app.request.get('pages/new_audio.html', {}, function(data) {


    // Create dynamic Popup
    var pop = app.popup.create({
      content: '<div class="popup" style="overflow: scroll">' +
        ' <div class="navbar">' +
        '    <div class="navbar-inner">' +
        '        <div class="left  "> </div>' +
        '        <div class="title link">Audio speichern</div>' +
        '        <div class="right button button-fill popup-close">schließen</div>' +
        '    </div>' +
        '</div>' +
        '<div class="block">' +
        '' + data + '' +
        '</div>' +
        '</div>',
      // Events
      on: {
        open: function(popup) {
          //   console.log('Popup open fileinput=> ' + $$('#_file'));
          $$("#save_mp3").removeClass("redaktion_save_mp3").addClass("profil_save_mp3");
        },
        opened: function(popup) {
          // console.log('Popup opened'); 

        },
      }
    });
    pop.open();
  });



});


$$(document).on('click', '#newMP3_Redaktion', function(e) {
  defaultPopup.close();
  app.request.get('pages/new_audio.html', {}, function(data) {


    // Create dynamic Popup
    var pop = app.popup.create({
      content: '<div class="popup" style="overflow: scroll">' +
        ' <div class="navbar">' +
        '    <div class="navbar-inner">' +
        '        <div class="left  "> </div>' +
        '        <div class="title link">Audio speichern</div>' +
        '        <div class="right button button-fill popup-close">schließen</div>' +
        '    </div>' +
        '</div>' +
        '<div class="block">' +
        '' + data + '' +
        '</div>' +
        '</div>',
      // Events
      on: {
        open: function(popup) {
          //   console.log('Popup open fileinput=> ' + $$('#_file'));
          $$("#save_mp3").removeClass("profil_save_mp3").addClass("redaktion_save_mp3");
        },
        opened: function(popup) {
          // console.log('Popup opened'); 

        },
      }
    });
    pop.open();
  });



});


// MP3 Vorschau 
$$(document).on("change", "#_file", function() {
  // "mp3", "ogg",  "m4a", 
  if (app.data.preview) {
    app.data.preview.pause();
    app.data.preview = null;
    app.data.letzterStand = 0;
  }

  var f = document.getElementById('_file').files[0]; // FileList object                           
  var files_title = f.name.replace(/[^\A-Za-z0-9-+\.]/g, "-").substr(0, 50);
  var format = f.type.split("/")[1]; // audio/mp3   
  var size = f.size; // audio/mp3   
  //console.log("f.type => " + f.type);
  //console.log("f.size => " + size);
  //console.log("format => " + format);
  //console.log("files_title => " + files_title);


  //   var objectUrl = URL.createObjectURL(f);                                    
  var blob = new Blob([f], {
    type: f.type
  });
  var blobUrl = window.URL.createObjectURL(blob);
  var blobElement = URL.createObjectURL(blob);

  //console.log("blob => " + blob);
  //console.log("blobUrl => " + blobUrl);
  //console.log("blobElement => " + blobElement);


  var html = '<i id="i_vorschau" class="fa fa-play-circle-o size-50" aria-hidden="true"></i>';

  $$("#_vorschauplayer").html(html);

  $$(".hiddenform").removeClass("hidden");

  $$("#_title").val(f.name.replace(/[^\A-Za-z0-9-+\.]/g, "-").substr(0, 50));


  var zahl = 0.00;
  var totalWidth = $$("#_vorschauplayer")[0].clientWidth;
  var totalSoundDuration;

  $$(".pre_format").html(format);
  $$(".pre_size").html(size + ' Bytes = ' + (size / 1000).toFixed(0) + ' KB = ' + ((size / 1000000)).toFixed(1) + ' MB');

  app.methods.initQuill("#_subtitle", null, null);

  app.data.preview = new Howl({
    src: [blobUrl],
    format: [format],
    html5: true,
    onload: function() {

      //console.log("new Howl onload => " + totalSoundDuration);
      totalSoundDuration = app.data.preview.duration();
      // console.log("totalSoundDuration => " + totalSoundDuration);
      $$("#_durationTotal").html(totalSoundDuration.toFixed(0));
      $$(".pre_time").html(totalSoundDuration.toFixed(0) + " Sekunden");
    },
    onplay: function() {
      $$("#i_vorschau").removeClass("fa-play-circle-o").addClass("fa-pause-circle-o");

      app.data.playerIsPause = false;

      app.data.user.interval = setInterval(function() {

        if (!app.data.playerIsPause) {
          if (app.data.letzterStand) {
            zahl = app.data.letzterStand + 0.1;
            app.data.letzterStand = false;
          } else {
            zahl = zahl + 0.1;
          }

          $$("#_durationLive").html(zahl.toFixed(0));

          $$("#backduration").css("width", "" + ((($$("#_vorschauplayer")[0].clientWidth) / totalSoundDuration.toFixed(0)) * zahl) + "px");
        } else {
          app.data.letzterStand = zahl;
        }
      }, 100);




    },
    onpause: function() {
      $$("#i_vorschau").removeClass("fa-pause-circle-o").addClass("fa-play-circle-o");
      app.data.playerIsPause = true;
    },
    onend: function() {
      $$("#_durationLive").html("0");
      $$("#backduration").css("width", "100%");
      zahl = 0;
      $$("#i_vorschau").removeClass("fa-pause-circle-o").addClass("fa-play-circle-o");

      app.data.letzterStand = false;
      app.data.playerIsPause = true;
      clearInterval(app.data.user.interval);
    },
  });

  //app.data.preview.play();



  $$(document).on("click", "#i_vorschau", function() {
    if ($$("#i_vorschau").hasClass("fa-pause-circle-o")) {
      app.data.preview.pause();
    } else {
      app.data.preview.play();
    }
  });

});

// MP3 Speichern 
$$(document).on("click", ".profil_save_mp3, .redaktion_save_mp3", function(e) {
  // console.log( "#_submit this class => " + $$(this).attr("class") );
  if ($$(this).hasClass("profil_save_mp3")) {
    //   console.log( "#_submit this class => profil_save_mp3"   );
    var phpfile = "php/action_save-UserAudio.php";
  }

  if ($$(this).hasClass("redaktion_save_mp3")) {
    //  console.log( "#_submit this class => redaktion_save_mp3"   );
    var phpfile = "php/action_save-RedaktionAudio.php";
  }


  app.dialog.confirm('speichern?', function() {
    app.methods.uploader_mp3_open();

    var filess = document.getElementById('_file').files[0];
    var _title = $$("#_title").val().substr(0, 50);
    var _subtitle = $$(".ql-editor").html();
    var _playtime = $$(".pre_time").html().split(" ")[0];

    $('#_file').simpleUpload(phpfile, {
      allowedExts: ["mp3", "ogg", "m4a", "x-m4a"], // "mp3", "ogg", "x-m4a",  
      allowedTypes: ["audio/ogg", "audio/mp3", "audio/x-m4a", "audio/m4a"],
      maxFileSize: 300000000, //300MB in bytes
      data: {
        f_title: _title,
        f_subtitle: _subtitle,
        f_playtime: _playtime,
        rid: app.data.redaktion.thisRID,
        rname: app.data.redaktion.thisRNAME
      },
      start: function(filess) {
        //upload started
        // console.log( "filess" );                   
        $$('.uploadProzent').html("");
        //$$('#progressBar').width(0);
      },
      progress: function(progress) {
        //received progress
        //console.log( "progress" );                
        //console.log("upload progress: " + Math.round(progress) + "%");
        $$('.uploadProzent').html("" + Math.round(progress) + "%");
        //$$('#progressBar').width(progress + "%");
      },
      success: function(data) {
        //upload successful
        //console.log( "success" );
        //console.log(data );
        $$('.uploadProzent').html("Danke, abgeschlossen");

        app.data.preview.pause();
        clearInterval(app.data.user.interval);
        app.data.preview = null;

        app.popup.close();
        app.methods.uploader_mp3_close();
        if ($$(this).hasClass("profil_save_mp3")) {
          setTimeout(function() {
            app.data.profil.loadProfilAudios();
          }, 1000);
          setTimeout(function() {
            app.methods.loadProfilBeitrag();
          }, 1500);
        } else {
          app.methods.loadRedaktionBeitrag(app.data.redaktion.thisRID);
          app.methods.allArchivfileForRedaktion(app.data.redaktion.thisRID)

        }



      },
      error: function(error) {
        //upload failed
        //console.log( "error" );
        //console.log(error );
        $$('.uploadProzent').html("Es gab leider einen Fehler beim hochladen!");
        setTimeout(function() {
          app.methods.uploader_mp3_close();
        }, 3000);
      }
    });
  }); // confirm
});

// audio löschen
$$(document).on('click', '.fileDelete', function() {
  var aid = $$(this).attr("data-aid");
  var file = $$(this).attr("data-file");
  //  console.log("fileDelete-aid=> " + aid);
  //  console.log("fileDelete-file=> " + file);
  //prüfen ob file im post

  var txt = 'Diese Datei wirklich löschen ?';

  app.dialog.confirm(txt, function() {

    app.request.post('php/action_profil_content.php', {
      typ: "fileDelete",
      aid: aid,
      filename: file
    }, function(data) {
      //   console.log("fileDelete data => "+data);
      if (data != "ERROR") {
        ArchivDeleteCallback.open();

        if ($$(".page.page-current").attr("data-name") == "admin-chronik") {
          app.loadAudio();
        }
        if ($$(".page.page-current").attr("data-name") == "profil") {
          app.data.profil.loadProfilAudios();
        }
        if ($$(".page.page-current").attr("data-name") == "redaktion") {
          app.methods.loadRedaktionBeitrag(app.data.redaktion.thisRID);
          app.methods.allArchivfileForRedaktion(app.data.redaktion.thisRID)
        }

      };
    });
  });
});

// audio merken
$$(document).on('click', '.audioTaggen', function() {
  var fid = $$(this).attr("data-id");
  //console.log("data-id=> " + fid);

  app.request.post('php/action_profil_content.php', {
    typ: "audioTaggen",
    fid: fid
  }, function(data) {
    //    console.log("audioTaggen data =>" + data); 
    toastAudioTaggenOK.open();

  });
});




// profil bearbeiten speichern
$$(document).on("click", "#save_profil_edit", function() {
  // console.log("save_profil_edit");          

  var vorname = $$('#u-edit-vorname').val();
  var nachname = $$('#u-edit-nachname').val();
  var gender = "";
  var plz = $$('#u-edit-plz').val();
  var ort = $$('#u-edit-ort').val();
  var www = $$('#u-edit-www').val();
  var text = $$('#u-edit-text').val();

  app.request.post('php/action_save-userData.php', {
    vorname: vorname,
    nachname: nachname,
    gender: gender,
    plz: plz,
    ort: ort,
    www: www,
    text: text
  }, function(data) {
    // console.log(data); 
    app.router.navigate('/profil/');
    app.dialog.alert('geändert, Danke!');
  });
});

// passwort ändern speichern 
$$(document).on("click", "#pwd_edit", function() {


  var html = '<form class="list form-store-data" id="form-edit-pwd">';
  html += '  <ul>';
  html += '    <li>';
  html += '      <div class="item-content item-input">';
  html += '        <div class="item-inner">';
  //html+='          <div class="item-title item-label">alte Passwort</div>';
  html += '          <div class="item-input-wrap">';
  html += '            <input id="pwd_old" type="password" name="pwd" placeholder="alte Passwort" >';
  html += '          </div>';
  html += '        </div>';
  html += '      </div>';
  html += '    </li>';
  html += '    <li>';
  html += '      <div class="item-content item-input">';
  html += '        <div class="item-inner">';
  // html+='          <div class="item-title item-label">neues Passwort</div>';
  html += '          <div class="item-input-wrap">';
  html += '            <input id="pwd_new" type="password" name="new_pwd1" placeholder="neues Passwort" >';
  html += '          </div>';
  html += '        </div>';
  html += '      </div>';
  html += '    </li>';
  html += '        <li>';
  html += '      <div class="item-content item-input">';
  html += '        <div class="item-inner">';
  //    html+='          <div class="item-title item-label">neues Passwort wiederholen</div>';
  html += '          <div class="item-input-wrap">';
  html += '            <input id="pwd_new2" type="password" name="new_pwd2" placeholder="neues Passwort wiederholen" >';
  html += '          </div>';
  html += '        </div>';
  html += '      </div>';
  html += '    </li>';

  html += '  </ul>';
  html += '</form>';


  var dynamicSheet_pwd = app.sheet.create({
    content: '<div class="sheet-modal" >' +
      '<div class="toolbar">' +
      '<div class="toolbar-inner">' +
      '<div class="left"> Passwort ändern</div>' +
      '<div class="right">' +
      '<a class="link pwd-save text-color-yellow">speichern</a>' +
      '</div>' +
      '<div class="right">' +
      '<a class="link sheet-close">schließen</a>' +
      '</div>' +

      '</div>' +
      '</div>' +
      '<div class="sheet-modal-inner">' +
      '' + html + '' +
      '</div>' +
      '</div>',
    // Events
    on: {
      open: function(sheet) {
        //  console.log('Sheet open');                        

        $$(document).once("click", ".pwd-save", function() {
          console.log('pwd-save');
          var pwd_old = SHA512($$("#pwd_old").val());
          var pwd_new = SHA512($$("#pwd_new").val());
          var pwd_new2 = SHA512($$("#pwd_new2").val());

          app.request.post('php/action_save-new_passwort.php', {
            pwd_old: pwd_old,
            pwd_new: pwd_new,
            pwd_new2: pwd_new2
          }, function(data) {
            //   console.log(data); 
            if (data == "OK") {
              dynamicSheet_pwd.close();
              app.dialog.alert('geändert, Danke!');
            }

          });

        });
      },
      opened: function(sheet) {
        //console.log('Sheet opened');                        
      },
    }
  });
  // Events also can be assigned on instance later
  dynamicSheet_pwd.on('close', function(sheet) {
    //  console.log('Sheet close');
  });
  dynamicSheet_pwd.on('closed', function(sheet) {
    //  console.log('Sheet closed');
  });
  $$(document).on("click", "#pwd_edit", function() {
    dynamicSheet_pwd.open();
  });
  dynamicSheet_pwd.open();
});

// profilbild ändern
$$(document).on("change", "#_file_p", function() {
  //  console.log('input change');
  var f = document.getElementById('_file_p').files[0]; // FileList object

  var typ = f.type.split("/"); // image/png

  var objectUrl = URL.createObjectURL(f);
  var blob = new Blob([f], {
    type: "image/*"
  });
  var blobUrl = window.URL.createObjectURL(blob);

  $$('#vorschau').attr("src", blobUrl);
  $$('.event').removeClass("hidden");

  $$(document).on("click", "#_submit", function(e) {
    //  console.log( "#_submit" );                           

    var filess = document.getElementById('_file_p').files[0];

    $('#_file_p').simpleUpload("php/action_save-UserProfilImg.php", {

      start: function(filess) {
        //upload started
        // console.log( "filess" );
        //  console.log(filess );
        $$('#progress').html("");
        $$('#progressBar').width(0);
      },
      progress: function(progress) {
        //received progress
        //app.methods.log( "progress", "lila" );
        // app.methods.log(progress , "green");
        // console.log("upload progress: " + Math.round(progress) + "%");
        $$('#progress').html("hochladen der Daten: " + Math.round(progress) + "%");
        $$('#progressBar').width(progress + "%");
      },
      success: function(data) {
        //upload successful
        // app.methods.log( "success" , "lila");
        //app.methods.log(data, "pink" );

        if (data == "OK") {
          // Create toast with callback on close
          app.sheet.close();
          app.router.navigate("/profil/", "reloadAll");
        }
      },
      error: function(error) {
        //   console.log(error );
      }
    });
  });
});


$$(document).on("click", "#showProfilAlsUser", function() {
  app.router.navigate("/profil_showUser/?uid=" + app.data.user.id + "");
});




// Profil aufrufen eines fremden users
$$(document).on('click', '.showUser', function() {
  //console.log( 'click .showUser'  );
  var uid = $$(this).data("uid");
  if (uid == app.data.user.id) {
    app.router.navigate("/profil/");
  } else {
    app.router.navigate("/profil_showUser/?uid=" + uid + "");
  }
  app.methods.showUser(uid);

});



/*
+  PROFIL des besuchten Users
*/



// ein besuchtes profil ... nicht das des eingeloggten 
$$(document).on('page:init', '.page[data-name="profil_showUser"]', function(e) {

  var uid = e.detail.route.query.uid;
  // console.log('.page[data-name="profil_showUser"] uid=> ' +uid);

  $$('#_abobutton').attr("data-uid", "" + uid + "");
  $$('.newUserChat').attr("data-uid", "" + uid + "");


  // userdata
  app.request.post('php/action_load-showUser.php', {
    uid: uid
  }, function(data) {
    //console.log('load-showUser data => '+ data);
    // 0`id`, 1`userid`, 2`date`, 3`status`, 4`anrede`, 5`vorname`, 6`nachname`, 7`www`,  8`des`, 9`img`, 10plz, 11ort 12aboniert

    var tdata = data.split('#$#');

    $$(".navbar .title").html(tdata[5]);

    var html = '<div id="_abobutton" class="segmented">';


    if (uid != app.data.user.id && uid == tdata[12]) {
      html += '<a class="button user_DEabonnieren color-green"  data-uid="' + tdata[1] + '">abonniert</a>';


    } else {
      if (uid != app.data.user.id) {
        html += '<a class="button user_abonnieren color-orange" data-uid="' + tdata[1] + '">abonnieren</a>';

      }
    }

    if (tdata[9] != "") {
      var userimg = '<img src="useruploads/profilbilder/' + tdata[9] + '" height="80px">';
    } else {
      var userimg = "<i class='fa fa-user fa-3x'></i>";
    }

    html += '</div>' +
      '<div class="block">' +
      '<div class="row">' +
      '<div class="col-30"> ' + userimg + '</div>' +
      '<div class="col-70">' +
      '<div class="size-20"><b>' + tdata[5] + ' ' + tdata[6] + '</b></div>' +
      '<div>' + tdata[8] + '</div>' +
      '<div>' + tdata[7] + '</div>' +
      '<div class="user_redaktionen"></div>' +
      '</div>';
    '</div>';
    '</div>';

    $$("#indexMenuBox_showUser").html(html);


    $$(".profilUsername").html(tdata[5]);
    //$$("#_user_img").attr("data-src", "useruploads/profilbilder/" + tdata[9] + "" );
    //$$("#_user_name").html( tdata[5] + " " + tdata[6]);
    //$$("#_user_des").html( tdata[8] );           
    //$$("#_user_www").html( tdata[7] ).attr("href", ""+tdata[7]+ "");

    if (uid == app.data.user.id) {
      $$("#_abobutton").remove();
    }


  });

  // in welchen redaktionen ist der showUser
  app.request.post('php/action_load_showUser_redaktionen.php', {
    userid: uid
  }, function(data) {

    //console.log("action_load_showUser_redaktionen.php data => " + data);  

    if (data != "") {
      var tarr = data.split('#|#'),
        i = 0,
        l = tarr.length,
        tdata, html = '';


      for (i; i < l; i++) {
        // 0id  1name  2img  3desc  4sprecherid   5agid  6geschlossen
        tdata = tarr[i].split('#$#');

        html += '<div class="chip showRedaktion" data-rid="' + tdata[0] + '">';
        html += '           <div class="chip-media bg-color-blue">';
        html += '              <i class="fa fa-unlock" aria-hidden="true"></i>';
        html += '           </div>';
        html += '           <div class="chip-label">' + tdata[1] + '</div>';
        html += '       </div>';
      }
      $$("#_user_redaktionen").html(html);
    } else {
      $$("#_user_redaktionen").html("");
    }
  });


  // beiträge
  app.request.post('php/action_load_showUser_beitrag.php', {
    uid: uid
  }, function(data1) {
    // console.log("action_load_showUser_beitrag.php data => " + data1);  
    if (data1 != "") {
      var tarr = data1.split('#|#'),
        i = 0,
        l = tarr.length,
        tdata1, html = '';


      for (i; i < l; i++) { // 0`id`, 1`txt`, 2`creator_id`,3 `creator`, 4`date` , 5`zusatz`
        tdata1 = tarr[i].split('#$#');

        if (tdata1[5] == "UPLOAD-AUDIO") {
          // es kommt ein beitrag mit einer zeile DIV + DATA wo alles
          // zum audiofile drin ist
          audio_elm = tdata1[1].split('#$$#');


          var audio_file = audio_elm[0],
            audio_id = audio_elm[1],
            audio_uid = audio_elm[2],
            audio_agid = audio_elm[3],
            audio_filetitle = audio_elm[4],
            audio_fileundertitle = audio_elm[5],
            audio_filesize = audio_elm[6],
            audio_playtime = audio_elm[7];



          html += '    <div id="profil_contentBOX' + tdata1[0] + '" class="card demo-facebook-card audioBeitrag">';
          html += '     <div class="card-header">';
          html += '         <div class="demo-facebook-avatar">' + moment(tdata1[4]).format("DD.MM.YYYY - HH:mm") + ' Uhr</div>';
          html += '         <div class="demo-facebook-name"></div>';
          html += '         <div class="demo-facebook-date size-10"></div>';
          html += '     </div>';
          html += '     <div   class="card-content card-content-padding row siteContentAndImages">';
          html += '     <div class="col-20 player-play-button"  data-file="' + audio_file + '" data-id="' + audio_id + '" data-uid="' + audio_uid + '" data-agid=""> ';
          html += '         <i class=" fa fa-play fa-3x text-color-orange"></i>';
          html += '     </div> ';
          html += '         <div class="col-80">' + audio_filetitle + '';
          html += '             <h3>' + audio_filetitle + '</h3>';
          html += '             <div>' + audio_fileundertitle + '</div>';
          html += '         </div>';
          html += '     </div>';
          html += '     <div class="card-footer">';
          html += '          <a href="#" class="link postDelete" data-id="' + tdata1[0] + '"><i class="fa fa-trash-o text-color-orange" aria-hidden="true"></i></a>';
          html += '     </div>';
          html += ' </div>';


        } else {




          html += '     <div id="profil_contentBOX' + tdata1[0] + '" class="card demo-facebook-card textBeitrag">';
          html += '        <div class="card-header">';
          html += '          <div class="demo-facebook-avatar">' + moment(tdata1[4]).format("DD.MM.YYYY - HH:mm") + ' Uhr</div>';
          html += '          <div class="demo-facebook-name"> </div>';
          html += '          <div class="demo-facebook-date size-10"></div>';
          html += '      </div>';
          html += '      <div id="profil_content' + tdata1[0] + '" class="card-content card-content-padding siteContentAndImages"> ';
          html += '         ' + tdata1[1] + ' ';
          html += '      </div>';
          html += '      <div class="card-footer">';
          html += '          <a href="#" class="link postDelete" data-id="' + tdata1[0] + '"><i class="fa fa-trash-o text-color-orange" aria-hidden="true"></i></a>';

          html += '          <a href="#" class="link postEdit" data-id="' + tdata1[0] + '"><i class="fa fa-pencil text-color-orange" aria-hidden="true"></i></a>';
          html += '          </div>';
          html += '  </div>';


        }
      }



      $$('#_user_beitrag_box').html(html);
    } else {
      $$('#_user_beitrag_box').html('<div>Keine Beiträge</div>');
    }
  });


  // audios
  app.request.post('php/action_load_showUser_audios.php', {
    uid: uid
  }, function(data2) {
    if (data2 != "") {
      var tarr2 = data2.split('#|#'),
        i = 0,
        l = tarr2.length,
        tdata2, html2 = '';

      for (i; i < l; i++) {
        // 0`id`, `f_filetitle`, `f_fileundertitle`, 3`f_fileformat`, `f_name`, `form_user`, 6`form_user_id`,
        // 7`filenameDB`, 8`savedDate`, 9`agid`, 10`f_filetyp`
        tdata2 = tarr2[i].split('#$#');
        html2 += '<li>';
        html2 += '   <a href="#" class="item item-content player-play-button"  data-file="' + tdata2[7] + '" data-id="' + tdata2[0] + '" data-uid="' + tdata2[6] + '" data-agid="' + tdata2[9] + '">';
        html2 += '       <div class="item-media"><i class="fa fa-play fa-2x" aria-hidden="true"></i></div>';
        html2 += '       <div class="item-inner">';
        html2 += '           <div class="item-title-row">';
        html2 += '               <div class="item-title">' + tdata2[1] + '</div>  ';
        html2 += '           </div>';
        html2 += '           <div class="item-subtitle">' + tdata2[2] + '</div>';
        html2 += '           <div class="item-text">Upload: ' + moment(tdata2[8]).format("DD.MM.YYYY") + ' | in Redaktion: ' + tdata2[9] + '</div>';
        html2 += '      </div>';
        html2 += '   </a>';
        html2 += '</li>';
      }
      $$('#_user_audios_box').html(html2);

    } else {
      $$('#_user_audios_box').html('<div>Keine Audios</div>');
    }
  });
});




$$(document).on('click', '.user_abonnieren', function() {
  var uid = $$(this).attr("data-uid");
  app.dialog.confirm('User abonnieren?', function() {

    app.request.post('php/action_load_member_abo.php', {
      typ: "saveABO",
      uid: uid
    }, function(data) {
      if (data == "OK") {
        app.router.navigate("/profil_showUser/?uid=" + uid + "");
        $$('.user_abonnieren').attr("class", "button user_DEabonnieren color-green").html("abonniert");

      }
    });
  });

});


$$(document).on('click', '.user_DEabonnieren', function() {
  var uid = $$(this).attr("data-uid");
  app.dialog.confirm('User [' + uid + '] nicht mehr abonnieren?', function() {

    app.request.post('php/action_load_member_abo.php', {
      typ: "deleteABO",
      uid: uid
    }, function(data) {
      $$('.user_DEabonnieren').attr("class", "button user_abonnieren color-orange").html("abonnieren");
    });
  });

});




/*
+  REDAKTIONS BEREICH
*/


// Redaktionen Übersicht
$$(document).on('page:init', '.page[data-name="redaktionen"]', function(e) {

  app.request.post('php/action_load_allRedaktionen.php', {}, function(data) {

    var tarr = data.split('#|#'),
      i = 0,
      l = tarr.length,
      tdata, html = '';

    for (i; i < l; i++) {
      // 0 `id`, 1`name`, 2`img`, 3`desc`, 4`sprecherid`, 5`agid`,
      tdata = tarr[i].split('#$#');

      html += ' <div class="block showRedaktion" data-rid="' + tdata[0] + '"> ';
      html += '  <div class="blobk-header"><img src="/useruploads/redaktionHeaderImg/' + tdata[2] + '" width="100%"></div>';
      html += '    <div class="block-content">';
      html += '        ' + tdata[1] + ' ' + tdata[2] + ' ';
      html += '   </div>';
      html += '</div>';
    }

    $$('#redaktion_box_ul').html(html);

  });



});



// Redaktion einzeln
$$(document).on('page:init', '.page[data-name="redaktion_showRedaktion"]', function(e) {
  var rid = e.detail.route.query.rid;
  app.data.redaktion.thisRID = rid;

  // redaktions daten
  app.request.post('php/action_load_showRedaktion.php', {
    rid: rid
  }, function(data) {
    //  console.log('load_showRedaktion data => '+ data);

    var tdata = data.split('#$#');
    // `id`, `name`, `img`, `desc`, `sprecherid`, `agid`
    $$("#redaktion_name").html(tdata[1]).data("rid", rid).data("sid", tdata[4]);
    $$("#redaktion_des").html(tdata[3]);
    $$("#redChat").attr('href', '/chat-single/?typ=redaktion&name=' + tdata[1] + '&id=' + rid + '');
    app.data.redaktion.thisRIDsprecher = tdata[4];
    app.data.redaktion.thisRNAME = tdata[1];
    $$(".navbar .navbar-inner .right").html("");
  });


  // redaktion beiträge
  app.methods.loadRedaktionBeitrag(rid);



  // change init filter init
  $$('.archiv_file_select').change(function(e) {
    var valueSelected = $$(this).val();
    $$(".t_file").addClass("hidden");
    $.each(valueSelected, function(index, value) {
      $$(".t_" + value + "").removeClass("hidden");
    });

  });

  // archiv data für die redaktion
  app.methods.allArchivfileForRedaktion(rid);


  app.methods.loadRedaktionMitglieder("#mitglieder_redaktion_box_ul", rid);

  if (app.data.user.id == app.data.redaktion.thisRID || app.data.user.status == "admin") {


    app.methods.show_NOT_Mitglieder_Redaktion("#NOT_mitglieder_box_ul_r", rid);

  }


  var searchbar = app.searchbar.create({
    el: '.searchbar',
    searchContainer: '.list',
    searchIn: '.item-title',
    on: {
      search(sb, query, previousQuery) {
        //  console.log(query, previousQuery);
      }
    }
  });



});




/*
+  ADMIN BEREICH
*/




$$(document).on('page:init', '.page[data-name="admin-board"]', function(e) {
  app.methods.senderpreloader_open();

  app.request.post('php/action_admin-board.php', {
    typ: "adminboard_counts"
  }, function(data) {
    if (data == "schön das du unseren Code verstanden hast ;) aber das hier ist nicht für dich gedacht.") {
      app.dialog.alert(data);
      return null;
    }

    var logdata = data.split("#$#");
    $("#log_count_user").html(logdata[0]);
    $("#log_count_user_texts").html(logdata[1]);
    $("#log_count_user_archivs").html(logdata[2]);

    $("#log_count_archiv_audio").html(logdata[3]);
    $("#log_count_archiv_video").html(logdata[4]);
    $("#log_count_archiv_document").html(logdata[5]);
    $("#log_count_archiv_image").html(logdata[6]);
    $("#log_count_archiv_all").html(logdata[7]);


    $("#log_red_count_all").html(logdata[8]);
    $("#log_red_count_open").html(logdata[9]);
    $("#log_red_count_close").html(logdata[10]);
    $("#log_red_count_texts").html(logdata[11]);
    $("#log_red_count_archivs").html(logdata[12]);
    $("#log_red_count_todos").html(logdata[13]);


    $("#log_count_newsletter").html(logdata[14]);
    $("#log_sum_spenden").html(logdata[15] + " €");


  });
  app.methods.senderpreloader_close();

});

$$(document).on('page:init', '.page[data-name="admin-log"]', function(e) {
  app.methods.senderpreloader_open();


  app.request.post('php/action_admin-board.php', {
    typ: "adminboard_log"
  }, function(data) {

    if (data == "schön das du unseren Code verstanden hast ;) aber das hier ist nicht für dich gedacht.") {
      app.dialog.alert(data);
      return null;
    }


    var tarr = data.split("#|#"),
      l = 200,
      i = 0,
      tdata, html = "",
      day, thisday, backgr = "dunkel",
      datum;

    for (i; i < l; i++) {
      //  0`id`, `typ`, 2`creator`, `creatorID`, 4`date`, `text`, 6`for_user`, `gelesen`
      tdata = tarr[i].split("#$#");
      datum = moment(tdata[4]).format("dddd, DD. MMMM");

      if (i == 0) {
        day = moment(tdata[4]).format("DD");
        html += "<p>" + datum + "</p>";
      } else {
        thisday = moment(tdata[4]).format("DD");
        if (day != thisday) {
          day = thisday;
          if (backgr == "dunkel") {
            backgr = "hell";
          } else {
            backgr = "dunkel";
          }

          html += "<hr><p>" + datum + "</p>";

        }
      }
      html += "<div class='" + backgr + "' ><b>" + tdata[1] + "</b>&ensp;<i>" + moment(tdata[4]).format("DD.MM kk:mm") + "</i>&ensp;<b><a href='javascript: showUser(" + tdata[3] + ")'>" + tdata[2] + "</b></a>&ensp;<i>" + tdata[5] + "</i></div>";
    } //for
    $("#log_box").html(html);
    app.methods.senderpreloader_close();
  });

});

$$(document).on('page:init', '.page[data-name="admin-goodnews"]', function(e) {

  app.loadAdminGoodnews = function() {

    app.request.post('php/action_admin_goodnews.php', {
      typ: "news"
    }, function(data) {

      if (data != "") {
        //    0`id`, 1`ag_id`, 2`ag_name`, 3`title`, 4`txt`, 5 date`, `creator`, 7`creator_id`, 8`gn-pos`  9userimg, 10anrede, 11countComment 

        var tarr = data.split('#|#'),
          i = 0,
          l = tarr.length,
          tdata,
          html = '',
          html_left = '',
          html_right = '';

        for (i; i < l; i++) {
          tdata = tarr[i].split('#$#');
          html = '';
          html += '<div class="card demo-facebook-card">';
          html += '     <div class="card-header">';
          html += '           <div class="demo-facebook-avatar">';
          html += '               <img src="images/site/logo120_trans.png" width="34" height="34"/>';
          html += '           </div>';
          html += '           <div class="demo-facebook-name">sender.fm</div>';
          html += '           <div class="demo-facebook-date">' + moment(tdata[5]).format('DD.MM.YYYY, HH:mm') + ' Uhr</div>';
          html += '     </div>';
          html += '     <div class="card-content siteContentAndImages cont' + tdata[0] + '"> ';
          html += '           ' + tdata[4] + '';
          html += '     </div>';
          html += '<button class="col button open-confirm goodnews_delete" data-id="' + tdata[0] + '">löschen</button>';
          html += '<button class="col button open-confirm goodnews_edit" data-id="' + tdata[0] + '">edit</button>';
          html += '</div><br><br>';
          if (tdata[8] === "left") {
            html_left += html;
          } else {
            html_right += html;
          }
        }

        $$("#goodnews_admin_content_box_left").html(html_left);
        $$("#goodnews_admin_content_box_right").html(html_right);

      } else {
        $$("#goodnews_admin_content_box_left").html("keine Beiträge");
      }
    });


  }

  app.loadAdminGoodnews();
  app.methods.linkHandler();
  app.methods.initQuill("#editor-container-goodnews", null, null);


});


$$(document).on('page:init', '.page[data-name="admin-redaktionen"]', function(e) {
  app.methods.load_allRedaktionen();
});


$$(document).on('page:init', '.page[data-name="admin-anfragen"]', function() {


  app.request.post('php/action_load_kontakt_to_Admin.php', {}, function(data) {

    var tarr = data.split('#|#'),
      i = 0,
      l = tarr.length,
      tdata, html = '';

    for (i; i < l; i++) {
      tdata = tarr[i].split('#$#');
      //  `id`, 1`typ`, 2`name`, 3`mail`, `text`,  5`date`,  6`uid`, 7answerPerMail
      html += ' <li>';
      html += '          <a href="#" class="item-link item-content showKontaktMessage" data-tdata="' + tdata + '">';
      html += '            <div class="item-inner">';
      html += '              <div class="item-title-row">';
      html += '                <div class="item-title">' + tdata[1] + '</div>';
      html += '                <div class="item-after">' + tdata[5] + ' (' + tdata[3] + ')</div>';
      html += '              </div>';
      html += '              <div class="item-subtitle">New Nachricht von ' + tdata[2] + '</div>';
      html += '              <div class="item-text">' + tdata[4] + '</div>';
      html += '            </div>';
      html += '          </a>';
      html += '        </li>';

    }

    $$("#anfragen_ul").html("").html(html);

  });

  $$(document).on("click", ".showKontaktMessage", function() {
    var tdata = $$(this).data("tdata");
    //  `id`, 1`typ`, 2`name`, 3`mail`, `text`,  5`date`,  6`uid`, 7answerPerMail
    // Create dynamic Popup
    var dynamicKontaktPopup = app.popup.create({
      content: '<div class="popup">' +
        ' <div class="navbar">' +
        '    <div class="navbar-inner">' +
        '        <div class="left  "> </div>' +
        '        <div class="title link">Mail Ansicht</div>' +
        '        <div class="right button button-fill popup-close">schließen</div>' +
        '    </div>' +
        '</div>' +
        '<div class="block">' +

        '</div>' +
        '</div>',
      // Events
      on: {
        open: function(popup) {
          //  console.log('dynamicKontaktPopup open'); 

          app.request.post('php/action_load_only_kontakt.php', {}, function(data) {});
        },
        opened: function(popup) {},
      }
    });
    // Events also can be assigned on instance later
    dynamicKontaktPopup.on('close', function(popup) {});
    dynamicKontaktPopup.on('closed', function(popup) {});
    dynamicKontaktPopup.open();
  });

});


$$(document).on('page:init', '.page[data-name="admin-chronik"]', function() {
  app.methods.senderpreloader_open();


  // Beiträge
  app.data.admin.loadBeitrag = function() {
    app.request.post('php/action_load_newUserPosts.php', {
      typ: "news"
    }, function(data) {

      if (data != "") {
        var tarr = data.split('#|#'),
          i = 0,
          l = tarr.length,
          tdata1, html = '',
          html3 = '',
          audio_elm;

        for (i; i < l; i++) {
          // 0`id`, 1`txt`, 2`creator_id`, 3`creator`, 4`date`, 5zusatz,  6userimg, 7countComment, 8countLikes
          tdata1 = tarr[i].split('#$#');

          if (tdata1[5] == "UPLOAD-AUDIO") {
            // es kommt ein beitrag mit einer zeile DIV + DATA wo alles
            // zum audiofile drin ist
            audio_elm = tdata1[1].split('#$$#');

            var audio_file = audio_elm[0],
              audio_id = audio_elm[1],
              audio_uid = audio_elm[2],
              audio_agid = audio_elm[3],
              audio_filetitle = audio_elm[4],
              audio_fileundertitle = audio_elm[5],
              audio_filesize = audio_elm[6],
              audio_playtime = audio_elm[7];


            html3 += '    <div id="profil_contentBOX' + tdata1[0] + '" class="card demo-facebook-card audioBeitrag">';
            html3 += '     <div class="card-header">';
            html3 += '         <div class="demo-facebook-avatar"><img src="useruploads/profilbilder/' + tdata1[6] + '" width="34" height="34"/></div>';
            html3 += '         <div class="demo-facebook-name">' + tdata1[3] + '</div>';
            html3 += '         <div class="demo-facebook-date size-10">' + moment(tdata1[4]).format("DD.MM.YYYY - HH:mm") + ' Uhr</div>';
            html3 += '     </div>';
            html3 += '     <div   class="card-content card-content-padding row siteContentAndImages">';
            html3 += '     <div class="col-20 player-play-button"  data-file="' + audio_file + '" data-id="' + audio_id + '" data-uid="' + audio_uid + '" data-agid=""> ';
            html3 += '         <i class=" fa fa-play fa-3x text-color-orange"></i>';
            html3 += '     </div> ';
            html3 += '         <div class="col-80">' + audio_filetitle + '';
            html3 += '             <h3>' + audio_filetitle + '</h3>';
            html3 += '             <div>' + audio_fileundertitle + '</div>';
            html3 += '         </div>';
            html3 += '     </div>';
            html3 += '     <div class="card-footer">';
            html3 += '          <a href="#" class="link postDelete" data-id="' + tdata1[0] + '"><i class="fa fa-trash-o text-color-orange" aria-hidden="true"></i></a>';
            html3 += '     </div>';
            html3 += ' </div>';


          } else {



            html3 += '     <div id="profil_contentBOX' + tdata1[0] + '" class="card demo-facebook-card textBeitrag">';
            html3 += '        <div class="card-header">';
            html3 += '          <div class="demo-facebook-avatar"><img src="useruploads/profilbilder/' + tdata1[6] + '" width="34" height="34"/></div>';
            html3 += '          <div class="demo-facebook-name">' + tdata1[3] + '</div>';
            html3 += '          <div class="demo-facebook-date size-10">' + moment(tdata1[4]).format("DD.MM.YYYY - HH:mm") + ' Uhr</div>';
            html3 += '      </div>';
            html3 += '      <div id="profil_content' + tdata1[0] + '" class="card-content card-content-padding siteContentAndImages"> ';
            html3 += '         ' + tdata1[1] + ' ';
            html3 += '      </div>';
            html3 += '      <div class="card-footer">';
            html3 += '          <a href="#" class="link postDelete" data-id="' + tdata1[0] + '"><i class="fa fa-trash-o text-color-orange" aria-hidden="true"></i></a>';
            html3 += '          </div>';
            html3 += '  </div>';
          }
        }

        $$('#content-admin-box').html(html3);
        app.methods.senderpreloader_close();

      } else {
        $$("#content-admin-box").html("<div>0 Beiträge von Mitgliedern</div>");
        app.methods.senderpreloader_close();
      }


    });
  };

  app.data.admin.loadBeitrag();
});

$$(document).on('page:init', '.page[data-name="admin-archiv"]', function() {

  // SELECT init
  var smartSelect = app.smartSelect.get('.smart-select');

  // change init filter init
  $$('.archiv_file_select').change(function(e) {
    var valueSelected = $$(this).val();
    $$(".t_file").addClass("hidden");
    $.each(valueSelected, function(index, value) {
      //console.log(".t_"+value+"");
      $$(".t_" + value + "").removeClass("hidden");
    });

  });


  app.methods.adminAllArchivfile();

});


$$(document).on('page:init', '.page[data-name="admin-spenden"]', function(e) {


  app.request.post('php/spenden.php', {
    typ: 'loadAllDonates_admin'
  }, function(data) {
    // console.log(data);     

    var tarr = data.split('#|#'),
      i = 0,
      l = tarr.length,
      tdata, html = '';

    for (i; i < l; i++) {
      // `id`, `txn_id`, `fall_name`, `payer_email`,  `betrag`, `db_date`
      tdata = tarr[i].split('#$#');
      html += '<li>';
      html += '<div class="item-content">';
      html += '            <div class="item-media">';
      html += '              <b>' + tdata[4] + ' </b> 	&ensp;<i class="fa fa-eur" aria-hidden="true"></i>';
      html += '            </div>';
      html += '            <div class="item-inner">';
      html += '              <div class="item-title-row">';
      html += '                <div class="item-title">' + tdata[1] + '</div>';
      html += '                <div class="item-after">' + moment(tdata[5]).format("HH:mm") + ' Uhr</div>';
      html += '              </div>';
      html += '              <div class="item-subtitle"> ' + tdata[3] + '</div>';
      html += '              <div class="item-text">' + moment(tdata[5]).format("DD.MM.YYYY") + '</div>';
      html += '            </div>';
      html += '          </div>';
      html += '        </li>';
    }

    $$("#donatelist_admin").html(html);


  });


});


$$(document).on('page:init', '.page[data-name="admin-texte-edit"]', function(e) {

  //  `impressum`, `ueber`, `agb`, `kontakt`, `spenden`, `lizenzvorlage`, `datenschutz`

  app.adminTexte = function(typ) {
    app.request.post('php/action_admin_texte.php', {
      typ: typ
    }, function(data) {
      //console.log(data);     

      // Create dynamic Popup
      var dynamicPopup = app.popup.create({
        content: '<div class="popup" style="overflow: auto">' +
          ' <div class="navbar">' +
          '    <div class="navbar-inner">' +
          '        <div class="left  "><div class="button button-fill " >bearbeiten</div> </div>' +
          '        <div class="title  " > </div>' +
          '        <div class="right"><div class="button button-fill popup-close">schließen</div></div>' +
          '    </div>' +
          '</div>' +
          '<div class="block editorbox  ">' +
          '   <div id="editor-container-adminTexte" class="senderfm_editor" style="min-height:250px; "></div>' +
          ' <button   class="col button button-fill saveNewAdminText" data-typ="' + typ + '">speichern</button>' +
          '</div>' +
          '<div class="block vorschauEditor">' +
          data +
          '</div>' +
          '</div>',
        // Events
        on: {
          open: function(popup) {
            //console.log('Popup open');
            app.methods.initQuill("#editor-container-adminTexte", "setHTML", data);


          },
          opened: function(popup) {
            // console.log('Popup opened');
          },
        }
      });
      // Events also can be assigned on instance later
      dynamicPopup.on('close', function(popup) {
        // console.log('Popup close');
      });
      dynamicPopup.on('closed', function(popup) {
        //console.log('Popup closed');
      });

      dynamicPopup.open();
    });
  }

  $$(".loadAdminText").click(function() {
    var typ = $$(this).attr("data-typ");
    //  console.log(typ); 
    app.adminTexte(typ);
  });
});


$$(document).on('page:init', '.page[data-name="admin-sendeplan"]', function(e) {

  //  `impressum`, `ueber`, `agb`, `kontakt`, `spenden`, `lizenzvorlage`, `datenschutz`

  app.methods.senderpreloader_open();

  app.sendeplandata = (function() {
    app.request.post('php/action_admin_sendeplan.php', {
      typ: "counts"
    }, function(data) {
      //  console.log("action_admin_sendeplan data=> "+ data );     

      $$(".my-gauge").html("");
      // counts  - 
      //  0 COUNT(programm_allInDB),  '#$#'
      //  1 COUNT(programm_open_send), '#$#'
      //  2 DATE(airtimebot_last_run), '#$#'
      //  3 TEXT(link_last_airprotokoll) '#$#'
      //  4 DATE(link_last_mysqlbackup), '#$#'
      //  5 TEXT(link_last_mysqlbackup), '#$#'
      // "#%%#"
      //   letzte sendung: 0`id`,  1`instance_id`, 2`end_timestamp`, 3`start_timestamp`, 4`name`  '#$#'


      var tarr = data.split('#&&#');
      //  console.log("tarr[0] data=> "+ tarr[0] );    
      //  console.log("tarr[1] data=> "+ tarr[1] );

      var tdata = tarr[0].split('#$#'),
        tlastS = tarr[1].split('#$#'),

        count_allSendungen = tdata[0],
        count_openSendung = tdata[1],
        date_lastRunAIRTIMEBOT = tdata[2],
        linkPDFlog = tdata[3],
        date_linkSQLBackupDB = tdata[4],
        linkSQLBackupDB = tdata[5],
        prozent_real = (count_openSendung / (count_allSendungen / 100)),
        prozent_open = Math.round((count_openSendung / (count_allSendungen / 100))),
        prozent_close = (100 - prozent_open),
        lastSendung_enddate = moment(tlastS[2]).format('DD.MM.YYYY - HH:mm'),
        lastSendung_startdate = moment(tlastS[3]).format('DD.MM.YYYY - HH:mm'),
        lastSendung_name = tlastS[4],
        lastSendung_timeStart = moment(tlastS[3]).endOf().fromNow(),
        lastSendung_timeEnd = moment(tlastS[2]).endOf().fromNow();
      /*
                  console.log("lastSendung_enddate =>" + lastSendung_enddate );
                  console.log("lastSendung_startdate =>" + lastSendung_startdate );
                  console.log("lastSendung_name =>" + lastSendung_name );
                  console.log("lastSendung_timeStart =>" + lastSendung_timeStart );
                  console.log("lastSendung_timeEnd =>" + lastSendung_timeEnd );

                  console.log("count_allSendungen =>" + count_allSendungen);
                  console.log("count_openSendung =>" + count_openSendung);
                  console.log("date_lastRunAIRTIMEBOT =>" + date_lastRunAIRTIMEBOT);
                  console.log("linkPDFlog =>" +linkPDFlog );
                  console.log("linkSQLBackupDB =>" +linkSQLBackupDB );
                  console.log("prozent_real =>" + prozent_real );
                  console.log("prozent_open =>" + prozent_open );
                  console.log("prozent_close =>" + prozent_close );
      */
      $$(".c1").html(count_openSendung);
      $$(".c2").html(lastSendung_timeEnd + " - <d class='text-color-orange'>" + lastSendung_name + "</d> - " + lastSendung_startdate + " Uhr, <div class='text-color-orange'>Sendungsende:</div>  " + lastSendung_enddate + " Uhr ");
      $$(".c3").html(moment(date_lastRunAIRTIMEBOT).format('DD.MM.YYYY - HH:mm'));
      $$(".c4").html("<a class='link external' href='https://sender.fm/" + linkPDFlog + "'>kannst du hier </a>");

      $$(".c5").html(count_allSendungen);
      $$(".c6").html(moment(date_linkSQLBackupDB).format('DD.MM.YYYY - HH:mm'));
      $$(".c7").html("<a class='link external' href='https://sender.fm/" + linkSQLBackupDB + "'>kannst du hier. </a>");


      var demoGauge = app.gauge.create({
        el: '.my-gauge',
        type: 'semicircle',
        value: prozent_close / 100,
        size: 1000,
        borderColor: 'orange',
        borderBgColor: "green",
        borderWidth: 100,
        valueText: "" + count_openSendung + " (" + prozent_open + " %)",
        valueFontSize: 50,
        valueTextColor: '#2196f3',
        labelText: "offene Sendungen",
        valueTextColor: '#2196f3',
        labelFontSize: 40

      });

      // Change demo gauge on button click
      $$('.my-gauge').on('click', function() {
        var value = $$(this).attr('data-value');
        demoGauge.update({
          value: value / 100,
          valueText: value + '%'
        });
      });

      app.methods.senderpreloader_close();
    });
  });
  app.sendeplandata();
  app.methods.senderpreloader_close();

  $$(".startAirtimebot").click(function() {
    app.dialog.confirm('Sendeplan Datenbank bei sender.fm mit der Airtime Datenbank abgleichen? ', function() {

      app.methods.senderpreloader_open();
      app.request.post('php/action_admin_airtimebot.php', {}, function(data) {
        defaultPopup.open();
        $$(".defaultPopup-content").html(data);
        app.methods.senderpreloader_close();
      });
    });

  });
  $$(".startMYSQLbackup").click(function() {
    app.dialog.confirm('Ein Backup der Sendeplan Datenbank durchführen?', function() {

      app.methods.senderpreloader_open();
      app.request.post('php/action_admin_mysqlbackup.php', {}, function(data) {
        app.methods.senderpreloader_close();
        app.dialog.alert(data);
        app.sendeplandata();

      });
    });
  });

});

$$(document).on('page:init', '.page[data-name="admin-mitglieder"]', function(e) {
  app.request.post('php/action_admin_mitglieder.php', {
    filter: "datum"
  }, function(data) {

    var tarr = data.split('#|#'),
      i = 0,
      l = tarr.length,
      tdata, html = '';
    // 0`userid`, 1`vorname`, 2`nachname`, 3`ort` , 4`img`, 5activiert
    for (i; i < l; i++) {
      tdata = tarr[i].split('#$#');
      html += ' <li class="item-content listcss">';
      html += '<div class="item-inner" >';
      if (tdata[4] != "") {
        html += '  <div class="item-title showUser" data-uid="' + tdata[0] + '"><img  src="useruploads/profilbilder/' + tdata[4] + '" height="40px" >  ' + tdata[1] + ' ' + tdata[2] + '</div>';
      } else {
        html += '  <div class="item-title showUser" data-uid="' + tdata[0] + '"><i class="fa fa-user-circle " aria-hidden="true"> </i>  ' + tdata[1] + ' ' + tdata[2] + '</div>';
      }

      html += '<div class="segmented">';



      if (tdata[5] == "mail_ok") {
        html += '     <a class="button  activateUser color-green" data-uid="' + tdata[0] + '">aktivieren</a>';
      }
      if (tdata[5] == "Nein") {
        html += '     <a class="button newActivateUser color-pink" data-uid="' + tdata[0] + '">prüfen</a>';
      }
      html += '    <a id="profil_diamant" href="" class="col button link"><i class="fa fa-diamond"></i>100</a>';
      html += '     <a class="deleteUser button color-red" data-uid="' + tdata[0] + '">löschen</a>';
      html += ' </div>';
      html += '</div>';
      html += '</li>';
    }

    $$("#mitglieder_box_ul_a").html(html);

    var searchbar = app.searchbar.create({
      el: '.searchbar',
      searchContainer: '.list',
      searchIn: '.item-title',
      on: {
        search(sb, query, previousQuery) {}
      }
    });
  });
});

$$(document).on("click", ".activateUser", function() {
  var id = $$(this).data("uid");
  app.dialog.confirm('Mitglied freigeben?', function() {

    app.request.post('php/action_activate_mitglied.php', {
      userid: id
    }, function(data) {

      if (data == "aktiviert") {
        toastUserIsActiv.open();
      }

    });
  });
});

$$(document).on("click", ".newActivateUser", function() {
  var id = $$(this).data("uid");
  app.dialog.confirm('Mitglied freigeben?', function() {

    app.request.post('php/action_activate_mitglied.php', {
      userid: id
    }, function(data) {
      if (data == "aktiviert") {
        toastUserIsActiv.open();
      }

    });
  });
});


$$(document).on("click", ".profil_admin_diamant", function() {
  var id = $$(this).data("uid");

  // Create dynamic Popup
  var aboPopup = app.popup.create({
    content: '<div class="popup" style="overflow:auto">' +
      '<div class="navbar">' +
      '<div class="navbar-inner">' +
      '    <div class="left"></div>' +
      '    <div class="title">Diamanten</div>' +
      '    <div class="right link popup-close"><i class="fa fa-times fa-2x" aria-hidden="true"></i></div>' +
      '</div>' +
      '</div>' +
      '<div class="block">' +
      '<div class="size-15">User Diamanten</div><br>' +
      '<div class="row text-align-center">' +
      '<div class="col"><i class="fa fa-diamond fa-5x" aria-hidden="true"></i></div>' +
      '<div class="col size-50">100</div>' +
      '</div>' +
      '</div>' +
      '<div class="block">' +
      '<div class="size-15">Diamanten erhalten</div><br>' +
      '<div id="diamant_li_erhalten">' +
      '0 Diamanten erhalten' +
      '</div>' +
      '</div>' +
      '<div class="block">' +
      '<div class="size-15">Diamanten vergeben</div><br>' +
      '<div id="diamant_li_vergeben">' +
      '0 Diamanten vergeben' +
      '</div>' +
      '</div>' +

      '<div class="block">' +
      '<div class="size-15">Diamanten bekommen</div><br>' +
      '<div>User können dir Diamanten für Audio und Textbeiträge geben ;)</div> <br>' +
      'Ansonsten kannst du wie folgt Diamanten bekommen. <br>' +
      '<div class="row">' +
      '<div class="col">tägliches anmelden</div>' +
      '<div class="col">1 Diamanten pro Tag</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col">Audio hochladen</div>' +
      '<div class="col">10 Diamanten pro Audio nach 14 Tagen</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col">Text veröffentlichen</div>' +
      '<div class="col">1 Diamanten nach 2 Tagen</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col">Spende (pro Euro)</div>' +
      '<div class="col">5 Diamanten</div>' +
      '</div>' +
      '<br><br><div>Das abschalten der dezenten Werbung kostet einen Diamanten pro Tag nach Anmeldung.</div>' +
      '</div>' +


      '</div>',
    // Events
    on: {
      open: function(popup) {
        // console.log('Popup open');
      },
      opened: function(popup) {
        //  console.log('Popup opened');
      },
    }
  });
  // Events also can be assigned on instance later
  aboPopup.on('close', function(popup) {
    // console.log('Popup close');
  });
  aboPopup.on('closed', function(popup) {
    // console.log('Popup closed');
  });
  aboPopup.open();
  // app.data.profil.loadProfilDiamanten();
});

$$(document).on("click", ".deleteUser", function() {
  var id = $$(this).data("uid");
  app.request.post('php/action_delete_mitglied.php', {
    userid: id
  }, function(data) {
    //  console.log('action_delete_mitglied.php data => ' + data);

  });
});

$$(document).on('page:init', '.page[data-name="eigenesendung"]', function() {


  $$(document).on('click', '#kontakt_eigenesendung', function(e) {
    var name = $$("#f_name").val();
    var mail = $$("#f_mail").val();
    var text = $$("#f_text").val();

    app.request.post('php/action_save_kontakt.php', {
      typ: "eigene Sendung",
      name: name,
      mail: mail,
      text: text
    }, function(data) {
      // console.log(data);
    });

  });

});



$$(document).on('page:init', '.page[data-name="recorder"]', function() {


  var log = console.log.bind(console),
    id = val => document.getElementById(val),
    ul = $$("ul"),
    gUMbtn = $$("#gUMbtn"),
    start = $$("#start"),
    stop = $$("#stop"),
    stream,
    recorder,
    counter = 1,
    chunks,
    media;


  $$("#gUMbtn").click(function() {
    mv = $$("#mediaVideo"),
      mediaOptions = {
        video: {
          tag: 'video',
          type: 'video/webm',
          ext: '.mp4',
          gUM: {
            video: true,
            audio: true
          }
        },

        audio: {
          tag: 'audio',
          type: 'audio/ogg',
          ext: '.ogg',
          gUM: {
            audio: true
          }
        }

      };
    media = mediaOptions.audio;
    navigator.mediaDevices.getUserMedia(media.gUM).then(_stream => {
      stream = _stream;
      id('gUMArea').style.display = 'none';
      id('btns').style.display = 'inherit';
      start.removeAttr('disabled');
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = e => {
        chunks.push(e.data);
        if (recorder.state == 'inactive') makeLink();
      };
      // app.methods.log('got media successfully');
    }).catch(log);
  });

  $$("#start").click(function(e) {
    $$("#ul").html("");
    start.disabled = true;
    stop.removeAttr('disabled');
    chunks = [];
    recorder.start();
  });


  $$("#stop").click(function(e) {
    stop.disabled = true;
    recorder.stop();
    start.removeAttr('disabled');
  });



  function makeLink() {
    let blob = new Blob(chunks, {
        type: media.type
      }),
      url = URL.createObjectURL(blob),
      li = document.createElement('li'),
      mt = document.createElement(media.tag),
      hf = document.createElement('a');
    mt.controls = true;
    debugger;
    mt.src = url;
    hf.href = url;
    hf.download = `${counter++}${media.ext}`;
    hf.innerHTML = `donwload ${hf.download}`;
    li.appendChild(mt);
    li.appendChild(hf);
    ul.appendChild(li);
  }

});


$$(document).on('page:init', '.page[data-name="game"]', function() {
  // Now set up your game (most games will load a separate .js file)
  var Q = Quintus() // Create a new engine instance
    .include("Sprites, Scenes, Input, 2D, Touch, UI") // Load any needed modules
    .setup() // Add a canvas element onto the page
    .controls() // Add in default controls (keyboard, buttons)
    .touch(); // Add in touch support (for the UI)

  // You can create a sub-class by extending the Q.Sprite class to create Q.Player
  Q.Sprite.extend("Player", {

    // the init constructor is called on creation
    init: function(p) {

      // You can call the parent's constructor with this._super(..)
      this._super(p, {
        sheet: "player", // Setting a sprite sheet sets sprite width and height
        x: 410, // You can also set additional properties that can
        y: 90 // be overridden on object creation
      });

      // Add in pre-made components to get up and running quickly
      this.add('2d, platformerControls');

      // Write event handlers to respond hook into behaviors.
      // hit.sprite is called everytime the player collides with a sprite
      this.on("hit.sprite", function(collision) {
        // Check the collision, if it's the Tower, you win!
        if (collision.obj.isA("Tower")) {
          // Stage the endGame scene above the current stage
          Q.stageScene("endGame", 1, {
            label: "You Won!"
          });
          // Remove the player to prevent them from moving
          this.destroy();
        }
      });
    }
  });

  // Sprites can be simple, the Tower sprite just sets a custom sprite sheet
  Q.Sprite.extend("Tower", {
    init: function(p) {
      this._super(p, {
        sheet: 'tower'
      });
    }
  });

  // Create the Enemy class to add in some baddies
  Q.Sprite.extend("Enemy", {
    init: function(p) {
      this._super(p, {
        sheet: 'enemy',
        vx: 100
      });

      // Enemies use the Bounce AI to change direction 
      // whenver they run into something.
      this.add('2d, aiBounce');

      // Listen for a sprite collision, if it's the player,
      // end the game unless the enemy is hit on top
      this.on("bump.left,bump.right,bump.bottom", function(collision) {
        if (collision.obj.isA("Player")) {
          Q.stageScene("endGame", 1, {
            label: "You Died"
          });
          collision.obj.destroy();
        }
      });

      // If the enemy gets hit on the top, destroy it
      // and give the user a "hop"
      this.on("bump.top", function(collision) {
        if (collision.obj.isA("Player")) {
          this.destroy();
          collision.obj.p.vy = -300;
        }
      });
    }
  });



  // Create a new scene called level 1
  Q.scene("level1", function(stage) {

    // Add in a tile layer, and make it the collision layer
    stage.collisionLayer(new Q.TileLayer({
      dataAsset: 'level.json',
      sheet: 'tiles'
    }));

    // Create the player and add him to the stage
    var player = stage.insert(new Q.Player());

    // Give the stage a moveable viewport and tell it
    // to follow the player.
    stage.add("viewport").follow(player);

    // Add in a couple of enemies
    stage.insert(new Q.Enemy({
      x: 700,
      y: 0
    }));
    stage.insert(new Q.Enemy({
      x: 800,
      y: 0
    }));

    // Finally add in the tower goal
    stage.insert(new Q.Tower({
      x: 180,
      y: 50
    }));
  });

  // To display a game over / game won popup box, 
  // create a endGame scene that takes in a `label` option
  // to control the displayed message.
  Q.scene('endGame', function(stage) {
    var container = stage.insert(new Q.UI.Container({
      x: Q.width / 2,
      y: Q.height / 2,
      fill: "rgba(0,0,0,0.5)"
    }));

    var button = container.insert(new Q.UI.Button({
      x: 0,
      y: 0,
      fill: "#CCCCCC",
      label: "Play Again"
    }))
    var label = container.insert(new Q.UI.Text({
      x: 10,
      y: -10 - button.p.h,
      label: stage.options.label
    }));
    // When the button is clicked, clear all the stages
    // and restart the game.
    button.on("click", function() {
      Q.clearStages();
      Q.stageScene('level1');
    });

    // Expand the container to visibily fit it's contents
    container.fit(20);
  });


  // Q.load can be called at any time to load additional assets
  // assets that are already loaded will be skipped
  Q.load("sprites.png, sprites.json, level.json, tiles.png",
    // The callback will be triggered when everything is loaded
    function() {
      // Sprites sheets can be created manually
      Q.sheet("tiles", "tiles.png", {
        tilew: 32,
        tileh: 32
      });

      // Or from a .json asset that defines sprite locations
      Q.compileSheets("sprites.png", "sprites.json");

      // Finally, call stageScene to run the game
      Q.stageScene("level1");
    });

});




/*
+  Hauptbereich
*/



// Sendeplan anzeigen
$$(document).on('click', '#sendeplan_ran', function(e) {
  app.request.post('php/action_sendeplan_future.php', {}, function(data) {

    var tarr = data.split('#|#'),
      i = 0,
      l = tarr.length,
      tdata, html = '';

    for (i; i < l; i++) {
      tdata = tarr[i].split('#$#');
      //`id`, `instance_id`, `end_timestamp`, `start_timestamp`, `name` 
      html += '<div id="sendung' + tdata[0] + '" class="timeline-item-inner popup-open preview-sendung">';
      html += '<div class="timeline-item-time">' + moment(tdata[3]).format('HH:mm') + '</div>';
      html += '' + tdata[4] + '';
      html += '</div>';

    }

    $$('#panel-content-left .page-content .block').html(html);
    $$('#panel-content-left .title').html("gelaufen");
  });
});

// SENDEPLAN Future
$$(document).on('click', '#sendeplan_future', function(e) {
  var data = app.request.get('php/action_sendeplan_future.php', {}, function(data) {

    var tarr = data.split('#|#'),
      i = 0,
      l = tarr.length,
      tdata, html = '';

    for (i; i < l; i++) {
      tdata = tarr[i].split('#$#');
      //`id`, `instance_id`, `end_timestamp`, `start_timestamp`, `name` 
      html += '<div id="sendung' + tdata[0] + '" class="timeline-item-inner preview-sendung">';
      html += '<div class="timeline-item-time">' + moment(tdata[3]).format('HH:mm') + '</div>';
      html += '' + tdata[4] + '';
      html += '</div>';

    }

    $$('#panel-content-right .page-content .block').html(html);
    $$('#panel-content-right .title').html("zukunft");
  });
});



// Seneplan - einzelne Sendung vorschau
$$(document).on('click', '.preview-sendung', function(e) {
  defaultPopup.open();
  var id = $$(this).data("id");
  app.request.post('php/action_sendeplan_ID.php', {
    id: id
  }, function(data) {
    var tdata = data.split('#$#');
    // 0`id`, 1`instance_id`, 2`end_timestamp`, 3`start_timestamp`, 4`name`,5`description`,6`instance_description`

    var html = ' <div class="card">';
    html += '   <div class="card-header "><b class="size-30">' + tdata[4] + '</b><small>' + moment(tdata[3]).fromNow() + '<small></div>';
    html += '   <div class="card-content card-content-padding size-20">';
    html += '        <div>' + urlify(tdata[5]) + '</div>';
    html += '   </div>';
    html += '  <div class="card-content card-content-padding size-20">' + last_line_url(tdata[6]) + '</div>';
    html += '  <div class="card-footer size-15">' + moment(tdata[3]).format('HH:mm') + ' - ' + moment(tdata[2]).format('HH:mm') + ' Uhr - ' + moment(tdata[2]).format('DD.MM.YYYY') + ' </div>';
    html += '</div>';

    $$(".popup .title").html(moment(tdata[3]).format('HH:mm - D.MM.YYYY'));
    $$(".defaultPopup-content").html(html);
  });

});




// Kontaktformular senden
$$(document).on('click', '#kontakt_absenden', function(e) {

  if (app.data.user.login == "ja") {
    var name = app.data.user.username;
    var mail = app.data.user.mail;
    var answerPerMail = $$("#toggleMail").val();
    var text = $$("#k_text").val();
  } else {
    var name = $$("#k_name").val();
    var mail = $$("#k_mail").val();
    var text = $$("#k_text").val();
    var answerPerMail = 1;

  }

  app.request.post('php/action_save_kontakt.php', {
    typ: "über Kontaktformular",
    name: name,
    mail: mail,
    text: text,
    answerPerMail: answerPerMail
  }, function(data) {
    $$("#k_name").val("");
    $$("#k_mail").val("");
    $$("#k_text").val("");
    app.dialog.alert('Danke, gesendet!');
  });

});




/*
+  REDAKTIONS BEREICH
*/


$$(document).on('click', '.showRedaktion', function() {
  var rid = $$(this).data("rid");

  app.router.navigate("/redaktion_showRedaktion/?rid=" + rid + "");

});


// beitrag redaktion speichern
$$(document).on('click', '#newBeitragRedaktion', function(e) {
  app.request.get('pages/new_beitrag_redaktion.html', {}, function(data) {
    // Create dynamic Popup
    app.popup.create({
      content: '<div class="popup" style="overflow: auto; background-color: #d9feff;">' +
        '<div class="block">' +
        ' <div class="fab fab-right-top color-yellow popup-close" style="top:0px" > <i class="fa fa-close fa-2x"></i> </div>' +
        '<br><br>' +
        '   <div id="editor-container-redaktionNewBeitrag" class="senderfm_editor" style="min-height:250px; "></div>' +
        ' <button id="saveNewRedaktionText" class="col button button-fill">speichern</button>' +
        '</div>' +
        '<div class="block vorschauEditor">' +
        '</div>' +
        '</div>',
      // Events
      on: {
        open: function(popup) {

          app.methods.linkHandler();

          var toolbarOptions = [
            ['image']

          ];

          app.methods.initQuill("#editor-container-redaktionNewBeitrag", null, null);



        },
        opened: function(popup) {},
      }
    }).open();

  });
});




$$(document).on('click', '.UserRedaktionStatus', function(e) {

  var rid = app.data.redaktion.thisRID;
  var uid = $$(this).attr("data-uid");

  if (app.data.user.id == app.data.redaktion.thisRIDsprecher || app.data.user.status == "admin") {

    app.request.post('php/load_userShow_redaktion_data.php', {
      uid: uid,
      rid: rid
    }, function(data) {

      // 0.`id`, 1`id_ag`, 2`id_mitglied`, 3vorname, 4nachname, 5img, 6`status`

      var tarr = data.split('#$#');


      // Create dynamic Sheet
      var dynamicSheet = app.sheet.create({
        content: '<div class="sheet-modal" >' +
          '<div class="toolbar">' +
          '<div class="toolbar-inner">' +
          '<div class="left"></div>' +
          '<div class="right">' +
          '<a class="link sheet-close">X</a>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="sheet-modal-inner scroll-invinity" style="overflow: scroll;">' +
          '<div class="block">' +
          '<p><b>' + tarr[3] + ' ' + tarr[4] + '</b></p>' +
          '<p>' + tarr[6] + '</p>' +
          ' <div class="item-after">' +
          ' ' +

          ' </div>' +
          '</div>' +
          '<div class="block">' +
          '<p><a href="#" class="link sheet-close">schließen</a></p>' +
          '<div><a href="#" class="deleteUserFromRedaktion" data-uid="' + tarr[2] + '">Entfernen | User aus Redaktionen entfernen.</a></div>' +

          '</div>' +
          '</div>' +
          '</div>',

        // Events
        on: {
          open: function(sheet) {},
          opened: function(sheet) {},
        }
      });
      // Events also can be assigned on instance later
      dynamicSheet.on('close', function(sheet) {});
      dynamicSheet.on('closed', function(sheet) {});

      // Open dynamic sheet
      dynamicSheet.open();



    });
  } else {
    app.methods.showUser(uid);
  }

});

$$(document).on('click', '.UserToRedaktion', function(e) {

  var rid = app.data.redaktion.thisRID;
  var uid = $$(this).attr("data-uid");
  var sid = app.data.redaktion.thisRIDsprecher;


  app.dialog.confirm('User der Redaktion hinzufügen?', function() {

    if (app.data.user.id == app.data.redaktion.thisRIDsprecher || app.data.user.status == "admin") {
      app.request.post('php/action_load_mitglieder.php', {
        filter: "save_mitgliedTo_Redaktion",
        rid: rid,
        uid: uid,
        sid: sid
      }, function(data) {

        app.methods.loadRedaktionMitglieder('#mitglieder_redaktion_box_ul', rid);
        app.methods.show_NOT_Mitglieder_Redaktion('#NOT_mitglieder_box_ul_r', rid);
        toastUserInRedaktion.open();

      });

    } else {
      app.methods.showUser(uid);
    }

  });

});

$$(document).on('click', '.deleteUserFromRedaktion', function(e) {

  var rid = app.data.redaktion.thisRID;
  var uid = $$(this).attr("data-uid");
  var sid = app.data.redaktion.thisRIDsprecher;


  app.dialog.confirm('User aus Redaktion entfernen?', function() {
    if (app.data.user.id == app.data.redaktion.thisRIDsprecher || app.data.user.status == "admin") {
      app.request.post('php/action_load_mitglieder.php', {
        filter: "delete_mitgliedFROM_Redaktion",
        rid: rid,
        uid: uid,
        sid: sid
      }, function(data) {
        //console.log("delete_mitgliedTo_Redaktion DATA => " + data);
        if (data == "speekerNOTDELETE") {
          alert("Der Sprecher kann nur durch sende.fm Admins gelöscht oder geändert werden!");
          return;
        }
        app.methods.loadRedaktionMitglieder('#mitglieder_redaktion_box_ul', rid);
        app.methods.show_NOT_Mitglieder_Redaktion('#NOT_mitglieder_box_ul_r', rid);
        $$(document).find('.sheet-close').click();
        toastUserOutRedaktion.open();

      });
    } else {

      app.methods.showUser(uid);

    }

  });

});

// redaktionsbeitrag beitrag löschen
$$(document).on('click', '.delete-redaktionsBeitrag', function() {
  if (app.data.user.status == "admin") {
    var contId = $$(this).attr("data-id");
    app.dialog.confirm('Diesen Beitrag wirklich löschen ' + contId + '?', function() {

      app.request.post('php/delete_content_redaktion.php', {
        contId: contId
      }, function(data) {
        // app.methods.log(data,"green");
        if (data == "OK") {
          BeitragDeleteCallback.open();
          app.methods.loadRedaktionBeitrag(app.data.redaktion.thisRID);
        };
      });
    });
  }
});




// alle anzeien
$$(document).on('click', '.btnALLr', function(e) {
  $$(".btnr").removeClass("button-active");
  $$(this).addClass("button-active");
  $$(".libox").removeClass("hidden");
});

// offene redaktionen anziegen 
$$(document).on('click', '.btnOPENr', function(e) {
  $$(".btnr").removeClass("button-active");
  $$(this).addClass("button-active");
  $$(".libox").addClass("hidden");
  $$(".offen").removeClass("hidden");
});

// geschlossenen redaktionen anzeigen
$$(document).on('click', '.btnCLOSEr', function(e) {
  $$(".btnr").removeClass("button-active");
  $$(this).addClass("button-active");
  $$(".libox").addClass("hidden");
  $$(".geschlossen").removeClass("hidden");
});

// einen neue redaktion anlegen
$$(document).on('click', '.btnNEUr', function(e) {

  var html1 = ' <form class="list" id="newredaktion">';
  html1 += '  <ul>';
  html1 += '  <li>';
  html1 += '  <div class="item-content item-input">';
  html1 += '  <div class="item-inner">';
  html1 += '  <div class="item-input-wrap">';
  html1 += ' <div class="image-crop"><img id="images" src="" class="cropper-hidden"></div>';
  html1 += '   </div>';

  html1 += '  <div class="item-title item-label link">Name</div>';
  html1 += '  <div class="item-input-wrap">';
  html1 += '  <input id="newredaktion_name" type="text" name="name" placeholder="Your name">';
  html1 += '   </div>';
  html1 += '  <div class="item-title item-label link">Sprecher</div>';
  html1 += '  <div class="item-input-wrap">';
  html1 += '  <input id="newredaktion_sprecher" type="text" name="name" data-uid="" placeholder="wähle einen Sprecher">';
  html1 += '   </div>';
  html1 += '  </div>';
  html1 += '  </div>';
  html1 += ' </li>';
  html1 += ' </ul>';
  html1 += ' </form>';



  var html = '<div class="block">';
  html += '<form class="searchbar">';
  html += '<div class="searchbar-inner">';
  html += '<div class="searchbar-input-wrap">';
  html += '<input type="search" placeholder="Search">';
  html += '<i class="searchbar-icon"></i>';
  html += ' <span class="input-clear-button"></span>';
  html += '</div>';
  html += '<span class="searchbar-disable-button">schließen</span>';
  html += '</div>';
  html += '</form>';


  html += '<div class="searchbar-backdrop"></div>';
  html += '<div class="block searchbar-hide-on-search"> </div>';
  html += '<div class="list searchbar-found">';
  html += '<ul id="mitglieder_redaktion_box_ul"> </ul>';
  html += '</div> ';
  html += '<div class="list searchbar-found">';
  html += '<ul id="list_all_userforspeeekr"></ul>';
  html += '</div>';
  html += '<div class="block searchbar-not-found">';
  html += '<div class="block-inner">kein Eintrag gefunden</div>';
  html += '</div>';
  html += '</div>';


  var html2 = ' <div class="accordion-item">';
  html2 += '<div class="accordion-item-toggle">Wähle einen Sprecher</div>';
  html2 += '<div class="accordion-item-content">' + html + '</div>';
  html2 += '</div>';
  html2 += ' <div class="col"><a class="button saveNewRedaktion" href="#">speichern</a>';

  defaultPopup.open();
  $$(".defaultPopup-nav-left").html();
  $$(".defaultPopup-nav-title").html("neue Redaktion");
  $$(".defaultPopup-nav-right").html();
  $$(".defaultPopup-content").html(html1 + html2);

  app.methods.loadMitgliederAlphabet("#list_all_userforspeeekr");
  app.accordion.open($$(".accordion-item"));


  // den sprecher wählen
  setTimeout(function() {
    // showUser entfernen für diese funktion 
    $$("#list_all_userforspeeekr .userevent").removeClass("showUser");


  }, 500);

});



$$(document).on("click", ".saveNewRedaktion", function() {
  var name = $$("#newredaktion_name").val();
  var uname = $$("#newredaktion_sprecher").val();
  var uid = $$("#newredaktion_sprecher").attr("data-uid");


  app.request.post('php/action_save_newRedaktion.php', {
    name: name,
    uname: uname,
    uid: uid
  }, function(data) {
    defaultPopup.close();
    app.methods.load_allRedaktionen();
  });
});




//  zum Sprecher machen?
$$(document).on("click", "#list_all_userforspeeekr .userevent", function() {

  var elem = $$(this);
  var uid = $$(elem).attr("data-uid");
  var uname = $$(elem).text();

  app.dialog.confirm('' + uname + ' zum Sprecher machen?', function() {

    $$("#newredaktion_sprecher").val(uname);
    $$("#newredaktion_sprecher").attr("data-uid", uid);

    app.accordion.close($$(".accordion-item"));
  });
});


$$(document).on('click', '.deleteRedaktion', function(e) {
  var rid = $$(this).attr("data-rid");
  app.dialog.confirm('Die Redaktion wirklich löschen ?', function() {

    app.request.post('php/action_delete_Redaktion.php', {
      rid: rid
    }, function(data) {

      app.methods.load_allRedaktionen();
    });
  });
});




/*
+  ADMIN BEREICH
*/

$$(document).on('click', '#navbar-admin', function() {

  if (app.data.user.logged == true) {
    app.request.post('pages/menu_right_profil_admin.html', function(data) {
      $$("#panel-content-right").html(data);
    });
  } else {
    $$("#panel-content-right").html("Login");
  }
});

$$(document).on('click', '.goodnews_delete', function() {
  var id = $$(this).attr("data-id");
  app.dialog.confirm('Diesen Beitrag wirklich löschen?', function() {
    app.request.post('php/action_content_goodnews.php', {
      typ: "delete",
      id: id
    }, function(data) {
      if (data == 0) {
        BeitragDeleteCallback.open();
        app.loadAdminGoodnews();
      };
    });
  });
});


$$(document).on('click', '.goodnews_edit', function() {

  var id = $$(this).attr("data-id");
  var html = $$('.cont' + id + '').html();
  app.popup.create({
    content: '<div class="popup" style="overflow: auto; background-color: #d9feff;">' +
      ' <div class="navbar">' +
      '    <div class="navbar-inner">' +
      '        <div class="left"> </div>' +
      '        <div class="title link">Beitrag bearbeiten</div>' +
      '        <div class="right"> <div class=" popup-close">schließen</div></div>' +
      '    </div>' +
      '</div>' +
      '<div class="block">' +
      '<br>' +
      '   <div id="editor-container-goodnewsEditBeitrag" class="senderfm_editor" style="min-height:250px; "></div>' +
      ' <button id="updateGoodnewsText" data-id="' + id + '" class="col button button-fill">speichern</button>' +
      '</div>' +
      '<div class="block vorschauEditor">' +
      html +
      '</div>' +
      '</div>',
    // Events
    on: {
      open: function(popup) {
        app.methods.initQuill("#editor-container-goodnewsEditBeitrag", "setHTML", html);

      },
      opened: function(popup) {

      },
    }
  }).open();


});


// ADMIN REDAKTIONEN 

/*
 +  Speichern von Beiträgen LINKS
 */

// admin-goodnwews-speichern
$$(document).on('click', '#goodnews_save', function(e) {
  var text = $$(".ql-editor").html();
  app.request.post('php/action_content_goodnews.php', {
    typ: "save",
    position: "left",
    text: text
  }, function(data) {
    console.log(data)
    if (data == "OK") {
      toast_saved.open();
      $$(".ql-editor").html("");
      app.loadAdminGoodnews();
      alert("admin hinweis: hier sollte sortiert werden / nur beiträge der linke seite laden")
    }
  });
});

/*
 +  Speichern von Beiträgen RECHTS
 */
// admin-goodnwewsrechts -speichern
$$(document).on('click', '#goodnews_save-right', function(e) {
  var text = $$(".ql-editor").html();
  app.request.post('php/action_content_goodnews.php', {
    typ: "save",
    position: "right",
    text: text
  }, function(data) {
    if (data == "OK") {
      toast_saved.open();
      $$(".ql-editor").html("");
      app.loadAdminGoodnews();

    }
  });
});


// goodnews beitrag update speichern
$$(document).on('click', '#updateGoodnewsText', function(e) {
  var id = $$(this).attr("data-id");

  var text = $("#editor-container-goodnewsEditBeitrag").find(".ql-editor").html();
  app.request.post('php/action_content_goodnews.php', {
    typ: "update",
    text: text,
    id: id
  }, function(data) {
    toast_saved.open();
    app.popup.close();
    app.loadAdminGoodnews();


  });
});

// admin-texte-speichern
$$(document).on('click', '.saveNewAdminText', function(e) {

  var typ = $$(this).attr("data-typ") + "-save";
  $(".ql-editor").find("a").addClass("link").addClass("external").css("font-style", "italic").css("font-family", "serif");

  var text = $$(".ql-editor").html();

  app.request.post('php/action_admin_texte.php', {
    typ: typ,
    text: text
  }, function(data) {
    if (data = "0") {
      toast_saved.open();
      app.popup.close();
    }
  });
});



// beitrag update speichern
$$(document).on('click', '#updateUserText', function(e) {
  var id = $$(this).attr("data-id");
  $(".ql-editor").find("a").addClass("link").addClass("external").css("font-style", "italic").css("font-family", "serif");

  var text = $$(".ql-editor").html();

  app.request.post('php/action_profil_content.php', {
    typ: "profil_update",
    text: text,
    id: id
  }, function(data) {
    toast_saved.open();
    app.popup.close();
    if ($$(".page.page-current").attr("data-name") == "admin-chronik") {
      app.data.admin.loadBeitrag();
    }
    if ($$(".page.page-current").attr("data-name") == "profil") {

      app.methods.loadProfilBeitrag();
    }


  });
});


// redaktion-beitrag
$$(document).on('click', '#saveNewRedaktionText', function(e) {

  var text = $$(".ql-editor").html();
  if (text == "") {
    alert("bitte trage etwas ein :) ");
    return;
  }
  var rid = $$("#redaktion_name").data("rid");
  var rname = $$("#redaktion_name").html();

  text = text.replace(/(<p)/igm, '<div').replace(/<\/p>/igm, '</div>')
  text = text;
  app.request.post('php/save_content_redaktion.php', {
    rid: rid,
    rname: rname,
    text: text
  }, function(data) {
    app.popup.close();
    app.methods.loadRedaktionBeitrag(app.data.redaktion.thisRID);

  });

});




// url in text finden
function urlify(text) {
  if (text != undefined) {
    var urlRegex = /(http(s)?:\/\/.)(www\.)?(?!@)([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/gim;
    return text.replace(urlRegex, function(url) {
      return '<a  href="' + url + '"  class="link external" target="_blank">' + url + '</a>';
    });
  }


}



/*
Herberts nachricht: Drittens nochmal die Sache mit dem Link zum Beitrag im Archiv. Es hat sich als extrem
muehsam und laestig herausgestellt, das immer haendisch einzutippen. Daher folgende Bitte, falls 
moeglich und nicht extrem aufwaendig:

Wenn die LETZTE ZEILE des Beschreibungsfeldes 'instance_description' mit 'http://' oder '
https://' BEGINNT (und NUR dann), sollen vor dem Link die Worte 'Beitrag im Archiv: ' 
erscheinen. Damit lassen sich alle anderen Faelle manuell abfangen und es waere eine grosse Erleichterung bei 
der Eingabe

REGEX  - letzte Zeile eines Textes  -  [     \r?[^\r\n]*$   ]
*/
function last_line_url(text) {
  var urlRegex, reg, lastline, reg2, isUrl, reg3, isYOU;

  // eine beliebite URL
  urlRegex = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

  reg = /\r?[^\r\n]*$/;
  lastline = reg.exec(text);

  reg2 = /^http|https:\/\/.*/g;
  isUrl = reg2.exec(lastline);


  // TODO 
  // regex  für das finden von einem link in der letzten zeile
  reg3 = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/g;
  isYOU = reg3.exec(lastline);
  // app.methods.log(isYOU, "green");
  // wenn ein link in der letzten zeile dann umwandeln
  if (isUrl != null) {
    if (isYOU == null) {

      text = text.replace(/\r?\n?[^\r\n]*$/, "");

      text = text + "Beitrag im Archiv: " + lastline;

      return urlify(text);
    } else {

      // Just the regex. Output is in [1].
      var r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/g;

      // video id rausziehen
      r = rx.exec(lastline);
      var videoid = r[1];

      var iframe = '   <div class="video_overlay pointer" onclick="StartExternVideo(\'YT\', \'' + videoid + '\')" ><i class="fa fa-youtube fa-3x hover"></i><img class="yt_mqdefault_img"   src="https://img.youtube.com/vi/' + videoid + '/mqdefault.jpg"> </div>';

      text = text.replace(/\r?\n?[^\r\n]*$/, "");
      text = urlify(text) + "Beitrag als Video: <br />" + iframe;
      return text;
    }

  } else {
    return text;
  }
  // Wenn in der Letzten ZEILE
  // ein link (kein youtube)
}