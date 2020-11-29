// 使用ajax的时候。会调用ajaxPrefilter这个函数,以后只需在这里更改即可
$.ajaxPrefilter(function (options) {
  // options为发起ajax请求时的对象
  console.log(options);
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  // 为有权限的请求添加到ajaxPrefilter这个函数中
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: token,
    };
  }
  options.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      location.href = "login.html";
    }
  };
});
