//执行少量like，执行完毕后对比金币数量。金币数人工比对，不确定正常的比例
#import "tuneup/tuneup.js";
#import "ynm3k/robot4ios/importAll.js";

var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.windows()[0];


var coinsButton = Finder.findElementByName("coinsButton");//这几个按钮在这里用的次数比较多，所以单独定义出来，这样的话就不用每次都去遍历所有的元素了，提高了执行的速度
var likeButton = Finder.findElementByName("like");
var skipButton = Finder.findElementByName("skip");

test("like",
     function(){

        coinsButton.tap();//点击右上角按钮，进入金币界面

        Waiter.wait(2);

        var excoin = Finder.findElementByName("coins").value();//获取当前的金币数

        UIALogger.logMessage("当前金币为"+excoin.toString());//输出当前的金币数，后面会与like之后的金币数进行对比

        var backButton = Finder.findElementByName("back");//定义返回按钮，之所以没有在一开始的时候一起定义，是因为在主界面是找不到这个返回按钮的

        backButton.tap();//返回到主界面

        Waiter.wait(2);

        var likeTime=0;//统计点击like和点击跳过的次数
        var skipTime=0;

        for(var i=0;i<20;i++){
            for(var waitTime=0;waitTime<5;waitTime++){//定义最长的等待时间为10s，没2s检查一次，如果like按钮可以点击就不用再等待了
                if(likeButton.isEnabled()){
                    break;}
                else{
                target.delay(2);
                }
            }
        if(likeButton.isEnabled()&&likeButton.isVisible()){//like按钮可见且可以点，点击like按钮
            likeButton.tap();
            var likeTime=i+1-skipTime;//定义当前是第几次like
            UIALogger.logMessage("第"+likeTime.toString()+"次like");}//输出这是第几次like的log
        else if(!likeButton.isEnabled()&&!skipButton.isEnabled()){//界面中间出现刷新按钮，like和skip都不可点，这种情况比较少见，只遇到过几次
            window.tapWithOptions({tapOffset:{x:0.5,y:0.5}});//中间的刷新按钮无法获取到，所以点击屏幕中的正中央来达到效果
            }
        else{//剩下的可能为出现下载或者看广告的任务，直接点击skip
            skipButton.tap();
            UIALogger.logMessage("skip");
            skipTime++;}
     }


     coinsButton.tap();

     Waiter.wait(3);

     var newcoin = Finder.findElementByName("coins").value();//定义现在的金币数

     var coins = newcoin - excoin;//定义这次like总共增加的金币数

     Finder.findElementByName("back").tap();
     test("003_like赚金币，显示like的数量以及获得的金币数",//这里没有对like次数和金币数做判断，是因为like的过程中是有几率失败的，如果任务是隐私用户发的或者其他的原因，所以用logWarning显示，可以手动查看对比
          function(){
            UIALogger.logWarning("共like"+likeTime.toString()+"次");
            UIALogger.logWarning("共获得金币"+coins.toString());
          });
     });
    
