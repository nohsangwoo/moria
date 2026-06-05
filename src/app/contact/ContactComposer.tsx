"use client";

import { FormEvent, useMemo, useState } from "react";

const inquiryTypes = [
  "제품 문의",
  "선물 패키지",
  "교회/소모임 협업",
  "편집숍/브랜드 협업",
  "사업자 정보 확인",
];

type ContactComposerProps = {
  email: string;
};

export function ContactComposer({ email }: ContactComposerProps) {
  const [type, setType] = useState(inquiryTypes[0]);
  const [name, setName] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = `[moriah] ${type}`;
    const body = [
      `문의 유형: ${type}`,
      `이름/단체명: ${name}`,
      `회신 연락처: ${replyTo}`,
      "",
      "문의 내용:",
      message,
    ].join("\n");

    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [email, message, name, replyTo, type]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = mailtoHref;
  }

  return (
    <form onSubmit={handleSubmit} className="border border-black p-5 md:p-7">
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-[11px] font-extrabold">문의 유형</span>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="h-11 w-full border border-black bg-white px-3 text-[12px] outline-none"
          >
            {inquiryTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-[11px] font-extrabold">이름/단체명</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-11 w-full border border-black px-3 text-[12px] outline-none"
              placeholder="예: 김종란 / 모리아"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] font-extrabold">회신 연락처</span>
            <input
              value={replyTo}
              onChange={(event) => setReplyTo(event.target.value)}
              className="h-11 w-full border border-black px-3 text-[12px] outline-none"
              placeholder="이메일 또는 전화번호"
            />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-[11px] font-extrabold">문의 내용</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-h-[190px] w-full resize-y border border-black px-3 py-3 text-[12px] leading-6 outline-none"
            placeholder="원하는 제품, 수량, 일정, 협업 목적을 적어주세요."
          />
        </label>

        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <p className="text-[11px] leading-5 text-[#555]">
            입력한 내용은 브라우저에 저장되지 않고, 메일 앱의 제목과 본문으로만 전달됩니다.
          </p>
          <button
            type="submit"
            className="inline-flex h-11 min-w-[180px] items-center justify-center border border-black bg-black px-5 text-[11px] font-semibold text-white"
          >
            메일로 문의하기
          </button>
        </div>
      </div>
    </form>
  );
}
