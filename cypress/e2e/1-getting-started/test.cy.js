/// <reference types="cypress" />

describe("This is sample cypress test",()=>{
    beforeEach(()=>{
      // cy.visit("")
    })

    xit("This is to handle weblements",()=>{
       // cy.get("*[name='username']").type("Hello world")
       // cy.contains("Forgot your password?").click()
        cy.get("input:visible").eq(0).type("Username")
        cy.get("input:visible").eq(1).type('password');
        cy.get("input:visible").each((ele,index,listEle)=>{
           // cy.wrap(ele).type()
           if(index==0){
            val="dfsf"
           }else if(index==1){
            val="sdad"
           }
           cy.wrap(listEle).eq(index).type(val)
        })
    })

    xit("This is to alias the method",()=>{
        // cy.get("*[name='username']").type("Hello world")
        // cy.contains("Forgot your password?").click()
         cy.get("input:visible").eq(0).as("username",{type:"static"});
         cy.get("@username").type('test')
         cy.focused().click()
     })

  /*   it("first",()=>{
        cy.get("@username").clear().type("Hello",{delay:20})
     })
*/

     xit("This is a sample testcase",()=>{
            cy.get("input[name='username']").type("Admin",{delay:200})
            cy.get("input[name='password']").type("admin123");
            cy.get("button[type='submit']").click()
            cy.wait(2000);
            cy.url().should("include","dashboard")
     })

     xit("Handling multiple elements",()=>{
        cy.get("input[name='username']").type("Admin",{delay:200})
        cy.get("input[name='password']").type("admin123");
        cy.get("button[type='submit']").click()
        cy.wait(2000);
       /* cy.get("a[class*='main-menu-item'] span").each((element,index,menu)=>{
            cy.log(element.text())
           if(element.text()=="Leave"){
                cy.wrap(element).click();
                return false;
           }
       }) */
       cy.get("a[class*='main-menu-item'] span").as("menu")
      /* const menuItems=["Admin","PIM","Leave","Time","Recruitment","My Info","Performance","Dashboard","Directory",
    "Maintenance","Claim","Buzz"]
    cy.get("a[class*='main-menu-item'] span").each((element,index,menu)=>{
        cy.wrap(element).invoke("text").should("eq",menuItems[index]);
    }) */
    cy.get("@menu").last().should("have.text","Buzz");
    cy.get("a[class*='main-menu-item']").as("navMenu");
    cy.get("@navMenu").find(":contains('Buzz')").click()
     })

     
xit("this is for Select tag",()=>{
    //cy.visit("https://getbootstrap.com/docs/5.0/forms/select/")
    //cy.get("select[aria-label='Default select example']").select("1");
    cy.visit("")
    cy.get("input[name='username']").type("Admin").should("have.value","Admin");
    cy.get("input[name='password']").type("admin123");
    cy.get("button[type='submit']").click()
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates")
    cy.wait(1000)
   cy.get("label:contains('Job Title')").parent("div").next("div").find("i").click()
    cy.get("label:contains('Job Title')").parent("div").next("div").find("*[role='listbox']").find("span").each((options)=>{
        if(options.text()=="IT Manager"){
            cy.wrap(options).click().then(()=>{
                return false;
            })
        }
    })
    cy.get(".oxd-table-body  .oxd-table-card:nth-child(1) div[role='row']").children("div").its("length").should("eq",7);
    cy.get(".oxd-table-body  .oxd-table-card:nth-child(1) div[role='row']").children("div").as("rowData");
    cy.get("@rowData").eq(2).invoke("text").should("eq","Tanmay Anderson O'Keefe")
    }) 

    xit("mouse-over dropdown",()=>{
        cy.visit("https://cricbuzz.com");
         cy.get("#teamDropDown nav").invoke("show");
        cy.get("#teamDropDown nav a").each((team)=>{
            cy.log(team.text())
            if(team.text()=='Australia'){
                cy.wrap(team).click().then(()=>{
                    return false;
                })
            }
        })
    })

    xit("this is for previous,prevAll,nextAll,siblings",()=>{
        //cy.visit("https://getbootstrap.com/docs/5.0/forms/select/")
        //cy.get("select[aria-label='Default select example']").select("1");
        cy.visit("https://opensource-demo.orangehrmlive.com/")
        cy.get("input[name='username']").type("Admin").should("have.value","Admin");
        cy.get("input[name='password']").type("admin123");
        cy.get("button[type='submit']").click()
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates")
      
      /*  cy.get("div[role='columnheader']:nth-child(7)").prev("div[role='columnheader']").its("length").then((len)=>{
            cy.log(len);
        }) */

        cy.scrollTo(100,0)
        //prev
        cy.get("div[role='columnheader']:nth-child(7)").prev("div[role='columnheader']").scrollIntoView().invoke("clone").then((headerPart)=>{
            headerPart.children().remove();
            
            cy.wrap(headerPart).invoke("text").should("eq","Status");
        }) 

        //prevAll
        /*cy.get("div[role='columnheader']:nth-child(7)").prevAll("div[role='columnheader']").invoke("clone").each((header)=>{
            header.children().remove();
            cy.log(header.text())
        }) */

        //nextAll
      /*  cy.get("div[role='columnheader']:nth-child(1)").nextAll("div[role='columnheader']").invoke("clone").then((headerPart)=>{
            headerPart.children().remove();
            cy.log(headerPart.text())
        }) */

       
    })

    xit("Iframe handling",()=>{
        cy.visit("https://demo.automationtesting.in/Frames.html");
        cy.get("div#Multiple iframe").its("0.contentDocument").find("h5").should("have.text","Nested iFrames")
        cy.get("div#Multiple iframe").its("0.contentDocument").find("iframe").its("0.contentDocument").find("input").type("Hello").should("have.value","Hello")
    })

    xit("handling alerts",()=>{
       cy.visit("https://demo.automationtesting.in/Alerts.html",{
            // for prompt - having input textbox,Ok and Cancel buttons
            onBeforeLoad(win){
                cy.stub(win, 'prompt').returns("Test Automation").returns(false);
            }
        });
        cy.get(".btn-info").click();
        cy.wait(1000);
        cy.window().its("prompt").should("be.called");
    

        /// Confirm popup - with  Ok and Cancel
        // true for Ok and false for Cancel
        cy.on("window:confirm",(text)=>{
            console.log(text);
            return false;
        })
        
        /// alert - only Ok button
        cy.on("window:alert",(text)=>{
            console.log(text);
        })
    })

    xit('handling windows',()=>{
        cy.visit("https://www.hyrtutorials.com/p/window-handles-practice.html");
        cy.window().then((win)=>{
        cy.stub(win,"open").as("newtab");
        })
        cy.get("#newTabBtn").click();
        cy.get("@newtab").should("have.been.calledWith","https://www.hyrtutorials.com/p/alertsdemo.html");
        cy.get("#newTabBtn").click();
       // cy.get("@newtab").should("have.been.calledWith","https://www.hyrtutorials.com/p/alertsdemo.html");
        cy.get("@newtab").should("be.calledThrice");
    })

    it("handling new window",()=>{
      /*  cy.visit("https://www.hyrtutorials.com/p/window-handles-practice.html");
        cy.window().then((win)=>{
        cy.stub(win,"open").as("newWindow");
        })
        cy.get("#newWindowBtn").click();
        cy.get("@newWindow").should("have.been.calledWith","https://www.hyrtutorials.com/p/basic-controls.html","_blank"); */

        cy.visit("https://www.hyrtutorials.com/p/window-handles-practice.html");
        cy.window().then((win)=>{
            cy.stub(win,"open").as("open");
        })
        cy.get("#newWindowBtn").click();
        let testURL="https://www.hyrtutorials.com/p/basic-controls.html";
        cy.get("@open").should("be.calledWith",testURL);
        cy.window().then((win)=>{
            win.location.href=testURL;
        })
        cy.go("back");
    })
})
