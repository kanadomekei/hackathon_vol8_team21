import Link from "next/link";

export default function Home() {
  return (
   
   <div　className="mx-auto text-center mt-10">
    <h1 className="my-10 mt-15 text-3xl">IT用語単語帳アプリ</h1>
    <div className="bg-gray-300 py-14 my-24 mx-24 rounded-2xl">
      <Link href={'pages/select-question'}>クイズを始める</Link>
    </div>
    <div className="bg-gray-300 py-14 my-24 mx-24 rounded-2xl">
      <Link href={'word-list'}>単語リスト</Link>
    </div>
   </div>
  );
}
