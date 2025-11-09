import { Typography } from "antd";

import lowTaskImg from "./img/lowTask.svg";
import middleTaskImg from "./img/middleTask.svg";
import hardTaskImg from "./img/hardTask.svg";
import unbeliavableTaskImg from "./img/unbelievableTask.svg";

export function definePriority(task) {
  let icon = 0;
  let color = "#0300FF";
  let priorityName = "Ошибочка вышла..";
  let priorityOrder = 1;
  switch (task.priority) {
    case "low":
      color = "#58F55A";
      priorityName = "Низкий";
      break;
    case "middle":
      color = "#E6E62E";
      priorityName = "Средний";
      priorityOrder = 2;
      break;
    case "high":
      color = "#F2AE00";
      priorityName = "Высокий";
      priorityOrder = 3;
      break;
    case "unbelievable":
      color = "#F72D1E";
      priorityName = "Ну капец какой";
      priorityOrder = 4;
      break;
  }
  return { ...task, icon, color, priorityName, priorityOrder };
}

export function defineIcon(task) {
  switch (task.priority) {
    case "low":
      return (
        <img
          src={lowTaskImg}
          style={{ width: "8rem", height: "8rem", borderRadius: 10 }}
        />
      );
    case "middle":
      return (
        <img
          src={middleTaskImg}
          style={{ width: "8rem", height: "8rem", borderRadius: 10 }}
        />
      );
    case "high":
      return (
        <img
          src={hardTaskImg}
          style={{ width: "8rem", height: "8rem", borderRadius: 10 }}
        />
      );
    case "unbelievable":
      return (
        <img
          src={unbeliavableTaskImg}
          style={{ width: "8rem", height: "8rem", borderRadius: 10 }}
        />
      );
  }
}

export function Quote() {
  return (
    <>
      <Typography.Paragraph>Еще не успели ничего сделать?</Typography.Paragraph>
      <Typography.Paragraph>
        Не поздно начать. Никогда не поздно. Вот послушайте.
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        "Удивительная штука — жизнь.
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        В детстве кажется, что 28 лет — это возраст полуживого старика.
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        В 28 ты не понимаешь, как 40-летние ноги таскают. И зачем. Легли бы уже
        и лежали, чо бродить зазря, песок свой просыпать повсюду…
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        А потом ты сам стремительно влетаешь в этот возраст и тебе смешно
        вспоминать себя, того, маленького и глупого, думавшего так.
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        И ты понимаешь, что в 35 лет можно влюбиться, как подросток, и создать
        самую счастливую семью.
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        В 38 — построить дом, переехать, начать всё с нуля. И будет здорово.
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        В 40 бросить работу, без которой ты себя не мыслил два десятка лет,
        уехать на войну, и ни о чем не жалеть, оглядываясь назад. Ни единого дня
        не жалеть ни о чём.
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        А после 40 находить друзей. Таких, не прочитав от которых «доброе утро»
        — ты начинаешь нервничать и всё валится из рук. Вот уж над чем бы я
        посмеялась 20 лет назад!
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        А в 44 к тебе вдруг приходит некто из прошлого и предлагает… ну как бы
        вам объяснить… возглавить отряд лётчиков-истребителей, к примеру. Или
        построить ресторан на Северном Полюсе. Или поехать дрессировать
        индийских слонов. Неважно.
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        Ты отнекиваешься, говоришь: «Вы ошиблись, я не то, что вам надо, я не
        умею, вон сколько красивых и умных это умеют, зачем я вам?».
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        А тебе отвечают: «Попробуй. Ну попробуй. Это очень интересно!».
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        Ты пробуешь — и получается. Пробуешь чуть посмелее — и снова получается.
        А спустя неделю кто-то твоим ртом говорит: «Не спорьте, я сделаю
        по-другому, по-своему, я лучше знаю» — тем же людям, которых ты уверял,
        что не знаешь и не умеешь. И они смеются по-доброму, и снова всё
        получается.
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        И ты снова ни о чём не жалеешь, оглядываясь назад. И понимаешь, что
        готов оставить то, без чего ещё вчера себя не мыслил.
      </Typography.Paragraph>
      <Typography.Paragraph italic>
        Лет в 60 я, наверное, стану первой космической туристкой-бабуськой. А в
        80 рожу ребёнка. Ну, а фигли, уж это я точно умею и у меня получается.
      </Typography.Paragraph>
      <Typography.Paragraph italic strong>
        К чему в этой жизни можно применить слово «поздно»? Ни к чему. Пока ты
        сам так не будешь думать."
      </Typography.Paragraph>

      <Typography.Paragraph italic>© Галина Созанчук</Typography.Paragraph>
    </>
  );
}
