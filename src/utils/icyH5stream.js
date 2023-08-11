// var tokens = ['f83c', 'f83c', '5684', 'ffdc', 'd99d', '93aa', '0910', '8804'];//所有视频tokens
// var tokens = ['f83c', 'f83c', '5684', 'ffdc', '0910', '8804', 'd99d', '93aa',];//所有视频tokens
var tokens = ['en_01','en_02','en_03','en_01','en_02','en_03','01_03_02','02_01_03','03_01_06','04_01_09', '05_01_12','06_01_15','07_01_18','08_01_21','09_01_24','10_01_27','10_01_27','11_01_30','12_01_33',
    '01_01_00','01_03_02', '02_03_05', '03_03_08', '04_03_11', '05_03_14', '06_03_17', '07_03_20', '08_03_23', '09_03_26', '10_03_29', '11_03_32', '12_03_35'];//所有视频tokens
tokens = tokens.reverse()
// var tokens = ['f83c', '5684', 'ffdc'];//所有视频tokens
var vedioBox = 'h5sVideo'; //手机播放使用
var vedioBoxs = ['h5sVideo0', 'h5sVideo1', 'h5sVideo2', 'h5sVideo3', 'h5sVideo4', 'h5sVideo5', 'h5sVideo6', 'h5sVideo7', 'h5sVideo8', 'h5sVideo9', 'h5sVideo10', 'h5sVideo11', 'h5sVideo12',
'h5sVideo0_2', 'h5sVideo1_2', 'h5sVideo2_2', 'h5sVideo3_2', 'h5sVideo4_2', 'h5sVideo5_2', 'h5sVideo6_2', 'h5sVideo7_2', 'h5sVideo8_2', 'h5sVideo9_2', 'h5sVideo10_2', 'h5sVideo11_2', 'h5sVideo12_2',
'h5sVideo_s6','h5sVideo_s5','h5sVideo_s4','h5sVideo_s3','h5sVideo_s2','h5sVideo_s1']; //电脑播放使用
// var vedioHost = '58.211.30.36:8801'
// var vedioHost = '192.168.12.101:8080'
var vedioHost = '106.120.201.126:14525'
// var vedioHost = '10.102.1.20:8801'
var vedioUserName = 'admin'
// var vedioPassWord = 'c1782caf-b670-42d8-ba90-2244d0b0ee83'
var vedioPassWord = 'db37d1911d6b03c5a1f0c9b8e3ef9bf0'
// var vedioPassWord = 'db37d1911d6b03c5a1f0c9b8e3ef9bf0'
var v1, vs = [];
var isIOS = false;


var conf = {
    videoid: 'h5sVideo',
    protocol: 'http:', //'http:' or 'https:'
    host: vedioHost,
    rootpath: '/', // '/' or window.location.pathname
    token: 'token1',
    hlsver: 'v1', //v1 is for ts, v2 is for fmp4
    session: 'e2ef37a7-e017-40fd-ba43-0ba82084a1c7' //session got from login
    //session: '3a8b4bda-da35-4e62-8e2a-fd05e7de5722' //session got from login
};

var h5StreamSession;
// getSession();

function getSession() {
    $.ajax({
        type: "POST", //提交方式
        async: true, //提交方式
        url: "http://" + vedioHost + "/api/v1/Login?user=" + vedioUserName + "&password=" + vedioPassWord,
        success: function (result) {
            debugger
            conf.session = result.strSession;
        }
    });
}

var pc = true;
var num = 1;

function displayH5sVideo(index) {
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
        if (window.location.href.indexOf("?mobile") < 0) {
            pc = false;
            loadPhoneVideo(index)
        }
    }else{
        if (num == 1){
            loadPcVideo();
            num++;
        }
    }
}

function loadPhoneVideo(index) {
    // document.getElementById('positionDiv').style.display = 'block';
    document.getElementById('h5sVideo0').style.display = 'none';
    document.getElementById('h5sVideo1').style.display = 'none';
    document.getElementById('h5sVideo2').style.display = 'none';
    document.getElementById('h5sVideo3').style.display = 'none';
    document.getElementById('h5sVideo4').style.display = 'none';
    document.getElementById('h5sVideo5').style.display = 'none';
    document.getElementById('h5sVideo6').style.display = 'none';
    document.getElementById('h5sVideo7').style.display = 'none';
    document.getElementById('h5sVideo8').style.display = 'none';
    document.getElementById('h5sVideo9').style.display = 'none';
    document.getElementById('h5sVideo10').style.display = 'none';
    document.getElementById('h5sVideo11').style.display = 'none';
    document.getElementById('h5sVideo12').style.display = 'none';
    if (H5siOS() === true || H5sSafariBrowser() === true) {
        $('#' + vedioBox).prop("controls", true);
        isIOS = true;
    }
    if (v1 != null) {
        v1.disconnect();
        v1 = null;
    }
    conf.videoid = vedioBox;
    conf.token = tokens[index];
    if (isIOS) {
        v1 = new H5sPlayerRTC(conf);
    } else {
        v1 = H5sPlayerCreate(conf);
    }
    v1.connect();
}


function loadPcVideo() {
    if (H5siOS() === true || H5sSafariBrowser() === true) {
        for (var i = 0; i < tokens.length; i++) {
            if ($("#" + vedioBoxs[i]).length) {
                $("#" + vedioBoxs[i]).prop("controls", true)
            }
        }
    }
    for (var i = 0; i < tokens.length; i++) {
        if ($("#" + vedioBoxs[i]).length) {
            if (vs[i] != null) {
                vs[i].disconnect()
                delete vs[i]
                vs[i] = null
            }
            conf.videoid = vedioBoxs[i]
            conf.token = tokens[i]
            vs[i] = new H5sPlayerRTC(conf)
            vs[i].connect()
        }
    }
}

export {displayH5sVideo}

