# Використовуємо офіційний образ Node.js для створення Angular додатку
FROM node:16

# Встановлюємо Angular CLI глобально
RUN npm install -g @angular/cli

# Встановлюємо залежності для додатку
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Копіюємо весь проект в контейнер
COPY . .

# Запускаємо Angular додаток
CMD ng serve --host 0.0.0.0
