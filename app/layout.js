import "./globals.css";

export const metadata = {
  title: "할 일",
  description: "간단한 할 일 관리",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
