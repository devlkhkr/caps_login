(function() {
	// JavaScript Document
	// 만든이 : 다섯방울 (http://r5xsv3.tistory.com)
	// Data : 2014.03.09
	// Version : 0.1
	// 참조 http://www.openspc2.org/userAgent/
	// OS 버전 보기
	var uanaVigatorOs = navigator.userAgent;
	var AgentUserOs = uanaVigatorOs.replace(/ /g, '');
	var Ostxt = "";
	var OSName = "";
	var OsVers = "";

	// This script sets OSName variable as follows:
	// "Windows" for all versions of Windows
	// "MacOS" for all versions of Macintosh OS
	// "Linux" for all versions of Linux
	// "UNIX" for all other UNIX flavors
	// "Unknown OS" indicates failure to detect the OS
	new function() {
		var OsNo = navigator.userAgent.toLowerCase();
		jQuery.os = {
			Linux : /linux/.test(OsNo),
			Unix : /x11/.test(OsNo),
			Mac : /mac/.test(OsNo),
			Windows : /win/.test(OsNo)
		}
	}

	var OSInfoDev	= function() {

		if ($.os.Windows) {
			if (AgentUserOs.indexOf("WindowsCE") != -1)
				OSName = "Windows CE";
			else if (AgentUserOs.indexOf("Windows95") != -1)
				OSName = "Windows 95";
			else if (AgentUserOs.indexOf("Windows98") != -1) {
				if (AgentUserOs.indexOf("Win9x4.90") != -1)
					OSName = "Windows Millennium Edition (Windows Me)"
				else
					OSName = "Windows 98";
			} else if (AgentUserOs.indexOf("WindowsNT4.0") != -1)
				OSName = "Microsoft Windows NT 4.0";
			else if (AgentUserOs.indexOf("WindowsNT5.0") != -1)
				OSName = "Windows 2000";
			else if (AgentUserOs.indexOf("WindowsNT5.01") != -1)
				OSName = "Windows 2000, Service Pack 1 (SP1)";
			else if (AgentUserOs.indexOf("WindowsNT5.1") != -1)
				OSName = "Windows XP";
			else if (AgentUserOs.indexOf("WindowsNT5.2") != -1)
				OSName = "Windows 2003";
			else if (AgentUserOs.indexOf("WindowsNT6.0") != -1)
				OSName = "Windows Vista/Server 2008";
			else if (AgentUserOs.indexOf("WindowsNT6.1") != -1)
				OSName = "Windows 7";
			else if (AgentUserOs.indexOf("WindowsNT6.2") != -1)
				OSName = "Windows 8";
			else if (AgentUserOs.indexOf("WindowsNT6.3") != -1)
				OSName = "Windows 8.1";
			else if (AgentUserOs.indexOf("WindowsPhone8.0") != -1)
				OSName = "Windows Phone 8.0";
			else if (AgentUserOs.indexOf("WindowsPhoneOS7.5") != -1)
				OSName = "Windows Phone OS 7.5";
			else if (AgentUserOs.indexOf("Xbox") != -1)
				OSName = "Xbox 360";
			else if (AgentUserOs.indexOf("XboxOne") != -1)
				OSName = "Xbox One";
			else if (AgentUserOs.indexOf("Win16") != -1)
				OSName = "Windows 3.x";
			else if (AgentUserOs.indexOf("ARM") != -1)
				OSName = "Windows RT";
			else
				OSName = "Windows (Unknown)";

			if (AgentUserOs.indexOf("WOW64") != -1)
				OsVers = " 64-bit(s/w 32-bit)";
			else if (AgentUserOs.indexOf("Win64;x64;") != -1)
				OsVers = " 64-bit(s/w 64-bit)";
			else if (AgentUserOs.indexOf("Win16") != -1)
				OsVers = " 16-bit";
			else
				OsVers = " 32-bit";

		} else if ($.os.Linux) {
			if (AgentUserOs.indexOf("Android") != -1) {
				OSName = getAndroidDevName();
			} else if (AgentUserOs.indexOf("BlackBerry9000") != -1)
				OSName = "BlackBerry9000";
			else if (AgentUserOs.indexOf("BlackBerry9300") != -1)
				OSName = "BlackBerry9300";
			else if (AgentUserOs.indexOf("BlackBerry9700") != -1)
				OSName = "BlackBerry9700";
			else if (AgentUserOs.indexOf("BlackBerry9780") != -1)
				OSName = "BlackBerry9780";
			else if (AgentUserOs.indexOf("BlackBerry9900") != -1)
				OSName = "BlackBerry9900";
			else if (AgentUserOs.indexOf("BlackBerry;Opera Mini") != -1)
				OSName = "Opera/9.80";
			else if (AgentUserOs.indexOf("Symbian/3") != -1)
				OSName = "Symbian OS3";
			else if (AgentUserOs.indexOf("SymbianOS/6") != -1)
				OSName = "Symbian OS6";
			else if (AgentUserOs.indexOf("SymbianOS/9") != -1)
				OSName = "Symbian OS9";
			else if (AgentUserOs.indexOf("Ubuntu") != -1)
				OSName = "Ubuntu";
			else if (AgentUserOs.indexOf("PDA") != -1)
				OSName = "PDA";
			else if (AgentUserOs.indexOf("NintendoWii") != -1)
				OSName = "Nintendo Wii";
			else if (AgentUserOs.indexOf("PSP") != -1)
				OSName = "PlayStation Portable";
			else if (AgentUserOs.indexOf("PS2;") != -1)
				OSName = "PlayStation 2";
			else if (AgentUserOs.indexOf("PLAYSTATION3") != -1)
				OSName = "PlayStation 3";
			else
				OSName = "Linux (Unknown)";

			if (AgentUserOs.indexOf("x86_64") != -1)
				OsVers = " 64-bit";
			else if (AgentUserOs.indexOf("i386") != -1)
				OsVers = " 32-bit";
			else if (AgentUserOs.indexOf("IA-32") != -1)
				OsVers = " 32-bit";
			else
				OsVers = "";

		} else if ($.os.Unix) {
			OSName = "UNIX";
		} else if ($.os.Mac) {
			if (AgentUserOs.indexOf("iPhoneOS3") != -1)
				OSName = "iPhone OS 3";
			else if (AgentUserOs.indexOf("iPhoneOS4") != -1)
				OSName = "iPhone OS 4";
			else if (AgentUserOs.indexOf("iPhoneOS5") != -1)
				OSName = "iPhone OS 5";
			else if (AgentUserOs.indexOf("iPhoneOS6") != -1)
				OSName = "iPhone OS 6";
			else if (AgentUserOs.indexOf("iPad") != -1)
				OSName = "iPad";
			else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs
					.indexOf("MacOSX10.1")) != -1)
				OSName = "Mac OS X Puma";
			else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs
					.indexOf("MacOSX10.2")) != -1)
				OSName = "Mac OS X Jaguar";
			else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs
					.indexOf("MacOSX10.3")) != -1)
				OSName = "Mac OS X Panther";
			else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs
					.indexOf("MacOSX10.4")) != -1)
				OSName = "Mac OS X Tiger";
			else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs
					.indexOf("MacOSX10.5")) != -1)
				OSName = "Mac OS X Leopard";
			else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs
					.indexOf("MacOSX10.6")) != -1)
				OSName = "Mac OS X Snow Leopard";
			else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs
					.indexOf("MacOSX10.7")) != -1)
				OSName = "Mac OS X Lion";
			else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs
					.indexOf("MacOSX10.8")) != -1)
				OSName = "Mac OS X Mountain Lion";
			else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs
					.indexOf("MacOSX10.9")) != -1)
				OSName = "Mac OS X Mavericks";
			else
				OSName = "MacOS (Unknown)";
		} else {
			OSName = "Unknown OS";
		}
		var OSDev = OSName + OsVers;
		return OSDev;
	};

	// Android의 단말 이름을 반환
	var getAndroidDevName	= function() {
		var uaAdata = navigator.userAgent;
		var regex = /Android (.*);.*;\s*(.*)\sBuild/;
		var match = regex.exec(uaAdata);
		if (match) {
			var ver = match[1];
			var dev_name = match[2];
			return "Android " + ver + " " + dev_name;
		}
		return "Android OS";
	};
	
	
	var ios_appstoreUrl = _env.app.ios.appstoreUrl;
	var ios_appUrl 		= _env.app.ios.appUrl;
	 
	//var android_marketUrl = "market://details?id=com.google.zxing.client.android";
	//var android_appUrl = "zxing://scan";
	//var android_intent = "intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end";
	 
	var android_marketUrl = _env.app.android.marketUrl;
	var android_appUrl = _env.app.android.appUrl;
	var android_intent = _env.app.android.intent;
	
//	var ios_appstoreUrl = "http://itunes.apple.com/kr/app/id393499958?mt=8";
//	var ios_appUrl = "naversearchapp://search?qmenu=voicerecg&version=1";
	 
	//url 은 “naversearchapp://search?qmenu=voicerecg&version=1”  
	var runApp_ios	= function() {
	    var clickedAt = +new Date;
	 
	    var naverAppCheckTimer = setTimeout(function () {
	        if (+new Date - clickedAt < 2000)
	            if (window.confirm("최신 앱 버전이 설치되어 있지 않습니다.\n설치페이지로 이동하시겠습니까?"))
	                location.href = ios_appstoreUrl;
	    }
	        , 1500);
	 
	    location.href = ios_appUrl;
	};
	 
	//여기까지 IOS
	 
	 
	var timer;
	var heartbeat;
	var iframe_timer;
	 
	var clearTimers	= function() {
	    clearTimeout(timer);
	    clearTimeout(heartbeat);
	    clearTimeout(iframe_timer);
	}
	 
	var intervalHeartbeat	= 	function() {
	    if (document.webkitHidden || document.hidden) {
	        clearTimers();
	    }
	}
	 
	var tryIframeApproach	= function() {
	    var iframe = document.createElement("iframe");
	    iframe.style.border = "none";
	    iframe.style.width = "1px";
	    iframe.style.height = "1px";
	    iframe.onload = function () {
	        document.location = android_marketUrl;
	    };
	    iframe.src = android_appUrl;
	    document.body.appendChild(iframe);
	}
	 
	var tryWebkitApproach	= function() {
	    document.location = android_appUrl;
	    timer = setTimeout(function () {
	        document.location = android_marketUrl;
	    }, 2500);
	}
	 
	var useIntent	= function() {
	    document.location = android_intent;
	}
	 
	var launch_app_or_alt_url = function(el) {
	    heartbeat = setInterval(intervalHeartbeat, 200);
	    if (navigator.userAgent.match(/Chrome/)) {
	        useIntent();
	    } else if (navigator.userAgent.match(/Firefox/)) {
	        tryWebkitApproach();
	        iframe_timer = setTimeout(function () {
	            tryIframeApproach();
	        }, 1500);
	    } else {
	        tryIframeApproach();
	    }
	}
	 
	 
	var runApp	= function() {
		ios_appstoreUrl 	= _env.app.ios.appstoreUrl;
		ios_appUrl 			= _env.app.ios.appUrl;
		android_marketUrl 	= _env.app.android.marketUrl;
		android_appUrl 		= _env.app.android.appUrl;
		android_intent 		= _env.app.android.intent;
		
	    var devName = OSInfoDev();
	    if (devName.indexOf("MacOS") != -1) {
	        runApp_ios();
	    }
	    else if (devName.indexOf("Android") != -1) {
	        launch_app_or_alt_url($(this));
	        event.preventDefault();
	    }
	 
	    $.mobile.loading('show', {
	        text: "앱을 실행합니다. 잠시만 기다리세요.",
	        textVisible: true,
	        theme: "b",
	        html: ""
	    });
	}
	window.runApp	= runApp;
})();