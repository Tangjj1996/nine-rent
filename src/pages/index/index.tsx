import { navigateTo } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import heart from "@/assets/icon/heart.svg";
import heartFill from "@/assets/icon/heart-fill.svg";
import { data } from "./data";
import styles from "./styles.module.less";

export default function Index() {
  const calcStyle = (index: number): React.CSSProperties => {
    const objStyle: React.CSSProperties = {};

    if (index === 0) {
      objStyle.height = 200;
      return objStyle;
    }

    if (index % 2 === 0) {
      objStyle.transform = `translateY(-100px)`;
    }

    objStyle.height = 300;
    return objStyle;
  };

  const clacImgStyle = (index: number): React.CSSProperties => {
    const objStyle: React.CSSProperties = {
      width: "100%",
    };

    if (index === 0) {
      objStyle.height = 100;
      return objStyle;
    }

    objStyle.height = 200;
    return objStyle;
  };

  const handleClick = (key: string) => {
    navigateTo({
      url: `/pages/detail/index?key=${key}`,
    });
  };

  return (
    <View className={styles.index}>
      {data.map(({ key, cover, text, avatar, isLiked, like_count }, index) => (
        <View
          key={key}
          style={calcStyle(index)}
          className={styles.item}
          onClick={() => handleClick(key)}
        >
          <Image src={cover} style={clacImgStyle(index)} />
          <View className={styles["item-text"]}>{text}</View>
          <View className={styles["item-user"]}>
            <Image
              src={avatar}
              style={{ width: 20, height: 20, borderRadius: "50%" }}
            />
            <View className={styles["item-user-like"]}>
              <Image
                src={isLiked ? heartFill : heart}
                style={{ width: 20, height: 20, borderRadius: "50%" }}
              />
              {like_count}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
