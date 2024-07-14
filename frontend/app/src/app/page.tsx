import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-10 text-indigo-800">IT用語単語帳アプリ</h1>
        <div className="space-y-6">
          <Link href="/pages/select-mode" className="block">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-md">
              クイズを始める
            </button>
          </Link>
          <Link href="/pages/word-list" className="block">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-md">
              単語リスト
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}