"use client";
import {
  PromotionElement,
  PromotionPatternType,
  WidgetType,
} from "@/model/WidgetType";
import { Button, Card, Flex, Input, Select, Space, Tooltip } from "antd";
import { useMemo, useState } from "react";
import CustomSwitch from "../mini/CustomSwitch";
import WidgetTypeIcon, { WidgetTypeName } from "../mini/WidgetTypeIcon";
import { InfoCircleOutlined, FieldStringOutlined } from "@ant-design/icons";
import { DiscountType, PromotionType } from "@/model/PromotionType";
import { formatDate } from "@/utils/DateFormatter";
import CustomEmpty from "../mini/CustomEmpty";
import Search from "antd/es/transfer/search";
import PromotionCard from "../mini/PromotionCard";
import { PUT_UpdateWidget } from "@/app/apis/widget/WidgetAPI";
import { GET_GetPromotionListByShop } from "@/app/apis/promotion/PromotionAPI";

interface WidgetProps {
  widget: WidgetType;
  updateWidgets(): void;
}

export default function PromotionWidget(props: WidgetProps) {
  // mock data
  const promotionsData: PromotionType[] = [
    {
      _id: "1",
      name: "Giảm 50%",
      description: "Áp dụng cho thanh toán qua ví điện tử MoMo (tối đa 100k)",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 50,
      quantity: 6,
      upperBound: 100000,
      expiredDate: formatDate(new Date("2024-03-24T12:30:00")),
      code: "BONJOUR",
    },
    {
      _id: "2",
      name: "Giảm 200k",
      description:
        "Áp dụng cho mọi đối tượng khách hàng (cho đơn tối thiểu 400k)",
      discountType: DiscountType.DIRECT_PRICE,
      discountValue: 200000,
      quantity: 20,
      lowerBound: 400000,
      expiredDate: formatDate(new Date("2024-03-27T12:30:00")),
      code: "MERCI",
    },
    {
      _id: "3",
      name: "Giảm 20%",
      description: "Áp dụng cho tất cả khách hàng (tối đa 50k)",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 20,
      quantity: 15,
      upperBound: 50000,
      expiredDate: formatDate(new Date("2024-03-22T12:30:00")),
      code: "AUREVOIR",
    },
    {
      _id: "4",
      name: "Giảm 50k",
      description: "Chỉ áp dụng cho khách hàng VIP",
      discountType: DiscountType.DIRECT_PRICE,
      discountValue: 50000,
      quantity: 10,
      lowerBound: 0,
      expiredDate: formatDate(new Date("2024-04-30T12:30:00")),
      code: "BONSOIR",
    },
    {
      _id: "5",
      name: "Giảm 10%",
      description: "Áp dụng cho thanh toán qua thẻ tín dụng (tối đa 50k)",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 10,
      quantity: 8,
      upperBound: 50000,
      expiredDate: formatDate(new Date("2024-03-25T12:30:00")),
      code: "BIENVENUE",
    },
  ];
  const mockId = "65f1e8bbc4e39014df775166";

  // data
  const [proxyPromotionId, setProxyPromotionId] = useState<Array<string>>([]);

  // variables
  const [promotions, setPromotions] = useState<PromotionType[]>();

  const [proxyPromotionWidget, setProxyPromotionWidget] = useState(
    props.widget
  );

  const [isSwitched, setIsSwitched] = useState(props.widget.visibility);

  // functions
  const handleSave = async () => {
    proxyPromotionWidget.visibility = isSwitched;

    element.title = title;
    element.promotionIdList = proxyPromotionId;

    proxyPromotionWidget.element = element;

    const response = await PUT_UpdateWidget(proxyPromotionWidget);

    if (response.status === 200) {
      setProxyPromotionWidget(proxyPromotionWidget);
      props.updateWidgets();
    } else console.log(response.message);
  };

  const handleChangePattern = (value: string) => {
    console.log(`selected ${value}`);
  };

  const checkInclude = (value: string) => {
    let check = false;
    proxyPromotionId.forEach((promotion) => {
      if (promotion === value) {
        check = true;
      }
    });

    // console.log(`selected ${value}, ${check}`);
    return check;
  };

  const handleAddPromotion = (value: PromotionType, index: number) => {
    if (checkInclude(value._id)) return;

    proxyPromotionId.push(value._id);
    setProxyPromotionId(proxyPromotionId);

    props.updateWidgets();
  };

  const handleRemovePromotion = (value: PromotionType, index: number) => {
    setProxyPromotionId(proxyPromotionId.filter((id) => id !== value._id));

    props.updateWidgets();
  };

  // call api
  const handleGetPromotionList = async () => {
    const response = await GET_GetPromotionListByShop(mockId);
    if (response.status == 200) {
      if (response.data) {
        setPromotions(response.data);
        // console.log("product", data);
      }
    }
  };

  const element = useMemo(() => {
    let temp = props.widget.element as PromotionElement;

    setProxyPromotionId(temp.promotionIdList);

    // call api to get promotion info
    handleGetPromotionList();

    return temp;
  }, [props.widget.element]);

  const [title, setTitle] = useState(element.title);

  return (
    <div className="m-5 pb-5 h-[500px] overflow-y-auto overflow-x-hidden">
      <div className="m-5 text-2xl font-semibold flex justify-between">
        <WidgetTypeName
          type={props.widget.type}
          element={props.widget.element}
          order={props.widget.order}
        />
        <CustomSwitch isSwitched={isSwitched} setIsSwitched={setIsSwitched} />
      </div>

      <Flex vertical gap="large">
        {/* other */}
        <Select
          defaultValue={PromotionPatternType.GRID.toString()}
          style={{ width: "100%" }}
          onChange={handleChangePattern}
          options={[
            {
              value: PromotionPatternType.GRID.toString(),
              label: (
                <Flex gap="small">
                  <WidgetTypeIcon
                    type={props.widget.type}
                    element={{
                      pattern: PromotionPatternType.GRID,
                      title: "",
                      promotionIdList: [],
                    }}
                  />
                  Mã giảm giá
                </Flex>
              ),
            },
          ]}
          disabled
        />
        {/* title */}
        <Flex vertical gap="small">
          <div className="font-semibold">
            <a className="text-red-600">*</a>
            Tiêu đề
          </div>
          <div className="w-full">
            <Input
              placeholder="Điền tiêu đề"
              prefix={<FieldStringOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Giới hạn n kí tự">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </Flex>
        {/* select promotions */}
        <Flex vertical gap="small">
          <div className="font-semibold">Mã giảm giá</div>

          <div className="font-light text-sm">Chọn giảm giá để hiển thị</div>

          {promotions && promotions.length > 0 && (
            <Space direction="vertical">
              {/* <div className="flex gap-5 mt-5 border rounded bg-slate-100 p-5">
                <Search placeholder="Nhập để tìm mã"></Search>
                <Button className="bg-blue-500 font-semibold text-white">
                  Áp dụng
                </Button>
              </div> */}
              <Card className="overflow-auto h-96">
                {promotions &&
                  promotions.map((item, index) => {
                    return (
                      <PromotionCard
                        item={item}
                        isSelected={checkInclude(item._id)}
                        applyDiscount={(item: PromotionType) => {
                          handleAddPromotion(item, index);
                        }}
                        removeDiscount={(item: PromotionType) => {
                          handleRemovePromotion(item, index);
                        }}
                      />
                    );
                  })}
              </Card>
              <div className="my-5 flex flex-row justify-center items-center">
                <div>Bạn đã chọn &nbsp;</div>
                <div
                  className={`${
                    proxyPromotionId.length > 0 ? "text-red-500" : ""
                  } font-bold text-2xl`}
                >
                  {proxyPromotionId.length}
                </div>
                <div>&nbsp; mã giảm giá sản phẩm &nbsp;</div>
              </div>
            </Space>
          )}
          {promotions && promotions.length == 0 && <CustomEmpty />}
        </Flex>

        {/* Buttons */}
        <Flex gap="large">
          <Button size="large" onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
