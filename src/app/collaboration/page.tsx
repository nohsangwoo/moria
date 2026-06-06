import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const collaborationImages = {
  hero: "/images/motungi/collaboration/hero-partnership.webp",
  giftTable: "/images/motungi/collaboration/gift-table.webp",
  partnerReview: "/images/motungi/collaboration/partner-review.webp",
  customKit: "/images/motungi/collaboration/custom-kit.webp",
  retailDisplay: "/images/motungi/collaboration/retail-display.webp",
  workshopHands: "/images/motungi/collaboration/workshop-hands.webp",
  closingBundles: "/images/motungi/collaboration/closing-bundles.webp",
};

const partnerTracks = [
  {
    title: "교회 · 소모임 선물",
    eyebrow: "Church & Group",
    body: "수련회, 세례, 입교, 감사 선물처럼 오래 기억되어야 하는 순간에 맞춰 십자가 목걸이와 기도 팔찌, 메시지 카드를 하나의 선물 흐름으로 구성합니다.",
  },
  {
    title: "브랜드 · 크리에이터 협업",
    eyebrow: "Brand Collaboration",
    body: "신앙의 결을 가진 콘텐츠, 공간, 라이프스타일 브랜드와 함께 한정 패키지와 공동 큐레이션을 만듭니다. 과한 로고보다 서로의 분위기가 자연스럽게 남는 방식을 우선합니다.",
  },
  {
    title: "편집숍 · 팝업 디스플레이",
    eyebrow: "Retail & Pop-up",
    body: "작은 진열대, 선물 테이블, 시즌 팝업에 어울리는 제품 구성을 제안합니다. 매장 안에서 조용히 시선을 붙잡는 소재와 높이, 컬러를 함께 설계합니다.",
  },
];

const process = [
  ["01", "Purpose", "누구에게, 어떤 계기로, 얼마나 오래 기억되길 바라는지 먼저 정리합니다."],
  ["02", "Curation", "예산과 수량, 대상의 연령대에 맞춰 목걸이·팔찌·패키지를 조합합니다."],
  ["03", "Sample", "소재감, 카드 톤, 리본 컬러, 포장 방식을 샘플 이미지와 함께 좁혀갑니다."],
  ["04", "Production", "확정된 구성에 맞춰 제품과 패키지를 준비하고 검수 기준을 공유합니다."],
  ["05", "Delivery", "행사 일정이나 팝업 오픈일에 맞춰 묶음 단위로 정리해 발송합니다."],
  ["06", "After Note", "반응과 재주문 가능성을 확인해 다음 시즌 구성을 더 단단하게 만듭니다."],
];

const scenarios = [
  "수련회 마지막 날 나누는 기도 팔찌 세트",
  "세례와 입교를 위한 십자가 목걸이 선물",
  "크리스마스 시즌 편집숍 한정 패키지",
  "감사 주일, 교사와 리더를 위한 작은 선물",
  "기독교 콘텐츠 채널과 함께 만드는 공동 굿즈",
  "카페·서점·스튜디오 팝업용 미니 디스플레이",
];

const faqs = [
  {
    q: "최소 수량이 정해져 있나요?",
    a: "제품과 패키지 구성에 따라 달라집니다. 작은 소모임 선물처럼 낮은 수량도 검토할 수 있고, 행사 일정이 정해져 있다면 먼저 수량과 희망 납기를 알려주시면 됩니다.",
  },
  {
    q: "문구나 로고를 넣을 수 있나요?",
    a: "브랜드 톤을 해치지 않는 범위에서 카드, 슬리브, 리본 컬러 같은 요소를 조정할 수 있습니다. 다만 제품 자체에는 과도한 로고 노출보다 오래 착용 가능한 형태를 권합니다.",
  },
  {
    q: "교회 행사가 아니어도 가능한가요?",
    a: "가능합니다. 신앙의 메시지와 잘 맞는 공간, 콘텐츠, 선물 프로젝트라면 편집숍, 크리에이터, 작은 브랜드와의 협업도 함께 검토합니다.",
  },
];

export const metadata: Metadata = {
  title: "Collaboration | 모퉁이",
  description:
    "모퉁이 협업 페이지입니다. 교회 굿즈, 소모임 선물, 브랜드 협업, 편집숍 팝업을 위한 모던 크리스찬 굿즈와 악세사리 큐레이션을 제안합니다.",
  alternates: {
    canonical: "/collaboration",
  },
  openGraph: {
    title: "Collaboration | 모퉁이",
    description:
      "교회 선물과 브랜드 협업을 위한 모퉁이의 모던 크리스찬 굿즈 파트너십.",
    url: `${site.url}/collaboration`,
    images: [
      {
        url: collaborationImages.hero,
        width: 1536,
        height: 1024,
        alt: "모퉁이 Christian accessory collaboration table",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Collaboration | 모퉁이",
    description: "교회 굿즈, 브랜드 협업, 편집숍 팝업을 위한 모퉁이 협업 안내.",
    images: [collaborationImages.hero],
  },
};

export default function CollaborationPage() {
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
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <section className="mx-auto w-full max-w-[1120px] px-5 pt-8 md:px-0">
        <div className="grid gap-10 md:grid-cols-[0.78fr_1.22fr] md:items-end">
          <div className="pb-2">
            <p className="text-[13px] font-extrabold">Collaboration</p>
            <h1 className="mt-5 text-[43px] font-extrabold leading-[1.03] md:text-[72px]">
              Quiet gifts,
              <br />
              shared meaning.
            </h1>
            <p className="mt-6 max-w-[430px] text-[12px] leading-7 text-[#333]">
              모퉁이는 십자가 목걸이와 기도 팔찌를 단순한 굿즈가 아니라 오래 남는 선물 경험으로
              큐레이션합니다. 교회, 소모임, 브랜드, 편집숍과 함께 조용하지만 분명한 협업을 만듭니다.
            </p>
          </div>
          <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100">
            <Image
              src={collaborationImages.hero}
              alt="모퉁이 협업 테이블 위의 십자가 악세사리와 선물 패키지"
              fill
              priority
              sizes="(min-width: 1120px) 680px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 pt-20 md:grid-cols-[260px_1fr] md:px-0">
        <div>
          <p className="text-[11px] font-semibold text-[#666]">모퉁이 partnership note</p>
          <h2 className="mt-3 text-[26px] font-extrabold leading-tight">
            함께 만든 선물이
            <br />
            더 오래 남도록.
          </h2>
        </div>
        <div className="grid gap-7 text-[12px] leading-7 text-[#222] md:grid-cols-2">
          <p>
            협업의 시작은 제품 목록이 아니라 선물을 받는 사람입니다. 누군가의 첫 신앙 고백, 공동체가 함께
            지나온 계절, 고마운 사람에게 건네고 싶은 마음을 먼저 듣고 제품과 포장, 전달 방식을 맞춥니다.
          </p>
          <p>
            모퉁이의 협업은 크게 보이는 캠페인보다 손에 남는 경험을 지향합니다. 리본의 색, 카드의 여백,
            제품을 꺼내는 순서까지 하나의 조용한 장면으로 설계합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pt-24 md:px-0">
        <div className="grid gap-1.5 md:grid-cols-3">
          {partnerTracks.map((track) => (
            <article key={track.title} className="border border-black p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#777]">{track.eyebrow}</p>
              <h2 className="mt-4 text-[18px] font-extrabold leading-tight">{track.title}</h2>
              <p className="mt-6 text-[12px] leading-6 text-[#333]">{track.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 pt-28 md:grid-cols-[1fr_430px] md:items-end md:px-0">
        <div>
          <p className="text-[11px] font-semibold text-[#666]">Gift curation</p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-tight">
            행사의 끝이 아니라,
            <br />
            기억의 시작이 되는 선물.
          </h2>
          <p className="mt-7 max-w-[620px] text-[12px] leading-7 text-[#333]">
            같은 제품이라도 어떤 자리에서 건네지는지에 따라 전혀 다른 의미가 됩니다. 수련회 마지막 예배,
            감사 주일, 새가족 환영, 작은 리트릿처럼 선물의 온도가 달라지는 순간에 맞춰 구성합니다.
          </p>
        </div>
        <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100">
          <Image
            src={collaborationImages.giftTable}
            alt="교회와 소모임 선물을 위한 모퉁이 기프트 테이블"
            fill
            sizes="(min-width: 768px) 430px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-16 px-5 pt-24 md:grid-cols-[380px_1fr] md:items-start md:px-0">
        <div className="relative aspect-[1024/1536] overflow-hidden bg-neutral-100">
          <Image
            src={collaborationImages.partnerReview}
            alt="모퉁이 협업 파트너가 패키지 샘플을 함께 검토하는 장면"
            fill
            sizes="(min-width: 768px) 380px, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#666]">How it works</p>
          <h2 className="mt-3 text-[29px] font-extrabold leading-tight">
            작게 시작해도
            <br />
            과정은 분명하게.
          </h2>
          <div className="mt-10 border-y border-black">
            {process.map(([step, title, body]) => (
              <article key={step} className="grid gap-4 border-b border-black py-6 last:border-b-0 md:grid-cols-[92px_1fr]">
                <p className="text-[13px] font-extrabold">{step}</p>
                <div>
                  <h3 className="text-[16px] font-extrabold">{title}</h3>
                  <p className="mt-3 text-[12px] leading-6 text-[#333]">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pt-28 md:px-0">
        <div className="grid gap-5 md:grid-cols-[0.95fr_1.05fr] md:items-start">
          <div className="relative aspect-[1024/1536] overflow-hidden bg-neutral-100">
            <Image
              src={collaborationImages.customKit}
              alt="커스텀 협업 키트 안의 십자가 목걸이와 기도 팔찌"
              fill
              sizes="(min-width: 768px) 530px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[1024/1536] overflow-hidden bg-neutral-100 md:mt-24">
            <Image
              src={collaborationImages.retailDisplay}
              alt="편집숍과 팝업을 위한 모퉁이 악세사리 디스플레이"
              fill
              sizes="(min-width: 768px) 570px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 pt-24 md:grid-cols-[1fr_420px] md:items-start md:px-0">
        <div>
          <p className="text-[11px] font-semibold text-[#666]">Collaboration scenes</p>
          <h2 className="mt-3 text-[29px] font-extrabold leading-tight">이런 장면을 함께 만들 수 있습니다.</h2>
          <div className="mt-9 grid gap-0 border-y border-black">
            {scenarios.map((scenario) => (
              <p key={scenario} className="border-b border-black py-4 text-[17px] font-semibold last:border-b-0">
                {scenario}
              </p>
            ))}
          </div>
        </div>
        <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100 md:mt-20">
          <Image
            src={collaborationImages.workshopHands}
            alt="여러 사람이 모퉁이 선물 패키지를 함께 조립하는 손 작업 장면"
            fill
            sizes="(min-width: 768px) 420px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pt-28 md:px-0">
        <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100">
          <Image
            src={collaborationImages.closingBundles}
            alt="완성된 모퉁이 협업 선물 번들"
            fill
            sizes="(min-width: 1120px) 1120px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/5">
            <p className="text-center text-[28px] font-extrabold leading-tight text-white drop-shadow md:text-[54px]">
              prepared quietly,
              <br />
              remembered clearly.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 pt-28 md:grid-cols-[360px_1fr] md:px-0">
        <div>
          <p className="text-[11px] font-semibold text-[#666]">Before inquiry</p>
          <h2 className="mt-3 text-[29px] font-extrabold leading-tight">문의 전에 정리하면 좋은 것들</h2>
        </div>
        <div className="grid gap-1.5 md:grid-cols-2">
          {[
            "예상 수량과 희망 납기",
            "선물을 받는 대상과 연령대",
            "행사나 캠페인의 이름과 분위기",
            "희망 제품군과 예산 범위",
            "카드, 리본, 포장 커스텀 필요 여부",
            "배송 방식과 묶음 단위",
          ].map((item) => (
            <div key={item} className="border border-black px-5 py-4 text-[12px] font-semibold">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 pt-24 md:px-0">
        <h2 className="text-[29px] font-extrabold leading-none">자주 묻는 질문</h2>
        <div className="mt-10 border-y border-black">
          {faqs.map((faq) => (
            <article key={faq.q} className="grid gap-5 border-b border-black py-7 last:border-b-0 md:grid-cols-[330px_1fr]">
              <h3 className="text-[17px] font-extrabold">{faq.q}</h3>
              <p className="text-[12px] leading-7 text-[#333]">{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 py-28 md:grid-cols-[1fr_auto] md:items-start md:px-0">
        <div>
          <h2 className="text-[31px] font-extrabold leading-tight">
            함께 만들 선물의 장면을
            <br />
            먼저 들려주세요.
          </h2>
          <p className="mt-6 max-w-[650px] text-[12px] leading-7 text-[#333]">
            제품명보다 먼저 필요한 것은 마음의 방향입니다. 어떤 사람에게 어떤 기억으로 남기고 싶은지 보내주시면,
            모퉁이의 톤 안에서 가능한 협업 구성을 제안하겠습니다.
          </p>
        </div>
        <a
          href={`mailto:${site.email}?subject=모퉁이 collaboration inquiry`}
          className="inline-flex h-11 w-[210px] items-center justify-center border border-black bg-black text-[11px] font-semibold text-white"
        >
          협업 문의 보내기
        </a>
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
            ["Brand", "Home", "News", "Collection", "Collaboration", "Business"],
            ["Partnership", "Church gift", "Custom kit", "Retail display"],
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
                            : link === "Business"
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
