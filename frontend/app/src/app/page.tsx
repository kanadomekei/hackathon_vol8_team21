import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto text-center mt-10 px-4">
      <h1 className="text-3xl font-bold mb-10">IT用語単語帳アプリ</h1>
      <div className="space-y-6">
        <Link href="/pages/select-mode" className="block">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
            クイズを始める
          </button>
        </Link>
        <Link href="/pages/word-list" className="block">
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
            単語リスト
          </button>
        </Link>
      </div>
    </div>
  );
}