# tbArchiver3
Archiver for Trollbox

# Usage
## Step 1: Create a webhook 
Right-click any channel, select "Edit Channel", and then go to Integrations.

Click Webhooks, then "New Webhook".

Expand the new section (should be named "Captain Hook") and then click "Copy Webhook URL"
## Step 1.1: Get your home
On Trollbox, type /who into the chatbox and hit Enter, or click Send.

Copy the long string next to your name. 
## Step 2: Create the config file
Create a file called `config.json`. Inside, write:

	{
		"webhook": "",
		"home": ""
	}

Between the empty double quotes next to "webhook", paste the webhook URL.

Between the empty double quotes next to "home", paste your home.

Now save the config file.
## Step 3: Run tbArchiver3
At the terminal, type `npm i`. This will install the dependencies.

You do not have to repeat this step every time you run tbArchiver3.

Now run `node index.js` to start it. You should see output like:
	
	[tbArchiver3]: Wrote message event to disk as chat-log-XXXX-X-XX.json


## Step 4: Success! (and infinite loops)
You have successfully installed tbArchiver3. It is advisable to run it in an infinite loop to avoid losing messages if tbArchiver3 crashes.

If you are on Windows, create a batch file. It can be named however you want, just make sure it ends in ".bat".

In the batch file, write:

	@echo off
	:1
	node index.js
	goto 1

Save the batch file and run it.

On Linux, create a shell script. It can be named however you want, just make sure it ends in ".sh".

In the shell script, write:

	while true
	do
	node index.js
	done

Save the shell script and run it.

# License
tbArchiver3 is public domain software, it is licensed under the Unlicense.
