package org.ict.testcases;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

import org.ict.base.TestBase;
import org.ict.pages.AdminLoginPage;
import org.ict.pages.CorAdminValidation;
import org.ict.pages.Events;
import org.ict.pages.HomePage;
import org.ict.pages.MembershipReg;
import org.openqa.selenium.Alert;
import org.testng.Assert;
import org.testng.annotations.Test;

import constants.AutomationConstants;



public class EventsTC extends TestBase {


	//object creation of each web pages
	HomePage hmp=null;
	Events clickeventon=null;
	MembershipReg memreg=null;
	CorAdminValidation corval=null;
	AdminLoginPage admin=null;


	//testcase shows homepage displays ICT Academy Of Kerala
	@Test(priority=0)
	public void HomePageTc() 
	{

		hmp=new HomePage(driver);
		String actual=hmp.getTextHomepage();
		Assert.assertEquals(actual, AutomationConstants.ExpectedIct);
		System.out.println(actual);
		System.out.println("ICT Academy Of Kerala is visible");
		String actualTitle=driver.getTitle();
		System.out.println(actualTitle);
		Assert.assertEquals(actualTitle,"ICT Academy of Kerala");
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(60));
	}


	//testcase for Events form registration and validation of Registration successfull popup window

	@Test(priority=1)

	public void EventsTC2() 
	{
		clickeventon=new Events(driver);
		clickeventon.displayEventsDropdown();
		clickeventon.selectIctakDrop();
		clickeventon.eventForm("Fabeena", "fabi@gmail.com", "2254678894");
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(30));
		clickeventon.clickRegister();
		Alert alert=driver.switchTo().alert();
		String alertmessage=alert.getText();
		Assert.assertEquals(alertmessage, "Registration Successfull");
		alert.accept();
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(30));

	}


	//testcase shows Corporate membership registration and validation of Registration successfull popup window

	@Test(priority=2)

	public void mebershipRegTc1() 
	{

		memreg=new MembershipReg(driver);
		memreg.registerForm();
		memreg.registerFormPara("Iza","iza house","Mumbai","private","ICT Academy");
		memreg.typeofcmpny();
		
	    memreg.corporateidentity();
		memreg.gstorg();
		memreg.pname();
		memreg.pmobno();
		memreg.technicalskill();
		memreg.emailorg();
		memreg.empcnt();
		memreg.pocCollaborate(prop.getProperty("poc_collab"));
		memreg.noofparents();
		memreg.avgyearly();
		memreg.anyorg();
		memreg.register();
		Alert alert=driver.switchTo().alert();
		String alertmessage=alert.getText();
		Assert.assertEquals(alertmessage, "Registration Successfull");
		alert.accept();
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(30));



	}


}










