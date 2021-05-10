FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install --global cross-env
RUN npm install -g umi
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY ./ ./

EXPOSE 8000
CMD ["cross-env-shell", "UI_ORIGIN_URL=http://localhost:8080", "API_URL=http://studymama-load-balancer-795957589.ap-southeast-1.elb.amazonaws.com:8080", "UMI_ENV=prod", "umi"]
