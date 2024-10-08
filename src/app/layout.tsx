import Container from '@/components/container';
import Footer from '@/components/footer';
import { ActionProvider } from '@/context/actionContext';
import { MarkerProvider } from '@/context/markerContext';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Howsky',
  description:
    'You can share your recommendations for places you would like to visit!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`flex h-screen flex-col ${notoSansJP.className}`}>
        <MarkerProvider>
          <ActionProvider>
            <Container>
              {children}
              <Footer />
            </Container>
          </ActionProvider>
        </MarkerProvider>
      </body>
    </html>
  );
}
