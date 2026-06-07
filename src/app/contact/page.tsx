import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { ContactComposer } from "./ContactComposer";

const contactImages = {
  hero: "/images/motungi/business/packing-hands.webp",
  desk: "/images/motungi/business/documents-desk.webp",
  gift: "/images/motungi/collaboration/gift-table.webp",
  showroom: "/images/motungi/news/showroom-view.webp",
};

const inquiryCards = [
  {
    title: "Product",
    label: "제품 문의",
    body: "십자가 목걸이, 기도 팔찌, 선물 패키지 구성과 재고, 가격, 착용감에 대한 문의를 정리해 답변합니다.",
  },
  {
    title: "Gift",
    label: "교회/소모임 선물",
    body: "수련회, 감사 선물, 환영 선물처럼 일정이 있는 문의는 수량과 희망일을 기준으로 가능한 구성을 살펴봅니다.",
  },
  {
    title: "Collaboration",
    label: "협업 제안",
    body: "브랜드, 편집숍, 콘텐츠, 팝업 협업은 목적과 톤을 먼저 확인하고 제품과 포장 범위를 함께 조정합니다.",
  },
  {
    title: "Business",
    label: "사업자 정보",
    body: "아기돌풍의 공개 사업자 정보, 운영 브랜드, 문의 채널에 대한 확인은 Contact 페이지에서 함께 안내합니다.",
  },
];

const process = [
  ["01", "메일 접수", "문의 유형과 일정, 수량, 원하는 제품군을 확인합니다."],
  ["02", "범위 확인", "해외직구대행업과 도매 및 소매업 범위 안에서 가능한 응대 방식을 정리합니다."],
  ["03", "구성 제안", "제품, 포장, 카드, 발송 단위를 목적에 맞게 간단히 제안합니다."],
  ["04", "회신 정리", "필요한 경우 추가 확인 항목을 모아 메일로 다시 안내합니다."],
];

const quickLinks = [
  ["Collection", "/collections"],
  ["Collaboration", "/collaboration"],
  ["Business Info", "/business"],
  ["News", "/news"],
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "모퉁이 Contact",
  url: `${site.url}/contact`,
  description:
    "모퉁이 굿즈 제품, 선물 패키지, 협업, 사업자 정보 문의를 위한 공식 Contact 페이지입니다.",
  mainEntity: {
    "@type": ["Organization", "OnlineStore"],
    name: site.name,
    legalName: site.legalName,
    email: site.email,
    taxID: site.businessRegistration,
    url: site.url,
  },
};

export const metadata: Metadata = {
  title: "Contact | 모퉁이 문의",
  description:
    "모퉁이 굿즈 제품 문의, 선물 패키지, 브랜드/소모임 협업, 사업자 정보 확인을 위한 공식 Contact 페이지입니다.",
  keywords: [
    "모퉁이 contact",
    "모퉁이 문의",
    "모퉁이 굿즈 문의",
    "아기돌풍 문의",
    "크리스찬 악세사리 문의",
    "기독교 선물 문의",
    "교회 선물 문의",
    "김종란 대표 문의",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | 모퉁이 문의",
    description: "굿즈 제품, 선물 패키지, 협업, 사업자 정보 확인을 위한 모퉁이 공식 문의 페이지.",
    url: `${site.url}/contact`,
    images: [
      {
        url: contactImages.hero,
        width: 1536,
        height: 1024,
        alt: "모퉁이 contact gift packaging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | 모퉁이 문의",
    description: "모퉁이 굿즈 제품과 협업 문의를 메일로 정리해 보낼 수 있습니다.",
    images: [contactImages.hero],
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-[116px] text-[#101010] md:pt-[128px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="mx-auto w-full max-w-[1120px] px-5 pt-8 md:px-0">
        <div className="grid gap-10 md:grid-cols-[0.82fr_1.18fr] md:items-end">
          <div className="pb-2">
            <p className="text-[13px] font-extrabold">Contact</p>
            <h1 className="mt-5 break-keep text-[42px] font-extrabold leading-[1.04] md:text-[62px]">
              조용히 묻고,
              <br />
              정확히 이어갑니다.
            </h1>
            <p className="mt-7 max-w-[440px] text-[12px] leading-7 text-[#333]">
              제품 문의, 선물 패키지, 브랜드와 소모임 협업, 사업자 정보 확인까지 한 통의
              메일로 정리해 주세요. 모퉁이는 필요한 정보를 차분히 확인하고 가능한 범위를 안내합니다.
            </p>
          </div>
          <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100">
            <Image
              src={contactImages.hero}
              alt="모퉁이 문의 페이지의 선물 포장 이미지"
              fill
              priority
              sizes="(min-width: 1120px) 720px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-12 px-5 pt-24 md:grid-cols-[360px_1fr] md:px-0">
        <div>
          <p className="text-[11px] font-semibold text-[#666]">Email desk</p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-tight">
            문의를 메일로
            <br />
            바로 정리하기
          </h2>
          <p className="mt-6 text-[12px] leading-7 text-[#333]">
            현재 공식 문의 채널은 이메일입니다. 아래 내용을 작성하면 사용 중인 메일 앱에 제목과
            본문이 자동으로 채워집니다.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-7 inline-flex text-[12px] font-extrabold underline underline-offset-4"
          >
            {site.email}
          </a>
        </div>
        <ContactComposer email={site.email} />
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pt-28 md:px-0">
        <div className="grid gap-1.5 md:grid-cols-4">
          {inquiryCards.map((item) => (
            <article key={item.title} className="border border-black p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#777]">{item.title}</p>
              <h2 className="mt-4 text-[18px] font-extrabold leading-tight">{item.label}</h2>
              <p className="mt-6 text-[12px] leading-6 text-[#333]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pt-28 md:px-0">
        <div className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-start">
          <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100">
            <Image
              src={contactImages.gift}
              alt="모퉁이 선물 문의와 협업을 위한 제품 테이블"
              fill
              sizes="(min-width: 768px) 570px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100 md:mt-20">
            <Image
              src={contactImages.desk}
              alt="모퉁이 사업자 정보와 문의 확인을 상징하는 문서 이미지"
              fill
              sizes="(min-width: 768px) 520px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-12 px-5 pt-28 md:grid-cols-[360px_1fr] md:px-0">
        <div>
          <p className="text-[11px] font-semibold text-[#666]">Reply process</p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-tight">
            문의 후
            <br />
            이렇게 확인합니다.
          </h2>
        </div>
        <div className="border-y border-black">
          {process.map(([step, title, body]) => (
            <article key={step} className="grid gap-4 border-b border-black py-6 last:border-b-0 md:grid-cols-[92px_1fr]">
              <p className="text-[13px] font-extrabold">{step}</p>
              <div>
                <h3 className="text-[17px] font-extrabold">{title}</h3>
                <p className="mt-3 text-[12px] leading-6 text-[#333]">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 pt-28 md:grid-cols-[1fr_420px] md:items-start md:px-0">
        <div>
          <p className="text-[11px] font-semibold text-[#666]">Before contact</p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-tight">
            함께 적어주면
            <br />
            답변이 빨라지는 것들
          </h2>
          <div className="mt-9 grid gap-0 border-y border-black">
            {[
              "원하는 제품군 또는 참고 페이지",
              "예상 수량과 희망 일정",
              "선물 받는 대상과 사용 목적",
              "포장, 카드, 리본 커스텀 필요 여부",
              "협업이라면 브랜드/단체 소개와 진행 방식",
            ].map((item) => (
              <p key={item} className="border-b border-black py-4 text-[17px] font-semibold last:border-b-0">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100 md:mt-20">
          <Image
            src={contactImages.showroom}
            alt="모퉁이 문의 전 참고할 수 있는 제품 쇼룸 이미지"
            fill
            sizes="(min-width: 768px) 420px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 py-28 md:px-0">
        <p className="text-[11px] font-semibold text-[#666]">Explore before inquiry</p>
        <nav className="mt-8 border-y border-black" aria-label="Contact related pages">
          {quickLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="group flex h-[72px] items-center justify-between border-b border-black text-[26px] font-semibold last:border-b-0"
            >
              <span>{label}</span>
              <span
                className="text-[56px] font-light leading-none transition-transform group-hover:translate-x-2"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ))}
        </nav>
      </section>

      <footer className="bg-black px-5 py-20 text-white md:px-0">
        <div className="mx-auto grid w-full max-w-[1120px] gap-12 md:grid-cols-[1.5fr_0.8fr_0.8fr_1fr]">
          <div>
            <p className="text-[22px] font-semibold tracking-[0.12em]">모퉁이</p>
            <p className="mt-8 max-w-[520px] text-[10px] font-semibold leading-5 text-white/75">
              상호 {site.legalName} | 대표 {site.owner} | 사업자등록번호 {site.businessRegistration}
              <br />
              업태 {site.businessType} | 종목 {site.businessItem}
              <br />
              문의 {site.email}
            </p>
          </div>
          {[
            ["Brand", "Home", "News", "Collection", "Collaboration"],
            ["Business", "Business Info", site.legalName, site.businessRegistration],
            ["Contact", site.email, site.businessItem, site.apexDomain],
          ].map((group) => (
            <div key={group[0]} className="space-y-4 text-[11px] font-semibold text-white/75">
              {group.map((link) => (
                <Link
                  key={link}
                  href={
                    link === "Home"
                      ? "/"
                      : link === "News"
                        ? "/news"
                        : link === "Collection"
                          ? "/collections"
                          : link === "Collaboration"
                            ? "/collaboration"
                            : link === "Business Info"
                              ? "/business"
                              : link === "Contact"
                                ? "/contact"
                                : "/contact"
                  }
                  className="block hover:text-white"
                >
                  {link}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </footer>
    </main>
  );
}
