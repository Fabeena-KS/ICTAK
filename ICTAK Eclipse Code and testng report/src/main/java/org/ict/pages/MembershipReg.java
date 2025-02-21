package org.ict.pages;

import org.ict.base.TestBase;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.Select;

public class MembershipReg  extends TestBase {
	WebDriver driver;
	public  MembershipReg(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver, this);

	}
	//locate web elements of registration form
	@FindBy(xpath="(//a[@id='dropdownMenuDocs'])[1]")
	WebElement clickmembership;
	@FindBy(xpath="(//h6[text()=' Corporate Membership '])[1]")
	WebElement clickcorporate;
	@FindBy(xpath="//button[text()='Register Here']")
	WebElement clickregisterhere;



	@FindBy(xpath="//input[@name='name']")
	WebElement name;
	@FindBy(xpath="//input[@name='address']")
	WebElement address;
	@FindBy(xpath="//input[@name='head']")
	WebElement head;
	@FindBy(xpath="//input[@name='identityNo'])[1]")
	WebElement phnno;
	@FindBy(xpath="//input[@name='nature']")
	WebElement nature;
	@FindBy(xpath="//input[@name='website']")
	WebElement website;
	//@FindBy(xpath="(//div[@class='input-group input-group-dynamic mb-4']/child::select)[1]")
	//WebElement drop1;


	@FindBy(xpath="//select[@class='form-control ng-pristine ng-invalid ng-touched']")
	WebElement selecttypecmpny;
	@FindBy(xpath="//option[text()=' Private ']")
	WebElement typecmpny;



	@FindBy(xpath="(//input[@name='identityNo'])[1]")
	WebElement corporateidno;
	@FindBy(xpath="//input[@name='GST']")
	WebElement gst;


	//point of contact
	@FindBy(xpath="//input[@name='nameofContact']")
	WebElement pname;
	@FindBy(xpath="(//input[@name='identityNo'])[2]")
	WebElement mobno;
	@FindBy(xpath="//input[@name='TechnicalSkill']")
	WebElement technical;
	@FindBy(xpath="(//input[@name='email'])[2]")
	WebElement email;
	@FindBy(xpath="//input[@name='employeeCount']")
	WebElement empcntno;
	@FindBy(xpath="/html/body/app-root/app-corporateform/header/div[2]/section/div/div/div/form/div/div[10]/div/ng-select/div/div/div[2]/input")
	WebElement collab;
	//@FindBy(xpath=("//div[@class='input-group input-group-dynamic mb-4']/child::select)[2]"))
	//WebElement drop2;
	//@FindBy(xpath="(//div[@class='input-group input-group-dynamic mb-4']/child::select)[3]")
	//WebElement drop3;

	@FindBy(xpath="//input[@name='details']\n")
	WebElement any;
	@FindBy(xpath="//input[@value='REGISTER']")
	WebElement regbtn;


	public void registerForm()
	{

		clickmembership.click();
		clickcorporate.click();
		clickregisterhere.click();

	}

	public void registerFormPara(String rname,String raddress,String rheadfororg,String naturefororg,String rwebsite)
	{
		name.sendKeys(rname);
		address.sendKeys(raddress);
		head.sendKeys(rheadfororg);
		nature.sendKeys(naturefororg);
		website.sendKeys(rwebsite);
	}
		
	//select
	public void typeofcmpny()
	{
		WebElement drop1=driver.findElement(By.xpath("(//div[@class='input-group input-group-dynamic mb-4']/child::select)[1]"));


		Select dropdown=new Select(drop1);
		dropdown.selectByVisibleText("Public");
	} 
	
	
	


	public void corporateidentity()
	{
		corporateidno.sendKeys("12345");
	} 
	public void gstorg()
	{
		gst.sendKeys("4545");
	} 
	
	public void pname()
	{
		pname.sendKeys("Bini");	} 
	public void pmobno()
	{
		mobno.sendKeys("6654789945");
	} 
	public void technicalskill()
	{
		technical.sendKeys("ABC skills");
	} 
	public void emailorg()
	{
		email.sendKeys("bini@gmail.com");
	} 
	public void empcnt()
	{
		empcntno.sendKeys("8");
	} 


	//select.....................

	public void pocCollaborate(String poc_collab) {
		collab.sendKeys(poc_collab);
		collab.sendKeys(Keys.RETURN);
	} 


	public void noofparents()
	{
		WebElement drop2=driver.findElement(By.xpath("(//div[@class='input-group input-group-dynamic mb-4']/child::select)[2]"));


		Select dropdown=new Select(drop2);
		dropdown.selectByVisibleText("10>");
	} 
	public void avgyearly()
	{
		WebElement drop3=driver.findElement(By.xpath("(//div[@class='input-group input-group-dynamic mb-4']/child::select)[3]"));


		Select dropdown=new Select(drop3);
		dropdown.selectByVisibleText("41-50");
	} 

	public void anyorg()
	{
		any.sendKeys("no");
	} 
	public void register()
	{
		regbtn.submit();
	} 

}
