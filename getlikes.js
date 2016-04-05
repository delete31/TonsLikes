//发布任务，分为能发布的和不能发布的。由用户的金币数进行控制。
//由于现在没有任务进度条，所以以发布任务后刷新界面，查看图片的like数量判定，可能会有偏差，所以，如果出现异常人工查看下
//ios7 有问题，collectionViews()[0].cells()[failpicnumber].tap();只有类似于下拉刷新的操作，对这个脚本的影响比较大，所以一开始的时候对系统版本进行了区分。ios7的话通过点击图片所在的百分比位置进行点击。如果是ipad的话，竖屏状态下没有问题，横屏的话就会点不到
#import "tuneup/tuneup.js";
#import "ynm3k/robot4ios/importAll.js";

var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.windows()[0];

var failpicnumber = 3;//执行发布任务失败的图片，第几张
var picnumber = 2;//执行发布任务成功的图片，第几张。需要图片的like的数量能正常显示，不能是几千。用户的金币在20——14000之间，具体的看like任务需要的金币数

var system = target.systemVersion();//获取设备系统
var strs= new Array();
strs=system.split(".");
systemVersion = strs[0];

if(systemVersion == 8){//这个脚本对8和7的区别比较大，所以差不多都是分开的
    UIALogger.logMessage("当前系统为ios8");
    Finder.findElementByName("Get Likes").tap();//点击get likes按钮，进入到显示图片的界面
    
    var coinsButton = Finder.findElementByName("coinsButton");//定义金币按钮，方便后面使用
    coinsButton.tap();//进入到金币界面
    Waiter.wait(2);
    
    var excoin = Finder.findElementByName("coins").value();//记录当前的金币数
    Finder.findElementByName("back").tap();
    Waiter.wait(2);
    
    var exlikenumber = window.collectionViews()[0].cells()[failpicnumber-1].name();//记录当前的like数量
    UIALogger.logMessage("当前like数量为" + exlikenumber.toString());
    
    window.collectionViews()[0].cells()[failpicnumber-1].tap();//根据之前设置的发布任务失败的图片，点击
    
    Waiter.wait(2);
    
    var mission = window.tableViews()[0].cells().length - 1;//获取最大的任务
    
    window.tableViews()[0].cells()[mission].buttons()[0].tap();//点击发布该任务
    
    Waiter.wait(2);
    
    test("005_发布like提示金币不够",//查看是否出现提示
         function(){
         Assert.element_is_valid(Finder.findElementByName("Oops!"));
         Assert.element_is_valid(Finder.findElementByName("You do not have enough coins to start this mission"));
         });
    
    Finder.findElementByName("Get more coins").tap();//点击进入到金币界面
    Waiter.wait(2);
    
    var coins = Finder.findElementByName("coins").value();//记录下金币数
    
    test("006_发布like失败后金币数未改变（接上一个发布like失败的用例，如上一个失败，这个也失败需检查）",
         function(){
         
         Assert.areEqual(excoin,coins);//判断是否未扣除金币
         
         });
    
    
    Finder.findElementByName("back").tap();
    
    Waiter.wait(2);
    
    Finder.findElementByName("refreshButton").tap();//点击刷新按钮
    
    Waiter.wait(2);
    
    var likenumber = window.collectionViews()[0].cells()[failpicnumber-1].name();//定义新的like数量
    UIALogger.logMessage("发布任务失败后，like的数量为" + likenumber.toString());
    
    if(likenumber==exlikenumber){//判断like数量是否未增加
        UIALogger.logMessage("like数量未增加");
    }
    else{
        UIALogger.logWarning("like增加");
    }
    
    
    Finder.findElementByName("Get Likes").tap();//同样的流程再来一遍，这次选取的是第一档的任务，所以是发布任务成功，扣除金币成功，接收like成功
    
    var coinsButton = Finder.findElementByName("coinsButton");
    coinsButton.tap();
    Waiter.wait(2);
    
    var excoin = Finder.findElementByName("coins").value();
    Finder.findElementByName("back").tap();
    Waiter.wait(2);
    
    var exlikenumber = window.collectionViews()[0].cells()[picnumber-1].name();
    UIALogger.logMessage("当前like数量为" + exlikenumber.toString());
    
    window.collectionViews()[0].cells()[picnumber-1].tap();
    
    window.tableViews()[0].cells()[1].buttons()[0].tap();
    Waiter.wait(2);
    
    test("007_发布任务成功，提示将收到like",
         function(){
         Assert.element_is_valid(Finder.findElementByName("Congratulations!"));
         Assert.element_is_valid(Finder.findElementByName("You picture will start receiving likes soon"));
         });
    
    Finder.findElementByName("Get more coins").tap();
    Waiter.wait(2);
    
    var coins = Finder.findElementByName("coins").value();
    
    test("008_选择的是第一档的任务，扣除金币",
         function(){
         Assert.areEqual(20,(excoin-coins));
         });
    
    Finder.findElementByName("back").tap();
    
    Waiter.wait(10);//等待10s，按我们现在的用户量，如果10s都还没有like的话，应该就是有问题了
    
    UIALogger.logMessage("等待10s，在判断like数有没有增加，如果没有手动查看");
    
    Finder.findElementByName("refreshButton").tap();//考虑到照片太多以及网络问题，刷新按钮点击后等待的时间也适量延长
    
    Waiter.wait(5);
    
    var likenumber = window.collectionViews()[0].cells()[picnumber-1].name();
    UIALogger.logMessage("当前like数量" + likenumber.toString());
    
    test("009_发布like任务的图片like数量增加",//判断like的数量是否不一致
         function(){
         Assert.areNotEqual(exlikenumber,likenumber);
         });
    
    Finder.findElementByName("Get Coins").tap();//回到获取金币的界面
}
else{
    UIALogger.logMessage("当前系统为ios7");
    Finder.findElementByName("Get Likes").tap();
    
    var coinsButton = Finder.findElementByName("coinsButton");
    coinsButton.tap();
    Waiter.wait(2);
    
    var excoin = Finder.findElementByName("coins").value();
    Finder.findElementByName("back").tap();
    Waiter.wait(2);
    
    var exlikenumber = window.collectionViews()[0].cells()[failpicnumber -1].name();
    
    UIALogger.logMessage("当前like数量为" + exlikenumber.toString());
    
    window.collectionViews()[0].tapWithOptions({tapOffset:{x:0.63, y:0.08}});//ios7中第三张照片的点击位置
    
    Waiter.wait(2);
    
    var mission = window.tableViews()[0].cells().length - 1;
    
    window.tableViews()[0].cells()[mission].buttons()[0].tap();
    Waiter.wait(2);
    
    test("005_发布like提示金币不够",
         function(){
         Assert.element_is_valid(Finder.findElementByName("Oops!"));
         Assert.element_is_valid(Finder.findElementByName("You do not have enough coins to start this mission"));
         });
    
    window.tableViews()[0].tapWithOptions({tapOffset:{x:0.5, y:0.53}});//ios7中get more coins的点击位置
    
    Waiter.wait(2);
    
    var coins = Finder.findElementByName("coins").value();
    
    test("006_发布like失败后金币数未改变（接上一个发布like失败的用例，如上一个失败，这个也失败需检查）",
         function(){
         Assert.areEqual(excoin,coins);
         Assert.element_is_valid(Finder.findElementByName("My coins"));
         });
    
    
    Finder.findElementByName("back").tap();
    
    Waiter.wait(2);
    
    Finder.findElementByName("refreshButton").tap();
    
    Waiter.wait(2);
    
    var likenumber = window.collectionViews()[0].cells()[failpicnumber -1].name();
    UIALogger.logMessage(likenumber.toString());
    
    if(likenumber==exlikenumber){
        UIALogger.logMessage("like数量未增加");
    }
    else{
        UIALogger.logWarning("like增加");
    }
    
    
    Finder.findElementByName("Get Likes").tap();
    
    var coinsButton = Finder.findElementByName("coinsButton");
    coinsButton.tap();
    Waiter.wait(2);
    
    var excoin = Finder.findElementByName("coins").value();
    Finder.findElementByName("back").tap();
    Waiter.wait(2);
    
    var exlikenumber = window.collectionViews()[0].cells()[picnumber -1].name();
    UIALogger.logMessage("当前like数量为" + exlikenumber.toString());
    
    window.collectionViews()[0].tapWithOptions({tapOffset:{x:0.41, y:0.08}});//ios7中第二张图的点击位置
    
    
    window.tableViews()[0].cells()[1].buttons()[0].tap();
    Waiter.wait(2);
    
    test("007_发布任务成功，提示将收到like",
         function(){
         Assert.element_is_valid(Finder.findElementByName("Congratulations!"));
         Assert.element_is_valid(Finder.findElementByName("You picture will start receiving likes soon"));
         });
    
    window.tableViews()[0].tapWithOptions({tapOffset:{x:0.5, y:0.53}});//ios7中get more coins的点击位置
    Waiter.wait(2);
    
    var coins = Finder.findElementByName("coins").value();
    
    test("008_选择的是第一档的任务，扣除金币",
         function(){
         Assert.areEqual(20,(excoin-coins));
         Assert.element_is_valid(Finder.findElementByName("My coins"));
         });
    
    Finder.findElementByName("back").tap();
    
    Waiter.wait(10);
    
    UIALogger.logMessage("等待10s，在判断like数有没有增加，如果没有手动查看");
    
    Finder.findElementByName("refreshButton").tap();
    
    Waiter.wait(5);
    
    var likenumber = window.collectionViews()[0].cells()[picnumber -1].name();
    UIALogger.logMessage("当前like数量" + likenumber.toString());
    
    test("009_发布like任务的图片like数量增加",
         function(){
         Assert.areNotEqual(exlikenumber,likenumber);
         });
    
    Finder.findElementByName("Get Coins").tap();
}