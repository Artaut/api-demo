const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://frontend-demo-3bo9kgtvw-neyzentefik-7239s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // curl / Postman gibi

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS tarafından engellendi: " + origin));
      }
    },
  })
);

// 🔮 22 Büyük Arkana – Genel / Aşk / Kariyer + Görsel
const tarotDeck = [
  {
    id: 0,
    name: "Deli",
    meaning:
      "Yeni başlangıçlar, bilinmeyene atılan cesur adım, saf enerji ve özgürlük.",
    loveMeaning:
      "Plansız ama heyecanlı başlangıçlar, ani aşklar. Dikkatsizlikten doğan karmaşalara da dikkat.",
    careerMeaning:
      "Yeni projeler, girişimcilik ruhu, risk alma. Hesapsız adımlardan önce temelini sağlamlaştır.",
    image: "deli.jpg",
  },
  {
    id: 1,
    name: "Büyücü",
    meaning:
      "İrade gücü, odaklanma ve ‘elden gelenin en iyisini yapma’ enerjisi. Elindeki kaynakların farkına var.",
    loveMeaning:
      "İlişkide iletişim ve çekim gücü artar. Sözlerin etkisi yüksek; manipülasyondan kaçınmak önemli.",
    careerMeaning:
      "Becerilerini sergileme, sunumlar, ikna gücü ve yeni başlangıçlar için çok uygun bir zaman.",
    image: "buyucu-karti.jpg",
  },
  {
    id: 2,
    name: "Azize",
    meaning:
      "Sezgi, içsel bilgelik, bilinçaltı. Görünmeyeni hissetme ve susarak anlama enerjisi.",
    loveMeaning:
      "İlişkide söylenmeyen duygular, gizli hayranlıklar veya içsel çekim. Kalbini dinlemek önemli.",
    careerMeaning:
      "Perde arkasında yürüyen işler, ince sezgi gerektiren kararlar. Acele etmeden sakince gözlem yap.",
    image: "azize-karti.jpg",
  },
  {
    id: 3,
    name: "İmparatoriçe",
    meaning:
      "Bereket, üretkenlik, doğurganlık ve yaratıcı enerji. Konfor ve güzellik arayışı.",
    loveMeaning:
      "Şefkatli, besleyici bir ilişki. Aile kurma, ilişkide derinleşme isteği.",
    careerMeaning:
      "Yaratıcı projeler, tasarım, sanat veya insanlara değer katan işler için çok verimli bir dönem.",
    image: "imparatorice-karti.jpg",
  },
  {
    id: 4,
    name: "İmparator",
    meaning:
      "Otorite, yapı, düzen ve kontrol. Sınır koyma ve sorumluluk alma zamanı.",
    loveMeaning:
      "İlişkide ciddiyet, koruyucu ama zaman zaman katı bir enerji. Güç dengesine dikkat etmek gerek.",
    careerMeaning:
      "Yönetim, liderlik, strateji. Kurallarla ilerleyen kurumlar ve uzun vadeli planlar için güçlü bir kart.",
    image: "imparator-karti.jpg",
  },
  {
    id: 5,
    name: "Aziz",
    meaning:
      "Gelenekler, öğretiler, manevi rehberlik. Kurallara bağlı kalma veya bir öğretmenden destek alma.",
    loveMeaning:
      "Geleneksel ilişki modelleri, aile onayı, evlilik teması. İlişkide resmiyet arayışı.",
    careerMeaning:
      "Eğitim, kurumlar, resmi yapılar. Sertifikalar, okullar veya büyük şirketler gündeme gelebilir.",
    image: "aziz-karti.jpg",
  },
  {
    id: 6,
    name: "Aşıklar",
    meaning:
      "Seçimler, ilişkiler ve kalpten gelen bağlar. Değerlerine uygun karar verme zamanı.",
    loveMeaning:
      "Güçlü çekim, ruh eşi hissi veya iki kişi / iki yol arasında seçim. Dürüstlük her şeyden önemli.",
    careerMeaning:
      "İki iş, iki yol veya ortaklık arasında tercih. Uzun vadede seni mutlu edecek olanı seçmelisin.",
    image: "asiklar-karti.jpg",
  },
  {
    id: 7,
    name: "Araba",
    meaning:
      "Kararlılık, irade gücü ve ileriye doğru hareket. Kontrol sende olduğu sürece başarı yakın.",
    loveMeaning:
      "İlişkide birlikte hedefe yürüme veya mesafe koyma. Denge ve karşılıklı anlayış gerekiyor.",
    careerMeaning:
      "Terfi, seyahat, taşınma veya işte yön değiştirme enerjisi. Direksiyonda sen varsın.",
    image: "araba-karti.jpg",
  },
  {
    id: 8,
    name: "Adalet",
    meaning:
      "Denge, dürüstlük, sonuç alma ve karmanın çalışması. Ne ektiysen onu biçersin.",
    loveMeaning:
      "İlişkide adalet, netlik ve açık konuşma zamanı. Resmi süreçler (evlilik/boşanma) gündeme gelebilir.",
    careerMeaning:
      "Sözleşmeler, hukuki konular, işte hak ediş. Dürüst ve adil davranmak uzun vadede kazandırır.",
    image: "adalet-karti.jpg",
  },
  {
    id: 9,
    name: "Ermiş",
    meaning:
      "İçe dönüş, yalnızlık ve kendi ışığını arama. Dış gürültüyü susturup iç sesini dinleme zamanı.",
    loveMeaning:
      "Yalnız kalma ihtiyacı, ilişkide mesafe veya kendi duygularını anlamak için geri çekilme.",
    careerMeaning:
      "Tek başına çalışma, araştırma, uzmanlaşma. Dış onaydan çok iç tatmine odaklanma dönemi.",
    image: "ermis-karti.jpg",
  },
  {
    id: 10,
    name: "Kader Çarkı",
    meaning:
      "Döngüler, ani yön değişiklikleri ve beklenmedik şanslar. Hayatın çarkı dönüyor.",
    loveMeaning:
      "İlişkide ani gelişmeler, sürpriz tanışmalar veya mevcut ilişkinin yön değiştirmesi.",
    careerMeaning:
      "Şanslı dönem, fırsatların karşına çıkması. Ancak çark döner; iyi zamanı iyi değerlendirmek önemli.",
    image: "kader-carki-karti.jpg",
  },
  {
    id: 11,
    name: "Güç",
    meaning:
      "İçsel güç, sabır, yumuşak bir kararlılık. Kaba kuvvetle değil, şefkatle yaklaşma zamanı.",
    loveMeaning:
      "İlişkide anlayış, sabır ve karşı tarafı sakinleştiren bir enerji. Kırmadan konuşmak önemli.",
    careerMeaning:
      "Zor koşullarda bile sakin kalabilme, kriz yönetimi ve dayanıklılık ön planda.",
    image: "guc-karti.jpg",
  },
  {
    id: 12,
    name: "Asılan Adam",
    meaning:
      "Bekleme, askıda kalma ve bakış açısı değiştirme. Zorunlu bir duraklama ama boşuna değil.",
    loveMeaning:
      "İlişkide belirsizlik, netleşmeyen durumlar veya fedakarlık hissi. ‘Ne için bekliyorum?’ sorusunu sormak gerek.",
    careerMeaning:
      "Projelerin yavaşlaması, askıya alınması. Farklı açıdan bakmak, yeni bir yol bulmak için fırsat.",
    image: "asilan-adam-karti.jpg",
  },
  {
    id: 13,
    name: "Ölüm",
    meaning:
      "Bir dönem kapanıyor, yenisi başlıyor. Biten şeyler aslında yer açmak için gider.",
    loveMeaning:
      "İlişkide köklü değişim, bitiş veya tamamen dönüşüm. Eski kalıpları bırakma zamanı.",
    careerMeaning:
      "İş, proje veya düzen değişebilir. Kapanan kapılar yeni kapılar için alan açıyor.",
    image: "olum-karti.jpg",
  },
  {
    id: 14,
    name: "Denge",
    meaning:
      "Uyum, sabır ve ortayı bulma. Aşırılıklardan uzak durma, her şeyi kararında tutma zamanı.",
    loveMeaning:
      "İlişkide uyum, karşılıklı denge arayışı. İki tarafın da adım atması gerekli.",
    careerMeaning:
      "İş–özel hayat dengesi, kaynakları iyi yönetme. Aşırı yüklenmek yerine akıllı planlama önemli.",
    image: "denge-karti.jpg",
  },
  {
    id: 15,
    name: "Şeytan",
    meaning:
      "Bağımlılıklar, takıntılar, zevk ile zarar arasında ince çizgi. Zincirleri fark etme zamanı.",
    loveMeaning:
      "Tutkulu ama sağlıksız bağlar, kıskançlık veya toksik ilişkiler. Sınır çizmek gerekebilir.",
    careerMeaning:
      "Aşırı çalışma, para hırsı veya bitmeyen stres. Ne uğruna neyi feda ettiğini sorgulama zamanı.",
    image: "seytan-karti.jpg",
  },
  {
    id: 16,
    name: "Kule",
    meaning:
      "Ani değişim, yıkım gibi görünen ama uzun vadede gerekli bir sarsıntı.",
    loveMeaning:
      "Beklenmedik tartışmalar, kopuşlar veya büyük yüzleşmeler. Gerçekler gizlenemez hale gelir.",
    careerMeaning:
      "İş veya maddi düzende ani değişiklikler. Eski yapı yıkılırken daha sağlıklı bir temel atma fırsatı doğar.",
    image: "kule-karti.jpg",
  },
  {
    id: 17,
    name: "Yıldız",
    meaning:
      "Umut, şifa ve ilham. Zor dönemlerin ardından gelen huzur ve içsel ışık.",
    loveMeaning:
      "İlişkide iyileşme, umutlanma, daha yumuşak ve sakin bir dönem. Yara alan kalp toparlanıyor.",
    careerMeaning:
      "İlham verici projeler, görünürlük ve destek alma. Umudunu kaybetmemek için güçlü bir işaret.",
    image: "yildiz-karti.jpg",
  },
  {
    id: 18,
    name: "Ay",
    meaning:
      "Bilinçaltı, sezgiler ve belirsizlik. Her şey göründüğü gibi olmayabilir.",
    loveMeaning:
      "İlişkide karmaşa, yanlış anlaşılmalar veya saklanan duygular. Kuruntu ile gerçeği ayırmak önemli.",
    careerMeaning:
      "İş hayatında belirsizlik, kulisler veya net olmayan bilgiler. Acele kararlar yerine gözlem ve sezgi ön planda.",
    image: "ay-karti.jpg",
  },
  {
    id: 19,
    name: "Güneş",
    meaning:
      "Başarı, berraklık, mutluluk ve netlik. Karanlık dönemlerin ardından gelen aydınlık.",
    loveMeaning:
      "İlişkide açıklık, sıcaklık ve karşılıklı mutluluk. Güzel bir dönem, keyifli paylaşımlar.",
    careerMeaning:
      "Projelerde başarı, görünürlük ve takdir. Emeklerinin karşılığını net şekilde alırsın.",
    image: "gunes-karti.jpg",
  },
  {
    id: 20,
    name: "Yargı",
    meaning:
      "Uyanış, farkındalık ve geçmişle yüzleşme. Eski kararların sonuçlarıyla karşılaşma zamanı.",
    loveMeaning:
      "İlişkide tekrar değerlendirme, barışma veya kesin karar alma. ‘Devam mı, tamam mı?’ sorusu gündemde.",
    careerMeaning:
      "Kariyerinde dönüm noktası, alan değiştirme veya büyük bir muhasebe. Geçmiş emeklerin sonucunu görme vakti.",
    image: "yargi.webp",
  },
  {
    id: 21,
    name: "Dünya",
    meaning:
      "Tamamlanma, bir döngünün kapanması ve ödüllendirilme. Emeklerin boşa gitmez.",
    loveMeaning:
      "İlişkide önemli bir dönemin tamamlanması; evlilik, birlikte taşınma ya da güzel bir kapanış.",
    careerMeaning:
      "Projelerin başarıyla sonuçlanması, mezuniyet, terfi veya uzun süredir beklenen bir hedefe ulaşma.",
    image: "dunya-karti.jpg",
  },
];

app.get("/", (req, res) => {
  res.send("API up");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 🔮 3 kartlık açılım: Geçmiş / Şimdi / Gelecek
app.get("/tarot/draw", (req, res) => {
  const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 3);

  res.json({
    cards: selected,
    count: selected.length,
  });
});

// 🔮 Aşk odaklı 3 kartlık açılım
app.get("/tarot/love-three", (req, res) => {
  // Aynı desteden 3 kart seçiyoruz; yorum tarafında özellikle loveMeaning kullanılabilir
  const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 3);

  res.json({
    type: "love-three",
    cards: selected,
    count: selected.length,
  });
});

// 🔮 Günün kartı: tek kart
app.get("/tarot/daily", (req, res) => {
  const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
  const card = shuffled[0];

  res.json({
    card,
  });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
