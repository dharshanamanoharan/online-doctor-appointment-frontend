/*For changing password visibility */
export const funShowPassword=()=>
  {
    var a=document.getElementById("show-pwd");
    var b=document.getElementById("floatingPassword");
    var list=a.classList;
    if(list.contains("fa-eye-slash"))
    {
      list.remove("fa-eye-slash");
      list.add("fa-eye");
      b.type="text";
    }
    else
    {
    list.remove("fa-eye");
    list.add("fa-eye-slash");
    b.type="password";
    }
  }
  export const funShowPassword1=()=>
    {
      var c=document.getElementById("show-pwd1");
      var d=document.getElementById("floatingPassword1");
      var list1=c.classList;
      if(list1.contains("fa-eye-slash"))
      {
        list1.remove("fa-eye-slash");
        list1.add("fa-eye");
        d.type="text";
      }
      else
      {
      list1.remove("fa-eye");
      list1.add("fa-eye-slash");
      d.type="password";
      }
    }