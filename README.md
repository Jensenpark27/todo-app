# 할 일 관리 웹

로그인 없이 브라우저에서 바로 쓰는 간단한 할 일 관리 앱입니다.

## 기능
- 할 일 추가 (버튼 또는 Enter), 빈 입력은 무시
- 목록 보기 (최신 항목이 위), 삭제
- 완료 체크 — 완료한 항목은 취소선으로 표시
- 마감일 (선택) — 마감이 지난 미완료 항목은 빨간색으로 강조

데이터는 브라우저의 `localStorage`에 저장됩니다. 서버로 전송되지 않으며, 다른 기기나 브라우저와는 공유되지 않습니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm start` | 빌드한 앱 실행 |
| `npm run lint` | ESLint 검사 |

## 기술 스택
- Next.js 16 (App Router, JavaScript)
- CSS Modules

## 구조

```
app/page.js            제목 + TodoApp (브라우저에서만 렌더링)
components/TodoApp.js  상태 관리, localStorage 저장
components/TodoForm.js 입력창 + 마감일
components/TodoList.js 목록 / 빈 상태
components/TodoItem.js 항목 (체크박스, 마감일, 삭제)
lib/storage.js         localStorage 읽기/쓰기
lib/date.js            오늘 날짜, 마감 지남 판단
```

기획과 범위는 [PLAN.md](PLAN.md)를 참고하세요.
