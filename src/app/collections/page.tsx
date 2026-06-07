import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products, site } from "@/lib/site";

const collectionImages = {
  hero: "/images/motungi/collection/hero-studio.webp",
  director: "/images/motungi/collection/director-table.webp",
  hands: "/images/motungi/collection/hands-polish.webp",
  wall: "/images/motungi/collection/wall-cross.webp",
  material: "/images/motungi/collection/material-board.webp",
  sketch: "/images/motungi/collection/sketch-desk.webp",
  room: "/images/motungi/collection/prayer-room.webp",
  wear: "/images/motungi/collection/wear-daily.webp",
  gift: "/images/motungi/collection/gift-fold.webp",
};

const notes = [
  {
    title: "선의 두께",
    body: "십자가는 멀리서 크게 보이는 상징이기보다 손끝에서 매일 확인되는 작은 방향이어야 한다고 생각했습니다. 그래서 첫 스케치는 얇은 선과 부드러운 모서리에서 시작했습니다.",
  },
  {
    title: "빛의 자리",
    body: "하늘빛 에나멜은 장식보다 호흡에 가깝게 쓰였습니다. 금속의 차가운 면 위에 아주 작은 빛을 남겨, 착용한 사람이 먼저 알아차리는 표식을 만들었습니다.",
  },
  {
    title: "매일의 무게",
    body: "기도 팔찌와 목걸이는 하루 종일 몸에 닿습니다. 옷깃과 손목을 방해하지 않도록 중량과 체인 길이, 잠금 장치의 촉감을 반복해서 조정했습니다.",
  },
];

const related = [
  {
    title: "quiet cross pendant",
    src: collectionImages.wall,
    meta: "brushed silver · sky-blue enamel",
  },
  {
    title: "daily prayer bracelet",
    src: collectionImages.wear,
    meta: "leather cord · silver cross",
  },
  {
    title: "gift wrapping note",
    src: collectionImages.gift,
    meta: "linen ribbon · blank card",
  },
];

export const metadata: Metadata = {
  title: "The Quiet Cross Series | 모퉁이 Collections",
  description:
    "모퉁이의 첫 컬렉션 The Quiet Cross Series를 소개합니다. 의미 있는 악세사리와 선물 오브제를 위한 제작 노트와 착용 장면을 담았습니다.",
  alternates: {
    canonical: "/collections",
  },
  openGraph: {
    title: "The Quiet Cross Series | 모퉁이 Collections",
    description:
      "십자가 목걸이와 기도 팔찌를 조용한 일상의 표식으로 제안하는 모퉁이 크리스찬 굿즈 컬렉션 노트.",
    url: `${site.url}/collections`,
    images: [
      {
        url: collectionImages.hero,
        width: 1536,
        height: 1024,
        alt: "모퉁이 The Quiet Cross Series collection studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Quiet Cross Series | 모퉁이 Collections",
    description: "모퉁이 첫 크리스찬 굿즈 컬렉션의 제작 노트와 착용 장면.",
    images: [collectionImages.hero],
  },
};

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-white pt-[116px] text-[#101010] md:pt-[128px]">
      <article className="mx-auto w-full max-w-[760px] px-5 pb-24 md:px-0">
        <p className="pt-8 text-[13px] font-extrabold">A quiet sign, kept close</p>
        <h1 className="mt-4 max-w-[680px] text-[42px] font-extrabold leading-[1.04] md:text-[64px]">
          The Quiet Cross Series
        </h1>
        <p className="mt-5 max-w-[520px] text-[12px] leading-6 text-[#444]">
          하루의 소란을 지나 손목과 목선에 남는 작은 표식. 모퉁이의 첫 컬렉션은 믿음을 크게 외치기보다,
          조용히 오래 곁에 두는 물건을 상상하며 시작했습니다.
        </p>

        <div className="relative mt-10 aspect-[1536/1024] overflow-hidden bg-neutral-100">
          <Image
            src={collectionImages.hero}
            alt="모퉁이 컬렉션 스튜디오에서 십자가 악세사리를 정리하는 디렉터"
            fill
            priority
            sizes="(min-width: 768px) 760px, 100vw"
            className="object-cover"
          />
        </div>

        <section className="mt-14 grid gap-10 md:grid-cols-[240px_1fr]">
          <div>
            <p className="text-[11px] font-semibold text-[#666]">The 1st Collection</p>
            <h2 className="mt-2 text-[24px] font-extrabold leading-tight">SIGN</h2>
            <p className="mt-4 text-[11px] leading-5 text-[#555]">
              Designer note / 2026.06
              <br />
              Christian accessories
              <br />
              by {site.legalName}
            </p>
          </div>
          <div className="space-y-6 text-[12px] leading-7 text-[#222]">
            <p>
              The Quiet Cross Series는 큰 장식보다 오래 남는 촉감을 먼저 생각했습니다. 십자가의 형태는
              직선적이지만 날카롭지 않게 다듬고, 금속의 차가움 위에 아주 작은 하늘빛을 얹었습니다.
            </p>
            <p>
              이 컬렉션에서 십자가는 의상 위의 포인트가 아니라 하루를 정돈하는 기준점입니다. 가방을 챙기고,
              문을 나서고, 누군가에게 선물을 건네는 순간에도 부담 없이 이어지는 표식을 목표로 했습니다.
            </p>
          </div>
        </section>

        <section className="mt-24 grid gap-10 md:grid-cols-[1fr_320px] md:items-end">
          <div>
            <h2 className="text-[22px] font-extrabold leading-tight">첫 스케치는 손에 닿는 속도에서 시작했습니다.</h2>
            <p className="mt-6 text-[12px] leading-7 text-[#333]">
              목걸이와 팔찌는 착용하는 시간이 길수록 더 조용해야 합니다. 디렉터 한은 선을 덜어내는 방식으로
              첫 형태를 잡았습니다. 정면에서 상징은 분명하되, 측면에서는 옷깃과 피부를 방해하지 않는 두께를
              찾는 일이 핵심이었습니다.
            </p>
          </div>
          <div className="relative aspect-[1024/1536] overflow-hidden bg-neutral-100">
            <Image
              src={collectionImages.director}
              alt="모퉁이 컬렉션 디렉터가 십자가 목걸이 체인을 살펴보는 장면"
              fill
              sizes="(min-width: 768px) 320px, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <div className="mt-16 grid gap-10 md:grid-cols-[290px_1fr] md:items-start">
          <div className="relative aspect-[1024/1536] overflow-hidden bg-neutral-100 md:mt-16">
            <Image
              src={collectionImages.hands}
              alt="브러시드 실버 십자가 펜던트를 천으로 닦는 손"
              fill
              sizes="(min-width: 768px) 290px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-10">
            {notes.map((note) => (
              <section key={note.title} className="border-t border-black pt-5">
                <h3 className="text-[14px] font-extrabold">{note.title}</h3>
                <p className="mt-4 text-[12px] leading-7 text-[#333]">{note.body}</p>
              </section>
            ))}
          </div>
        </div>

        <section className="mt-24">
          <div className="relative mx-auto aspect-[1024/1536] w-full max-w-[420px] overflow-hidden bg-neutral-100">
            <Image
              src={collectionImages.wall}
              alt="하얀 벽에 걸린 하늘빛 포인트의 실버 십자가 목걸이"
              fill
              sizes="(min-width: 768px) 420px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mx-auto mt-9 max-w-[620px] text-[12px] leading-7 text-[#333]">
            제품의 표면은 완전히 반짝이지 않습니다. 빛을 모두 되돌려 보내는 광택보다, 방 안에 머무는 빛을
            부드럽게 받아들이는 질감을 택했습니다. 그 작은 차이가 매일 착용하는 물건의 분위기를 바꿉니다.
          </p>
        </section>

        <section className="mt-24 grid gap-5 md:grid-cols-2 md:items-start">
          <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100">
            <Image
              src={collectionImages.material}
              alt="모퉁이 컬렉션 소재 보드와 십자가 참"
              fill
              sizes="(min-width: 768px) 370px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100 md:mt-24">
            <Image
              src={collectionImages.sketch}
              alt="십자가 악세사리 스케치와 에나멜 샘플"
              fill
              sizes="(min-width: 768px) 370px, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="mt-20 grid gap-10 md:grid-cols-[1fr_300px] md:items-center">
          <div>
            <h2 className="text-[23px] font-extrabold leading-tight">기도의 순간은 방 안에도, 바깥에도 남습니다.</h2>
            <p className="mt-6 text-[12px] leading-7 text-[#333]">
              선물 포장에는 설명을 과하게 넣지 않았습니다. 받는 사람이 자신의 언어로 의미를 채울 수 있도록
              여백을 남기고, 소재와 색만으로 차분한 첫인상을 만들었습니다.
            </p>
          </div>
          <div className="relative aspect-[1024/1536] overflow-hidden bg-neutral-100">
            <Image
              src={collectionImages.room}
              alt="촛불과 린넨 옆에 놓인 십자가 목걸이"
              fill
              sizes="(min-width: 768px) 300px, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="mt-24">
          <div className="relative aspect-[1024/1536] w-full overflow-hidden bg-neutral-100 md:ml-auto md:w-[520px]">
            <Image
              src={collectionImages.wear}
              alt="기도 팔찌를 착용하고 컵을 든 모퉁이 디렉터"
              fill
              sizes="(min-width: 768px) 520px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-9 max-w-[620px] text-[12px] leading-7 text-[#333]">
            착용 컷에서는 악세사리가 얼굴보다 먼저 말하지 않게 했습니다. 소매 아래에서 한 번 보이고,
            컵을 들 때 다시 보이는 정도. 이 조용한 반복이 모퉁이가 생각하는 크리스찬 악세사리의 일상성입니다.
          </p>
        </section>

        <section className="mt-24">
          <div className="relative aspect-[1536/1024] overflow-hidden bg-neutral-100">
            <Image
              src={collectionImages.gift}
              alt="모퉁이 선물 포장과 십자가 목걸이를 정리하는 손"
              fill
              sizes="(min-width: 768px) 760px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-center text-[18px] font-extrabold leading-none text-[#b91c1c] md:text-[34px]">
                The Quiet Cross
                <br />
                SIGN
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 md:grid-cols-[1fr_220px] md:items-start">
          <div>
            <p className="text-[11px] font-semibold text-[#666]">The Quiet Cross Series</p>
            <h2 className="mt-2 text-[23px] font-extrabold leading-tight">가까이 두는 믿음의 표식</h2>
            <p className="mt-6 text-[12px] leading-7 text-[#333]">
              첫 컬렉션은 십자가 목걸이, 기도 팔찌, 선물 포장을 하나의 흐름으로 묶었습니다. 혼자 착용해도,
              누군가에게 건네도 조용히 오래 남는 물건이 되도록 작은 비례와 촉감을 조정했습니다.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-extrabold tracking-[0.12em]">
            {["QUIET", "DAILY", "SIGN"].map((item) => (
              <div key={item} className="flex aspect-square items-center justify-center border border-black px-2">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <Link key={item.title} href="/#products" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 244px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-4 text-[11px] font-extrabold">{item.title}</h3>
              <p className="mt-2 text-[10px] leading-4 text-[#555]">{item.meta}</p>
            </Link>
          ))}
        </section>

        <div className="mt-20 border-t border-black pt-8">
          <Link href="/" className="text-[12px] font-extrabold underline underline-offset-4">
            메인으로 돌아가기
          </Link>
        </div>
      </article>

      <footer className="bg-black px-5 py-20 text-white md:px-0">
        <div className="mx-auto grid w-full max-w-[760px] gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
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
            <Link href="/news" className="block">
              News
            </Link>
            <Link href="/collections" className="block text-white">
              Collection
            </Link>
            <Link href="/collaboration" className="block">
              Collaboration
            </Link>
            <Link href="/business" className="block">
              Business
            </Link>
            <Link href="/#products" className="block">
              Products
            </Link>
          </div>
          <div className="space-y-4 text-[11px] font-semibold text-white/75">
            {products.map((product) => (
              <Link key={product.title} href="/#products" className="block">
                {product.title}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
