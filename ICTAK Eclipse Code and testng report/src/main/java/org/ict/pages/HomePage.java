package org.ict.pages;

import org.ict.base.TestBase;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class HomePage extends TestBase {
	WebDriver driver;
	public  HomePage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver, this);

}
	
	
@FindBy(xpath="//h1[text()='ICT Academy of Kerala']")
WebElement displaymessage;
public String getTextHomepage()
{
	return displaymessage.getText();
}
}