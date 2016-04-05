#import "tuneup/tuneup.js";
#import "ynm3k/robot4ios/importAll.js";

var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.windows()[0];


Finder.findElementByName("CrossButton").tap();
Waiter.wait(2);
     
Finder.findElementByName("Settings").tap();
Waiter.wait(2);

test("022_点击Settings进入到Settings界面",
     function(){
     if(target.model() == "iPad"){
        Assert.areEqual("Settings",window.navigationBars()[1].name());
     }
     else{
        Assert.areEqual("Settings",window.navigationBars()[0].name());
     }
     });

Finder.findElementByName("Store").tap();
Waiter.wait(2);

test("023_store界面",
     function(){
     //Assert.areEqual("My Balance",window.navigationBars()[0].name());  //ios7这里的navigationbar name比较奇怪，所以改用下面的方式来判断是否在store界面
     Assert.element_is_valid(Finder.findElementByName("My coins"));
     });

Finder.findElementByName("back").tap();
Waiter.wait(2);

if(target.model() != "iPad"){//ipad版点击返回无效果，通过element或者位置点击都没有效果
    Finder.findElementByName("Support").tap();//可以通过navigationbar的tapwithopinion进行操作，在别的app上尝试成功
    Waiter.wait(2);
    
    test("024_support界面",
         function(){
         Assert.areEqual("Ask a supporter on TonsLikes",window.navigationBars()[0].name());
         });
    
    window.navigationBars()[0].leftButton().tap();
    Waiter.wait(2);
    if(Finder.findElementByNameAndClassType("Delete Draft","Button").checkIsValid()){
        if(app.actionSheet().buttons()["Delete Draft"].isValid()){//ios7
            app.actionSheet().buttons()["Delete Draft"].tap();
        }
        else{//ios8
            Finder.findElementByName("Delete Draft").tap();
        }
    }
}

test("025_Write a review界面",
     function(){
     if(target.model() == "iPad"){
        Assert.areEqual("Write a review",window.tableViews()[1].cells()[2].name());
     }
     else{
        Assert.areEqual("Write a review",window.tableViews()[0].cells()[2].name());
     }
     });


     