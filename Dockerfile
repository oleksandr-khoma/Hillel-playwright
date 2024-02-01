FROM mcr.microsoft.com/playwright:v1.40.0-jammy

RUN mkdir playwright-tests

COPY . /playwright-tests

WORKDIR /playwright-tests

VOLUME playwright-report/

RUN npm ci

CMD [ "npm", "run", "test:api" ]
