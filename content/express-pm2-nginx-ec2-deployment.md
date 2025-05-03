---
title: How to deploy and Express REST API to AWS EC2
description: This tutorial will show one way to deploy an Express REST API to an EC2 instance using Nginx as a reverse proxy.
image: /images/video1.png
tags: ["express", "nodejs", "aws", "ec2", "nginx", "rest", "api", "pm2"]
---

# How to deploy and Express REST API to AWS EC2

Our tech stack will look like this:
Our express application will be served by pm2, which is a process manager that gives us logging, monitoring, and fault tolerance, as well as other benefits.
We'll use nginx to reverse proxy http requests over port 80 to our pm2 process.
This tech stack will be deployed to an aws virtual machine.
Our express api is a simple todos application with get, post, patch, and delete requests.
It listens to port 3000 on all interfaces.
The first step of this process is to provision our aws virtual machine.
From the aws console dashboard, in the search bar, type ec2, which is aws's virtual machine offering.
From the ec2 dashboard, click on launch instance.
We only need to configure a few things here.
I'm going to give the instance of a name of todos-server.
I'm going to select ubuntu as my operating system, leaving the architecture and the instance type as they are.
I'm going to create a new ssh keypair, and name it the exact same thing as my instance, todos-server.
I will select ed25519 and leave the .pem format, and create the key.
You'll see that it goes to my downloads folder.
Under network settings, leave everything as is, except check the box to allow http traffic from the internet.
2 important things to note here are that we will only be accessing this instance by its public ip address, and we will only be using http over port 80.
We'll cover dns and tls configuration in a later video.
Leave all other options as they are, and click launch instance.
Once the instance is launched, click on its id, so that we can see its public ip address.
We'll use this ip address for further configuration.
Now that we've provisioned our vm, the next step is to ssh into it.
In my terminal emulator i'm going to navigate to the directory that i downloaded the private key file to.
In this case, that file is todos-server.pem.
I'm then going to type ssh, with the -i option to specify the private key file as credentials.
I'm then going to type ubuntu@, and i'm going to copy the public ip address of the instance, which i will paste to the end of this command.
I'll press enter, and now we have successfully ssh'd into our virtual machine.
This deployment will require the following 4 dependencies: nodejs, npm, pm2, and nginx.
We'll begin by installing the first 3 dependencies on our vm.
Still in the ssh session in our vm, im going to install node and npm my preferred way, using the volta utility.
This command is pasted from the volta.sh website.
Once this command finishes, i'm going to source my .bashrc file.
Now, i'll type volta --version, and i see that it is installed and accessible to me.
I will now type volta install node, and this will install both the nodejs and npm lts.
If i now type node -v, i have 22.14 lts, and if i type npm -v, i have 10.9.2 lts.
I will now install my 3rd dependency by typing npm install -g to install globally, pm2.
And now our first 3 dependencies are successfully installed.
The next step is to copy our project files from our local machine to our ec2 instance.
Note that in a production environment, you would likely use a combination of version control, usually git, and some form of ci/cd pipelines to accomplish this.
We'll cover those technologies in a later video.
I'm going to use scp to copy the files in this case.
Back in my terminal emulator on my local machine, i'm going to type the scp command similarly to the ssh command.
I will type scp, with the -i option to specify the todos-server.pem file as credentials, also passing the -r option to copy recursively, and the entire todos directory which contains our project files.
Once again i will type ubuntu@, and i will copy our ec2 instance's public ip address and paste it at the end of the command.
After this, i will type colon, and the absolute path to the ubuntu user's home directory, that is /home/ubuntu.
I will press enter, and we can see that all 4 project files have copied over.
Back in my ssh session in the ec2 instance, i will type ls to confirm that the files are here.
I will cd into the todos directory, and run npm install to install our nodejs dependencies.
I will now use pm2 to start the application by running pm2 start index.js, which is the entry point.
If i now run pm2 ls, we see a status of online, which indicates that the application is running properly.
We can test this by typing curl localhost:3000/todos, and i will pipe this to jq to format the output.
And we get a nicely formatted json array of todos.
I'm going to execute 2 additional pm2 commands, the first of which is pm2 startup, which will create a startup script for my currently managed processes.
And i will also run pm2 save, which will save the current process list.
Now our application will persist across instance reboots.
The last step of this deployment is to install and configure nginx as a reverse proxy.
I will begin by running sudo apt update, to update the system's package list.
Now i will run sudo apt install nginx -y to accept the installation automatically.
Now that nginx is installed, we need to create a simple default configuration file to reverse proxy to our application.
This file will do the following:

- listen on port 80 to all requests bound for the public ip address of our ec2 instance.
- at the root location, it will reverse proxy to our todos server running on localhost port 3000.
- and it will simply forward the host header as nginx received it.
  Back in my ec2 instance, i'm going to change directory into /etc/nginx/conf.d.
  And as you can see, i do not currently have a default configuration file.
  So i will run sudo vim default.conf.
  And i am simply going to paste my minimal default configuration into this file.
  I will then save and exit vim.
  I will now run sudo nginx -t to test the configuration file for errors, and it passes.
  I will then run sudo nginx -s reload to reload nginx's configuration files.
  Next, i will type systemctl status nginx to confirm that nginx is running properly, and it is.
  The only thing to do now is to make a request to the ec2 instance from my local machine, to ensure that nginx is configured properly, receiving requests, and reverse proxying them to the todos application.
  I'm going to execute curl http://the public ip address of the ec2 instance/todos, once again piping the output to jq for formatting.
  And as you can see, we get the exact same output as when we curled localhost from inside the ec2 instance.
  Our deployment is now complete.
