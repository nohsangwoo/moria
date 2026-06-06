# Grok Video Prompts

모퉁이 사이트의 정적인 페이지 이미지를 짧은 브랜드 영상으로 확장하기 위한 Grok용 프롬프트 모음입니다. 각 프롬프트는 6-8초, 16:9, 자연스러운 슬로우 무브먼트, 미니멀 쇼핑몰 톤을 기준으로 작성했습니다.

Generated outputs are stored in `docs/media/grok-videos`. The committed drafts were generated with `grok-imagine-video`, 6 seconds, `16:9`, `480p`.

## 공통 네거티브

No readable text, no misspelled logo, no extra brand names, no distorted hands, no flickering jewelry, no exaggerated religious scene, no dark dramatic lighting, no busy background, no fast cuts, no camera shake, no watermark.

## Home

Source images:
- `public/images/motungi/hero.webp`
- `public/images/motungi/arrival-2.webp`
- `public/brand/motungi-logo-mark.png`

Prompt:
Create a minimal premium product film for a Korean goods official store named Motungi. A quiet white studio tabletop with small meaningful accessories, soft daylight, cream paper, matte black accent, and subtle folded-corner motif inspired by the Motungi logo. Slow dolly-in from left to right, gentle highlight moving across metal and packaging, calm editorial mood, refined ecommerce brand film. Keep the scene clean and spacious with no readable text.

## Collections

Source images:
- `public/images/motungi/collection/hero-studio.webp`
- `public/images/motungi/collection/wall-cross.webp`
- `public/images/motungi/collection/gift-fold.webp`

Prompt:
Create a quiet collection teaser video for Motungi. Show a calm studio desk, a small pendant, folded gift wrap, and a pale wall display. The camera glides slowly over the object surfaces, then settles on a minimal accessory resting near soft cream paper. Use warm white light, very subtle shadow movement, premium editorial composition, and a gentle sense of craft. No readable text.

## Collaboration

Source images:
- `public/images/motungi/collaboration/hero-partnership.webp`
- `public/images/motungi/collaboration/gift-table.webp`
- `public/images/motungi/collaboration/custom-kit.webp`

Prompt:
Create a refined partnership film for Motungi. A curated collaboration table with gift boxes, small accessories, sample cards, and soft neutral fabric. Slow overhead camera movement, hands entering briefly to arrange a ribbon and package, elegant retail collaboration mood, clean Korean lifestyle brand aesthetic. Keep motion natural and unhurried. No readable text.

## News

Source images:
- `public/images/motungi/news/hero-showroom.webp`
- `public/images/motungi/news/showroom-view.webp`
- `public/images/motungi/news/new-pendant.webp`

Prompt:
Create a seasonal showroom preview video for Motungi. A minimal showroom wall, pale natural light, a small accessory display, and a quiet product moment. The camera moves like a soft showroom walkthrough, with curtains and shadows moving gently. Make it feel like a new release announcement for a refined object and gift brand. No readable text, no event poster typography.

## Business Info

Source images:
- `public/images/motungi/business/hero-desk.webp`
- `public/images/motungi/business/documents-desk.webp`
- `public/images/motungi/business/packing-hands.webp`

Prompt:
Create a trustworthy business story film for Motungi operated by Agidolfung. A neat desk with documents, product samples, packaging materials, and warm daylight. Slow push-in over organized papers and gift packaging, calm founder-operated store mood, transparent and reliable small business atmosphere. Avoid showing private addresses or readable document details.

## Contact

Source images:
- `public/images/motungi/business/packing-hands.webp`
- `public/images/motungi/collaboration/gift-table.webp`
- `public/images/motungi/news/showroom-view.webp`

Prompt:
Create a calm contact page background video for Motungi. Show gift packaging being prepared on a clean desk, a soft email-ready workspace mood, small product samples, cream paper, and black accent details. Slow hand movement tying a ribbon, gentle camera slide, peaceful inquiry and consultation atmosphere. No readable text, no UI, no brand misspelling.

## Export Recommendation

- Duration: 6-8 seconds
- Aspect ratio: 16:9 for README/portfolio, 9:16 variant only if using reels or shorts
- Style: minimal editorial product film
- Motion: slow dolly, soft parallax, no hard cuts
- Use: replace or supplement `docs/media/moriah-walkthrough.webm` sections after generation
