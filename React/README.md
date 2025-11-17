# مكتب صالح الحيسوني للمحاماة - موقع الكتروني

موقع الكتروني لمكتب صالح الحيسوني للمحاماة في المملكة العربية السعودية.

## التقنيات المستخدمة

- React 18
- Vite
- CSS3

## التطوير المحلي

```bash
# تثبيت المكتبات
npm install

# تشغيل السيرفر المحلي
npm run dev

# بناء المشروع للإنتاج
npm run build

# معاينة البناء
npm run preview
```

## النشر على Vercel

### الطريقة الأولى: عبر GitHub

1. ارفع المشروع على GitHub
2. اذهب إلى [Vercel](https://vercel.com)
3. سجل دخول بحساب GitHub
4. اضغط "New Project"
5. اختر المستودع (Repository)
6. Vercel سيكتشف تلقائياً أنه مشروع Vite
7. اضغط "Deploy"

### الطريقة الثانية: عبر Vercel CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel

# النشر للإنتاج
vercel --prod
```

### إعدادات Vercel

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## ملاحظات

- الموقع جاهز للنشر على Vercel
- جميع الملفات الضرورية موجودة
- الموقع متجاوب ويعمل على جميع الأجهزة
