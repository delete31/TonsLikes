//多次like，使得弹出不能like的弹出框以及时间倒计时
#import "tuneup/tuneup.js";
#import "ynm3k/robot4ios/importAll.js";

var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.windows()[0];


var likeButton = Finder.findElementByName("like");//同样的，因为用的次数比较多，所以先直接定义好
var skipButton = Finder.findElementByName("skip");
     
var likeTime=0;
var skipTime=0;
     

test("004_多次like直到出现每小时like80个限制",
     function(){
        for(var i=0;i<200;i++){//之前设置了100，但是广告和下载过多时，100循环结束了，还是没有弹出限制
        for(var waitTime=0;waitTime<5;waitTime++){//和like.js一样的思路。增加了对限制弹出框的判断
        if(likeButton.isEnabled()){
            break;}
        else{
            target.delay(2);
            }
        }
        if(likeButton.isEnabled()&&likeButton.isVisible()){//正常like
            likeButton.tap();
            var likeTime=i+1-skipTime;
            UIALogger.logMessage("第"+likeTime.toString()+"次like");}
        else if(Finder.findElementByName("Oops").isVisible()){//出现提示，跳出循环
            UIALogger.logMessage("too many like");
            break;}
        else if(!likeButton.isEnabled()&&!skipButton.isEnabled()){//界面中间出现刷新按钮，like和skip都不可点
            window.tapWithOptions({tapOffset:{x:0.5,y:0.5}});
            }
        else{//看广告或者下载
            skipButton.tap();
            UIALogger.logMessage("skip");
            skipTime++;}
     }
        Assert.element_is_valid(Finder.findElementByName("Oops"));
     });
if(Finder.findElementByName("btn close normal").isVisible()){//如果能直接点击返回就点击返回按钮，部分设备系统无法找到返回
    Finder.findElementByName("btn close normal").tap();
    }
else{//如果没有返回按钮就先跳转到金币界面，再点击返回回到主界面
    Finder.findElementByName("Get more coins").tap();
    Waiter.wait(2);
    Finder.findElementByName("back").tap();
    }
