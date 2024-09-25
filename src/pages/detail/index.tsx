import { useState } from "react";
import { useLoad } from "@tarojs/taro";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import { getDetail } from "@/service/hourse/getDetail";
import { exceptionBiz } from "@/lib/utils";
import { DetailData } from "@/service/hourse/Detail";
import heart from "@/assets/icon/heart.svg";
import heartFill from "@/assets/icon/heart-fill.svg";
import star from "@/assets/icon/star.svg";
import starFill from "@/assets/icon/star_fill.svg";
import forward from "@/assets/icon/forward.svg";
import styles from "./styles.module.less";

export default function Mine() {
  const [detail, setDetail] = useState<DetailData>();

  useLoad(async (param) => {
    try {
      const { id } = param;
      const {
        data: { data: detailData },
      } = (await getDetail({ id })) || {};
      setDetail(detailData);
    } catch (e) {
      exceptionBiz(e);
    }
  });

  return (
    <View>
      <View className={styles.header}>{detail?.avatar}</View>
      <Swiper indicatorDots style={{ height: 500 }}>
        {detail?.swiper.map((url, index) => (
          <SwiperItem key={index} style={{ height: 500 }}>
            <Image style={{ width: "100%", height: 500 }} src={url} />
          </SwiperItem>
        ))}
      </Swiper>
      <View className={styles.title}>{detail?.title}</View>
      <View className={styles.content}>{detail?.content}</View>
      <View className={styles.tags}>
        {detail?.tags.map((text, index) => (
          <View key={index}>{text}</View>
        ))}
      </View>
      <View className={styles.footer}>
        <View className={styles["footer-like"]}>
          <Image
            src={detail?.is_liked ? heartFill : heart}
            style={{ width: 20, height: 20, borderRadius: "50%" }}
          />
          {detail?.like_count}
        </View>
        <View className={styles["footer-collection"]}>
          <Image
            src={detail?.is_collection ? star : starFill}
            style={{ width: 20, height: 20, borderRadius: "50%" }}
          />
          {detail?.collection_count}
        </View>
        <View className={styles["footer-forward"]}>
          <Image
            src={forward}
            style={{ width: 20, height: 20, borderRadius: "50%" }}
          />
        </View>
      </View>
    </View>
  );
}
