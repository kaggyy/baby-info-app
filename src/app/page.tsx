import { concerns } from '@/data/concerns';
import HomeClient from '@/components/HomeClient';

const CATCHPHRASES: string[][] = [
  ['授乳後は背中を', 'やさしくトントン。', 'ゲップを出すと、', '吐き戻しが', '減りますよ。'],
  ['泣き止まないときは', 'ちょっと外へ。', '新鮮な空気が、', '赤ちゃんもママも', '助けてくれます。'],
  ['夜泣きのときは', '部屋を暗くして', '静かに抱っこ。', '刺激を減らすと', '落ち着きやすいです。'],
  ['おむつ替えの後は', 'よく乾かしてから', '新しいおむつを。', 'かぶれの予防に', 'なりますよ。'],
  ['午前中は', '機嫌のいい時間帯。', '外遊びや', 'お出かけに', 'おすすめです。'],
  ['離乳食は', '食べなくて当然、', 'くらいの気持ちで。', '焦らなくても', '大丈夫ですよ。'],
  ['朝はカーテンを開けて', '日光を浴びせて。', '昼夜の区別が', 'ついてくると、', '夜も眠りやすくなります。'],
];

export default function Home() {
  const dayIndex = Math.floor(Date.now() / 86400000) % CATCHPHRASES.length;
  const catchphrase = CATCHPHRASES[dayIndex];

  return (
    <div className="min-h-screen bg-[#fdf9ef]">
      <HomeClient allConcerns={concerns} catchphrase={catchphrase} />
    </div>
  );
}
