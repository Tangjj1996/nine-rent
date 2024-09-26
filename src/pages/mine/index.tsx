import { useState } from "react";
import { useDidShow } from "@tarojs/taro";
import { View, Image, Input, Button } from "@tarojs/components";
import { getProfile } from "@/service/user/getProfile";
import { exceptionBiz } from "@/lib/utils";
import { ProfileData } from "@/service/user/Profile";
import position from "@/assets/icon/position.svg";
import vs from "@/assets/icon/vs.svg";
import love from "@/assets/icon/love.svg";
import star from "@/assets/icon/star_fill.svg";
import more from "@/assets/icon/more.svg";
import styles from "./styles.module.less";

export default function Mine() {
  const [profile, setProfile] = useState<ProfileData>();
  const [isShowBtn, setShowBtn] = useState(false);

  useDidShow(async () => {
    try {
      const {
        data: { data },
      } = (await getProfile()) || {};
      setProfile(data);
    } catch (e) {
      exceptionBiz(e);
    }
  });

  // 保存
  const hanldeSave = async () => {
    setShowBtn(false);
  };

  // 取消
  const handleCancel = async () => {
    setShowBtn(false);
  };

  return (
    <View className={styles.profile}>
      <View className={styles.user}>
        <Image
          style={{ width: 100, height: 100, borderRadius: "50%" }}
          src={profile?.avatar!}
        />
        <View className={styles["user-input"]}>
          <View>{profile?.nick_name}</View>
          {/* <Input
            defaultValue={profile?.nick_name}
            onBlur={() => setShowBtn(true)}
            style={{ width: 100, height: 40 }}
          />
          {isShowBtn && (
            <View className={styles["user-btn"]}>
              <Button size="mini" type="primary" onClick={hanldeSave}>
                保存
              </Button>
              <Button size="mini" onClick={handleCancel}>
                取消
              </Button>
            </View>
          )} */}
        </View>
      </View>
      <View className={styles.list}>
        <View className={styles["list-item"]}>
          <View className={styles["list-item-left"]}>
            <Image src={position} style={{ width: 20, height: 20 }} /> 定位
          </View>
          <Image src={more} style={{ width: 20, height: 20 }} />
        </View>
        <View className={styles["list-item"]}>
          <View className={styles["list-item-left"]}>
            <Image src={love} style={{ width: 20, height: 20 }} /> 点赞
          </View>
          <Image src={more} style={{ width: 20, height: 20 }} />
        </View>
        <View className={styles["list-item"]}>
          <View className={styles["list-item-left"]}>
            <Image src={star} style={{ width: 20, height: 20 }} /> 收藏
          </View>
          <Image src={more} style={{ width: 20, height: 20 }} />
        </View>
        <View className={styles["list-item"]}>
          <View className={styles["list-item-left"]}>
            <Image src={vs} style={{ width: 20, height: 20 }} /> 对比
          </View>
          <Image src={more} style={{ width: 20, height: 20 }} />
        </View>
      </View>
    </View>
  );
}
