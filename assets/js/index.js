$(function () {
  var token = localStorage.getItem("token");
  var layer = layui.layer;
  //调用获取信息的函数
  getUserInfo();

  //给退出按钮添加事件
  $(".exit a").on("click", function (e) {
    e.preventDefault();
    layer.confirm("是否关闭对话框", { title: "提示" }, function (index) {
      //do something
      localStorage.removeItem("token");
      location.href = "login.html";
      //关闭询问框
      layer.close(index);
    });
  });
  function getUserInfo() {
    $.ajax({
      url: "http://ajax.frontend.itheima.net/my/userinfo",
      method: "GET",
      headers: {
        Authorization: token,
      },
      success: function (res) {
        console.log(res);
        console.log(res.data.nickname[0]);
        $(".welcome").html("欢迎&nbsp;&nbsp;" + res.data.nickname);
        if (res.status !== 0) {
          layer.msg("获取用户信息失败！");
        } else {
          renderAvatar(res.data);
        }
      },
      //complete 函数无论是成功还是失败都会执行，里面有关于成功还是失败的信息
      complete: function (res) {
        console.log(res.responseJSON);
        if (
          res.responseJSON.status === 1 &&
          res.responseJSON.message === "身份认证失败！"
        ) {
          location.href = "login.html";
        }
      },
    });
  }

  //渲染用户头像,传参数,获取到的用户对象
  function renderAvatar(user) {
    if (user.user_pic !== null) {
      $(".layui-nav-img").show().attr("src", user.user_pic);
      $(".user-info").hide();
    } else {
      $(".layui-nav-img").hide();
      $(".avatar").html(user.nickname[0]);
    }
  }
});
