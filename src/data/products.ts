import { Product, ShippingZone, Review } from '@/types';

export const OFFICIAL_PRICING = {
  originalPrice: 300,
  salePrice: 150,
  discountPercentage: 50,
  currency: 'EGP',
  volume: '150 ML'
} as const;

export const LIP_GLOSS_PRICING = {
  originalPrice: 100,
  salePrice: 50,
  discountPercentage: 50,
  currency: 'EGP',
  volume: '10 ML'
} as const;

export const PRODUCTS: Product[] = [
  // ==========================================
  // WOMEN'S COLLECTION: BODY SPLASH (3 PRODUCTS)
  // ==========================================
  {
    id: 'vanilla',
    slug: 'vanilla',
    nameEn: 'Vanilla',
    nameAr: 'فانيليا',
    category: 'feminine',
    subCategory: 'body-splash',
    taglineEn: 'A Sweet Touch of Vanilla',
    taglineAr: 'لمسة دافئة وحلوة من الفانيليا الفاخرة',
    familyEn: 'Warm & Sweet Gourmand',
    familyAr: 'فانيليا دافئة وحلوة',
    price: OFFICIAL_PRICING.salePrice,
    originalPrice: OFFICIAL_PRICING.originalPrice,
    volume: '150 ML',
    image: '/assets/products/vanilla_studio.jpg',
    bottleImage: '/assets/products/vanilla_studio.jpg',
    accentColor: '#D19C4C',
    isBestseller: true,
    storyEn: 'A luxurious gourmand fragrance blending warm rich vanilla, creamy coconut milk, velvety musk, and a tender touch of fresh jasmine. It wraps your body in an indulgent, comforting aura that is both sensual and effortlessly sophisticated.',
    storyAr: 'توليفة عطرية فاخرة تجمع بين دفء الفانيليا الغنية، وحليب جوز الهند المخملي، والمسك الناعم مع لمسة رقيقة من زهور الياسمين. يغمرك بهالة دافئة ومريحة تجمع بين النعومة والجاذبية الراقية.',
    inspirationEn: 'Luxury blend of vanilla, coconut milk, musk, and jasmine accords.',
    inspirationAr: 'توليفة فاخرة من الفانيليا، حليب جوز الهند، نفحات المسك والياسمين العطرية.',
    notes: {
      topEn: 'Creamy Coconut Milk',
      topAr: 'حليب جوز الهند المخملي',
      heartEn: 'Delicate Jasmine Bloom',
      heartAr: 'عبير الياسمين النقي',
      baseEn: 'Warm Vanilla & Soft Musk',
      baseAr: 'فانيليا دافئة ومسك ناعم'
    },
    profile: { sweetness: 95, freshness: 65, warmth: 90, floral: 60, woody: 30 },
    lifestyleQuoteEn: 'A sweet touch of vanilla for moments of understated luxury.',
    lifestyleQuoteAr: 'لمسة دافئة من الفانيليا للحظات مفعمة بالدفء والفخامة.',
    featuresEn: [
      'Luxury blend of vanilla, coconut milk, musk and jasmine.',
      'Lightweight, refreshing mist that leaves skin delicately scented all day.',
      'Generous 150 ml bottle crafted for everyday luxury and self-care.'
    ],
    featuresAr: [
      'مزيج فاخر من الفانيليا وحليب جوز الهند والمسك وزهور الياسمين.',
      'رذاذ خفيف وغير لزج يمنح الجسم انتعاشاً يدوم لساعات طويلة.',
      'حجم 150 مل مثالي للاستخدام اليومي الواسع بعد الاستحمام.'
    ],
    whyBuyEn: 'Vanilla is the ultimate signature for lovers of warm, inviting scents. It provides an irresistible comforting scent bubble that garners compliments while remaining softly elegant throughout the day.',
    whyBuyAr: 'عطر فانيليا هو خيارك الأكمل إذا كنتِ تعشقين الروائح الدافئة والناعمة؛ يمنحك هالة جذابة مريحة للأعصاب وتجلب الإطراء دون أن تكون نفاذة أو مفرطة.',
    usageEn: 'Spray generously all over your body, pulse points, and hair after showering or anytime you desire an uplifting boost of sweet vanilla warmth.',
    usageAr: 'رشي بسخاء على الجسم ومناطق النبض والشعر بعد الاستحمام مباشرة أو كلما احتجتِ إلى لمسة منعشة من حلاوة الفانيليا.'
  },
  {
    id: 'the-warm-night',
    slug: 'the-warm-night',
    nameEn: 'The Warm Night',
    nameAr: 'ذا وورم نايت',
    category: 'feminine',
    subCategory: 'body-splash',
    taglineEn: 'Sultry, Captivating & Unforgettable',
    taglineAr: 'سحر ليلي جذاب ولا يُنسى',
    familyEn: 'Sensual Floral & Deep Berry',
    familyAr: 'زهري شرقي وتوت بري دافئ',
    price: OFFICIAL_PRICING.salePrice,
    originalPrice: OFFICIAL_PRICING.originalPrice,
    volume: '150 ML',
    image: '/assets/products/the_warm_night.png',
    bottleImage: '/assets/products/the_warm_night.png',
    accentColor: '#C25E26',
    isBestseller: true,
    storyEn: 'An alluring and mysterious fragrance crafted for unforgettable evenings. The Warm Night combines the juicy sweetness of black raspberry with the romantic depth of Turkish rose, night-blooming jasmine, and earthy patchouli for a bold, magnetic presence.',
    storyAr: 'عطر غامض وساحر صُمم للأمسيات المميزة والمناسبات الخاصة. يمزج ذا وورم نايت بين انتعاش التوت الأسود البري وعمق الورد التركي الملكي مع رقة الياسمين وفخامة الباتشولي ليمنحك حضوراً واثقاً وجاذبية ساحرة.',
    inspirationEn: 'Luxury blend of black raspberry, Turkish rose, jasmine & patchouli.',
    inspirationAr: 'توليفة فاخرة من التوت الأسود، الورد التركي، الياسمين والباتشولي الأصيل.',
    notes: {
      topEn: 'Juicy Black Raspberry',
      topAr: 'توت أسود بري عصيري',
      heartEn: 'Turkish Rose & Jasmine',
      heartAr: 'ورد تركي ملكي وياسمين',
      baseEn: 'Rich Patchouli & Amber',
      baseAr: 'باتشولي دافئ وعنبر فاخر'
    },
    profile: { sweetness: 80, freshness: 60, warmth: 95, floral: 90, woody: 65 },
    lifestyleQuoteEn: 'For nights when your presence speaks before words.',
    lifestyleQuoteAr: 'لأمسيات تفيض بالسحر وتجعل حضوركِ بصمة لا تُنسى.',
    featuresEn: [
      'Luxury blend of black raspberry, Turkish rose, jasmine, and patchouli.',
      'Deep, romantic projection designed specifically for captivating evening wear.',
      '150 ml bottle ensuring long-lasting fragrant indulgence.'
    ],
    featuresAr: [
      'توليفة حصرية من التوت الأسود، الورد التركي، الياسمين، والباتشولي.',
      'فوحان وثبات متميز صُمم خصيصاً ليرافقكِ في أرقى السهرات.',
      'حجم 150 مل يوفر أناقة عطرية مستمرة وأثراً جذاباً.'
    ],
    whyBuyEn: 'Step into the night with magnetic allure. The Warm Night is crafted for the woman who desires a sophisticated, sultry scent trail that turns heads and lingers effortlessly.',
    whyBuyAr: 'تألقي بهالة من الجاذبية والغموض الملكي. "ذا وورم نايت" صُمم للمرأة التي تبحث عن عطر مسائي فخم ومثير يترك انطباعاً ساحراً لا يُمحى.',
    usageEn: 'Mist across neck, wrists, décolletage, and evening outfits before heading out to create an enchanting scent trail.',
    usageAr: 'رشي على الرقبة والمعصمين والملابس قبل الخروج لضمان فوحان مسائي ساحر يدوم طوال الأمسية.'
  },
  {
    id: 'strawberry-cheesecake',
    slug: 'strawberry-cheesecake',
    nameEn: 'Strawberry Cheesecake',
    nameAr: 'ستروبيري تشيزكيك',
    category: 'feminine',
    subCategory: 'body-splash',
    taglineEn: 'Sweet Strawberry Bliss with Shimmering Glow',
    taglineAr: 'حلاوة الفراولة اللذيذة مع بريق لؤلؤي متلألئ',
    familyEn: 'Playful Fruity Gourmand & Shimmer',
    familyAr: 'فواكه سكرية وحلوى كريمية لامعة',
    price: OFFICIAL_PRICING.salePrice,
    originalPrice: OFFICIAL_PRICING.originalPrice,
    volume: '150 ML',
    image: '/assets/products/strawberry_cheesecake.png',
    bottleImage: '/assets/products/strawberry_cheesecake.png',
    accentColor: '#D84B78',
    isBestseller: true,
    storyEn: 'A deliciously sweet and joyful gourmand delight. Strawberry Cheesecake captures the mouth-watering harmony of sun-ripened fresh strawberries, fluffy whipped vanilla, and a creamy cheesecake accord, enhanced by an ethereal pearlescent body shimmer.',
    storyAr: 'عطر مبهج ولذيذ يفيض بالحيوية والمرح. يجسد تناغماً ساحراً بين الفراولة الطازجة الناضجة، والفانيليا المخفوقة، ونفحات التشيزكيك الكريمية الغنية مع جزيئات لؤلؤية براقة تمنح بشرتك إشراقة وتوهجاً ناعماً.',
    inspirationEn: 'Luxury blend of fresh strawberry, vanilla, and cheesecake accord.',
    inspirationAr: 'توليفة فاخرة من الفراولة الطازجة، الفانيليا، ولمسة التشيزكيك الكريمية.',
    notes: {
      topEn: 'Sun-Ripened Fresh Strawberry',
      topAr: 'فراولة طازجة يانعة',
      heartEn: 'Creamy Cheesecake Accord',
      heartAr: 'توليفة تشيزكيك غنية ومخملية',
      baseEn: 'Whipped Vanilla & Sugar Glaze',
      baseAr: 'فانيليا مخفوقة وسكر كراميلي'
    },
    profile: { sweetness: 98, freshness: 85, warmth: 75, floral: 50, woody: 20 },
    lifestyleQuoteEn: 'A mouth-watering sweet indulgence that brightens your everyday vibe.',
    lifestyleQuoteAr: 'بهجة سكرية وبريق متوهج يضفي الحيوية على كل يوم.',
    featuresEn: [
      'Luxury blend of fresh strawberry, sweet vanilla, and cheesecake accord.',
      'Shimmering pearlescent formula that adds a subtle, luminous glow to skin.',
      '150 ml bottle for sweet, cheerful everyday indulgence.'
    ],
    featuresAr: [
      'مزيج فريد من الفراولة الطبيعية والفانيليا ونفحات التشيزكيك الشهية.',
      'تركيبة لؤلؤية بلمعة ناعمة تعطي البشرة بريقاً متألقاً ونضارة فورية.',
      'حجم 150 مل لإضفاء المرح والانتعاش السكري في كل وقت.'
    ],
    whyBuyEn: 'A delicious mood-booster in a bottle! Packed with luscious strawberry sweetness and a radiant body shimmer, it is the fun, playful fragrance that guarantees compliments all day long.',
    whyBuyAr: 'جرعة من السعادة والأنوثة المرحة! إذا كنتِ تحبين العطور الحلوة واللذيذة التي تلفت الأنظار وتمنح بشرتك لمعة جذابة لا تقاوم، فهذا العطر هو رفيقك المفضل.',
    usageEn: 'Shake bottle gently to disperse the pearl shimmer, then spritz onto shoulders, collarbones, and body for a luminous, delicious finish.',
    usageAr: 'رجي العبوة برفق لتوزيع اللمعة اللؤلؤية، ثم رشي على الكتفين والصدر والجسم لإطلالة مشعة وعبير سكري رائع.'
  },

  // ==========================================
  // WOMEN'S COLLECTION: LIP GLOSS (2 PRODUCTS)
  // ==========================================
  {
    id: 'lipgloss-nude',
    slug: 'lipgloss-nude',
    nameEn: 'Lip Gloss - Nude',
    nameAr: 'ملمع شفاه - نيود',
    category: 'feminine',
    subCategory: 'lip-gloss',
    taglineEn: 'Effortless Everyday Nude Shine',
    taglineAr: 'لمعان نيود طبيعي وراقي لإطلالة يومية جذابة',
    familyEn: 'High-Shine Warm Nude Glaze',
    familyAr: 'ملمع شفاه نيود دافئ فائق اللمعان',
    price: LIP_GLOSS_PRICING.salePrice,
    originalPrice: LIP_GLOSS_PRICING.originalPrice,
    volume: '10 ML',
    image: '/assets/products/lipgloss_nude.png',
    bottleImage: '/assets/products/lipgloss_nude.png',
    accentColor: '#A9684C',
    isBestseller: true,
    storyEn: 'A timeless, warm caramel-nude lip gloss designed for high-shine sophistication. Formulated with a silky, non-sticky glaze, it cushions lips in luxurious moisture while delivering a glass-like finish that enhances natural lip volume.',
    storyAr: 'ملمع شفاه كلاسيكي بدرجة النيود الكراميلي الدافئ المصمم ليمنحك شفايف ممتلئة ولمعاناً زجاجياً فائق النعومة. يتميز بتركيبة مرطبة غير لزجة تمنح الشفاه تغطية انسيابية وإشراقة طبيعية تدوم لساعات.',
    inspirationEn: 'Silky caramel glazes, universal nude undertones, and plush lip hydration.',
    inspirationAr: 'درجات النيود الكراميلية الدافئة، ولمعان الزجاج الراقي، والعناية المرطبة.',
    notes: {
      topEn: 'Warm Caramel Glaze',
      topAr: 'بريق الكراميل الدافئ',
      heartEn: 'Silky Non-Sticky Texture',
      heartAr: 'ملمس حريري غير لزج',
      baseEn: 'Deep Nourishing Hydration',
      baseAr: 'ترطيب وحماية عميقة'
    },
    profile: { sweetness: 85, freshness: 70, warmth: 90, floral: 30, woody: 20 },
    lifestyleQuoteEn: 'The perfect nude glow that elevates every makeup look.',
    lifestyleQuoteAr: 'لمسة نيود متألقة تمنح شفتيكِ جاذبية وأناقة طبيعية.',
    featuresEn: [
      'Universal warm nude shade carefully balanced for every skin tone.',
      'Brilliant high-shine reflective finish with zero stickiness or heaviness.',
      'Moisturizing formula that cushions and visibly smooths lip lines.'
    ],
    featuresAr: [
      'درجة نيود دافئة ومثالية تتناغم بانسجام مع كافة ألوان البشرة.',
      'لمعان زجاجي فائق الانعكاس بدون أي إحساس بالالتصاق أو الثقل.',
      'تركيبة مرطبة تحمي الشفاه من الجفاف وتمنحها مظهراً صحياً وممتلئاً.'
    ],
    whyBuyEn: 'The ultimate daily essential for your purse. Wear it bare for a healthy natural sheen or layer over lip liner for full, juicy dimension that lasts through the day.',
    whyBuyAr: 'المنتج الأساسي الذي لا غنى عنه في حقيبتك اليومية؛ يمنحك شفايف جذابة وممتلئة بلمعان راقٍ يناسب الصباح والمساء.',
    usageEn: 'Glide the soft wand applicator smoothly across clean lips. Reapply throughout the day for ongoing hydration and lustrous shine.',
    usageAr: 'مرري أداة التطبيق الناعمة على الشفاه النظيفة من المنتصف باتجاه الزوايا، وكرري الاستخدام عند الرغبة في ترطيب ولمعان إضافي.'
  },
  {
    id: 'lipgloss-rose',
    slug: 'lipgloss-rose',
    nameEn: 'Lip Gloss - Rose',
    nameAr: 'ملمع شفاه - روز',
    category: 'feminine',
    subCategory: 'lip-gloss',
    taglineEn: 'Fresh, Dewy Petal Pink Luster',
    taglineAr: 'بريق الورد المنعش لإشراقة أنثوية ساحرة',
    familyEn: 'Luminous Romantic Pink Glaze',
    familyAr: 'ملمع شفاه روز زهري متوهج بالأنوثة',
    price: LIP_GLOSS_PRICING.salePrice,
    originalPrice: LIP_GLOSS_PRICING.originalPrice,
    volume: '10 ML',
    image: '/assets/products/lipgloss_rose.png',
    bottleImage: '/assets/products/lipgloss_rose.png',
    accentColor: '#C86378',
    isBestseller: true,
    storyEn: 'A delicate petal-pink lip gloss that brings a youthful, healthy flush of color and glass-like glow to your smile. Crafted with a lightweight, moisturizing texture, it wraps lips in comfortable softness with an irresistible romantic sheen.',
    storyAr: 'ملمع شفاه ناعم بلون الورد الزهري الطبيعي يمنح شفتيكِ تورداً جذاباً ونضارة وحيوية لا تقاوم. يتميز بلمعان ندي ناعم وملمس خفيف يعتني بالشفاه ويغمرها برونق مفعم بالرقة والرومانسية.',
    inspirationEn: 'Fresh blooming pink roses, glistening dewy petals, and sheer romantic glow.',
    inspirationAr: 'بتلات الورد الوردي النضرة، ندى الصباح المتلألئ، والأنوثة الرقيقة.',
    notes: {
      topEn: 'Fresh Rose Petal Tint',
      topAr: 'تورد بتلات الورد النضرة',
      heartEn: 'Luminous Glass-Like Shine',
      heartAr: 'لمعان زجاجي ندي فائق',
      baseEn: 'Moisture-Locking Softness',
      baseAr: 'نعومة وترطيب فائق'
    },
    profile: { sweetness: 80, freshness: 90, warmth: 70, floral: 85, woody: 15 },
    lifestyleQuoteEn: 'A kiss of rose luster for fresh, captivating lips.',
    lifestyleQuoteAr: 'قبلة من رقة الورد تمنح ابتسامتكِ إشراقة ساحرة.',
    featuresEn: [
      'Romantic rose-pink tint that awakens and brightens your complexion.',
      'Ultra-glossy mirror finish with a silky, hydrating, weightless feel.',
      'Deeply nourishing texture that leaves lips touchably soft and pillowy.'
    ],
    featuresAr: [
      'لون وردي نضر يمنح الشفاه إشراقة فورية ومظهراً ممتلئاً ومشرقاً.',
      'لمعان مائي زجاجي فائق النعومة وخفيف تماماً على الشفاه.',
      'عناية وترطيب فائق ينعم ملمس الشفاه ويحافظ على طراوتها طوال اليوم.'
    ],
    whyBuyEn: 'Experience effortless beauty with a single stroke. Rose delivers that coveted "freshly bitten" pink glow with a mirror-shine gloss that complements every occasion.',
    whyBuyAr: 'امنحي شفتيكِ تورد الورد الطبيعي وإشراقة لا تُقاوم. روز هو خيارك الأنسب لإطلالة رومانسية نضرة ومفعمة بالحيوية في كل وقت.',
    usageEn: 'Apply directly onto lips using the cushioned doe-foot applicator for a soft, radiant, glass-like shine.',
    usageAr: 'ضعي طبقة متساوية على الشفاه باستخدام أداة التطبيق للحصول على مظهر مائي لامع وناعم.'
  },

  // ==========================================
  // MEN'S COLLECTION (3 PRODUCTS)
  // ==========================================
  {
    id: 'grey-musk',
    slug: 'grey-musk',
    nameEn: 'Grey Musk',
    nameAr: 'جراي مسك',
    category: 'masculine',
    subCategory: 'body-splash',
    taglineEn: 'A Clean & Refined Musk Scent',
    taglineAr: 'لمسة نقية وفاخرة من المسك الراقي',
    familyEn: 'Clean Musky & Polished Woods',
    familyAr: 'مسك نقي وأخشاب مصقولة وأنيقة',
    price: OFFICIAL_PRICING.salePrice,
    originalPrice: OFFICIAL_PRICING.originalPrice,
    volume: OFFICIAL_PRICING.volume,
    image: '/assets/products/grey_musk.png',
    bottleImage: '/assets/products/grey_musk.png',
    accentColor: '#6E757C',
    isBestseller: false,
    storyEn: 'A clean, refined musk-inspired masculine fragrance with modern poise. Grey Musk balances crisp clarity with smooth, understated depth for effortless daily distinction.',
    storyAr: 'عطر رجالي راقٍ ونقي مستوحى من نفحات المسك الحديثة. يمنحك جراي مسك توازناً استثنائياً بين الانتعاش والعمق الهادئ لتميز واثق في كل يوم.',
    inspirationEn: 'Titanium elegance, polished clean musk, and cool architectural stillness.',
    inspirationAr: 'صلابة التيتانيوم الأنيقة، نقاء المسك الأبيض المصقول، والهدوء العصري الواثق.',
    notes: {
      topEn: 'Crisp Titanium Air',
      topAr: 'نسيم معدني بارد',
      heartEn: 'Refined White Musk',
      heartAr: 'مسك أبيض نقي',
      baseEn: 'Polished Clean Cedar',
      baseAr: 'خشب أرز مصقول ونظيف'
    },
    profile: { sweetness: 30, freshness: 85, warmth: 60, floral: 20, woody: 80 },
    lifestyleQuoteEn: 'Clean, modern, and quietly commanding.',
    lifestyleQuoteAr: 'نقاء عصري وحضور هادئ يعبر عن الثقة المطلقة.',
    featuresEn: [
      'Refined blend of crisp titanium air, white musk, and cedarwood.',
      'Crisp, clean masculine aroma tailored for professional daily wear.',
      '150 ml bottle designed for long-lasting confidence.'
    ],
    featuresAr: [
      'مزيج راقٍ من النسيم المعدني والمسك الأبيض وأخشاب الأرز.',
      'عبير نقي وواثق يناسب بيئة العمل والإطلالات اليومية الأنيقة.',
      'حجم 150 مل يمنحك ثقة وانتعاشاً يدوم طوال اليوم.'
    ],
    whyBuyEn: 'A masterclass in understated masculine luxury. Clean, contemporary, and magnetic without shouting.',
    whyBuyAr: 'عنوان الأناقة الهادئة للرجل العصري؛ يمنحك نظافة وانتعاشاً مميزاً يعكس ثقتك بنفسك.',
    usageEn: 'Spray onto chest, neck, and clothes after grooming.',
    usageAr: 'رشه على الصدر والرقبة والملابس بعد الاستحمام.'
  },
  {
    id: 'navy-aqua',
    slug: 'navy-aqua',
    nameEn: 'Navy Aqua',
    nameAr: 'نافي أكوا',
    category: 'masculine',
    subCategory: 'body-splash',
    taglineEn: 'A Fresh & Modern Oceanic Scent',
    taglineAr: 'انتعاش بحري عصري وجريء للرجال',
    familyEn: 'Fresh Aquatic & Marine Woods',
    familyAr: 'انتعاش بحري وأخشاب ساحلية عصرية',
    price: OFFICIAL_PRICING.salePrice,
    originalPrice: OFFICIAL_PRICING.originalPrice,
    volume: OFFICIAL_PRICING.volume,
    image: '/assets/products/navy_aqua.png',
    bottleImage: '/assets/products/navy_aqua.png',
    accentColor: '#1B3252',
    isBestseller: true,
    storyEn: 'A fresh aquatic-inspired masculine fragrance identity designed for vital energy. Navy Aqua captures crisp ocean breezes and deep maritime tones for confident everyday freshness.',
    storyAr: 'عطر رجالي منعش ومفعم بالحيوية مستوحى من طاقة البحر وعمقه. يمنحك نافي أكوا نسيم المحيط البارد مع أخشاب ساحلية أنيقة تعبر عن الأناقة والانطلاق.',
    inspirationEn: 'Deep navy ocean waves, salty fresh spray, and maritime midnight breeze.',
    inspirationAr: 'أمواج المحيط الكحلي العميق، رذاذ البحر المنعش، ونسيم المساء البحري البارد.',
    notes: {
      topEn: 'Crisp Marine Spray',
      topAr: 'رذاذ بحري منعش',
      heartEn: 'Coastal Blue Aromatics',
      heartAr: 'أعشاب ساحلية عطرية',
      baseEn: 'Deep Oceanic Woods',
      baseAr: 'أخشاب بحرية عميقة'
    },
    profile: { sweetness: 25, freshness: 95, warmth: 50, floral: 20, woody: 75 },
    lifestyleQuoteEn: 'Fresh, vibrant, and unmistakably masculine.',
    lifestyleQuoteAr: 'انتعاش واثق وأناقة بحرية تدوم طوال اليوم.',
    featuresEn: [
      'Invigorating marine spray with coastal aromatics and deep ocean woods.',
      'Energizing, vibrant scent profile perfect for workouts and active days.',
      '150 ml bottle for generous refreshing all day long.'
    ],
    featuresAr: [
      'انتعاش بحري نابض بالحيوية مع نفحات أروماتية وأخشاب المحيط العميقة.',
      'عطر حيوي ومحفز للنشاط يناسب فترات الصباح والرياضة وأيام العمل الطويلة.',
      'حجم 150 مل يضمن انتعاشاً بحرياً سخياً طوال اليوم.'
    ],
    whyBuyEn: 'Command every room with the invigorating power of the deep ocean. Crisp, energetic, and undeniably handsome.',
    whyBuyAr: 'انتعاش المحيط في زجاجة؛ يمنحك طاقة لا نهائية وحضوراً رياضياً واثقاً لا يمر دون ملاحظة.',
    usageEn: 'Mist generously across torso, neck, and pulse points.',
    usageAr: 'رشه بسخاء على الجذع والرقبة ومناطق النبض.'
  },
  {
    id: 'oud-noir',
    slug: 'oud-noir',
    nameEn: 'Oud Noir',
    nameAr: 'عود نوار',
    category: 'masculine',
    subCategory: 'body-splash',
    taglineEn: 'A Refined Oud Fragrance for Men',
    taglineAr: 'فخامة العود الداكن للرجال',
    familyEn: 'Deep Smoky Oud & Rich Woods',
    familyAr: 'عود داكن فاخر وأخشاب شرقية مهيبة',
    price: OFFICIAL_PRICING.salePrice,
    originalPrice: OFFICIAL_PRICING.originalPrice,
    volume: OFFICIAL_PRICING.volume,
    image: '/assets/products/oud_noir.png',
    bottleImage: '/assets/products/oud_noir.png',
    accentColor: '#20140D',
    isBestseller: true,
    storyEn: 'A deep, sophisticated oud-inspired masculine fragrance that commands quiet authority. Oud Noir blends intense agarwood nuances with polished dark woods for an aura of regal distinction.',
    storyAr: 'عطر رجالي فخم ومهيب مستوحى من العود الداكن الأصيل. يمنحك عود نوار حضوراً استثنائياً يجمع بين عمق الأخشاب الثمينة وجاذبية الرجل الواثق.',
    inspirationEn: 'Aged agarwood embers, obsidian leather, and deep evening cedar.',
    inspirationAr: 'خشب العود العتيق، نفحات الجلد الداكن، وعمق الأخشاب الليلية الفاخرة.',
    notes: {
      topEn: 'Smoked Bergamot Spice',
      topAr: 'برغموت وتوابل دافئة',
      heartEn: 'Aged Agarwood Embers',
      heartAr: 'جمر العود العتيق الفاخر',
      baseEn: 'Dark Obsidian Woods',
      baseAr: 'أخشاب داكنة مهيبة'
    },
    profile: { sweetness: 35, freshness: 45, warmth: 95, floral: 15, woody: 95 },
    lifestyleQuoteEn: 'An aura of power, depth, and refined authority.',
    lifestyleQuoteAr: 'هيبة ملكية وحضور يفيض بالفخامة والغموض الواثق.',
    featuresEn: [
      'Noble blend of aged agarwood, smoked spices, and obsidian woods.',
      'Potent, commanding evening projection with unmatched longevity.',
      '150 ml bottle crafted for royal masculine distinction.'
    ],
    featuresAr: [
      'توليفة ملكية من العود العتيق والتوابل المدخنة والأخشاب الداكنة.',
      'ثبات مهيب وفوحان قوي يلائم الأمسيات والمناسبات الكبرى.',
      'حجم 150 مل يجسد أرقى معايير الفخامة الشرقية.'
    ],
    whyBuyEn: 'When you need to make a definitive statement. Rich, regal, and unforgettable—the ultimate luxury oud for the modern gentleman.',
    whyBuyAr: 'حضور مهيب يسبق خطواتك. عود نوار هو العطر المثالي للمناسبات التي تتطلب فخامة وهيبة لا تضاهى.',
    usageEn: 'Spray onto pulse points, suit lapels, or evening attire.',
    usageAr: 'رشه على نقاط النبض وياقة الثوب أو البدلة لحضور استثنائي.'
  }
];

export const SHIPPING_ZONES: ShippingZone[] = [
  { id: 'cairo', nameEn: 'Cairo', nameAr: 'القاهرة', fee: 45 },
  { id: 'giza', nameEn: 'Giza', nameAr: 'الجيزة', fee: 45 },
  { id: 'alexandria', nameEn: 'Alexandria', nameAr: 'الإسكندرية', fee: 55 },
  { id: 'qalyubia', nameEn: 'Qalyubia', nameAr: 'القليوبية', fee: 50 },
  { id: 'dakahlia', nameEn: 'Dakahlia', nameAr: 'الدقهلية', fee: 60 },
  { id: 'sharqia', nameEn: 'Sharqia', nameAr: 'الشرقية', fee: 60 },
  { id: 'gharbia', nameEn: 'Gharbia', nameAr: 'الغربية', fee: 60 },
  { id: 'monufia', nameEn: 'Monufia', nameAr: 'المنوفية', fee: 60 },
  { id: 'beheira', nameEn: 'Beheira', nameAr: 'البحيرة', fee: 60 },
  { id: 'kafr_el_sheikh', nameEn: 'Kafr El Sheikh', nameAr: 'كفر الشيخ', fee: 60 },
  { id: 'damietta', nameEn: 'Damietta', nameAr: 'دمياط', fee: 60 },
  { id: 'port_said', nameEn: 'Port Said', nameAr: 'بورسعيد', fee: 60 },
  { id: 'ismailia', nameEn: 'Ismailia', nameAr: 'الإسماعيلية', fee: 60 },
  { id: 'suez', nameEn: 'Suez', nameAr: 'السويس', fee: 60 },
  { id: 'fayoum', nameEn: 'Fayoum', nameAr: 'الفيوم', fee: 65 },
  { id: 'beni_suef', nameEn: 'Beni Suef', nameAr: 'بني سويف', fee: 65 },
  { id: 'minya', nameEn: 'Minya', nameAr: 'المنيا', fee: 70 },
  { id: 'asyut', nameEn: 'Asyut', nameAr: 'أسيوط', fee: 70 },
  { id: 'sohag', nameEn: 'Sohag', nameAr: 'سوهاج', fee: 75 },
  { id: 'qena', nameEn: 'Qena', nameAr: 'قنا', fee: 75 },
  { id: 'luxor', nameEn: 'Luxor', nameAr: 'الأقصر', fee: 80 },
  { id: 'aswan', nameEn: 'Aswan', nameAr: 'أسوان', fee: 85 },
  { id: 'red_sea', nameEn: 'Red Sea (Hurghada / Gouna)', nameAr: 'البحر الأحمر (الغردقة والجونة)', fee: 85 },
  { id: 'matrouh', nameEn: 'Matrouh / North Coast', nameAr: 'مطروح والساحل الشمالي', fee: 85 },
  { id: 'south_sinai', nameEn: 'South Sinai (Sharm El Sheikh)', nameAr: 'جنوب سيناء (شرم الشيخ)', fee: 90 },
  { id: 'north_sinai', nameEn: 'North Sinai', nameAr: 'شمال سيناء', fee: 90 },
  { id: 'new_valley', nameEn: 'New Valley', nameAr: 'الوادي الجديد', fee: 95 }
];

export const INITIAL_REVIEWS: Review[] = [];
