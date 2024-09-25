import { useState } from "react";
import { navigateTo, useLoad, useReachBottom } from "@tarojs/taro";
import { View, Image, ITouchEvent } from "@tarojs/components";
import heart from "@/assets/icon/heart.svg";
import heartFill from "@/assets/icon/heart-fill.svg";
import { getList } from "@/service/hourse/getList";
import { exceptionBiz } from "@/lib/utils";
import { ListData } from "@/service/hourse/List";
import styles from "./styles.module.less";

export default function Index() {
  const [data, setData] = useState<ListData>();
  const [pageInfo, setPageInfo] = useState({
    loading: false,
    isNextLoading: false,
    hasMore: false,
  });

  useReachBottom(async () => {
    if (!pageInfo.hasMore) return;
    try {
      setPageInfo((state) => ({ ...state, isNextLoading: true }));
      const {
        data: { data: listData },
      } = await getList({
        current: data?.current! + 1,
        page_size: data?.page_size!,
      });
      setData((state) => ({
        current: listData.current,
        page_size: listData.page_size,
        total: listData.total,
        list: state?.list.concat(listData.list) ?? [],
      }));
      setPageInfo((state) => ({
        ...state,
        hasMore:
          (data?.list.length ?? 0) + listData.list.length < listData.total,
      }));
    } catch (e) {
      exceptionBiz(e);
    } finally {
      setPageInfo((state) => ({ ...state, isNextLoading: false }));
    }
  });

  useLoad(async () => {
    try {
      setPageInfo({ loading: true, isNextLoading: false, hasMore: false });
      const {
        data: { data: listData },
      } = (await getList({ current: 1, page_size: 10 })) || {};
      setData(listData);
      setPageInfo((state) => ({
        ...state,
        hasMore: listData.list.length < listData.total,
      }));
    } catch (e) {
      exceptionBiz(e);
    } finally {
      setPageInfo((state) => ({
        ...state,
        loading: false,
        isNextLoading: false,
      }));
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

    if (index === data?.list.length! - 1 && index % 2 === 0) {
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
      {data?.list?.map(
        ({ key, cover, text, avatar, author, is_liked, like_count }, index) => (
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
                  src={is_liked ? heartFill : heart}
                  style={{ width: 20, height: 20, borderRadius: "50%" }}
                />
                {like_count}
              </View>
            </View>
          </View>
        )
      )}
      {pageInfo.hasMore && pageInfo.isNextLoading && (
        <View className={styles.footer}>Loading</View>
      )}
      {!pageInfo.hasMore && !pageInfo.loading && (
        <View className={styles.footer}>没有更多了～</View>
      )}
    </View>
  );
}
