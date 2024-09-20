import { View } from "@tarojs/components";
import { data } from "./data";
import styles from "./styles.module.less";

console.log(styles);

export default function Index() {
  return (
    <View className={styles.index}>
      {data.map(({ key, cover, text, avatar, like }, index) => (
        <View
          key={key}
          style={{ height: index === 0 ? 200 : 300 }}
          className={styles.item}
        >
          <View>{cover}</View>
          <View>{text}</View>
          <View>
            <View>{avatar}</View>
            <View>{like}</View>
          </View>
        </View>
      ))}
    </View>
  );
}
