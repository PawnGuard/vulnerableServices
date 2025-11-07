# First Ctf - Brute Force Basics

## List of contents

- [Introduction](#introduction)
- [Needed Tools](#which-tools-i-need-to-solve-it)
- [Services](#services)
- [SSH](#ssh)
- [HTTP](#http)
- [Running the lab](#hown-can-i-run-it)

## Introduction

This is the First Ctf build by PawnGuard. With this vulnerable lab, you can perform Brute Force attacks to SSH and HTTP services. This help you to practice and learn how brute force attacks works and how you can apply them.

## Which tools I need to solve it?

This lab was thinked to improve your solving skills by analyzing all the posibilities where the configuration inside the vulnerable lab was built considering a real environment and apllying scanning, leak and brute force concepts.

To solve it you will need:

- Nmap - port/service scanning
- Dictionaries - Password Wordlists to apply Brute Forcing
- Hydra - Tool for Brute Forcing
- Lab analizing and solving

## Services

This lab contain two vulnerableservices where you can perform Brute Forcing becaise it's allowed and you can initialized to solve it by first an scanning of running services.

### SSH

SSH use some configurations to allows many connections and and higher number of possible password tries. This give us as result a vulnerable SSH Service to Brute Forcing. 

### HTTP

HTPP was thinked principally in a concept like information leak and show somewhere a hint to start solving this CTF. Finally allows Brute Forcing.

## How can I run it?

You need **docker** to run this lab.

1. First, activate docker daemon:

    For arch linux:

    ```shell
    systemctl start docker    
    ```

    For debian-based:

    ```shell
    service docker start
    ```

2. Second, you need to build the docker file in an image:

    ```shell
    docker build -t my_ctf . 
    ```

3. Third, you need to run the docker image in a container to turn on the lab with services:

    ```shell
    docke run -dit -p 22:22 -p 80:80 my_ctf
    ```
