ROM circleci/node:latest-browsers as builder

WORKDIR /usr/src/app/
USER root
COPY package.json ./
RUN yarn

COPY ./ ./

RUN npm run test:all

RUN npm run fetch:blocks

RUN npm run build


FROM nginx

WORKDIR /usr/share/nginx/html/

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/dist  /usr/share/nginx/html/

EXPOSE 8000
CMD ["cross-env-shell", "UI_ORIGIN_URL=http://localhost:8080", "API_URL=http://studymama-load-balancer-795957589.ap-southeast-1.elb.amazonaws.com:8080", "UMI_ENV=prod", "umi"]
