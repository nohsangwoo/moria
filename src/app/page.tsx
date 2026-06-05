import Image from "next/image";

const arrivalImages = [
  { src: "/images/moriah/arrival-1.webp", alt: "Red enamel cross earring with white flowers" },
  { src: "/images/moriah/arrival-2.webp", alt: "Blue cross pendant necklace on terracotta tray" },
  { src: "/images/moriah/arrival-3.webp", alt: "Gold ichthys ring and cross charm with lemons" },
  { src: "/images/moriah/arrival-4.webp", alt: "Pink prayer bracelet with cross charm and flowers" },
];

const products = [
  {
    src: "/images/moriah/product-cross-necklace.webp",
    alt: "Brushed silver cross pendant necklace",
    title: "quiet cross pendant 58,000원",
    detail: "브러시드 실버, 스카이블루 에나멜 포인트",
  },
  {
    src: "/images/moriah/product-seed-ring.webp",
    alt: "Gold mustard seed ring with cross detail",
    title: "mustard seed ring 64,000원",
    detail: "작은 믿음을 담은 골드 포인트 링",
  },
  {
    src: "/images/moriah/product-prayer-bracelet.webp",
    alt: "Leather prayer bracelet with a silver cross charm",
    title: "daily prayer bracelet 42,000원",
    detail: "가죽 스트랩과 미니멀 십자가 참",
  },
];

const socialPosts = [
  {
    src: "/images/moriah/social-packaging.webp",
    alt: "Minimal Christian accessory gift boxes",
    meta: "review | 2026.06.01",
    text: "선물하기 좋은 차분한 패키지",
  },
  {
    src: "/images/moriah/social-interior.webp",
    alt: "Apartment shelf with cross pendant and candle",
    meta: "story | 2026.05.18",
    text: "하루의 시작에 놓아두는 작은 표식",
  },
  {
    src: "/images/moriah/social-wear.webp",
    alt: "Hands wearing a delicate cross bracelet while holding a cup",
    meta: "look | 2026.05.03",
    text: "일상에 자연스럽게 머무는 십자가",
  },
];

const footerLinks = [
  ["About moriah", "Brand story"],
  ["Meet us", "Instagram", "Journal"],
  ["Customer Service", "카카오톡 문의하기", "교회/단체 주문", "오프라인 매장"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#111]">
      <div className="flex h-[35px] items-center justify-center bg-black text-[10px] font-semibold text-white">
        첫 구매 시 실버 폴리싱 천 증정
      </div>

      <section className="relative h-[clamp(520px,56vw,980px)] overflow-hidden bg-[#d8c5b4]">
        <Image
          src="/images/moriah/hero.webp"
          alt="Modern Christian cross pendant hero image"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[48%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/25" />

        <header className="absolute left-1/2 top-0 z-10 grid w-full max-w-[1254px] -translate-x-1/2 grid-cols-3 items-center px-5 py-8 text-white md:px-0">
          <button className="justify-self-start text-[22px] leading-none" aria-label="Open menu">
            ≡
          </button>
          <p className="justify-self-center text-[28px] font-semibold tracking-[0.42em] text-black/80 md:text-[34px]">
            moriah
          </p>
          <div className="flex items-center gap-4 justify-self-end text-[12px] font-semibold text-white">
            <span aria-hidden="true">⌕</span>
            <span aria-hidden="true">□</span>
            <span aria-hidden="true">○</span>
            <span>KR</span>
          </div>
        </header>

        <div className="absolute bottom-[15%] left-1/2 z-10 w-full max-w-[1254px] -translate-x-1/2 px-5 text-white md:px-0">
          <p className="text-[15px] font-bold">새 컬렉션 출시</p>
          <h1 className="mt-2 text-[31px] font-extrabold leading-none md:text-[42px]">
            The Quiet Cross Series
          </h1>
          <a
            href="#collection"
            className="mt-7 inline-flex h-9 items-center border border-white/45 px-6 text-[11px] font-bold"
          >
            자세히 보기
          </a>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1254px] px-5 pt-24 text-center md:px-0 md:pt-28">
        <p className="text-[13px] font-extrabold uppercase">NEW ARRIVAL</p>
        <p className="mx-auto mt-5 max-w-[560px] text-[11px] leading-5 text-[#222]">
          moriah의 첫 번째 크리스찬 악세사리 컬렉션은 절제된 형태와 선명한 소재감으로
          <br className="hidden sm:block" />
          매일의 믿음을 조용하고 현대적인 방식으로 담아냅니다.
        </p>
        <a href="#collection" className="mt-4 inline-flex items-center justify-center text-[12px] font-bold">
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

      <section id="collection" className="mx-auto w-full max-w-[1254px] px-5 pt-36 md:px-0">
        <div className="relative aspect-[1254/705] overflow-hidden bg-neutral-200">
          <Image
            src="/images/moriah/brand-film.webp"
            alt="Artisan hands polishing a cross pendant"
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
            Moriah 1st Collection - SIGN
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
            {["STERLING", "HAND FINISHED", "FAITHFUL"].map((item) => (
              <div key={item} className="flex aspect-square items-center justify-center border border-black px-2">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-x-1.5 gap-y-12 md:grid-cols-3">
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
              <a href="#buy" className="mt-7 inline-block text-[11px] font-bold underline underline-offset-4">
                구매하기
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1254px] px-5 pt-40 text-center md:px-0">
        <h2 className="text-[28px] font-semibold leading-none">Your moriah</h2>
        <div className="mt-11 grid gap-x-1.5 gap-y-12 text-left md:grid-cols-3">
          {socialPosts.map((post) => (
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
                모리아의 악세사리는 신앙의 언어를 조용한 오브제로 바꿉니다. 기도하는 손, 선물하는
                마음, 하루의 작은 루틴에 자연스럽게 함께합니다.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="buy" className="mx-auto w-full max-w-[1254px] px-5 py-36 md:px-0">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <h2 className="text-[29px] font-extrabold leading-none">moriah : a sign for every day</h2>
            <p className="mt-6 max-w-[700px] text-[12px] leading-6 text-[#333]">
              moriah는 믿음을 큰 문장보다 작은 표식으로 기억합니다. 매일 착용하는 악세사리 안에
              십자가의 위로와 겨자씨의 용기를 담아, 일상의 모서리마다 조용한 빛을 더합니다.
            </p>
          </div>
          <a
            href="#collection"
            className="inline-flex h-10 w-[190px] items-center justify-center border border-[#d5d5d5] text-[11px] font-semibold"
          >
            브랜드 스토리 보기
          </a>
        </div>

        <nav className="mt-12 border-y border-black" aria-label="Moriah sections">
          {["Collection", "Gift Guide", "Journal", "Where to Buy"].map((item) => (
            <a
              key={item}
              href="#buy"
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
        <div className="mx-auto grid w-full max-w-[1254px] gap-16 md:grid-cols-[1.4fr_0.6fr_0.6fr_0.8fr]">
          <div>
            <p className="text-[25px] font-semibold tracking-[0.42em]">moriah</p>
            <p className="mt-10 max-w-[470px] text-[10px] font-semibold leading-5 text-white/80">
              상호명 주식회사 모리아스튜디오 | 대표자명 이은서 | 사업자등록번호 000-00-00000
              <br />
              통신판매업 신고번호 제2026-서울성동-0000호 | 서울특별시 성동구 성수동
              <br />
              고객센터 02-0000-0000 | hello@moriah.kr
              <br />
              Copyright © 2026 MORIAH. All rights reserved.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group[0]} className="space-y-5 pt-2 text-[11px] font-semibold text-white/80">
              {group.map((link) => (
                <a key={link} href="#buy" className="block hover:text-white">
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
