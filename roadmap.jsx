import { useState } from "react";

const phases = [
  {
    id: "phase0",
    num: "0",
    title: "규제 확인",
    subtitle: "모든 것의 전제조건",
    duration: "2~4주",
    color: "#dc2626",
    icon: "⚖️",
    why: "제품 개발에 수억을 쓰기 전에, 이 제품이 법적으로 판매 가능한지부터 확인해야 합니다. 디스크+어플리케이터 결합이 융복합 의료제품으로 분류되면 허가 기간과 비용이 2~3배로 뜁니다.",
    tasks: [
      { text: "식약처 사전 상담 신청", detail: "디스크+어플리케이터 결합 제품의 분류 확인. 각각 별도 허가? 합포장? 단일체?", critical: true },
      { text: "분류번호 확인", detail: "디스크 = 31300(월경컵), 어플리케이터 = 31200(탐폰삽입기) 또는 별도 분류?", critical: true },
      { text: "KIPRIS 특허 검색", detail: "'생리컵 어플리케이터', '월경디스크 삽입기' 한국 내 등록 특허 확인", critical: false },
      { text: "일회용 디스크 규제 확인", detail: "일회용과 재사용의 식약처 허가 요건 차이 파악", critical: false },
    ],
    gate: "식약처에서 '각각 별도 허가 가능' 또는 '합포장 가능' 확인 → Phase 1 진행\n'융복합 의료제품' 판정 시 → 허가 전략 재수립 (6개월+ 추가 소요 각오)",
    output: "식약처 분류 확정, 허가 소요기간/비용 추정치, 한국 내 특허 자유실시 확인"
  },
  {
    id: "phase1",
    num: "1",
    title: "프로토타입 & 사용성 검증",
    subtitle: "최소 비용으로 핵심 가설 증명",
    duration: "2~3개월",
    color: "#2563eb",
    icon: "🔬",
    why: "금형에 수천만 원 쓰기 전에, 3D 프린팅 프로토타입 + 해외 기존 제품으로 '어플리케이터가 정말 첫 시도 성공률을 올리는가'를 검증합니다.",
    tasks: [
      { text: "해외 제품 체험", detail: "Pixie Disc Applicator + Flex Disc 아마존 구매, 본인 + 지인 5~10명 1주기 사용", critical: true },
      { text: "3D 프린팅 프로토타입", detail: "의료용 레진으로 어플리케이터 시제품 제작. '안착 확인 피드백' 메커니즘 테스트", critical: true },
      { text: "커뮤니티 체험단 (20~30명)", detail: "해외 어플리케이터 소량 수입 → 더쿠/인스타 생리컵 커뮤니티 체험단 모집", critical: true },
      { text: "핵심 질문 검증", detail: "① 어플리케이터로 첫 시도 성공률이 올라가는가? ② 안착 확인이 가장 큰 불안인가? ③ 다시 쓸 의향이 있는가?", critical: true },
      { text: "태진실리콘 미팅", detail: "디스크+어플리케이터 개발 가능성, 금형비, MOQ, 일정 상담", critical: false },
    ],
    gate: "체험단 착용 성공률 50% 이상 & 재사용 의향 70% 이상 → Phase 2 진행\n미달 시 → 어플리케이터 설계 변경 또는 피벗 검토",
    output: "사용성 데이터, 제조사 견적, 어플리케이터 설계 방향 확정"
  },
  {
    id: "phase2",
    num: "2",
    title: "제품 개발 & 허가",
    subtitle: "제조사와 함께 양산 준비",
    duration: "6~12개월",
    color: "#7c3aed",
    icon: "🏭",
    why: "이 단계가 가장 길고 비용이 많이 듭니다. 금형 제작 → 생체적합성 시험 → 식약처 허가 → 양산. 동시에 브랜딩과 사전 마케팅을 병행합니다.",
    tasks: [
      { text: "금형 제작 (디스크 + 어플리케이터)", detail: "태진실리콘 또는 신성실리콘과 OEM 계약. 금형비 예상 2,000~5,000만원", critical: true },
      { text: "생체적합성 시험", detail: "세포독성, 피내반응, 감작성 등. 외부 시험기관 위탁. 3~6개월", critical: true },
      { text: "식약처 의약외품 허가 신청", detail: "디스크 품목허가 + 어플리케이터 분류에 따른 허가/신고", critical: true },
      { text: "일회용 디스크 동시 개발", detail: "재사용 디스크와 동일 금형 활용 가능 여부 확인. 일회용은 진입장벽 낮춤용", critical: false },
      { text: "브랜드 구축", detail: "브랜드명, BI, 패키지 디자인, 웹사이트, SNS 채널 개설", critical: false },
      { text: "온보딩 시스템 설계", detail: "삽입 가이드 카드, 실패 신호 체크리스트, 카카오톡 1:1 코칭 준비", critical: false },
      { text: "사전 커뮤니티 빌딩", detail: "인스타/블로그에서 생리디스크 교육 콘텐츠 발행, 대기자 명단 수집", critical: false },
    ],
    gate: "식약처 허가 취득 → Phase 3 진행\n허가 지연 시 → 일회용 디스크 단독 선출시 또는 어플리케이터 단독 판매 검토",
    output: "식약처 허가증, 양산 가능한 제품, 브랜드 에셋, 사전 대기자 리스트"
  },
  {
    id: "phase3",
    num: "3",
    title: "런칭 & 초기 견인",
    subtitle: "1,000명의 열성 사용자 확보",
    duration: "3~6개월",
    color: "#059669",
    icon: "🚀",
    why: "이 시장에서 광고보다 커뮤니티 구전이 강력합니다. 첫 1,000명의 성공적 사용자를 만드는 것이 모든 것의 시작입니다.",
    tasks: [
      { text: "텀블벅/와디즈 크라우드펀딩", detail: "포이컵이 텀블벅에서 하루만에 100%, 9일만에 1000% 달성. 검증된 채널", critical: true },
      { text: "일회용 디스크 체험팩 선출시", detail: "저가 진입점(5,000~10,000원)으로 체내삽입 장벽 낮추기. 재사용 전환 퍼널의 1단계", critical: true },
      { text: "쿠팡 입점", detail: "Pixie Cup의 Amazon 전략. 자체몰보다 플랫폼 트래픽이 초기에 압도적", critical: false },
      { text: "1:1 온보딩 코칭 운영", detail: "카카오톡 채널로 첫 사용자 실시간 가이드. 초기에는 창업자 직접 수행", critical: true },
      { text: "사용 후기 수집 & 확산", detail: "성공 후기를 인스타/더쿠/블로그에 체계적으로 확산", critical: false },
    ],
    gate: "펀딩 목표 달성 & 첫 1,000개 판매 → Phase 4 진행\n미달 시 → 타겟/포지셔닝/가격 재검토",
    output: "첫 고객 1,000명, NPS 데이터, 재구매/추천 의향 데이터"
  },
  {
    id: "phase4",
    num: "4",
    title: "확장 & LTV 구축",
    subtitle: "단일 제품에서 생태계로",
    duration: "6~12개월",
    color: "#ca8a04",
    icon: "📈",
    why: "재사용 디스크는 재구매 주기가 2~3년. 디스크만 팔면 매출이 정체됩니다. 소모품 라인으로 LTV를 높이고, 탐폰 호환 어플리케이터로 TAM을 확장합니다.",
    tasks: [
      { text: "소모품 라인 확장", detail: "세정제, 윤활젤, 소독컵, 휴대파우치, 생리팬티 → 월 반복 매출 창출", critical: true },
      { text: "탐폰 호환 어플리케이터 출시", detail: "기존 어플리케이터의 TAM 확장. 탐폰 시장 10%에 접근 가능", critical: true },
      { text: "구독 모델 도입", detail: "일회용 디스크 + 세정제 + 윤활젤 월정액 구독", critical: false },
      { text: "커뮤니티 & 교육 플랫폼", detail: "루나컵처럼 월경교육 프로그램 운영. 브랜드 해자 구축", critical: false },
      { text: "해외 진출 검토", detail: "일본(비슷한 문화적 장벽), 동남아(생리 빈곤 시장)", critical: false },
    ],
    gate: "월 매출 안정적 성장 & 소모품 비중 30% 이상 → 지속 성장 궤도\n정체 시 → 제품 라인 재구성 또는 B2B(산부인과 납품) 전환 검토",
    output: "다제품 포트폴리오, 반복 매출 구조, 확장 가능한 비즈니스 모델"
  },
];

const bigPicture = {
  north_star: "체내삽입형 생리용품의 첫 경험을 성공시키는 회사",
  product_ladder: [
    { step: "1", name: "일회용 디스크 체험팩", price: "5,000~10,000원", purpose: "진입장벽 최소화. '한번 써볼까?' 유도", color: "#93c5fd" },
    { step: "2", name: "어플리케이터 + 일회용 디스크 세트", price: "15,000~20,000원", purpose: "어플리케이터 가치 체험. 핵심 제품", color: "#60a5fa" },
    { step: "3", name: "어플리케이터 + 재사용 디스크 세트", price: "35,000~45,000원", purpose: "전환 성공자의 '본품'. 높은 마진", color: "#3b82f6" },
    { step: "4", name: "소모품 구독 (세정제/윤활젤/일회용)", price: "월 10,000~15,000원", purpose: "LTV 극대화. 반복 매출", color: "#2563eb" },
    { step: "5", name: "탐폰 호환 어플리케이터", price: "15,000~20,000원", purpose: "TAM 확장. 탐폰 사용자 10%에 접근", color: "#1d4ed8" },
  ],
  critical_risks: [
    { risk: "식약처 분류 리스크", impact: "치명적", mitigation: "Phase 0에서 사전 상담으로 선제 확인" },
    { risk: "어플리케이터 가설 실패", impact: "치명적", mitigation: "Phase 1에서 저비용 검증 후 진행" },
    { risk: "시장 규모 한계", impact: "높음", mitigation: "탐폰 호환 + 소모품으로 TAM/LTV 확장" },
    { risk: "기존 플레이어 선점", impact: "중간", mitigation: "'안착 확인' 차별화 + 온보딩 경험으로 해자 구축" },
    { risk: "자금 고갈", impact: "높음", mitigation: "크라우드펀딩으로 사전 수요 확인 + 자금 확보 동시 달성" },
  ]
};

function PhaseCard({ phase, isOpen, onToggle }) {
  return (
    <div style={{
      border: `2px solid ${phase.color}20`,
      borderRadius: 14,
      marginBottom: 12,
      overflow: "hidden",
      background: "#fff",
      transition: "all 0.2s",
      boxShadow: isOpen ? `0 4px 20px ${phase.color}15` : "none",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "16px 20px",
          background: isOpen ? `${phase.color}08` : "#fff",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 14,
          textAlign: "left",
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: phase.color, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0,
        }}>
          {phase.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: phase.color, textTransform: "uppercase", letterSpacing: 1 }}>
              Phase {phase.num}
            </span>
            <span style={{ fontSize: 10, color: "#94a3b8", background: "#f1f5f9", padding: "2px 8px", borderRadius: 4 }}>
              {phase.duration}
            </span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginTop: 2 }}>{phase.title}</div>
          <div style={{ fontSize: 11, color: "#64748b" }}>{phase.subtitle}</div>
        </div>
        <span style={{ fontSize: 18, color: "#94a3b8", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
      </button>

      {isOpen && (
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ background: `${phase.color}08`, borderRadius: 8, padding: 12, marginBottom: 14, borderLeft: `3px solid ${phase.color}` }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: phase.color, marginBottom: 4 }}>왜 이 단계가 필요한가</div>
            <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.7 }}>{phase.why}</div>
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>할 일</div>
          {phase.tasks.map((task, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, padding: "8px 10px", background: task.critical ? "#fef2f2" : "#f8fafc", borderRadius: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: task.critical ? "#dc2626" : "#94a3b8", flexShrink: 0, marginTop: 2 }}>
                {task.critical ? "★" : "○"}
              </span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>{task.text}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{task.detail}</div>
              </div>
            </div>
          ))}

          <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: 12, marginTop: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>🚦 GO / NO-GO 게이트</div>
            <div style={{ fontSize: 11, color: "#78350f", lineHeight: 1.7, whiteSpace: "pre-line" }}>{phase.gate}</div>
          </div>

          <div style={{ marginTop: 10, fontSize: 10, color: "#94a3b8" }}>
            <strong>산출물:</strong> {phase.output}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EasyCupRoadmap() {
  const [openPhase, setOpenPhase] = useState("phase0");
  const [showLadder, setShowLadder] = useState(false);
  const [showRisks, setShowRisks] = useState(false);

  return (
    <div style={{
      fontFamily: "'Pretendard', -apple-system, sans-serif",
      maxWidth: 720,
      margin: "0 auto",
      padding: "24px 16px",
      background: "#fff",
      minHeight: "100vh",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>
          Easy Cup — Strategic Roadmap
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", margin: 0, lineHeight: 1.2 }}>
          큰 그림
        </h1>
        <p style={{ fontSize: 12, color: "#64748b", marginTop: 8, lineHeight: 1.7 }}>
          <strong style={{ color: "#0f172a" }}>North Star:</strong> {bigPicture.north_star}
        </p>
        <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 4, lineHeight: 1.6 }}>
          어플리케이터 = 도구. 진짜 파는 것 = "처음 넣어봤는데 성공했다"는 경험.<br/>
          일회용으로 진입 → 어플리케이터로 성공 → 재사용으로 전환 → 소모품으로 LTV.
        </p>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", marginBottom: 28 }}>
        <div style={{
          display: "flex", gap: 0, marginBottom: 16,
          background: "#f8fafc", borderRadius: 10, overflow: "hidden",
          border: "1px solid #e2e8f0"
        }}>
          {phases.map((p, i) => (
            <div
              key={p.id}
              onClick={() => setOpenPhase(p.id)}
              style={{
                flex: 1,
                padding: "10px 4px",
                textAlign: "center",
                cursor: "pointer",
                background: openPhase === p.id ? p.color : "transparent",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 9, fontWeight: 800, color: openPhase === p.id ? "#fff" : "#94a3b8" }}>
                P{p.num}
              </div>
              <div style={{ fontSize: 9, fontWeight: 600, color: openPhase === p.id ? "#ffffffcc" : "#cbd5e1", marginTop: 1 }}>
                {p.duration}
              </div>
            </div>
          ))}
        </div>

        {phases.map(phase => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            isOpen={openPhase === phase.id}
            onToggle={() => setOpenPhase(openPhase === phase.id ? null : phase.id)}
          />
        ))}
      </div>

      {/* Product Ladder */}
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setShowLadder(!showLadder)}
          style={{
            width: "100%", padding: "14px 20px",
            background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12,
            cursor: "pointer", textAlign: "left",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1e40af" }}>🪜 제품 사다리 (Product Ladder)</div>
            <div style={{ fontSize: 10, color: "#3b82f6", marginTop: 2 }}>고객을 어떤 순서로 전환시킬 것인가</div>
          </div>
          <span style={{ color: "#3b82f6", transform: showLadder ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
        </button>
        {showLadder && (
          <div style={{ padding: "16px 0" }}>
            {bigPicture.product_ladder.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "stretch", gap: 12, marginBottom: 8,
              }}>
                <div style={{
                  width: 36, display: "flex", flexDirection: "column", alignItems: "center",
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: item.color, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 800, flexShrink: 0,
                  }}>{item.step}</div>
                  {i < bigPicture.product_ladder.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: "#e2e8f0", marginTop: 4 }} />
                  )}
                </div>
                <div style={{
                  flex: 1, background: "#f8fafc", borderRadius: 10, padding: "10px 14px",
                  borderLeft: `3px solid ${item.color}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{item.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: "monospace" }}>{item.price}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "#64748b", marginTop: 3 }}>{item.purpose}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Risk Matrix */}
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setShowRisks(!showRisks)}
          style={{
            width: "100%", padding: "14px 20px",
            background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12,
            cursor: "pointer", textAlign: "left",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#991b1b" }}>⚠️ 핵심 리스크 & 대응</div>
            <div style={{ fontSize: 10, color: "#dc2626", marginTop: 2 }}>이 중 하나라도 터지면 사업이 흔들리는 것들</div>
          </div>
          <span style={{ color: "#dc2626", transform: showRisks ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
        </button>
        {showRisks && (
          <div style={{ padding: "12px 0" }}>
            {bigPicture.critical_risks.map((r, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, padding: "10px 14px", marginBottom: 6,
                background: r.impact === "치명적" ? "#fef2f2" : "#fffbeb",
                borderRadius: 8,
                borderLeft: `3px solid ${r.impact === "치명적" ? "#dc2626" : r.impact === "높음" ? "#ca8a04" : "#64748b"}`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>{r.risk}</div>
                  <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>대응: {r.mitigation}</div>
                </div>
                <span style={{
                  fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 4, alignSelf: "flex-start",
                  background: r.impact === "치명적" ? "#dc2626" : r.impact === "높음" ? "#ca8a04" : "#64748b",
                  color: "#fff",
                }}>{r.impact}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Line */}
      <div style={{
        background: "#0f172a", borderRadius: 14, padding: "20px 24px",
        color: "#fff",
      }}>
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 10 }}>💡 가장 중요한 원칙</div>
        <div style={{ fontSize: 12, lineHeight: 2.0, color: "#cbd5e1" }}>
          <strong style={{ color: "#fff" }}>1. 돈 쓰기 전에 검증.</strong> Phase 0~1에서 100만원 이내로 핵심 가설 2개(규제 OK, 어플리케이터 효과)를 증명하세요. 이게 안 되면 나머지 수억 원을 아끼는 겁니다.<br/><br/>
          <strong style={{ color: "#fff" }}>2. 일회용이 재사용의 입구.</strong> Flex Disc의 미국 성공 공식 = 일회용 → 재사용 → 구독. 한국에서도 이 순서가 맞습니다. 재사용 디스크를 바로 팔지 말고, 일회용 체험으로 "성공 경험"을 먼저 만들어주세요.<br/><br/>
          <strong style={{ color: "#fff" }}>3. 제품이 아니라 경험을 팔아라.</strong> 어플리케이터는 도구일 뿐. 진짜 가치는 "처음 써봤는데 성공했다"는 경험. 온보딩(가이드, 코칭, 체크리스트)이 어플리케이터만큼 중요합니다.<br/><br/>
          <strong style={{ color: "#fff" }}>4. 이번 주 할 일 딱 하나.</strong> 식약처에 전화하세요. 031-780-9114. "생리디스크와 어플리케이터 결합 제품 허가 관련 사전상담을 받고 싶습니다." 이 전화 한 통이 전체 타임라인을 결정합니다.
        </div>
      </div>
    </div>
  );
}
