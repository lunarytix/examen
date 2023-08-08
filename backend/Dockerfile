# INSTALL UBUNTU
FROM node:18-slim
#INSTALL LIBAIO1 & UNZIP (NEEDED FOR STRONG-ORACLE)
RUN apt-get update \
#  && apt-get install -y libaio1 \
 && apt-get install -y build-essential \
 && apt-get install -y unzip \
 && apt-get install -y curl \
 && apt-get install -y nano \
 && apt-get install -y chromium \
#  && apt-get install -y alien \
 && apt-get install -y python3

#ADD ORACLE INSTANT CLIENT
# WORKDIR /
# ADD ./oracle/ .

# RUN alien oracle-instantclient19.10-basic-19.10.0.0.0-1.aarch64.rpm
# RUN dpkg -i oracle-instantclient19.10-basic_19.10.0.0.0-2_arm64.deb
# RUN dpkg -i oracle-instantclient-basic_21.6.0.0.0-2_amd64.deb
WORKDIR /myapp

RUN npm install -g typescript
RUN npm install -g nodemon
