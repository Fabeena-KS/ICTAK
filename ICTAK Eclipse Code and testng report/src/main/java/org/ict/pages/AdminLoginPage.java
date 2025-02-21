package org.ict.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.FindBy;
public class AdminLoginPage {
	WebDriver driver;
	public  AdminLoginPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
	@FindBy(xpath="//*[@class='btn btn-sm bg-gradient-info mb-0 me-1 mt-2 mt-md-0']")
	WebElement loginbtn;
	@FindBy(name="email")
	WebElement uname;
	@FindBy(name="password")
	WebElement pwd;
	@FindBy(xpath="//*[@id='exampleModalForm']//child::button")
	WebElement sgbtn;
	@FindBy(xpath="//*[@id='navbarBlur']//child::h4")
	WebElement txt;

	public void loginBtn() {
		System.out.println("loginhere");
		loginbtn.click();
	}

	public void userName(String usrname) {


		uname.sendKeys(usrname);
	}
	public void password(String passwd) {

		pwd.sendKeys(passwd);
	}

	public void sgnBtn() {

		sgbtn.click();
	}
	public  String getHome() {


		String actres=txt.getText();
		return actres;
	}

}
