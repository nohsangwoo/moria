import Image from "next/image";
import { products, services, site, stories } from "@/lib/site";

const arrivalImages = [
  { src: "/images/motungi/arrival-1.webp", alt: "레드 에나멜 십자가 귀걸이와 흰 꽃" },
  { src: "/images/motungi/arrival-2.webp", alt: "테라코타 트레이 위 블루 십자가 목걸이" },
  { src: "/images/motungi/arrival-3.webp", alt: "레몬과 함께 놓인 골드 링과 십자가 참" },
  { src: "/images/motungi/arrival-4.webp", alt: "핑크 기도 팔찌와 십자가 참" },
];

const companyRows = [
  ["상호", site.legalName],
  ["대표자", site.owner],
  ["사업자등록번호", site.businessRegistration],
  ["개업연월일", site.openingDate],
  ["업태", site.businessType],
  ["종목", site.businessItem],
];

const faqs = [
  {
    question: "모퉁이는 어떤 브랜드인가요?",
    answer:
      "모퉁이는 아기돌풍이 운영하는 감각적인 굿즈 공식스토어로, 의미 있는 악세사리와 선물 오브제를 현대적인 톤으로 제안합니다.",
  },
  {
    question: "사업자 정보는 어디 기준인가요?",
    answer:
      "사업자등록증 기준 상호는 아기돌풍, 사업자등록번호는 435-50-01307, 업태는 도매 및 소매업, 종목은 해외직구대행업입니다.",
  },
  {
    question: "어떤 선물에 어울리나요?",
    answer:
      "세례, 입교, 생일, 감사 선물처럼 오래 기억하고 싶은 순간에 어울리는 차분한 크리스찬 악세사리와 패키지를 제안합니다.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "OnlineStore"],
    name: site.name,
    legalName: site.legalName,
    alternateName: ["모퉁이", "아기돌풍"],
    url: site.url,
    logo: `${site.url}${site.logo}`,
    image: `${site.url}${site.ogImage}`,
    description: site.description,
    foundingDate: site.openingDate,
    taxID: site.businessRegistration,
    email: site.email,
    knowsAbout: site.keywords,
    makesOffer: products.map((product) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: product.title,
        description: product.detail,
        image: `${site.url}${product.src}`,
        brand: {
          "@type": "Brand",
          name: site.name,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "KRW",
          price: product.price,
          availability: "https://schema.org/InStock",
          url: `${site.url}/#products`,
          seller: {
            "@type": "Organization",
            name: site.legalName,
          },
        },
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: site.name,
    url: site.url,
    logo: `${site.url}${site.logo}`,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="flex h-[35px] items-center justify-center bg-black text-[10px] font-semibold text-white">
        모던 크리스찬 악세사리 · 첫 컬렉션 준비 중
      </div>

      <section className="relative h-[clamp(520px,56vw,980px)] overflow-hidden bg-[#d8c5b4]">
        <Image
          src="/images/motungi/hero.webp"
          alt="모퉁이 모던 크리스찬 십자가 목걸이 히어로 이미지"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[48%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/25" />

        <div className="absolute bottom-[15%] left-1/2 z-10 w-full max-w-[1254px] -translate-x-1/2 px-5 text-white md:px-0">
          <p className="text-[15px] font-bold">새 컬렉션 출시</p>
          <h1 className="mt-2 max-w-[760px] text-[31px] font-extrabold leading-[1.05] md:text-[42px]">
            The Quiet Cross Series
          </h1>
          <p className="mt-4 max-w-[560px] text-[13px] font-semibold leading-6 text-white/90">
            십자가 목걸이, 기도 팔찌, 기독교 선물을 조용하고 현대적인 방식으로 제안하는 모퉁이의 첫 컬렉션입니다.
          </p>
          <a
            href="/collections"
            className="mt-7 inline-flex h-9 items-center border border-white/45 px-6 text-[11px] font-bold"
          >
            자세히 보기
          </a>
        </div>
      </section>

      <section id="collection" className="mx-auto w-full max-w-[1254px] px-5 pt-24 text-center md:px-0 md:pt-28">
        <p className="text-[13px] font-extrabold uppercase">NEW ARRIVAL</p>
        <h2 className="mx-auto mt-5 max-w-[620px] text-[26px] font-extrabold leading-tight md:text-[34px]">
          매일의 믿음을 위한 모던 크리스찬 악세사리
        </h2>
        <p className="mx-auto mt-5 max-w-[560px] text-[11px] leading-5 text-[#222]">
          모퉁이는 절제된 형태와 선명한 소재감으로 십자가와 신앙의 상징을 일상에서 착용하기 좋은
          악세사리로 다시 해석합니다.
        </p>
        <a href="/collections" className="mt-4 inline-flex items-center justify-center text-[12px] font-bold">
          ▶ 컬렉션 자세히 보기
        </a>

        <div className="mt-14 grid grid-cols-2 gap-1.5 md:grid-cols-4">
          {arrivalImages.map((image) => (
            <div key={image.src} className="relative aspect-[313/409] overflow-hidden bg-neutral-100">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 313px, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1254px] px-5 pt-36 md:px-0">
        <div className="relative aspect-[1254/705] overflow-hidden bg-neutral-200">
          <Image
            src="/images/motungi/brand-film.webp"
            alt="십자가 펜던트를 마감하는 장인의 손"
            fill
            sizes="(min-width: 1280px) 1254px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-center text-white md:p-10">
            <p className="text-[17px] font-bold">우리가 만드는 것은 장식이 아니라, 매일의 고백입니다.</p>
            <p className="mt-2 text-[12px] text-white/85">
              We design quiet signs of faith for the corners of everyday life.
            </p>
          </div>
          <p className="absolute left-6 top-6 text-[14px] font-extrabold text-white md:left-10 md:top-9">
            모퉁이 1st Collection - SIGN
          </p>
        </div>

        <div className="mt-9 grid gap-8 md:grid-cols-[1fr_360px] md:items-start">
          <div>
            <p className="text-[11px] text-[#555]">1st Collection</p>
            <h2 className="mt-1 text-[28px] font-extrabold leading-none">SIGN</h2>
            <p className="mt-5 max-w-[790px] text-[12px] leading-6 text-[#333]">
              십자가, 겨자씨, 물고기 상징을 일상의 악세사리로 다시 해석했습니다. 과장된 장식보다
              손에 닿는 질감, 은은한 색, 오래 착용해도 부담 없는 실루엣을 중심에 두었습니다.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-extrabold tracking-[0.12em] text-[#111] md:justify-self-end">
            {["QUIET", "MODERN", "FAITH"].map((item) => (
              <div key={item} className="flex aspect-square items-center justify-center border border-black px-2">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div id="products" className="mt-16 grid gap-x-1.5 gap-y-12 md:grid-cols-3">
          {products.map((product) => (
            <article key={product.src}>
              <div className="relative aspect-[416/548] overflow-hidden bg-neutral-100">
                <Image
                  src={product.src}
                  alt={product.alt}
                  fill
                  sizes="(min-width: 768px) 416px, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-7 text-[12px] font-extrabold">{product.title}</h3>
              <p className="mt-3 text-[11px] text-[#333]">{product.detail}</p>
              <a href="/contact" className="mt-7 inline-block text-[11px] font-bold underline underline-offset-4">
                문의하기
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1254px] px-5 pt-40 text-center md:px-0">
        <h2 className="text-[28px] font-semibold leading-none">Your 모퉁이</h2>
        <div className="mt-11 grid gap-x-1.5 gap-y-12 text-left md:grid-cols-3">
          {stories.map((post) => (
            <article key={post.src}>
              <div className="relative aspect-[416/548] overflow-hidden bg-neutral-100">
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 768px) 416px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-7 flex items-center justify-between text-[9px] text-[#777]">
                <span>{post.meta}</span>
                <span aria-hidden="true">★★★★★</span>
              </div>
              <p className="mt-4 text-[11px] font-semibold">{post.text}</p>
              <p className="mt-5 text-[10px] leading-5 text-[#555]">
                모퉁이의 악세사리는 신앙의 언어를 조용한 오브제로 바꿉니다. 기도하는 손, 선물하는
                마음, 하루의 작은 루틴에 자연스럽게 함께합니다.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1254px] px-5 pt-36 md:px-0">
        <h2 className="text-center text-[28px] font-semibold leading-none">What we prepare</h2>
        <div className="mt-11 grid gap-1.5 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="border border-black p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#777]">{service.label}</p>
              <h3 className="mt-3 text-[15px] font-extrabold">{service.title}</h3>
              <p className="mt-5 text-[12px] leading-6 text-[#333]">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1254px] px-5 pt-36 md:px-0">
        <h2 className="text-[29px] font-extrabold leading-none">자주 묻는 질문</h2>
        <div className="mt-10 border-y border-black">
          {faqs.map((faq) => (
            <article key={faq.question} className="grid gap-4 border-b border-black py-7 last:border-b-0 md:grid-cols-[360px_1fr]">
              <h3 className="text-[17px] font-extrabold">{faq.question}</h3>
              <p className="text-[12px] leading-6 text-[#333]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="business" className="mx-auto w-full max-w-[1254px] px-5 pt-36 md:px-0">
        <div className="grid gap-8 md:grid-cols-[1fr_520px] md:items-start">
          <div>
            <p className="text-[11px] text-[#555]">Business Information</p>
            <h2 className="mt-1 text-[28px] font-extrabold leading-tight">
              모퉁이는 사업자 아기돌풍이 운영합니다.
            </h2>
            <p className="mt-5 max-w-[720px] text-[12px] leading-6 text-[#333]">
              사업자등록증 기준 정보 중 공개 가능한 항목만 footer와 구조화 데이터에 반영했습니다. 개인정보에
              가까운 항목은 공개 페이지에 노출하지 않습니다.
            </p>
          </div>
          <dl className="grid grid-cols-1 border-t border-black text-[11px] md:justify-self-end">
            {companyRows.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[120px_1fr] border-b border-black py-3">
                <dt className="font-extrabold">{label}</dt>
                <dd className="text-[#333]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-[1254px] px-5 py-36 md:px-0">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <h2 className="text-[29px] font-extrabold leading-tight">모퉁이 : a quiet sign for every day</h2>
            <p className="mt-6 max-w-[700px] text-[12px] leading-6 text-[#333]">
              매일 착용하는 작은 표식이 하루의 방향을 바꿀 수 있다고 믿습니다. 제품 오픈과 입점, 선물
              패키지 관련 문의는 아래 메일로 남겨주세요.
            </p>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-10 w-[190px] items-center justify-center border border-[#111] bg-black text-[11px] font-semibold text-white"
          >
            문의 메일 보내기
          </a>
        </div>

        <nav className="mt-12 border-y border-black" aria-label="모퉁이 sections">
          {["News", "Collection", "Collaboration", "Business Info", "Contact"].map((item) => (
            <a
              key={item}
              href={
                item === "News"
                  ? "/news"
                  : item === "Collection"
                  ? "/collections"
                    : item === "Collaboration"
                      ? "/collaboration"
                    : item === "Business Info"
                      ? "/business"
                      : "/contact"
              }
              className="group flex h-[72px] items-center justify-between border-b border-black text-[26px] font-semibold last:border-b-0"
            >
              <span>{item}</span>
              <span
                className="text-[56px] font-light leading-none transition-transform group-hover:translate-x-2"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          ))}
        </nav>
      </section>

      <footer className="bg-black px-5 py-20 text-white md:px-0 md:py-24">
        <div className="mx-auto grid w-full max-w-[1254px] gap-16 md:grid-cols-[1.4fr_0.7fr_0.7fr_0.9fr]">
          <div>
            <p className="text-[25px] font-semibold tracking-[0.12em]">모퉁이</p>
            <p className="mt-10 max-w-[560px] text-[10px] font-semibold leading-5 text-white/80">
              상호 {site.legalName} | 대표 {site.owner} | 사업자등록번호 {site.businessRegistration}
              <br />
              업태 {site.businessType} | 종목 {site.businessItem} | 개업연월일 {site.openingDate}
              <br />
              문의 {site.email}
              <br />
              Copyright © 2026 {site.legalName}. All rights reserved.
            </p>
          </div>
          {[
            ["Brand", "News", "Collection", "Collaboration"],
            ["Products", "십자가 목걸이", "기도 팔찌", "기독교 선물"],
            ["Business", site.legalName, site.businessRegistration, site.businessItem],
          ].map((group) => (
            <div key={group[0]} className="space-y-5 pt-2 text-[11px] font-semibold text-white/80">
              {group.map((link) => (
                <a
                  key={link}
                  href={
                    link === "News"
                      ? "/news"
                      : link === "Collection"
                        ? "/collections"
                      : link === "Collaboration"
                          ? "/collaboration"
                          : link === "Business"
                            ? "/business"
                          : "/contact"
                  }
                  className="block hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </footer>

      <div
        className="fixed bottom-7 right-7 h-5 w-5 rounded-full border border-white/30 bg-neutral-500/80 shadow-sm"
        aria-hidden="true"
      />
    </main>
  );
}
