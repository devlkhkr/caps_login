console.log( "SyworksAppWeb start!" );

var SyworksAppWeb = {
	"agentWord" : "CapsHomeApps:" , 	// App WebView의 UserAgent값에 추가 등록된 정보
	"agentVer" : "" , 					// App 버전 정보 (UserAgent 통해서 전달 받는 구조)
	"osGbn" : "" , 						// App 구동 OS 정보 'IOS', 'ADR'
	"userAgent" : false , 				// App WebView 여부 정보...
	"deviceChk" : function () {
		SyworksAppWeb.userAgent = navigator.userAgent.match( SyworksAppWeb.agentWord ) != null ? true : false;
		if ( SyworksAppWeb.userAgent ) {
			// 앱 버전 정보 처리 부분......
			console.log( "Agent ...... " + navigator.userAgent );
			var regDevPat = new RegExp( SyworksAppWeb.agentWord + '(\\d{1,2}.\\d{1,2}.\\d{1,2}.\\d{1,4});' );
			var regPat = new RegExp( SyworksAppWeb.agentWord + '(\\d{1,2}.\\d{1,2}.\\d{1,2});' );
			var matchResult = regDevPat.exec( navigator.userAgent );
			if ( matchResult != null ) {
				SyworksAppWeb.agentVer = matchResult[ 1 ];
			}
			else
			{
				matchResult = regPat.exec( navigator.userAgent );
				if(matchResult != null)
				{
					SyworksAppWeb.agentVer = matchResult[ 1 ];
				}
			}
			// 기기 타입 체크
			var device = "";
			var mobileKeyWords = new Array( 'iPhone' ,'iPod' ,'BlackBerry' ,'Android' ,'Windows CE' ,'LG' ,'MOT' ,'SAMSUNG' ,'SonyEricsson' ,'iPad' );
			for ( var word in mobileKeyWords ) {
				if ( navigator.userAgent.match( mobileKeyWords[ word ] ) != null ) {
					device = mobileKeyWords[ word ];
					break;
				}
			}
			if ( device == 'iPhone' || device == 'iPod' || device == 'iPad' ) {
				SyworksAppWeb.osGbn = "IOS";
			} else {
				SyworksAppWeb.osGbn = "ADR";
			}
			// localStorage가능여부 확인
			if ( window.openDatabase || ( 'localStorage' in window ) || window[ 'localStorage' ] !== null ) {
				console.log( "현재 브라우저는 Web SQL Database, WebStorage를 지원합니다" );
			} else {
				console.log( "현재 브라우저는 Web SQL Database, WebStorage를 지원하지 않습니다" );
			}
		} else {
			SyworksAppWeb.osGbn = "PC";
		}
		return SyworksAppWeb.userAgent;
	} ,
/*
	 App To Web 통신 json 규칙 정의 (웹/앱 쪽에서 필요한 형태로 정의하여 공유하는 방식)

	 안드로이드 / iOS 전달 파라미터 혹은 정보가 다를수 있기 때문에 각각 별도 파라미터로 정의하여 전달...

	 Json 샘플....
	 {
	 "func":"함수명",
	 "param1": "파라미터 1",
	 "param2": "파라미터 2",
	 "param3": "파라미터 3",
	 "param3": "파라미터 4"
	 }

    실제 Sample
	#1 외부 브라우저 호출 함수
	{"func": "openurl", "url":"https://www.naver.com"}	// 안드로이드 파라미터...
	{"func": "openurl", "url":"https://www.naver.com"}  // iOS  파라미터..

	#2 외부 앱 호출 함수 ..
	{"func":"appopen", "a_scheme":"kakaolink","store: "구글플레이스토어URL"}	//안드로이드 파라미터..
	{"func":"appopen", "i_scheme":"iOS앱 구동스킴", "store":"애플스토어URL"}		//iOS 파라미터...

	참고 : ios, Android 마다 scheme 다르기 때문에, OS별로 별도 Json 구성 필요함.

	#3 모바일 신분증 화면 호출 함수 ..
	{"func": "mobcard"}	//안드로이드 파라미터..
	{"func": "mobcard"}	//iOS 파라미터...




	추가 기능 필요시 추가가능
*/
	"wtoa" : function ( androidJson ,iOSJson ) {
		var param = "";
		if ( SyworksAppWeb.deviceChk() ) {
			if ( SyworksAppWeb.osGbn == "IOS" ) {
				window.webkit.messageHandlers.syworksAppToWebHandler.postMessage( iOSJson );
			} else {
				window.syworksbridge.syworksAppToWebFun( JSON.stringify( androidJson ) );
			}
		} else {
			if(navigator.userAgent.match('iPhone OS 11') || navigator.userAgent.match('iPhone OS 12')){
				console.log("RELOAD : "+navigator.userAgent)
				//location.reload();
			}

			console.log("wtoa .. os: " + SyworksAppWeb.osGbn);
			// 하이브리드가 아닐때(모바일 웹)의 상황 - 일반 스크립트
			try {
				SyworksAppWeb.webHandler( androidJson ,iOSJson );
			} catch ( e ) {
				console.log( e );
			}
		}
	} ,

	// 기본 웹 처리 함수....
	//
	"webHandler" : function ( androidJson ,iOSJson ) {
		console.log( "call WebHandler... A:" + androidJson + "      i:" + iOSJson );
		// 앱 구동 안되는 경우 함수 처리 부분입니다.
		// 전달 받은 Json 파싱 하여 상세 구현 필요합니다..

		var device = "";
		var mobileKeyWords = new Array( 'iPhone','iPod','iPad' );
		for ( var word = 0; word < mobileKeyWords.length; word++ ) {
			if ( navigator.userAgent.match( mobileKeyWords[ word ] ) != null ) {
				device = mobileKeyWords[ word ];
				break;
			}
		}

		if ( device == 'iPhone' || device == 'iPod' || device == 'iPad' )
		{
			if(iOSJson.func == "openurl")
			{
				console.log( "openurl      i:" + iOSJson );
				window.open(iOSJson.url);
			}
			else if(iOSJson.func == "appopen")
			{
				console.log( "appopen      i:" + iOSJson );
				window.open(iOSJson.store);
			}
		}
		else
		{
			if(androidJson.func == "openurl")
			{
				console.log( "openurl      a:" + androidJson );
				window.open(iOSJson.url);
			}
			else if(androidJson.func == "appopen")
			{
				console.log( "openurl      a:" + androidJson );
				window.open(iOSJson.store);
			}
		}

	} ,

	// app to web 에서 호출
	/*
	 * 1. app>web 호출 : SyworksAppWeb.deviceKeyOnload("디바이스키값"); web 함수 : SyworksAppWeb.deviceKeyOnload("디바이스키값"); 기능 : 해당유저 디바이스키값 갱신
	 */
	"deviceKeyOnload" : function ( deviceKey ) {

		if ( SyworksAppWeb.deviceChk() ) {
			if ( window.openDatabase || ( 'localStorage' in window ) || window[ 'localStorage' ] !== null ) {
				localStorage.setItem( "deviceKey" ,deviceKey );
				localStorage.setItem( "osGbn" ,SyworksAppWeb.osGbn );
			}
			else
			{
				console.log( "현재 브라우저는 Web SQL Database, WebStorage를 지원하지 않습니다" );
			}
		}
		else
		{
			console.log("deviceKeyOnload .. os: " + SyworksAppWeb.osGbn);
		}
	}
};

function deviceKeyOnload ( param ) {
	SyworksAppWeb.deviceKeyOnload( param );
}

$( document ).ready( function () {

	if ( !SyworksAppWeb.deviceChk() ) {

		console.log( "PC버전에서는 이용 불가능합니다." );

	};
} );

//console.log( "SyworksAppWeb end!" );