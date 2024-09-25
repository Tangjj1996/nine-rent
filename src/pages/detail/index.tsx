import { useState } from "react";
import { useLoad } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { getDetail } from "@/service/hourse/getDetail";
import { exceptionBiz } from "@/lib/utils";
import { DetailData } from "@/service/hourse/Detail";

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

  return <View>{detail?.like_count}</View>;
}
