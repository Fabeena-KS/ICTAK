package org.ict.testcases;

import org.ict.base.TestBase;
import org.ict.pages.AdminLoginPage;

import org.testng.Assert;
import org.testng.annotations.Test;

import constants.AutomationConstants;


public class AdminLoginTC extends TestBase {
	AdminLoginPage adminloginpage=null;

	@Test (priority = 0)
	public void validAdLogin(){
		adminloginpage= new AdminLoginPage(driver);

		adminloginpage.loginBtn();
		adminloginpage.userName("superadmin");
		adminloginpage.password("12345");
		adminloginpage.sgnBtn();
		String actualResult = adminloginpage.getHome();		
		Assert.assertEquals(actualResult, AutomationConstants.ExpectedHome);
		System.out.println("valid");

	}

}

