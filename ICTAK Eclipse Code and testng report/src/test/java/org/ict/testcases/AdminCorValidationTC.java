package org.ict.testcases;

import java.io.File;
import java.time.Duration;

import org.ict.base.TestBase;
import org.ict.pages.AdminLoginPage;
import org.ict.pages.CorAdminValidation;

import org.testng.Assert;
import org.testng.annotations.Test;

public class AdminCorValidationTC extends TestBase {
	AdminLoginPage admin=null;
	CorAdminValidation corval=null;

	@Test(priority=0)

	public void CorValTc1() 
	{
		admin=new AdminLoginPage(driver);
		corval=new CorAdminValidation(driver);
		admin.loginBtn();
		admin.userName("superadmin");
		admin.password("12345");
		admin.sgnBtn();
		corval.clickCorDashboard();
		corval.searchCorDashboard();
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(30));
	}


	@Test(priority=1)


	public void downloadFile() throws InterruptedException
	{
		corval = new CorAdminValidation(driver);
		corval.searchCorDashboard();
		corval.download();

		String downloadDir = System.getProperty("user.home") + "\\Downloads";
		String expectedFileName = "ExcelSheet.xlsx";
		File downloadedFile = new File(downloadDir + "/" + expectedFileName);

		int waitTime = 30; 
		int elapsedTime = 0;
		while (!downloadedFile.exists() && elapsedTime < waitTime) {
			Thread.sleep(1000);
			elapsedTime++;
		}

		if (downloadedFile.exists()) {
			System.out.println("File downloaded successfully: " + downloadedFile.getAbsolutePath());
		} else {
			System.out.println("Failed to download the file within the specified time.");
		}
		Assert.assertTrue(downloadedFile.exists(), "The file was  downloaded successfully.");


	}
}
