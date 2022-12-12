(function () {
  var rootPreFix =
    "https://dev.adtcapshome.co.kr:8443/static/scripts2/bootstrap/";
  //bootstrap 초기화 항목
  var attr_options = {
    component: "data-component",
  };
  //최초 컴포넌트 초기화
  window.component = {};

  var public_func = {};
  var private_func = {
    invoke: function (func_name, p) {
      if (func_name != null && func_name != "") {
        try {
          return eval(func_name + ".apply(null, p)");
        } catch (e) {
          //alert(e);
        }
      }
    },
    component: {},
  };

  //bootstrap init: attr 기준으로 모든 컴포넌트의 초기화를 수행한다.
  public_func.init = function () {
    //컴포넌트 초기화
    var afterProcess = [];
    $("[" + attr_options.component + "]").each(function (idx, elem) {
      //모든 컴포넌트의 init 속성은 data-component attr 의 val 로 추가한다.
      //컴포넌트는 임시 혹은 지정 id 를 무조건 포함한다.
      var initString = $(elem).attr(attr_options.component);
      var id = window.common.GUID();
      if ($(elem).attr("id") != null && $(elem).attr("id") != "") {
        id = $(elem).attr("id");
      } else {
        $(elem).attr("id", id);
      }
      private_func.component[id] = {
        element: elem,
      };
      //form 컴포넌트 초기화
      if ($(elem).length > 0 && $(elem)[0].tagName.toLowerCase() == "form") {
        private_func.component[id]["type"] = "form";
        var ret = window.component.form.init({
          form: elem,
          init: initString,
          id: id,
        });
        private_func.invoke(id, []);
        if (ret != null) {
          afterProcess.push(ret);
        }
      } else if (
        $(elem).length > 0 &&
        $(elem)[0].tagName.toLowerCase() == "input"
      ) {
        private_func.component[id]["type"] = "input";
        if ($(elem).attr("type") == "radio") {
          window.component.radio.init({
            object: elem,
            init: initString,
          });
        } else {
          window.component.input.init({
            obj: elem,
            init: initString,
          });
        }
      } else if (
        $(elem).length > 0 &&
        $(elem)[0].tagName.toLowerCase() == "table"
      ) {
        private_func.component[id]["type"] = "tablegrid";
        //table component 는 초기화 문자열이 id
        $(elem).attr("id", initString);
        $("#" + initString).gridLoad();

        private_func.invoke($(elem).attr("id"), []);
      } else if (
        $(elem).length > 0 &&
        $(elem)[0].tagName.toLowerCase() == "select"
      ) {
        private_func.component[id]["type"] = "selectbox";
        //select component 는 초기화 문자열이 id
        $(elem).attr("id", initString);
        window.component.select.init({
          object: elem,
          init: initString,
        });
      } else if (
        $(elem).length > 0 &&
        $(elem)[0].tagName.toLowerCase() == "div"
      ) {
        if (initString == "page") {
          id = $(elem).attr("id");
          window.component.page.init({
            object: elem,
            init: initString,
          });
        }
      }
      if (
        ($(elem).length > 0 && $(elem)[0].tagName.toLowerCase() == "div") ||
        $(elem)[0].tagName.toLowerCase() == "ul"
      ) {
        if (initString == "grid") {
          id = $(elem).attr("id");
          if (id != null && id != "") {
            $("#" + id).gridLoad({
              isTable: false,
            });
            private_func.invoke(id, []);
          } else {
            alert("grid 컴포넌트는 id 가 필요합니다.");
          }
        }
      }
    });
    for (var i = 0; i < afterProcess.length; i++) {
      if (afterProcess[i] != null) afterProcess[i]();
    }
  };
  //스크립트 모듈을 로드 시킨다.
  var config = {
    contextPath: "../../",
    // contextPath: "http://localhost:8080/",
    module: [
      "json2",
      "syworksA2W",
      "globalJS",
      "mobileJS",
      "transaction",
      "component.form",
      "component.input",
      "component.radio",
      "component.select",
      "component.grid",
      "component.page",
      "Osinfo",
    ],
    addon: [],
  };
  public_func.modules = function (setting) {
    if (setting) {
      $.extend(config, setting);
    }
    var html = "";
    if (config.module != null && config.module.length > 0) {
      var root = config.contextPath;
      for (var i = 0; i < config.module.length; i++) {
        if (config.module[i] == "syworksA2W") {
          html +=
            '<script type="text/javascript" src="' +
            root +
            rootPreFix +
            config.module[i] +
            '.js?20211112"></script>';
        } else if (config.module[i] == "mobileJS") {
          html +=
            '<script type="text/javascript" src="' +
            root +
            rootPreFix +
            config.module[i] +
            '.js?20220422_1"></script>';
        } else if (config.module[i] == "globalJS") {
          html +=
            '<script type="text/javascript" src="' +
            root +
            rootPreFix +
            config.module[i] +
            '.js?202003272"></script>';
        } else {
          html +=
            '<script type="text/javascript" src="' +
            root +
            rootPreFix +
            config.module[i] +
            '.js?202003272"></script>';
        }
      }
    }
    if (config.addon != null && config.addon.length > 0) {
      var root = config.contextPath;
      for (var i = 0; i < config.addon.length; i++) {
        html +=
          '<script type="text/javascript" src="' +
          root +
          rootPreFix +
          config.addon[i] +
          '.js"></script>';
      }
    }
    document.write(html);
  };
  window.bootstrap = public_func;

  $(document).ready(function () {
    _env.contextPath = config.contextPath;
    if (config.nation != null && config.nation != "") {
      _env.nation = config.nation;
    }
  });
  $.support.cors = true;
})();
