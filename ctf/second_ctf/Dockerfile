FROM ubuntu:latest

MAINTAINER Pawnguard - All of the team

RUN apt update && apt install -y \
openssh-server \
nodejs \
neovim \
net-tools \
npm \
wget \ 
sudo \
vim \
nano \
&& useradd pawnguard -m -s /bin/bash \
&& useradd hacker -m -s /bin/bash && echo "hacker:rompedordemadrEs" | chpasswd \
&& echo "pawnguard:locochon" | chpasswd && rm -f /etc/motd \
&& useradd noTeEstreses -m -s /bin/bash && echo "noTeEstreses:DesestresaTec" | chpasswd \
&& useradd Administrator -m -s /bin/bash && echo "Administrator:twinkle" | chpasswd \
&& useradd pepe -m -s /bin/bash -u 1005 && echo "pepe:123" | chpasswd \
&& chmod 4755 $(which python3) && usermod -aG sudo Administrator

COPY ./docker/sshd_config /tmp/sshd_config
COPY ./docker/motd /etc/motd
COPY ./web /var/www/html
COPY ./usernames/hacker/ /home/hacker
COPY ./usernames/noTeEstreses/ /home/noTeEstreses
COPY ./usernames/Administrator/ /home/Administrator

RUN chmod -R 500 /home/hacker/FIRST_HERE && chmod -R 500 /home/hacker/main && chmod 755 /home/hacker/program.py && chown -R pepe:pepe /home/hacker/FIRST_HERE \
&& chown -R pepe:pepe /home/hacker/main && chown -R root:root /home/hacker/program.py

EXPOSE 22 80

RUN cat /tmp/sshd_config >> /etc/ssh/sshd_config && chmod -R 444 /etc/update-motd.d/ && rm -f /etc/issue /etc/issue.net

WORKDIR /var/www/html/

CMD service ssh start && npm install -y && node index.js
