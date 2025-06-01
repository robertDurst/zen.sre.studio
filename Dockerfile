# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN rm -f package-lock.json && rm -rf node_modules && npm install
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY about.html /usr/share/nginx/html/
COPY research.html /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
