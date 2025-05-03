---
title: How to deploy and Express REST API to GCP Compute Engine using Docker
description: This tutorial will show one way to deploy an Express REST API to a GCP Compute Engine VM using Docker and HAProxy.
image: /images/video2.png
tags:
  [
    "express",
    "nodejs",
    "gcp",
    "compute-engine",
    "haproxy",
    "rest",
    "api",
    "docker",
    "docker-compose",
  ]
---

# How to deploy and Express REST API to GCP Compute Engine using Docker

---intro---
Here's one way to deploy an express REST API to Google Cloud platform using Docker.
---tech stack---
Our tech stack will look like this:
Our application is an Express REST API, running on NodeJS.
We will use Docker to containerize our application, and docker compose to orchestrate its deployment.
We will use HAProxy to reverse proxy http requests over port 80 to our application.
This tech stack will be deployed to a google cloud platform virtual machine.
---project structure---
our application consists of the following 4 files:

- index.js, which is our entry point.
- data.json, which is our in-memory database.
- our npm package and package-lock files.
  Our index.js file is a simple todos application with get, post, patch, and delete requests.
  And it listens to port 3000 on all interfaces.
  Our data.json file contains a simple json array of todo objects.
  ---containerize app---
  The first step of this process is to containerize our application.
  We will begin by typing vim Dockerfile, with no file extension.
  In this file, type FROM node:alpine, which will serve as a lightweight base image for our application.
  Next, we will RUN mkdir /app, in case the app directory does not already exist.
  We will then make /app our working directory.
  Next, we will copy our package and package-lock files into the working directory.
  The next command is RUN npm ci --omit=dev, which will cleanly install our nodejs dependencies.
  We will now copy the remaining project files into the working directory.
  Next, we will declare an environment variable of NODE_ENV=production, and then we will EXPOSE port 3000.
  Finally, we will declare the entrypoint of our application as node, and the command as index.js.
  I will now save and exit vim.
  ---test container---
  It's always important to test the Dockerfile on your local machine before pushing it to a container registry.
  I'll do this by typing docker build -t todos-test, passing the current directory as the build context.
  If i now run docker images, i can see that todos-test with a tag of latest has been created.
  Lastly, i will ensure that a container running the image functions as expected.
  I will type docker run, passing the --rm option to make the container ephemeral, the -it option to open an interactive terminal, a --name option of todos-test, the -p option to bind port 3000 on my local machine to port 3000 in the container, and finally the image name of todos-test.
  To ensure that our container is functioning as intended, I will curl localhost:3000/todos, and we get back our json array of todos, as expected.
  I will now execute the command docker rm -f todos-test to stop and remove the container.
  ---create container registry---
  The next step is to push our image to a remote container registry, Dockerhub in this case, so that we can pull it from inside our GCP VM, which we will provision shortly.
  If you do not already have a Dockerhub account, now is a good time to pause the video, create a free account, and then continue following along.
  From the Dockerhub landing page as a logged in user, I will click "create a repository".
  I will give the repository a name of todos-server, leave it as a public repository, and click "create."
  Once created, the next step is to tag our image on our local machine with the name of our repository, so that we can push it to Dockerhub.
  ---login to container registry---
  Back in my local machine's terminal emulator, I will type docker login, copy and paste the provided link into my browser, and then paste the provided code into the input field.
  On success, I will close this browser tab.
  ---tag local image---
  In the top right corner of our repository page, I will copy the last portion of the provided command, and return to my terminal emulator.
  Once again, if I run docker images, we can see that my image is currently tagged as todos-test:latest.
  I will type docker tag todos-test:latest, and paste the copied text, changing "tagname" to "latest".
  I will now run docker images one last time, and we can see that our image is now appropriately tagged.
  ---push to container registry---
  I will now type docker push, and specify our fully qualified repository name followed by the tag of latest.
  And we can see the layers of our image being pushed to Dockerhub.
  If I now refresh the repository webpage, we can see that a tag of latest has just been pushed.
  ---provision VM---
  Let's now provision our virtual machine on GCP.
  From the GCP main dashboard, in the search box at the top of the page, type "compute engine", and select that product.
  This is Google Cloud's virtual machine offering.
  At the top of the page, click "create instance".
  We only need to configure a few things here.
  I will give my instance a name of "todos-server", and I will scroll down to the machine type, and change it from "e2-medium" to "e2-micro".
  In the left-hand column, I will select the tab for networking, and I will check the box to allow http traffic.
  2 important things to note here are that we will only be accessing this instance by its external ip address, and we will only be using http over port 80.
  We'll cover DNS and TLS configuration in a later video.
  ---generate ssh keypair---
  Back in the left-hand-column, I will select the security tab, and I will scroll to the bottom and expand the option to manage access.
  At the bottom of this section, there is an option to add manually generated ssh keys.
  I will click the button to add an item.
  Note that in our example using AWS EC2, we created an SSH keypair in the AWS console, then donwloaded the private key to our local machine to use for connections.
  In this case, we will be generating our own keypair on our local machine, and then pasting the public key into this field.
  Back in my local machine's terminal emulator, I will type ssh-keygen with the -t option to specify a key type of ECDSA, the -b option to specify a key size of 521, the -f option to specify the current directory, and a name of id_todos as our private key file.
  ssh-keygen will also create a file named id_todos.pub in the same directory as our public key file.
  Finally, I will add the -C option to specify a comment of todos-user.
  This last option is crucial, because GCP will use this comment to create a superuser with the same name as the comment we provide when it provisions our VM.
  This is the name of the user we will be logging in as.
  I will now hit enter, and then enter twice again through the passphrase prompts.
  If I now examine the contents of my current directory, I see that I have a private key file named id_todos, and a public key file named id_todos.pub.
  I will copy the contents of the public key file, and paste them into the input field here.I will now click "create," and allow the VM to provision.
  ---ssh into VM---
