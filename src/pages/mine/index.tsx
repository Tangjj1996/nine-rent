import { useState } from "react";
import { View, Image, Input, Button } from "@tarojs/components";
import styles from "./styles.module.less";

export default function Mine() {
  const [isShowBtn, setShowBtn] = useState(false);

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
          // https://sns-avatar-qc.xhscdn.com/avatar/cd255d0e201935e0d852bd371f18c198.jpg?imageView2/2/w/120/format/jpg|imageMogr2/strip
          src="https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo310h0v19f6k505nj20u2g91rsgq91350?imageView2/2/w/120/format/jpg|imageMogr2/strip"
        />
        <View className={styles["user-input"]}>
          <Input
            defaultValue="顾建杰"
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
          )}
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
