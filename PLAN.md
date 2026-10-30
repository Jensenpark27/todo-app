# 할 일 관리 웹 — PLAN

## 개요
브라우저에서 쓰는 간단한 할 일 관리 웹. 로그인 없이 한 기기·한 브라우저에서 개인용으로 사용한다.

## 기술 스택
- **Next.js (JavaScript, App Router)** — TypeScript 사용 안 함
- **스타일링:** CSS Modules (추가 라이브러리 없음)
- **저장소:** 브라우저 `localStorage` (서버·DB 없음)

## 범위

### 1차 (MVP)
- [x] **할 일 추가** — 입력창에 텍스트 입력 후 버튼 또는 Enter로 추가
  - 앞뒤 공백 제거, 빈 문자열은 추가하지 않음
- [x] **목록 보기** — 추가된 할 일을 목록으로 표시 (최신 항목이 위)
  - 항목이 없으면 "할 일이 없습니다" 안내 문구 표시
- [x] **삭제** — 각 항목의 삭제 버튼으로 즉시 삭제 (확인 창 없음)
- [x] **저장** — 변경 시마다 `localStorage`에 저장, 새로고침해도 유지

### 추가 (2차)
- [ ] **완료 체크** — 체크박스로 완료/미완료 토글, 완료된 항목은 취소선 + 흐리게 표시
- [ ] **마감일**
  - 추가할 때 날짜 선택(`<input type="date">`), **선택 입력**(비워도 됨), 시간은 없음
  - 목록에 마감일 표시 (없으면 표시 안 함)
  - 마감일이 오늘보다 이전이고 **미완료**인 항목은 빨간색으로 강조

### 하지 않을 것
- 로그인 / 회원 관리
- 공유 / 협업, 기기 간 동기화
- 할 일 **수정** (고치려면 삭제 후 다시 추가)
- 서버 저장 / DB
- 정렬·필터·검색, 카테고리·태그, 알림

## 데이터 구조
`localStorage` 키 `todos`에 배열(JSON)로 저장한다.

```js
{
  id: "string",          // crypto.randomUUID()
  text: "string",        // 할 일 내용
  done: false,           // 완료 여부 (2차)
  dueDate: "2026-11-05", // YYYY-MM-DD 또는 null (2차)
  createdAt: 1730000000000
}
```

- 1차부터 `done`, `dueDate` 필드를 포함해 두어 2차에서 마이그레이션이 필요 없게 한다.
- 저장된 값이 없거나 파싱에 실패하면 빈 배열로 시작한다.

## 구조 (예정)
```
app/
  layout.js
  page.js              // 제목 + TodoApp을 ssr: false로 불러옴
  page.module.css
components/
  TodoApp.js           // 상태 관리 + localStorage 연동
  TodoForm.js          // 입력창 (+ 2차: 마감일)
  TodoList.js          // 목록 / 빈 상태
  TodoItem.js          // 항목 1개 (+ 2차: 체크박스, 마감일 표시)
lib/
  storage.js           // loadTodos / saveTodos
```

## 구현 시 유의사항
- `localStorage`는 클라이언트에서만 접근 가능 → `TodoApp`을 `next/dynamic`의 `ssr: false`로 브라우저에서만 렌더링하고, `useState(loadTodos)`로 첫 상태를 읽는다. (effect 안에서 `setState`를 부르는 방식은 lint 규칙 `react-hooks/set-state-in-effect`에 걸림)
- "마감 지남" 판단은 로컬 날짜 기준 `YYYY-MM-DD` 문자열 비교로 한다 (시간대 문제 방지).

## 진행 순서
1. `create-next-app`으로 프로젝트 생성 (JavaScript, App Router, Tailwind 미사용)
2. 1차: 추가 → 목록 → 삭제 → localStorage 저장
3. 2차: 완료 체크(취소선) → 마감일 입력·표시 → 지난 마감 강조

## 완료 기준
- 1차: 할 일을 추가·삭제할 수 있고, 새로고침 후에도 목록이 유지된다.
- 2차: 완료 체크 시 취소선이 생기고 해제 시 사라진다. 마감일이 표시되며, 지난 미완료 항목은 빨간색이다.
