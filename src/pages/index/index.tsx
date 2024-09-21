import { useState } from "react";
import { navigateTo, useLoad } from "@tarojs/taro";
import { View, Image, ITouchEvent } from "@tarojs/components";
import heart from "@/assets/icon/heart.svg";
import heartFill from "@/assets/icon/heart-fill.svg";
import { getList } from "@/service/hourse/getList";
import { exceptionBiz } from "@/lib/utils";
import { ListData } from "@/service/hourse/List";
import styles from "./styles.module.less";

export default function Index() {
  const [data, setData] = useState<ListData[]>([]);

  useLoad(async () => {
    try {
      const {
        data: { data: listData },
      } = (await getList()) || {};
      setData(listData);
    } catch (e) {
      exceptionBiz(e);
    }
  });

  const calcStyle = (index: number): React.CSSProperties => {
    const objStyle: React.CSSProperties = {};

    if (index === 0) {
      objStyle.height = 200;
    } else {
      objStyle.height = 300;
    }

    if (index % 2 === 0 && index !== 0) {
      objStyle.transform = `translateY(-100px)`;
    }

    if (index === data.length - 1 && index % 2 === 0) {
      if (!objStyle.transform) {
        objStyle.transform = "";
      }
      objStyle.transform += `translateX(-105px)`;
    }

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

  /**
   * 跳转详情
   * @param key
   */
  const handleClick = (key: string) => {
    navigateTo({
      url: `/pages/detail/index?key=${key}`,
    });
  };

  const handleLiked = (e: ITouchEvent, key: string) => {
    e.stopPropagation();
  };

  return (
    <View className={styles.index}>
      {data.map(
        ({ key, cover, text, avatar, author, isLiked, like_count }, index) => (
          <View
            key={key}
            style={calcStyle(index)}
            className={styles.item}
            onClick={() => handleClick(key)}
          >
            <Image src={cover} style={clacImgStyle(index)} />
            <View className={styles["item-text"]}>{text}</View>
            <View className={styles["item-user"]}>
              <View className={styles["item-user-name"]}>
                <Image
                  src={avatar}
                  style={{ width: 20, height: 20, borderRadius: "50%" }}
                />
                <View>{author}</View>
              </View>
              <View
                className={styles["item-user-like"]}
                onClick={(e) => handleLiked(e, key)}
              >
                <Image
                  src={isLiked ? heartFill : heart}
                  style={{ width: 20, height: 20, borderRadius: "50%" }}
                />
                {like_count}
              </View>
            </View>
          </View>
        )
      )}
    </View>
  );
}
