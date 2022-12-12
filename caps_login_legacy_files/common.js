function headerClose() {
  $("body").removeClass("dim");
}

function headerOpen() {
  var closebind = function () {
    $("body").removeClass("dim");
    $(window).unbind("click touchstart", closebind);
  };
}

function position_cm() {
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var $obj = $(".layer-pop-wrap");
  $obj.each(function (index) {
    var _this = $obj.eq(index),
      thisW = _this.width(),
      thisH = _this.height();

    _this.css({
      left: windowWidth / 2 - thisW / 2,
      top: windowHeight / 2 - thisH / 2,
    });
  });

  $.fn.layerOpen = function () {
    return this.each(function () {
      var $this = $(this);
      var $layer = $($this.attr("href") || null);
      $this.click(function (e) {
        e.preventDefault();
        if ($this.hasClass("m-none")) {
          $("body").addClass("dim_mobile_no");
        } else {
          $("body").addClass("dim");
        }
        // $('body').css('overflow','hidden');
        $(".selectbox-zindex-box").css("display", "block");
        $layer.attr("tabindex", 0).show().focus();
        $layer
          .find(
            ".layer-close, .btn-area.popup a.cancel, .btn-area.border a.cancel"
          )
          .on("click", function (e) {
            e.preventDefault();
            $layer.hide();
            $(".selectbox-zindex-box").css("display", "none");
            var layerOpen = true;
            $("#wrap > .layer-pop-wrap").each(function (index) {
              var $this = $(this).eq(index);
              if ($this.css("display") == "block") {
                layerOpen = false;
              }
            });
            if (layerOpen) {
              $("body").removeClass("dim dim_mobile_no");
            }
            // $('body').css('overflow','auto');
            $this.focus();
          });
      });
    });
  };
  $(".layer-open").layerOpen();

  $.fn.layerOpenstar = function () {
    return this.each(function () {
      var $this = $(this);
      $this.click(function (e) {
        e.preventDefault();
        $("body").removeClass("dim");
      });
    });
  };
  $(".layer-open.mobile").layerOpenstar();
}

function inpSkin() {
  /* radio Skin */
  $(document).on("click", "input[type=radio]", function () {
    if ($(this).parent().is(".radio-skin")) {
      $('input[name="' + this.name + '"]').each(function () {
        $(this).parent().removeClass("checked");
      });
      $(this).parent().addClass("checked");
    }
  });
  $("input[type=radio]").on("focus", function () {
    $(this).parent().addClass("focus-radio");
    $("head").append(
      '<style id="radioStyle">label.focus-radio:after {background-color:transparent;}</style>'
    );
  });
  $("input[type=radio]").on("blur", function () {
    $(this).parent().removeClass("focus-radio");
    $("#radioStyle").remove();
  });

  /* checkBox skin */
  $(document).on("click", "input[type=checkbox]", function () {
    var _label = $(this).parent();
    if (_label.is(".chk-skin")) {
      if (_label.is(".checked")) {
        _label.removeClass("checked");
      } else {
        _label.addClass("checked");
      }
    }
  });
  $("input[type=checkbox]").on("focus", function () {
    $(this).parent().addClass("focus-check");
    $("head").append(
      '<style id="checkStyle">label.focus-check:after {background-color:transparent;}</style>'
    );
  });
  $("input[type=checkbox]").on("blur", function () {
    $(this).parent().removeClass("focus-check");
    $("#checkStyle").remove();
  });
}

function btnCheck() {
  $(".btn-check").on("click", function () {
    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
      $(this).find("span").text("off");
    } else {
      $(this).addClass("on");
      $(this).find("span").text("on");
    }
  });
}

function mBtnCheck() {
  $(".btn-check01").each(function () {
    if ($(this).hasClass("on")) {
      $(this).find("span").text("닫히면");
    }
  });
  $(".btn-check01").on("click", function () {
    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
      $(this).find("span").text("열리면");
    } else {
      $(this).addClass("on");
      $(this).find("span").text("닫히면");
    }
  });
}
function lightBtnCheck() {
  $(".btn-check02").each(function () {
    if ($(this).hasClass("on")) {
      $(this).find("span").text("꺼지면");
    }
  });
  $(".btn-check03").each(function () {
    if ($(this).hasClass("on")) {
      $(this).find("span").text("해제");
    }
  });
  $(".btn-check04").each(function () {
    if ($(this).hasClass("on")) {
      $(this).find("span").text("꺼짐");
    }
  });
  $(".btn-check05").each(function () {
    if ($(this).hasClass("on")) {
      $(this).find("span").text("열림");
    }
  });
  $(".btn-check02").on("click", function () {
    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
      $(this).find("span").text("켜지면");
    } else {
      $(this).addClass("on");
      $(this).find("span").text("꺼지면");
    }
  });
  $(".btn-check03").on("click", function () {
    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
      $(this).find("span").text("경비");
    } else {
      $(this).addClass("on");
      $(this).find("span").text("해제");
    }
  });
  $(".btn-check04").on("click", function () {
    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
      $(this).find("span").text("켜짐");
    } else {
      $(this).addClass("on");
      $(this).find("span").text("꺼짐");
    }
  });
  $(".btn-check05").on("click", function () {
    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
      $(this).find("span").text("닫힘");
    } else {
      $(this).addClass("on");
      $(this).find("span").text("열림");
    }
  });
}

/*function loginFcs(){
	$('input[type=text],input[type=number],input[type=email],input[type=tel], input[type=password]').on('focusin', function(){
		$(this).addClass('on');
		$(this).removeClass('select');
	});
	$('input[type=text],input[type=number],input[type=email],input[type=tel], input[type=password]').on('focusout', function(){
		if($(this).val() == ""){
			$(this).removeClass('on');
			$(this).removeClass('select');
		}else{
			$(this).removeClass('on');
			$(this).addClass('select');
		}
	});
}*/

function spaceFcs() {
  $(".space-list.modify .title input").on("focusin", function () {
    $(this).parent().addClass("on");
  });
  $(".space-list.modify .title input").on("focusout", function () {
    $(this).parent().removeClass("on");
  });
}
function offBooking() {
  $(".off-booking .time button").unbind("click");
  $(".off-booking .time button").on("click", function () {
    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
    } else {
      $(this).addClass("on");
    }
  });
}

function logFilter() {
  $(".log-filter .list em").on("click", function () {
    if ($(this).parent().hasClass("on")) {
      $(this).parent().removeClass("on");
    } else {
      $(this).parent().addClass("on");
    }
  });
}
function familySpace() {
  $(".family-space ul li > a").on("click", function () {
    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
    } else {
      $(".family-space ul li > a").removeClass("on");
      $(this).addClass("on");
    }
  });
}

function pwIdSearch() {
  $(".pw-search ul li > a label").on("click", function () {
    if ($(this).is(".checked")) {
      $(this).parent().removeClass("on");
    } else {
      $(".pw-search ul li > a").removeClass("on");
      $(this).parent().addClass("on");
    }
  });
}

function loginScroll() {
  var position = $(".login-wrap .form").offset();
  $(".login-wrap input[type=text], .login-wrap input[type=password]").on(
    "focusin",
    function () {
      $("html, body").stop().animate({ scrollTop: "170" });
      // $('.login-wrap h1').css('display','none');
    }
  );
  $(".login-wrap input[type=text], .login-wrap input[type=password]").on(
    "focusout",
    function () {
      $("html, body").stop().animate({ scrollTop: "0" });
      // $('.login-wrap h1').css('display','block');
    }
  );
}

function designSelect() {
  $(".design-select").each(function () {
    /* reset */
    var _that = $(this);
    var _thatTitle = _that.attr("title");
    // $(this).hide();
    $(this).wrap('<div class="designSelectW" />');
    var selectW = $(this).parent(".designSelectW");
    selectW.append('<div class="select-content" />');
    var selectC = selectW.find(".select-content");
    selectC.append('<div class="select-title"><a href="#"></a></div>');
    selectC.append('<ul class="select-list" />');
    var selectT = selectW.find(".select-title > a");
    if (_thatTitle) {
      selectT.attr("title", _thatTitle);
    }
    var selectL = selectW.find(".select-list");
    if ($(this).find(" option:selected")) {
      selectT.text($(this).find("option:selected").text());
    } else {
      selectT.text($(this).find("option").eq(0).text());
    }
    var selectOption = $(this).find("option");
    selectOption.each(function () {
      var optionText = $(this).text();
      selectL.append('<li><a href="#">' + optionText + "</a></li>");
    });
    selectL.find("li").eq(0).addClass("first");
    selectL.find("li").last().addClass("last");
    selectL.hide();

    /* event handler */
    selectT.on("click", function (e) {
      e.preventDefault();
      if ($(this).parent().next().is(":visible")) {
        $(this).parent().next().hide();
        $(this).parent().removeClass("active");
      } else {
        $(".select-list").hide();
        $(this).parent().addClass("active");
        $(this).parent().next().show();
      }
    });
    selectT.on("keydown", function (e) {
      if (e.keyCode == 9 && $(this).next().parent().is(":visible")) {
        $(this).parent().next().find("a").eq(0).focus();
        return false;
      } else if (e.keyCode == 27) {
        $(this).parent().next().hide();
        $(this).focus();
      } else {
        return true;
      }
    });
    selectW.find(".select-list a").on("click", function (e) {
      e.preventDefault();
      var $text = $(this).text();
      var $index = $(this).parent().parent().find("li").index($(this).parent());
      _that.find("option").removeAttr("selected");
      _that.find("option").eq($index).attr("selected", "selected");
      $(this)
        .parent()
        .parent()
        .parent()
        .find(".select-title")
        .find("a")
        .text($text)
        .focus();
      $(this).parent().parent().hide();
      if (_that.attr("onchange")) {
        _that.trigger("onchange");
      } else {
        _that.trigger("change");
      }
    });
    $(".select-list")
      .find("a")
      .on("keydown", function (e) {
        if (e.shiftKey && e.keyCode == 9) {
          if ($(this).parent().attr("class") == "first") {
            $(this).parent().parent().find("li").last().find("a").focus();
            return false;
          }
        } else if (e.keyCode == 9) {
          if ($(this).parent().attr("class") == "last") {
            // $(this).parent().parent().find('li').eq(0).find('a').focus();
            $(this).parent().parent().hide();
            $(this).parent().parent().prev().find("a").focus();
            return false;
          }
        } else if (e.keyCode == 27) {
          $(this).parent().parent().hide();
          $(this)
            .parent()
            .parent()
            .parent()
            .find(".select-title")
            .find("a")
            .focus();
          return false;
        } else {
          return true;
        }
      });
  });
}
/* 8자 yyyymmdd string 파라미터로 받아서 Date 형태로 리턴하는 함수 */
function yyyymmddToDate(strDate) {
  if (strDate && strDate.length == 8) {
    return new Date(
      strDate.substring(0, 4),
      parseInt(strDate.substring(4, 6)) - 1,
      strDate.substring(6, 8)
    );
  }
}
function scrollPageTop() {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".combine-home-log .btn-more .top").fadeIn(300);
    } else {
      $(".combine-home-log .btn-more .top").fadeOut(300);
    }
  });
}

$(document).ready(function () {
  headerOpen();
  position_cm();
  inpSkin();
  btnCheck();
  //loginFcs();
  spaceFcs();
  offBooking();
  logFilter();
  familySpace();
  mBtnCheck();
  lightBtnCheck();
  loginScroll();
  pwIdSearch();
  scrollPageTop();

  /*
   * if ($('.design-select').length > 0){ designSelect(); }
   */
  $(document).on("click", ".box_open_w .open_btn", function (e) {
    e.preventDefault();
    if ($(this).parents(".box_open_w").hasClass("open")) {
      $(".box_open_w").removeClass("open");
      $(".box_open_w").find(".box-scroll-wrap").slideUp("fast");
    } else {
      $(".box_open_w").removeClass("open");
      $(".box_open_w").find(".box-scroll-wrap").slideUp("fast");
      $(this).parents(".box_open_w").addClass("open");
      $(this).parents(".box_open_w").find(".box-scroll-wrap").slideDown("fast");
    }
  });

  $(document).on("click", ".join-agree-tab .btn_more", function (e) {
    e.preventDefault();
    if ($(this).parents("li").hasClass("open")) {
      $(".join-agree-tab li").removeClass("open");
      $(".join-agree-tab .tab-cont").slideUp();
    } else {
      $(".join-agree-tab li").removeClass("open");
      $(".join-agree-tab .tab-cont").slideUp();
      $(this).parents("li").addClass("open");
      $(this).parents(".tab-tit").next(".tab-cont").slideDown();
    }
  });

  $(document).on("click", ".swich-list .btn-swich", function (e) {
    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
    } else {
      $(this).addClass("on");
    }
  });

  $(document).on("click", ".main_tab li", function (e) {
    $(".main_tab li").removeClass("on");
    $(this).addClass("on");
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() > 48) {
      $("header").addClass("fixed");
    } else {
      $("header").removeClass("fixed");
    }
  });

  $(".graph_guide").click(function () {
    if ($(".quality_box .totalGrapf").hasClass("day30")) {
      $(".graph_scroll_guide").fadeIn(1000).delay(1000).fadeOut(1000);
    }
  });

  // gnb
  $(".gnb_wrap .gnb_list > li")
    .find(".gnb_list2")
    .parents(".gnb_wrap .gnb_list > li")
    .addClass("in_depth2");
  $(document).on(
    "click",
    ".gnb_wrap .gnb_list > li.in_depth2 > .tit",
    function (e) {
      e.preventDefault();
      if ($(this).parents("li").hasClass("open")) {
        $(this).parents("li").removeClass("open");
        $(this).next(".gnb_list2").slideUp();
      } else {
        $(this).parents("li").addClass("open");
        $(this).next(".gnb_list2").slideDown();
      }
    }
  );
  $(document).on("click", ".gnb_open a.open", function (e) {
    e.preventDefault();
    $(".gnb_wrap .gnb_list > li.in_depth2").addClass("open");
    $(".gnb_wrap .gnb_list > li.in_depth2 .gnb_list2").slideDown();
  });
  $(document).on("click", ".gnb_open a.close", function (e) {
    e.preventDefault();
    $(".gnb_wrap .gnb_list > li.in_depth2").removeClass("open");
    $(".gnb_wrap .gnb_list > li.in_depth2 .gnb_list2").slideUp();
  });

  $(".homelog_box .homelog_list > li.doorview .txt_wrap").click(function () {
    if ($(this).parents("li.doorview").hasClass("open")) {
      $(".homelog_box .homelog_list > li.doorview").removeClass("open");
      $(".homelog_box .homelog_list > li.doorview .doorview_wrap").slideUp();
    } else {
      $(".homelog_box .homelog_list > li.doorview").removeClass("open");
      $(".homelog_box .homelog_list > li.doorview .doorview_wrap").slideUp();
      $(this).parents("li.doorview").addClass("open");
      $(this).next(".doorview_wrap").slideDown();
    }
  });

  $(".gnb_bottom .gnb_info").click(function () {
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).children(".info").slideUp();
    } else {
      $(this).addClass("open");
      $(this).children(".info").slideDown();
    }
  });

  $(
    ".select_box .option_list li, .pop_box .opt li, .bg_overlay, .option_list .btn_close"
  ).click(function () {
    $(".option_list, .pop_box_wrap").removeClass("open");
    $(".bg_overlay").removeClass("on");
    $("body").removeClass("fixed");
  });
  $(".select_box .selected").click(function () {
    $(this).next("div").addClass("open");
    $(".bg_overlay").addClass("on");
    $("body").addClass("fixed");
  });
  $(".select_box .option_list li").click(function () {
    var selected_option = $(this).children().text();
    $(this)
      .parents(".option_list")
      .siblings(".selected")
      .children(".place")
      .text(selected_option);
    $(".select_box .option_list li").removeClass("on");
    $(this).addClass("on");
  });
  $("#charge_month .opt li").click(function () {
    var charge_option = $(this).children().text();
    $(".charge_month .month").text(charge_option);
    $("#charge_month .opt li").removeClass("on");
    $(this).addClass("on");
  });

  /* 개발코드에서 이미지 불러오고 나서 넣고 있습니다. 중복으로 사용되면서 동작이 꼬이는 문제로 인해 주석 처리합니다.
	var doorviewSlide = new Swiper( '.doorview_slide .swiper-container' ,{
		slidesPerView : 3 ,
		spaceBetween : 10 ,
		loop : false ,
		pagination : '.doorview_slide .swiper-pagination' ,
	} );
	$(".doorview_slide .swiper-slide").click(function(){
		$( '.doorview_slide .swiper-slide' ).removeClass( 'active' );
		$( this ).addClass( 'active' );
	} );*/
  $(".fixed_bnn .btn_close").click(function () {
    $(this).parents(".fixed_bnn").addClass("hide");
  });
  $(".detail_search .btn_chk").click(function () {
    $(".allChk_box, .homelog_box").addClass("chk_on");
  });
  $(".allChk_box a.btn_search_close").click(function () {
    $(".allChk_box, .homelog_box").removeClass("chk_on");
  });

  $(document).on("click", ".btn_pop", function (e) {
    e.preventDefault();
    var target = $(this).attr("href"),
      toLoad = $(target);
    if ($(toLoad).hasClass("open")) {
      $(toLoad).removeClass("open");
      $(".bg_overlay").removeClass("on");
      $("body").removeClass("fixed");
    } else {
      $(toLoad).addClass("open");
      $(".bg_overlay").addClass("on");
      $("body").addClass("fixed");
    }
  });
  $(document).on(
    "click",
    ".pop_box_wrap .btn_close, .bg_overlay",
    function (e) {
      e.preventDefault();
      $(".pop_box_wrap").removeClass("open");
      $(".bg_overlay").removeClass("on");
      $("body").removeClass("fixed");
    }
  );
  $("#searchButton").click(function () {
    if ($("#log_filter").hasClass("open")) {
      $("#log_filter").removeClass("open");
      $("body").removeClass("fixed");
    } else {
      $("#log_filter").addClass("open");
      $("body").addClass("fixed");
    }
  });
  $(document).on("click", ".btn_real_time", function (e) {
    e.preventDefault();
    var target = $(this).attr("href"),
      toLoad = $(target);
    if ($(toLoad).hasClass("open")) {
      $(toLoad).removeClass("open");
      $("body").removeClass("fixed");
    } else {
      $(toLoad).addClass("open");
      $("body").addClass("fixed");
    }
  });
  $(
    ".pop_box_wrap.type02 .opt li, #user_pop .opt li, #real_time .pop_box .opt li"
  ).click(function () {
    $(".pop_box_wrap.type02, #user_pop, #real_time").addClass("open");
    $("body").addClass("fixed");
    $(".bg_overlay").addClass("on");
  });
  $(
    ".pop_box_wrap.type02 .opt li, #user_pop .opt li, #real_time .opt li, .option_box .opt li"
  ).click(function () {
    $(
      ".pop_box_wrap.type02 .opt li, #user_pop .opt li, #real_time .opt li, .option_box .opt li"
    ).removeClass("on");
    $(this).addClass("on");
  });

  $(".charge_detail_wrap > li.arrow").click(function () {
    if ($(this).hasClass("open")) {
      //$( '.charge_detail_wrap > li.arrow' ).removeClass( 'open' );
      //$( '.charge_detail_wrap > li.arrow .detail' ).slideUp();
      $(this).removeClass("open");
      $(this).children("div").children(".detail").slideUp();
    } else {
      //$( '.charge_detail_wrap > li.arrow' ).removeClass( 'open' );
      //$( '.charge_detail_wrap > li.arrow .detail' ).slideUp();
      $(this).addClass("open");
      $(this).children("div").children(".detail").slideDown();
    }
  });

  $(document).on("click", ".tab_list li a, .form-link li a", function (e) {
    e.preventDefault();
    if (!$(this).parent().hasClass("on")) {
      var href = $(this).attr("href");
      $(href).show().siblings(".tab_cont").hide();

      $(this).parent().addClass("on").siblings().removeClass("on");
    }
    return false;
  });

  $(document).on("click", ".wifi_set_list > li", function () {
    $(".wifi_set_list > li").removeClass("on");
    $(this).addClass("on");
  });

  $(document).on("click", ".chk_list input", function () {
    if ($(this).is(":checked")) {
      $(this).parent(".chk_list").parent("li").addClass("checked");
    } else {
      $(this).parent(".chk_list").parent("li").removeClass("checked");
    }
  });
  $("label.chk_list")
    .find("input:radio")
    .parent("label.chk_list")
    .addClass("radio_list");
  $("label.radio_list").click(function () {
    if ($(this).children("input:radio:checked").length > 0) {
      $(this).parent("li").parent("ul").children("li").removeClass("checked");
      $(this).parent("li").addClass("checked");
    } else {
      $(this).parent("li").removeClass("checked");
    }
  });
  function input_check() {
    $("label.chk_list").each(function () {
      var inp = $(this).find("input");
      var inp_chk = inp.is(":checked");
      if (inp_chk == true) {
        $(this).parent("li").addClass("checked");
      } else {
        $(this).parent("li").removeClass("checked");
      }
    });
  }
  setTimeout(input_check, 500);

  $(".form-link")
    .find("li:nth-child(2).on")
    .parents(".login-bottom")
    .siblings(".login-top")
    .addClass("pass-bg");
  $(".form-link li:nth-child(1)").click(function () {
    $(".login-top").removeClass("pass-bg");
  });
  $(".form-link li:nth-child(2)").click(function () {
    $(".login-top").addClass("pass-bg");
  });

  $(document).on("click", ".movie_btn_wrap .btn_play", function () {
    $(this)
      .parent(".movie_btn_wrap")
      .parent(".doorview_movie")
      .addClass("play");
  });
  $(document).on("click", ".movie_btn_wrap .btn_pause", function () {
    $(this)
      .parent(".movie_btn_wrap")
      .parent(".doorview_movie")
      .removeClass("play");
  });

  $(".login-form .input_del").on("click", function () {
    $(".login-form .input_del").not(this).removeClass("focus");
    $(this).addClass("focus");
  });
  /*$('.login-form .input_del input').on('focus', function() {
		$(this).parent(".input_del").addClass('focus');
	});
	$('.login-form .input_del input').on('blur', function() {
		$(this).parent(".input_del").removeClass('focus');
	});*/

  var Body = $("body"),
    Document = $(document),
    Wrapper = $(".sub"),
    olContainer = $("#overlay"),
    overLay = function () {
      var insert = Body.find(".insert");
      insert.detach();
      olContainer.append(insert);
      Body.on("click", ".insert", function (e) {
        e.stopPropagation();
      })
        .on("click", ".js-closeLay", function (e) {
          olContainer.fadeOut();
          $(this).parents(".insert").addClass("hidden").removeAttr("style");
          e.preventDefault();
        })
        .on("click", "#overlay", function (e) {
          $(this).fadeOut();
          $(this).find(".insert").addClass("hidden").removeAttr("style");
          e.preventDefault();
        })
        .keyup(function (e) {
          if (e.keyCode == 27) {
            $("#overlay").fadeOut();
            $(this).find(".insert").addClass("hidden").removeAttr("style");
          }
        });

      Body.find(".js-openLay").on("click", function (e) {
        var target = $(this).attr("layerTarget"),
          toLoad = $(target);
        //insert.addClass('hidden');
        toLoad.removeClass("hidden");
        olContainer.fadeIn();
        e.stopPropagation();
        setTimeout(function () {
          toLoad.css("top", "50%");
        }, 10);
      });

      Body.on("click", ".js-openLay", function (e) {
        var target = $(this).attr("href"),
          toLoad = $(target);
        //insert.addClass('hidden');
        toLoad.removeClass("hidden");
        olContainer.fadeIn();
        e.stopPropagation();
        setTimeout(function () {
          toLoad.css("top", "50%");
        }, 10);
      });
    };
  overLay();

  //a[href="#"]
  $('a[href="#"]').on("click", function (e) {
    e.preventDefault();
  });
  $(".accCheck").on("click", function (e) {
    e.preventDefault();
  });

  $(".accd_wrap .accd_head").on("click", function () {
    if (!$(this).parent().hasClass("open")) {
      $(this).parent().addClass("open");
      $(this).siblings(".accd_cont").slideDown();
    } else {
      $(this).parent().removeClass("open");
      $(this).siblings(".accd_cont").slideUp();
    }
  });
});

$(function () {
  /*	var main_top = new Swiper( '.main_top .swiper-container' ,{
		slidesPerView : 1 ,
		spaceBetween : 50 ,
		loop : false ,
		pagination : '.main_top > .swiper-pagination' ,
	} );
	var main_vedio = new Swiper( '.vedio_grid .grid1 .swiper-container' ,{
		slidesPerView : 1 ,
		spaceBetween : 0 ,
		loop : false ,
		pagination : '.vedio_grid .grid1 .swiper-pagination' ,
	} );
	*/
  /*	var main_bnn = new Swiper( '.main_bnn .swiper-container' ,{
		slidesPerView : 1 ,
		spaceBetween : 0 ,
		loop : false ,
		pagination : '.main_bnn > .swiper-pagination' ,
	} );*/

  var guide_bnn = new Swiper(".guide_wrap .swiper-container", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    pagination: {
      el: ".guide_wrap .swiper-pagination",
      type: "fraction",
    },
  });
});
$(document).on("resize", function () {
  position_cm();
});
$(window).on("resize", function () {
  position_cm();
});
