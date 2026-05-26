# 🧪 اختبار الـ APIs - Checklist

## قبل البدء:
1. تأكد أن لديك `.env.local` مع `MONGODB_URI`
2. شغّل السيرفر: `npm run dev`
3. اذهب إلى `http://localhost:3000/api/seed` لملء البيانات الأولية

## 📋 اختبارات الـ APIs

### 1️⃣ GET Endpoints

#### [ ] Projects API
```bash
curl http://localhost:3000/api/projects
# يجب أن يرجع array من الـ projects
```

#### [ ] Projects with Filter
```bash
curl http://localhost:3000/api/projects?published=true
# يجب أن يرجع published projects فقط
```

#### [ ] Skills API
```bash
curl http://localhost:3000/api/skills
# يجب أن يرجع array من الـ skills مع category
```

#### [ ] About API
```bash
curl http://localhost:3000/api/about
# يجب أن يرجع about information
```

#### [ ] Settings API
```bash
curl http://localhost:3000/api/settings
# يجب أن يرجع site settings
```

### 2️⃣ Components - هل تظهر البيانات؟

#### [ ] Homepage Projects
- اذهب إلى `http://localhost:3000`
- تحقق أن Projects section يظهر
- تحقق أن البيانات موجودة (من API، ليس hardcoded)

#### [ ] Homepage Skills
- اذهب إلى `http://localhost:3000`
- Scroll إلى Skills section
- تحقق أن Skills بتظهر صح

#### [ ] Homepage About
- اذهب إلى `http://localhost:3000`
- Scroll إلى About section
- تحقق أن البيانات صحيحة

### 3️⃣ Admin - الكتابة والتحديث

#### [ ] Login to Admin
1. اذهب إلى `http://localhost:3000/admin/login`
2. استخدم البيانات:
   - Email: `admin@khaled.com`
   - Password: `12345678`
3. [ ] تحقق أنك دخلت بنجاح

#### [ ] Add New Project
1. اذهب إلى `/admin/projects/new`
2. ملأ الحقول:
   - Title: "Test Project"
   - Description: "This is a test project description"
   - Category: "web"
   - Upload images (أو اترك فارغ للتجربة)
   - Add tech stack: "React", "Node.js"
3. [ ] اضغط Save
4. [ ] تحقق أن Project ظهر في Projects list

#### [ ] Edit Project
1. اذهب إلى `/admin/projects`
2. اضغط على edit (ثلاث نقاط)
3. غير Title أو أي حقل
4. [ ] اضغط Save Changes
5. [ ] تحقق أن التغيير ظهر في الـ list

#### [ ] Delete Project
1. اذهب إلى `/admin/projects`
2. اضغط على delete
3. [ ] أكّد الحذف
4. [ ] تحقق أن Project اختفى

#### [ ] Manage Skills
1. اذهب إلى `/admin/skills`
2. اختر category (مثلاً Frontend)
3. [ ] أضف skill جديد: اكتب الاسم واضغط +
4. [ ] عدّل percentage باستخدام الـ slider
5. [ ] اضغط Save
6. [ ] تحقق أن الـ Skills ظهرت في الـ Homepage

#### [ ] Update About Info
1. اذهب إلى `/admin/about`
2. عدّل البيانات (bio, years learning, etc)
3. [ ] اضغط Save
4. [ ] اذهب إلى Homepage وتحقق أن البيانات اتحدثت

### 4️⃣ Contact Form
1. اذهب إلى `http://localhost:3000`
2. Scroll إلى Contact section
3. ملأ الحقول:
   - Name: "Test User"
   - Email: "test@example.com"
   - Subject: "Test Subject"
   - Message: "This is a test message"
4. [ ] اضغط Send
5. [ ] تحقق أن رسالة توفيق ظهرت
6. [ ] اذهب إلى `/admin/messages` وتحقق أن الرسالة موجودة

## 🔍 Error Handling Tests

#### [ ] Missing Required Fields
- جرب إضافة project بدون Title
- يجب أن يظهر validation error

#### [ ] Invalid URLs
- جرب إضافة project مع لينك غلط في liveUrl
- يجب أن يظهر error

#### [ ] Unauthorized Access
- حاول الوصول إلى API بدون authentication:
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title": "test"}'
# يجب أن يرجع 401 Unauthorized
```

## ✅ Final Verification

بعد انتهاء كل الاختبارات:

- [ ] جميع الـ GET endpoints تجلب البيانات بنجاح
- [ ] جميع الـ Components تستخدم الـ APIs (ليس hardcoded)
- [ ] Admin يستطيع إضافة/تحديث/حذف البيانات
- [ ] البيانات تظهر على الـ Homepage بعد الحفظ من Admin
- [ ] عدم وجود errors في الـ browser console
- [ ] عدم وجود errors في الـ server logs
- [ ] جميع التحقق من الصحة (validation) تعمل

## 🚨 لو حصلت مشاكل:

### البيانات ما بتظهر:
1. اذهب إلى `/api/seed` مرة أخرى
2. تحقق من Network tab في DevTools
3. شوف response من الـ API

### Errors في الـ Console:
1. افتح DevTools (F12)
2. اذهب إلى Console tab
3. لاحظ الأخطاء وقارنها مع الـ API logs

### Admin لا يعمل:
1. تأكد من بيانات الـ Login
2. تحقق من الـ Network request
3. شوف الـ error message بتقول إيه

---

**لما تنتهي من كل الاختبارات، الـ APIs بتكون جاهزة للـ Production! 🎉**
