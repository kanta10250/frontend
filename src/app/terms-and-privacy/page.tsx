import React from 'react';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mt-8">
    <h2 className="mb-4 text-xl font-semibold">{title}</h2>
    {children}
  </div>
);

const Subsection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="ml-2 mt-8">
    <h3 className="mb-2 text-base font-semibold">{title}</h3>
    {children}
  </div>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 text-sm">{children}</p>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="mb-4 ml-2 list-inside list-disc text-sm">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// Main component
export default function TermsAndPrivacy() {
  return (
    <div className="absolute left-0 top-0 z-10 mx-auto bg-white p-10 pb-20">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
        利用規約とプライバシーポリシー
      </h1>

      <div className="px-5 pt-5">
        <Section title="利用規約">
          <Subsection title="1 サービスの概要">
            <Paragraph>
              「ハスキー」は、犬や猫などのペットと一緒に散歩できる場所を共有するためのアプリケーションです。
              本アプリケーションの利用にあたっては、以下の利用規約に同意する必要があります。
            </Paragraph>
          </Subsection>

          <Subsection title="2 利用資格">
            <Paragraph>
              本アプリケーションは、13歳以上の方が利用できます。未成年者は保護者の同意を得た上でご利用ください。
            </Paragraph>
          </Subsection>

          <Subsection title="3 ユーザーの責任">
            <Paragraph>
              ユーザーは、自身のアカウントに関連するすべての行動について責任を負います。
              また、他のユーザーやペットに対する配慮を持って行動することを求めます。
            </Paragraph>
            <Paragraph>
              他のユーザーとのコミュニケーションでは、敬意を持って接し、マナーを守ることが求められます。
            </Paragraph>
          </Subsection>

          <Subsection title="4 禁止事項">
            <Paragraph>以下の行為は禁止します:</Paragraph>
            <List
              items={[
                '他のユーザーの個人情報を無断で収集すること',
                '不正な方法でアプリケーションにアクセスすること',
                '不正確な情報を投稿すること',
                '嫌がらせや脅迫行為を行うこと',
                'アプリケーションの運営を妨害する行為',
              ]}
            />
          </Subsection>

          <Subsection title="5 利用規約の変更">
            <Paragraph>
              本利用規約は随時変更される可能性があります。変更があった場合、アプリケーション内で通知しますので、定期的にご確認ください。
            </Paragraph>
          </Subsection>

          <Subsection title="6 免責事項">
            <Paragraph>
              本アプリケーションの利用に伴ういかなる損害についても、運営者は責任を負いません。ユーザーは自己の責任においてサービスを利用するものとします。
            </Paragraph>
          </Subsection>
        </Section>

        <div className="pt-5" />
        <Section title="プライバシーポリシー">
          <Subsection title="1 情報の収集">
            <Paragraph>
              「ハスキー」では、ユーザーがサービスを利用する際に、GPS情報を利用します。
              ただし、サーバーに情報を送信するのはユーザーが投稿を行った場合のみです。
            </Paragraph>
            <Paragraph>
              また、ユーザーがアカウント登録時に利用した、ユーザーのGoogleアカウント情報（メールアドレス、表示名）を収集します。
            </Paragraph>
          </Subsection>

          <Subsection title="2 情報の利用">
            <Paragraph>
              収集した情報は、散歩場所の共有やアプリケーションの改善に利用します。
              ユーザーの同意なしに、他の目的に利用することはありません。
            </Paragraph>
            <Paragraph>
              さらに、ユーザーからのフィードバックや提案を収集し、サービスの向上に役立てる場合があります。
            </Paragraph>
          </Subsection>

          <Subsection title="3 サードパーティへの情報提供">
            <Paragraph>
              「ハスキー」では、Google
              Analyticsなどのサードパーティツールを使用していません。
              また、ユーザーの個人情報を第三者に販売または提供することはありません。
            </Paragraph>
            <Paragraph>
              Supabaseを利用してデータを管理しており、必要に応じてセキュリティを維持しながらユーザーの情報を保存します。
            </Paragraph>
            <Paragraph>
              法令に基づく要請があった場合を除き、ユーザー情報を第三者に提供することはありません。
            </Paragraph>
          </Subsection>

          <Subsection title="4 セキュリティ">
            <Paragraph>
              ユーザーの情報を保護するために、適切なセキュリティ対策を講じていますが、完全な安全性を保証するものではありません。
            </Paragraph>
            <Paragraph>
              ユーザー自身もアカウント情報の管理に注意を払い、不正利用を防ぐための対策を講じる必要があります。
            </Paragraph>
          </Subsection>

          <Subsection title="5 プライバシーポリシーの変更">
            <Paragraph>
              本プライバシーポリシーは、随時変更される可能性があります。変更があった場合、アプリケーション内で通知しますので、定期的にご確認ください。
            </Paragraph>
          </Subsection>

          <Subsection title="6 ユーザーの権利">
            <Paragraph>
              ユーザーは、自己の個人情報へのアクセス、修正、削除を要求する権利があります。
              そのための手続きについては、アプリケーション内のサポートページを参照してください。
            </Paragraph>
          </Subsection>
        </Section>
        <div className="mr-2 w-full pt-6 text-end text-sm">
          <p>2024年8月31日　制定</p>
        </div>
      </div>
    </div>
  );
}
