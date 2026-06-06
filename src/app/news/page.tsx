import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const newsImages = {
  hero: "/images/motungi/news/hero-showroom.webp",
  showroom: "/images/motungi/news/showroom-view.webp",
  visitor: "/images/motungi/news/visitor-wear.webp",
  pendant: "/images/motungi/news/new-pendant.webp",
  bracelet: "/images/motungi/news/prayer-bracelet-news.webp",
  partner: "/images/motungi/news/partner-note.webp",
  guide: "/images/motungi/news/map-card.webp",
};

const newsItems = [
  {
    title: "Quiet Cross Pendant, sky-blue edition",
    type: "New product note",
    date: "2026.06.18",
    image: newsImages.pendant,
    body: "브러시드 실버 표면 위에 작은 하늘빛 에나멜을 올린 새 펜던트입니다. 멀리서 드러나는 장식보다 가까이에서만 알아차리는 표식을 목표로 했습니다.",
    details: ["Material : brushed silver, enamel", "Color : silver, pale sky blue", "Wear : necklace, daily layer"],
  },
  {
    title: "Prayer Bracelet, morning cord",
    type: "Season preview",
    date: "2026.06.21",
    image: newsImages.bracelet,
    body: "손목에 오래 남는 촉감을 위해 가죽 코드와 작은 십자가 참의 균형을 다시 조정했습니다. 소모임 선물이나 개인 기도 루틴에 어울리는 구성을 준비 중입니다.",
    details: ["Material : leather cord, silver charm", "Mood : daily prayer", "Release : early summer"],
  },
  {
    title: "Season Partner Letter",
    type: "Collaboration call",
    date: "2026.06.28",
    image: newsImages.partner,
    body: "교회 선물, 편집숍 팝업, 콘텐츠 협업을 위한 시즌 파트너 문의를 열었습니다. 작은 수량의 선물부터 공동 큐레이션까지 모퉁이의 톤 안에서 검토합니다.",
    details: ["For : church, group, retail, creator", "Format : gift kit, display, limited package", "Contact : email inquiry"],
  },
];

const schedule = [
  ["Preview", "2026.06.18", "새 펜던트와 기도 팔찌 이미지 공개"],
  ["Letter", "2026.06.21", "선물 구성과 포장 샘플 안내"],
  ["Partner", "2026.06.28", "시즌 협업 문의 접수 시작"],
  ["Open", "2026.07.05", "온라인 쇼룸 콘텐츠 순차 공개"],
];

export const metadata: Metadata = {
  title: "News | 모퉁이 Season Letter",
  description:
    "모퉁이의 새 소식 페이지입니다. Season Letter 2026, 신제품 굿즈 노트, 쇼룸 프리뷰, 교회 선물과 브랜드 협업 안내를 확인하세요.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "News | 모퉁이 Season Letter",
    description: "모퉁이 Season Letter 2026, 새 크리스찬 굿즈와 협업 소식을 전합니다.",
    url: `${site.url}/news`,
    images: [
      {
        url: newsImages.hero,
        width: 1536,
        height: 1024,
        alt: "모퉁이 season letter showroom wall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News | 모퉁이 Season Letter",
    description: "모퉁이 새 굿즈와 시즌 쇼룸 소식.",
    images: [newsImages.hero],
  },
};

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <header className="mx-auto grid w-full max-w-[1120px] grid-cols-3 items-center px-5 py-8 md:px-0">
        <Link href="/" className="justify-self-start text-[18px] leading-none" aria-label="홈으로 이동">
          ☰
        </Link>
        <Link
          href="/"
          className="justify-self-center text-[17px] font-semibold tracking-[0.12em]"
          aria-label="모퉁이 home"
        >
          모퉁이
        </Link>
        <nav className="hidden items-center gap-4 justify-self-end text-[10px] font-semibold md:flex">
          <Link href="/news">News</Link>
          <Link href="/collections">Collection</Link>
          <Link href="/collaboration">Collaboration</Link>
          <Link href="/business">Business</Link>
        </nav>
      </header>

      <section className="relative overflow-hidden bg-[#f4f1eb]">
        <div className="relative mx-auto h-[clamp(540px,58vw,820px)] w-full max-w-[1600px]">
          <Image
            src={newsImages.hero}
            alt="모퉁이 시즌 쇼룸 벽면에 걸린 십자가 목걸이와 안내 카드"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/16 via-transparent to-black/8" />
          <div className="absolute left-5 top-8 text-white md:left-12 md:top-11">
            <p className="text-[40px] font-serif italic leading-[0.95] md:text-[76px]">
              SEASON
              <br />
              LETTER
            </p>
          </div>
          <div className="absolute bottom-10 right-5 text-right text-white md:bottom-14 md:right-12">
            <p className="text-[32px] font-serif italic leading-[1.02] md:text-[64px]">
              June 18
              <br />
              Online Showroom
              <br />
              motungistudio.com/news
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[760px] px-5 py-20 text-center md:px-0">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.18em]">모퉁이 News</p>
        <h1 className="mt-5 text-[31px] font-extrabold leading-tight md:text-[44px]">
          Season Letter 2026
        </h1>
        <p className="mx-auto mt-7 max-w-[560px] text-[12px] leading-7 text-[#333]">
          모퉁이의 새 소식은 큰 발표보다 조용한 편지에 가깝습니다. 새 펜던트의 작은 하늘빛, 기도 팔찌의
          촉감, 선물 패키지의 여백을 하나씩 공개합니다.
        </p>
        <div className="mx-auto mt-9 grid max-w-[420px] grid-cols-3 gap-2 text-[10px] font-extrabold">
          {["NEW DROP", "SHOWROOM", "PARTNER"].map((item) => (
            <div key={item} className="flex aspect-square items-center justify-center border border-black px-2">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[860px] px-5 pb-16 md:px-0">
        <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100">
          <Image
            src={newsImages.showroom}
            alt="모퉁이 시즌 쇼룸의 선물 패키지와 십자가 악세사리"
            fill
            sizes="(min-width: 860px) 860px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-7 grid gap-8 md:grid-cols-[240px_1fr]">
          <div>
            <p className="text-[11px] font-semibold text-[#666]">Showroom preview</p>
            <h2 className="mt-2 text-[24px] font-extrabold leading-tight">A room for quiet signs</h2>
          </div>
          <p className="text-[12px] leading-7 text-[#333]">
            이번 시즌 쇼룸은 제품을 한꺼번에 보여주기보다, 목걸이와 팔찌가 놓이는 장면을 천천히 따라가도록
            구성했습니다. 벽면의 십자가, 테이블 위의 선물 카드, 손목에 남는 작은 참이 하나의 동선으로
            이어집니다.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[860px] px-5 py-8 md:px-0">
        {newsItems.map((item, index) => (
          <article key={item.title} className="border-t border-black py-16 first:border-t-0 first:pt-0">
            <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 860px) 860px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-7 grid gap-8 md:grid-cols-[240px_1fr]">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#777]">{item.type}</p>
                <h2 className="mt-3 text-[22px] font-extrabold leading-tight">{item.title}</h2>
                <p className="mt-4 text-[11px] text-[#555]">{item.date}</p>
              </div>
              <div>
                <p className="text-[12px] leading-7 text-[#333]">{item.body}</p>
                <dl className="mt-7 grid gap-2 text-[10px] font-semibold text-[#555]">
                  {item.details.map((detail) => (
                    <div key={detail} className="grid grid-cols-[18px_1fr] gap-3">
                      <dt>{String(index + 1).padStart(2, "0")}</dt>
                      <dd>{detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-[#efe3cb] px-5 py-16 text-center md:px-0">
        <p className="text-[13px] font-extrabold">We are preparing the next quiet release.</p>
        <p className="mx-auto mt-4 max-w-[620px] text-[12px] leading-7 text-[#333]">
          신제품 공개와 시즌 협업은 순차적으로 업데이트됩니다. 교회 선물, 소모임 기프트, 편집숍 팝업 제안은
          별도 협업 페이지에서 자세히 안내합니다.
        </p>
        <Link href="/collaboration" className="mt-6 inline-flex text-[12px] font-extrabold underline underline-offset-4">
          협업 안내 보기
        </Link>
      </section>

      <section className="mx-auto grid w-full max-w-[860px] gap-12 px-5 py-20 md:grid-cols-[1fr_300px] md:items-start md:px-0">
        <div>
          <p className="text-[11px] font-semibold text-[#666]">Season schedule</p>
          <h2 className="mt-3 text-[29px] font-extrabold leading-tight">새 소식 공개 순서</h2>
          <div className="mt-9 border-y border-black">
            {schedule.map(([label, date, body]) => (
              <article key={label} className="grid gap-4 border-b border-black py-5 last:border-b-0 md:grid-cols-[110px_110px_1fr]">
                <p className="text-[13px] font-extrabold">{label}</p>
                <p className="text-[12px] font-semibold text-[#555]">{date}</p>
                <p className="text-[12px] leading-6 text-[#333]">{body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100 md:mt-20">
          <Image
            src={newsImages.guide}
            alt="모퉁이 시즌 쇼룸 가이드 카드와 추상 안내도"
            fill
            sizes="(min-width: 768px) 300px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[860px] px-5 pb-24 md:px-0">
        <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100">
          <Image
            src={newsImages.visitor}
            alt="모퉁이 새 십자가 목걸이를 착용해보는 방문자"
            fill
            sizes="(min-width: 860px) 860px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-[240px_1fr]">
          <div>
            <p className="text-[11px] font-semibold text-[#666]">Try-on note</p>
            <h2 className="mt-2 text-[24px] font-extrabold leading-tight">착용은 가장 작은 확인입니다.</h2>
          </div>
          <p className="text-[12px] leading-7 text-[#333]">
            새 제품을 소개할 때 모퉁이가 가장 오래 보는 것은 착용자의 표정입니다. 십자가가 옷 위에서
            너무 크게 말하지 않는지, 기도 팔찌가 손목의 움직임을 방해하지 않는지, 선물 포장이 마음보다
            앞서지 않는지를 확인합니다.
          </p>
        </div>
      </section>

      <footer className="bg-black px-5 py-20 text-white md:px-0">
        <div className="mx-auto grid w-full max-w-[860px] gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[22px] font-semibold tracking-[0.12em]">모퉁이</p>
            <p className="mt-8 text-[10px] font-semibold leading-5 text-white/75">
              상호 {site.legalName} | 대표 {site.owner}
              <br />
              사업자등록번호 {site.businessRegistration}
              <br />
              문의 {site.email}
            </p>
          </div>
          <div className="space-y-4 text-[11px] font-semibold text-white/75">
            <Link href="/" className="block">
              Home
            </Link>
            <Link href="/news" className="block text-white">
              News
            </Link>
            <Link href="/collections" className="block">
              Collection
            </Link>
          </div>
          <div className="space-y-4 text-[11px] font-semibold text-white/75">
            <Link href="/collaboration" className="block">
              Collaboration
            </Link>
            <Link href="/business" className="block">
              Business
            </Link>
            <Link href="/#products" className="block">
              Products
            </Link>
            <Link href="/contact" className="block">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
