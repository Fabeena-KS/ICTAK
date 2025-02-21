package org.ict.pages;

import org.ict.base.TestBase;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class CorAdminValidation extends TestBase {
	WebDriver driver;
	public  CorAdminValidation(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver, this);

	}
	//locate web elements....................
	@FindBy(xpath="//div/ul/li[6]/a[@class='nav-link text-white']")
	WebElement clickmembership;
	@FindBy(xpath="//input[@name='search']")
	WebElement search;
	@FindBy(xpath="//button[@class='btn bg-gradient-primary btn-sm mb-0']")
	WebElement button;



	//passing values to the elements.....................
	public void clickCorDashboard()
	{

		clickmembership.click();

	}
	public void searchCorDashboard()
	{

		search.sendKeys("Fabeena KS");
	}
	public void download()
	{

		button.click();


	}



}
