import { useState } from "react";
import { produce } from "immer";
import {
  navigateTo,
  useLoad,
  useReachBottom,
  login,
  getStorageSync,
  setStorageSync,
} from "@tarojs/taro";
import { View, Image, ITouchEvent } from "@tarojs/components";
import heart from "@/assets/icon/heart.svg";
import heartFill from "@/assets/icon/heart-fill.svg";
import { getList } from "@/service/hourse/getList";
import { postLike, postCancelLike } from "@/service/hourse/postLike";
import { HouseType } from "@/service/hourse/shared";
import { exceptionBiz } from "@/lib/utils";
import { LocalStorageKey } from "@/enums";
import { getLogin } from "@/service/user/login";
import { useCollectionStore } from "@/store/collectionStore";
import styles from "./styles.module.less";

export default function Index() {
  const collectionStore = useCollectionStore();
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
        current: collectionStore?.current! + 1,
        page_size: collectionStore?.page_size!,
        type: HouseType.collection,
      });
      useCollectionStore.setState((state) => ({
        current: listData.current,
        page_size: listData.page_size,
        total: listData.total,
        list: state?.list?.concat(listData.list) ?? [],
      }));
      setPageInfo((state) => ({
        ...state,
        hasMore:
          (collectionStore?.list?.length ?? 0) + listData.list.length <
          listData.total,
      }));
    } catch (e) {
      exceptionBiz(e);
    } finally {
      setPageInfo((state) => ({ ...state, isNextLoading: false }));
    }
  });

  useLoad(async () => {
    try {
      if (!getStorageSync(LocalStorageKey.openId)) {
        const { code } = (await login()) || {};
        const { data: loginData } = (await getLogin({ code })) || {};
        setStorageSync(LocalStorageKey.openId, loginData.data.openid);
      }
      setPageInfo({ loading: true, isNextLoading: false, hasMore: false });
      const {
        data: { data: listData },
      } =
        (await getList({
          current: 1,
          page_size: 10,
          type: HouseType.collection,
        })) || {};
      useCollectionStore.setState(listData);
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

    if (index === collectionStore?.list?.length! - 1 && index % 2 === 0) {
      if (!objStyle.transform) {
        objStyle.transform = "";
      }
      objStyle.transform += `translateX(calc(-50% - 10px))`;
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
   * @param id
   */
  const handleClick = (id: number) => {
    navigateTo({
      url: `/pages/detail/index?id=${id}&type=${HouseType.collection}`,
    });
  };

  /**
   * 点赞
   * @param e
   * @param id
   */
  const handleLiked = async (e: ITouchEvent, id: number) => {
    e.stopPropagation();
    try {
      const {
        data: { data: listData },
      } = await postLike({ id });
      useCollectionStore.setState(
        produce(collectionStore, (draft) => {
          draft?.list?.forEach((item) => {
            if (item.id === listData.id) {
              item.is_liked = true;
              item.like_count++;
            }
          });
        })
      );
    } catch (err) {
      exceptionBiz(err);
    }
  };

  /**
   * 取消点赞
   * @param e
   * @param id
   */
  const handleCancelLiked = async (e: ITouchEvent, id: number) => {
    e.stopPropagation();
    try {
      const {
        data: { data: listData },
      } = await postCancelLike({ id });
      useCollectionStore.setState(
        produce(collectionStore, (draft) => {
          draft?.list?.forEach((item) => {
            if (item.id === listData.id) {
              item.is_liked = false;
              item.like_count--;
            }
          });
        })
      );
    } catch (err) {
      exceptionBiz(err);
    }
  };

  return (
    <View className={styles.page}>
      <View className={styles.index}>
        {collectionStore?.list?.map(
          (
            { key, id, cover, title, avatar, nick_name, is_liked, like_count },
            index
          ) => (
            <View
              key={key}
              style={calcStyle(index)}
              className={styles.item}
              onClick={() => handleClick(id)}
            >
              <Image src={cover} style={clacImgStyle(index)} />
              <View className={styles["item-text"]}>{title}</View>
              <View className={styles["item-user"]}>
                <View className={styles["item-user-name"]}>
                  <Image
                    src={avatar}
                    style={{ width: 20, height: 20, borderRadius: "50%" }}
                  />
                  <View>{nick_name}</View>
                </View>
                <View
                  className={styles["item-user-like"]}
                  onClick={(e) => {
                    is_liked ? handleCancelLiked(e, id) : handleLiked(e, id);
                  }}
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
      </View>
      {pageInfo.hasMore && pageInfo.isNextLoading && (
        <View className={styles.footer}>Loading</View>
      )}
      {!pageInfo.hasMore && !pageInfo.loading && (
        <View className={styles.footer}>没有更多了～</View>
      )}
    </View>
  );
}
