//登录后检查用户名是否和输入的一致，username和password定义要登录的账号
#import "tuneup/tuneup.js";
#import "ynm3k/robot4ios/importAll.js";

var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.windows()[0];

var username = "delete31";
var password = "lihui12345";//设置登录的账号密码

test("登录",
     function(){
        Finder.findElementByName("login").tap();//初始界面，点击下方的login，跳转到输入账号密码界面
        Finder.findElementByValue("Username(NOT email)").setValue(username);//username和password的输入框在源代码中无法更改，好像是公司库中的东西
        Finder.findElementByValue("Password").setValue(password);//输入账号密码
        Finder.findElementByName("Done").tap();//点击done按钮，设备语言一定要设置为英语，否则无法找到这个按钮
        Waiter.wait(8);//可能网络问题，在点击done后可能会过一段时间才会显示I Know，所以多加了几秒的时间

        test("001_登录第一个账号后显示I Know",
            function(){
             Assert.element_is_visible(Finder.findElementByName("I know"));//第一个用例的判断，判断第一次登录后是否显示I Know，可能网络原因导致登录很慢，导致fail，可以从自动的截的图中看到有没有I Know
             });

     if(Finder.findElementByName("I know").checkIsValid())//如果I Know 可以点击，那么就点击
        {
            Finder.findElementByName("I know").tap();
        }

     Finder.findElementByName("CrossButton").tap();//点击左上角的按钮，弹出左侧边栏
     Waiter.wait(2);
     
     Finder.findElementByName("Inbox").tap();//针对ios7做的修改，ios7中只能找到用户名+金币的statictext，所以改为在inbox中查看，但是如果转金币系统没开就尴尬了。、
     Waiter.wait(2);

     test("002_登录的账号名是否和输入的账号名一致",
          function(){
            if(target.model() == "iPad"){//ipad的结构和iphone版不一样
                Assert.areEqual(username,window.navigationBars()[1].name());
            }
            else{
                Assert.areEqual(username,window.navigationBars()[0].name());
            }
          });
     Finder.findElementByName("btn back normal").tap();
     Waiter.wait(2);

     //target.frontMostApp().mainWindow().buttons()[4].tap();//部分设备系统执行失败，下方的代码稳定性比较高，未遇到无法执行的
     window.flickInsideWithOptions({startOffset:{x:0.8,y:0.5},endOffset:{x:0.2,y:0.5},duration:0.5});//滑动操作，将左侧边栏隐藏
     });

