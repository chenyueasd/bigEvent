$(function () {
  var token = localStorage.getItem("token");
  var layer = layui.layer;
  var form = layui.form;
  getUserInfo();
  //点击立即提交后进行数据更新
  $("#user_submit").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://ajax.frontend.itheima.net//my/userinfo",
      headers: {
        Authorization: token,
      },
      data: $(".form_reset").serialize,
      success: function (res) {
        console.log(res);
      },
    });
  });
  //点击重置按钮
  $("#userReset").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  });
  //给获取个人信息封装成函数
  function getUserInfo() {
    $.ajax({
      type: "GET",
      url: "http://ajax.frontend.itheima.net/my/userinfo",
      headers: {
        Authorization: token,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败！");
        } else {
          console.log(res.data);
          form.val("formUserInfo", res.data);
        }
      },
      //   complete: function (res) {},
    });
  }
  //初始化(重置)个人信息
  function initUserInfo() {
    $.ajax({
      type: "GET",
      url: "http://ajax.frontend.itheima.net/my/userinfo",
      headers: {
        Authorization: token,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败！");
        } else {
          console.log(res.data);
          form.val("formUserInfo", res.data);
        }
      },
    });
  }
});
