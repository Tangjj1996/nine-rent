import { useState } from "react";
import { useLoad, request, showToast } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { getDetail } from "@/service/hourse/getDetail";

export default function Mine() {
  const [detail, setDetail] = useState([]);

  useLoad((param) => {
    const { key } = param;

    getDetail({
      key,
    })
      .then((res) => {
        setDetail(res);
      })
      .catch((_e) => {
        showToast({ title: "网络错误", icon: "error" });
      });
  });

  return <View>Min2</View>;
}
