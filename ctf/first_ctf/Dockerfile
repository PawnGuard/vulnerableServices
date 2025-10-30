FROM ubuntu:latest

MAINTAINER Pawnguard - All of the team

RUN apt update && apt install -y \
openssh-server \
nodejs \
neovim \
net-tools \
npm \
wget && useradd pawnguard -m -s /bin/bash && useradd hacker -m -s /bin/bash && echo "hacker:00000000" | chpasswd && echo "pawnguard:pawnguard" | chpasswd && rm -f /etc/motd

COPY ./docker/sshd_config /tmp/sshd_config
COPY ./docker/motd /etc/motd
COPY ./web /var/www/html
COPY ./usernames/hacker/ /home/hacker

EXPOSE 22 80

RUN cat /tmp/sshd_config >> /etc/ssh/sshd_config && chmod -R 444 /etc/update-motd.d/ && rm -f /etc/issue /etc/issue.net

WORKDIR /var/www/html/

CMD service ssh start && npm install -y && node index.js
