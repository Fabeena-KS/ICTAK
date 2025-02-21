package org.ict.base;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.Duration;
import java.util.Properties;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;

public class TestBase {

	public static WebDriver driver=null;
	public Properties prop =null;
	public void loadprop() throws IOException {
		prop = new Properties();

		InputStream fileip = getClass().getResourceAsStream("/config.properties");
		//BufferedReader reader = new BufferedReader(new InputStreamReader(fileip));
		prop.load(fileip);
	}

	@BeforeClass
	public void launch() throws IOException {
		loadprop();

		String browserName = prop.getProperty("browser");
		System.out.println(browserName);
		if(browserName.equals("chrome")) {

			driver =new ChromeDriver();	
		}
		else if(browserName.equals("firefox")) {

			driver =new FirefoxDriver();	


		}
		driver.get(prop.getProperty("url"));
		driver.manage().window().maximize();	
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
	}
	@AfterClass
	public void new_setup() {
		driver.quit();
	}

}
