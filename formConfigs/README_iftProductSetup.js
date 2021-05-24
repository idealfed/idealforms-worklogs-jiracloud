
README


How to set up an IFT forms based product at initial installation time.



Output will be a configured system from which new customers can install cleanly.


Setup Steps summary:

1.  Install the application on IFT's app server
2.  Install the "app" on idealfed's JIRA Cloud service
3.  Configure the IFT Product using idealfed's cloud instance:
	a.  Install product form group
	b.  Install IFT product management form group
4.  Configure IFT product management with version to support subsequent installs
	
	
	


1.  Install the app on our servers.

JAVA app service installation activity.


2.  Install "app" on idealfeds JIRA Cloud server

Open idealfed jira cloud

Open 'manage applications'

If application is already installed, perform uninstall.

Install the application using the connect URL

Refresh the browser and inspect buttons are showing up in correct places

(don't run the buttons from the "App" dropdown, they won't work yet)


3.  Open 'Manage' applications and look for button: 

Ideal XXXX where XXXX is the product.

Page should show with error that product cannot be found.

In middle of page should be a link for "Idealfed Administration", and click:

    Idealfed forms admin will open.  In lower left of forms menu, click button "Backups", click
		a. three buttons will show at bottom, click "Choose File"
			-load a 'full' forms config of the product - file "iftFormsConfig_WL_final_v1.json"
		b. click "upload group", select and load - file "IFTProductManager.json"
		c. import custom types:
		    -IFT Product Versions  - file IFTProducts.json
			-IFT Products  - file IFTProductVersions
			
			
At this point the application should run as designed on Idealfeds JIRA Cloud instance.  However, NEW customers will not load correctly until the following is done.

			
			
Steps b and c above are there to configure IdealFed's instance of the setup with additional functionality to manage the actual product.  This cannot be in the base configuration (a) because that form group will be installed by customers and they should not get the ability to change the product itself.
		

Set up the "Product" version for customer installs:

4.  Open form "IFT Product View" by simply double clicking on the form from forms administration.
	a.  add the product to the DB,  product name for worklogs is:  "iftWorklogs"
		-Set the ID to be 0 (zero", this tells the endpoint it's an ADD.
		-enter name and description for the product. hit add.
		-double click on new row in table. (may need to refresh to see)
	b.  add product versions to the product.  add one version called "default"
	    -set id to zero, 0
		-set "version" == "default"
		-set code to the the contents of  file "iftFormsConfig_WL_final_v1.json"
		-hit save.
		
		
Future installs from the Marketplace will auto configure the form group the first time a user opens the form.


		


	
	
