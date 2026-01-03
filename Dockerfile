# ---------- Build stage ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy ONLY dependency files first
COPY package*.json ./
RUN npm install

# Copy ONLY source files needed for build
COPY . .

RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx config FIRST (independent layer)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
