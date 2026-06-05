import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const businessImages = {
  founder: "/images/moriah/business/founder-reference.webp",
  hero: "/images/moriah/business/hero-desk.webp",
  office: "/images/moriah/business/office-window.webp",
  documents: "/images/moriah/business/documents-desk.webp",
  curation: "/images/moriah/business/curation-table.webp",
  packing: "/images/moriah/business/packing-hands.webp",
};

const publicRows = [
  ["상호", site.legalName],
  ["대표자", site.owner],
  ["사업자등록번호", site.businessRegistration],
  ["개업연월일", site.openingDate],
  ["업태", site.businessType],
  ["종목", site.businessItem],
  ["발급일", site.issuedDate],
  ["문의", site.email],
];

const timeline = [
  {
    date: "Before moriah",
    title: "선물의 쓰임을 먼저 살피는 일",
    body: "moriah의 출발점은 눈에 띄는 장식보다 오래 곁에 남는 물건을 고르는 감각입니다. 김종란 대표는 받는 사람의 하루에 자연스럽게 놓일 수 있는 크기, 소재, 포장감을 먼저 확인하는 방식으로 브랜드의 방향을 세웠습니다.",
  },
  {
    date: "2026.06.01",
    title: "아기돌풍 개업",
    body: "사업자등록증 기준 아기돌풍은 도매 및 소매업, 해외직구대행업을 사업 범위로 등록했습니다. moriah는 이 사업체가 운영하는 모던 크리스찬 악세사리 브랜드로 정리되었습니다.",
  },
  {
    date: "2026.06.02",
    title: "공개 가능한 사업자 정보 정리",
    body: "브랜드 신뢰를 위해 공개 가능한 사업자 정보와 문의 채널을 웹사이트에 반영했습니다. 개인정보에 가까운 항목은 공개 영역에 넣지 않고, 고객이 확인해야 하는 핵심 정보만 선별했습니다.",
  },
  {
    date: "Now",
    title: "작은 신앙의 표식을 현대적인 선물로",
    body: "십자가 목걸이, 기도 팔찌, 기독교 선물 패키지처럼 조용하지만 분명한 의미를 가진 제품을 중심으로 선별과 포장, 협업 구성을 준비하고 있습니다.",
  },
];

const principles = [
  {
    title: "Quiet selection",
    label: "선별",
    body: "잘 보이는 제품보다 오래 쓰이는 제품을 먼저 봅니다. 소재의 무게, 착용감, 포장 후의 인상까지 확인해 매일 곁에 두기 좋은 물건을 고릅니다.",
  },
  {
    title: "Faithful packaging",
    label: "포장",
    body: "선물은 제품이 아니라 마음의 전달 방식까지 포함한다고 봅니다. 과한 장식보다 여백과 촉감, 카드와 리본의 균형을 정돈합니다.",
  },
  {
    title: "Clear operation",
    label: "운영",
    body: "해외직구대행업의 범위 안에서 상품 확인, 구성 제안, 문의 응대, 발송 준비 과정을 차분하게 관리합니다.",
  },
  {
    title: "Modern devotion",
    label: "톤",
    body: "크리스찬 악세사리를 종교적 장식으로만 두지 않고, 일상에서 자연스럽게 착용하는 현대적인 표식으로 제안합니다.",
  },
];

const scope = [
  "크리스찬 악세사리 및 기독교 선물 큐레이션",
  "십자가 목걸이, 기도 팔찌, 작은 선물 패키지 구성",
  "해외직구대행업 범위의 상품 확인과 주문 지원",
  "교회, 소모임, 브랜드 협업을 위한 소량 선물 제안",
  "웹사이트와 이메일 기반의 공개 문의 응대",
  "제품 이미지, 포장 톤, 시즌 콘텐츠 운영",
];

const faqs = [
  {
    question: "moriah와 아기돌풍은 어떤 관계인가요?",
    answer:
      "아기돌풍은 사업자등록증 기준 상호이고, moriah는 아기돌풍이 운영하는 모던 크리스찬 악세사리 브랜드입니다.",
  },
  {
    question: "사업자 정보는 어디까지 공개하나요?",
    answer:
      "상호, 대표자, 사업자등록번호, 개업연월일, 업태, 종목, 발급일, 문의 이메일처럼 고객 확인에 필요한 공개 항목만 안내합니다.",
  },
  {
    question: "김종란 대표의 실제 사진인가요?",
    answer:
      "페이지의 여성 이미지는 브랜드 스토리와 운영 철학을 표현하기 위해 제작한 연출 이미지입니다. 실제 신분증명용 사진으로 사용하지 않습니다.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "OnlineStore"],
    name: site.name,
    legalName: site.legalName,
    alternateName: ["moriah", "모리아", "아기돌풍"],
    url: `${site.url}/business`,
    logo: `${site.url}${site.logo}`,
    image: `${site.url}${businessImages.hero}`,
    description:
      "아기돌풍이 운영하는 moriah의 공개 사업자 정보와 김종란 대표의 브랜드 운영 철학을 소개합니다.",
    foundingDate: site.openingDate,
    taxID: site.businessRegistration,
    email: site.email,
    founder: {
      "@type": "Person",
      name: site.owner,
    },
    knowsAbout: [
      "크리스찬 악세사리",
      "기독교 선물",
      "십자가 목걸이",
      "기도 팔찌",
      "해외직구대행업",
    ],
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

export const metadata: Metadata = {
  title: "Business Info | 아기돌풍 김종란 대표",
  description:
    "아기돌풍이 운영하는 moriah의 사업자 정보 페이지입니다. 김종란 대표, 사업자등록번호 435-50-01307, 도매 및 소매업, 해외직구대행업 정보를 안내합니다.",
  keywords: [
    "아기돌풍",
    "김종란",
    "아기돌풍 사업자 정보",
    "moriah business",
    "모리아 사업자 정보",
    "크리스찬 악세사리 사업자",
    "기독교 선물 브랜드",
    "해외직구대행업",
  ],
  alternates: {
    canonical: "/business",
  },
  openGraph: {
    title: "Business Info | 아기돌풍 김종란 대표",
    description: "moriah를 운영하는 아기돌풍의 공개 사업자 정보와 브랜드 운영 철학.",
    url: `${site.url}/business`,
    images: [
      {
        url: businessImages.hero,
        width: 1536,
        height: 1024,
        alt: "moriah business desk with Christian accessories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Info | 아기돌풍 김종란 대표",
    description: "아기돌풍이 운영하는 moriah의 공개 사업자 정보와 대표 스토리.",
    images: [businessImages.hero],
  },
};

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-white text-[#101010]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="mx-auto grid w-full max-w-[1120px] grid-cols-3 items-center px-5 py-8 md:px-0">
        <Link href="/" className="justify-self-start text-[18px] leading-none" aria-label="홈으로 이동">
          ←
        </Link>
        <Link
          href="/"
          className="justify-self-center text-[17px] font-semibold tracking-[0.42em]"
          aria-label="moriah home"
        >
          moriah
        </Link>
        <nav className="hidden items-center gap-4 justify-self-end text-[10px] font-semibold md:flex">
          <Link href="/news">News</Link>
          <Link href="/collections">Collection</Link>
          <Link href="/collaboration">Collaboration</Link>
          <Link href="/business">Business</Link>
        </nav>
      </header>

      <section className="mx-auto w-full max-w-[1120px] px-5 pt-8 md:px-0">
        <div className="grid gap-10 md:grid-cols-[0.82fr_1.18fr] md:items-end">
          <div className="pb-2">
            <p className="text-[13px] font-extrabold">Business Info</p>
            <h1 className="mt-5 break-keep text-[42px] font-extrabold leading-[1.04] md:text-[62px]">
              아기돌풍에서
              <br />
              moriah까지.
            </h1>
            <p className="mt-7 max-w-[430px] text-[12px] leading-7 text-[#333]">
              moriah는 김종란 대표가 운영하는 사업체 아기돌풍의 브랜드입니다. 작은 신앙의 표식을
              현대적인 선물과 일상의 악세사리로 전하기 위해, 공개 가능한 사업자 정보와 운영 기준을
              한곳에 정리했습니다.
            </p>
          </div>
          <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100">
            <Image
              src={businessImages.hero}
              alt="아기돌풍 moriah 사업자 정보와 크리스찬 악세사리 운영 무드를 담은 책상 이미지"
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
          <p className="text-[11px] font-semibold text-[#666]">Registered operator</p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-tight">
            공개 사업자 정보
            <br />
            한눈에 보기
          </h2>
          <p className="mt-6 text-[12px] leading-7 text-[#333]">
            고객이 브랜드의 운영 주체를 확인할 수 있도록 사업자등록증 기준 공개 항목을 정리했습니다.
            개인정보에 가까운 항목은 공개 영역에 노출하지 않습니다.
          </p>
        </div>
        <dl className="grid border-t border-black text-[12px]">
          {publicRows.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[130px_1fr] border-b border-black py-4 md:grid-cols-[180px_1fr]">
              <dt className="font-extrabold">{label}</dt>
              <dd className="text-[#333]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-14 px-5 pt-28 md:grid-cols-[0.88fr_1.12fr] md:items-start md:px-0">
        <div className="relative aspect-[1024/1536] overflow-hidden bg-neutral-100">
          <Image
            src={businessImages.founder}
            alt="김종란 대표의 운영 철학을 표현한 여성 창업자 스토리 이미지"
            fill
            sizes="(min-width: 768px) 500px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="md:pt-16">
          <p className="text-[11px] font-semibold text-[#666]">Founder story image</p>
          <h2 className="mt-3 text-[32px] font-extrabold leading-tight">
            김종란 대표가
            <br />
            먼저 보는 것.
          </h2>
          <div className="mt-8 space-y-6 text-[12px] leading-7 text-[#333]">
            <p>
              moriah의 제품은 화려하게 주장하기보다 받는 사람의 생활 안으로 조용히 들어가야 한다는
              생각에서 출발합니다. 김종란 대표가 브랜드를 정리하며 세운 기준은 단순합니다. 믿음을
              말하는 표식이되, 매일 착용해도 부담스럽지 않아야 한다는 것.
            </p>
            <p>
              그래서 moriah는 크리스찬 악세사리를 기념품처럼만 다루지 않습니다. 목걸이의 길이,
              팔찌의 촉감, 선물 포장의 여백, 이메일 문의의 답장 톤까지 하나의 경험으로 보고
              정리합니다.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-2 text-center text-[10px] font-extrabold tracking-[0.12em]">
            {["FAITH", "GIFT", "CARE"].map((item) => (
              <div key={item} className="flex aspect-square items-center justify-center border border-black px-2">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 pt-28 md:grid-cols-[1fr_420px] md:items-end md:px-0">
        <div>
          <p className="text-[11px] font-semibold text-[#666]">Documents and care</p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-tight">
            신뢰는 작은 정보가
            <br />
            정확할 때 시작됩니다.
          </h2>
          <p className="mt-7 max-w-[650px] text-[12px] leading-7 text-[#333]">
            아기돌풍은 사업자 정보, 제품 범위, 문의 창구를 분명히 정리해 운영합니다. 모던한 분위기만
            앞세우기보다 고객이 확인해야 하는 기본 정보를 먼저 갖추고, 브랜드의 감도는 그 다음에
            차분히 쌓아갑니다.
          </p>
        </div>
        <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100">
          <Image
            src={businessImages.documents}
            alt="아기돌풍 공개 사업자 정보와 운영 문서를 상징하는 책상 이미지"
            fill
            sizes="(min-width: 768px) 420px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pt-24 md:px-0">
        <div className="grid gap-1.5 md:grid-cols-4">
          {principles.map((item) => (
            <article key={item.title} className="border border-black p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#777]">{item.title}</p>
              <h3 className="mt-4 text-[18px] font-extrabold leading-tight">{item.label}</h3>
              <p className="mt-6 text-[12px] leading-6 text-[#333]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pt-28 md:px-0">
        <div className="grid gap-5 md:grid-cols-[1fr_0.86fr] md:items-start">
          <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100">
            <Image
              src={businessImages.curation}
              alt="moriah 크리스찬 악세사리 선별 테이블"
              fill
              sizes="(min-width: 768px) 610px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[1024/1536] overflow-hidden bg-neutral-100 md:mt-20">
            <Image
              src={businessImages.office}
              alt="아기돌풍 김종란 대표 스토리를 표현한 작업실 연출 이미지"
              fill
              sizes="(min-width: 768px) 500px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-12 px-5 pt-28 md:grid-cols-[360px_1fr] md:px-0">
        <div>
          <p className="text-[11px] font-semibold text-[#666]">Business scope</p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-tight">
            아기돌풍이
            <br />
            준비하는 일
          </h2>
        </div>
        <div className="grid gap-0 border-y border-black">
          {scope.map((item) => (
            <p key={item} className="border-b border-black py-5 text-[17px] font-semibold last:border-b-0">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 pt-28 md:grid-cols-[1fr_420px] md:items-start md:px-0">
        <div>
          <p className="text-[11px] font-semibold text-[#666]">How moriah works</p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-tight">여기까지 오게 된 흐름</h2>
          <div className="mt-10 border-y border-black">
            {timeline.map((item) => (
              <article key={item.date} className="grid gap-4 border-b border-black py-6 last:border-b-0 md:grid-cols-[130px_1fr]">
                <p className="text-[12px] font-extrabold">{item.date}</p>
                <div>
                  <h3 className="text-[17px] font-extrabold">{item.title}</h3>
                  <p className="mt-4 text-[12px] leading-7 text-[#333]">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100 md:mt-20">
          <Image
            src={businessImages.packing}
            alt="moriah 선물 포장과 기독교 악세사리 패키징 이미지"
            fill
            sizes="(min-width: 768px) 420px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pt-28 md:px-0">
        <h2 className="text-[30px] font-extrabold leading-none">자주 묻는 질문</h2>
        <div className="mt-10 border-y border-black">
          {faqs.map((faq) => (
            <article key={faq.question} className="grid gap-5 border-b border-black py-7 last:border-b-0 md:grid-cols-[330px_1fr]">
              <h3 className="text-[17px] font-extrabold">{faq.question}</h3>
              <p className="text-[12px] leading-7 text-[#333]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 py-28 md:grid-cols-[1fr_auto] md:items-start md:px-0">
        <div>
          <h2 className="text-[31px] font-extrabold leading-tight">
            제품과 협업, 운영 문의는
            <br />
            한 통의 메일에서 시작합니다.
          </h2>
          <p className="mt-6 max-w-[650px] text-[12px] leading-7 text-[#333]">
            크리스찬 악세사리, 기독교 선물, 소량 패키지, 브랜드 협업에 대한 문의를 보내주시면
            아기돌풍의 공개 사업자 정보 기준 안에서 가능한 범위를 차분히 안내하겠습니다.
          </p>
        </div>
        <a
          href={`mailto:${site.email}?subject=moriah business inquiry`}
          className="inline-flex h-11 w-[210px] items-center justify-center border border-black bg-black text-[11px] font-semibold text-white"
        >
          사업 문의 보내기
        </a>
      </section>

      <footer className="bg-black px-5 py-20 text-white md:px-0">
        <div className="mx-auto grid w-full max-w-[1120px] gap-12 md:grid-cols-[1.5fr_0.8fr_0.8fr_1fr]">
          <div>
            <p className="text-[22px] font-semibold tracking-[0.42em]">moriah</p>
            <p className="mt-8 max-w-[520px] text-[10px] font-semibold leading-5 text-white/75">
              상호 {site.legalName} | 대표 {site.owner} | 사업자등록번호 {site.businessRegistration}
              <br />
              업태 {site.businessType} | 종목 {site.businessItem}
              <br />
              문의 {site.email}
            </p>
          </div>
          {[
            ["Brand", "Home", "News", "Collection", "Collaboration", "Business"],
            ["Business", site.legalName, site.owner, site.businessRegistration],
            ["Contact", site.email, site.businessItem, "moriah.work"],
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
                            : link === "Business"
                              ? "/business"
                              : "/#contact"
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
