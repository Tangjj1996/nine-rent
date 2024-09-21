import { useState } from "react";
import { useDidShow } from "@tarojs/taro";
import { View, Image, Input, Button } from "@tarojs/components";
import { getProfile } from "@/service/user/getProfile";
import { exceptionBiz } from "@/lib/utils";
import { ProfileData } from "@/service/user/Profile";
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
          <View>定位</View>
          <View></View>
        </View>
        <View className={styles["list-item"]}>
          <View>点赞</View>
          <View></View>
        </View>
        <View className={styles["list-item"]}>
          <View>收藏</View>
          <View></View>
        </View>
        <View className={styles["list-item"]}>
          <View>对比</View>
          <View></View>
        </View>
      </View>
    </View>
  );
}
