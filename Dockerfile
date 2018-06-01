FROM node:alpine
MAINTAINER Volodymyr Pasichnyk <vladimir.pasechnik@gmail.com>

WORKDIR /app
RUN mkdir -p /app
COPY package.json /app
COPY ./ /app
ENV HOST "0.0.0.0"
ENV PORT "4060"
ENV HTPPS_PORT "4443"
ENV NODE_ENV "production"
EXPOSE 4060 4443

# RUN apk update && apk add --update --no-cache alpine-sdk python && \
#    python -m ensurepip && \
#    rm -r /usr/lib/python*/ensurepip && \
#    pip install --upgrade pip setuptools && \
#    rm -r /root/.cache && \

RUN npm install --no-optional --silent
RUN npm run deploy:prod

CMD ["npm", "start"]
