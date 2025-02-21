package org.ict.pages;

import org.ict.base.TestBase;
//import org.openqa.selenium.Alert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class Events extends TestBase {
	WebDriver driver;
	public  Events(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver, this);

	}
	@FindBy(xpath="(//a[@id='dropdownMenuDocs'])[2]")
	WebElement clickevents;
	@FindBy(xpath="( //h6[text()=' ICSET '])[1]")
	WebElement clickicset;
	@FindBy(xpath="//button[text()=' Apply Now ']")
	WebElement clickapplynow;
	@FindBy(xpath="//input[@name='name']")
	WebElement name;
	@FindBy(xpath="//input[@type='email']")
	WebElement email;
	@FindBy(xpath="//input[@name='phoneno']")
	WebElement number;
	@FindBy(xpath="//button[text()='Register']")
	WebElement clickbttn;

	public void displayEventsDropdown()
	{

		clickevents.click();

	}
	public void selectIctakDrop()
	{
		clickicset.click();
		clickapplynow.click();

	}
	public void eventForm(String ename,String eemail,String enumber)
	{
		name.sendKeys(ename);
		email.sendKeys(eemail);
		number.sendKeys(enumber);
	}

	public void clickRegister()
	{
		clickbttn.click();
	}


}


