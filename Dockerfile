# استفاده از ایمیج رسمی Node.js
FROM node:18

# تنظیم دایرکتوری کاری در داخل کانتینر
WORKDIR /usr/src/app

# کپی کردن فایل‌های پروژه به داخل کانتینر
COPY package*.json ./
COPY . .

# نصب وابستگی‌ها
RUN npm install

# مشخص کردن پورت برنامه
EXPOSE 3000

# دستور اجرا برای شروع برنامه
CMD ["node", "app.js"]
