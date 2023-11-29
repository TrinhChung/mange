FROM node:18.18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
# # RUN npm run build

# # Thay bằng nginx?
# FROM node:18.18-alpine
# WORKDIR /app
# COPY --from=build /app /app
CMD ["npm", "start"]
