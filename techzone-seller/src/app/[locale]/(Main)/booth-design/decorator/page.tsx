"use client";

import { Affix, Breadcrumb, Button, FloatButton, Tabs } from "antd";
import { useState } from "react";
import Banner from "@/component/booth-design/decorator/mini/Banner";
import Search from "antd/es/transfer/search";
import WidgetEditorBar from "@/component/booth-design/decorator/WidgetEditorBar";
import WidgetList from "@/component/booth-design/decorator/WidgetList";
import {
  WidgetType,
  WidgetCategoryType,
  CategoryPatternType,
  BannerPatternType,
  ProductPatternType,
  PromotionPatternType,
  CollectionPatternType,
} from "@/model/WidgetType";
import WidgetDrawer from "@/component/booth-design/decorator/WidgetDrawer";
import { AddWidgetHandle } from "@/component/booth-design/decorator/widgetUtils/AddWidgetHandle";
import DeleteWidgetModal from "@/component/booth-design/decorator/modal/DeleteWidgetModal";
import { HiOutlineHome } from "react-icons/hi2";
import { Link } from "react-scroll";

export interface ShopInfoProps {
  color: string;
  name: string;
  avatarUrl: string;
  bannerUrl: string;
}

export default function BoothDecoratorPage() {
  // mock data
  const shopInfoData = {
    color: "white",
    name: "TechZone Shop",
    avatarUrl: "",
    bannerUrl: "",
  };

  const [widgets, setWidgets] = useState<WidgetType[]>([
    {
      _id: "collection_ID1",
      type: WidgetCategoryType.COLLECTION,
      order: 1,
      visibility: true,
      element: {
        pattern: CollectionPatternType.GRID,
        collectionIdList: [],
      },
    },
    {
      _id: "collection_ID2",
      type: WidgetCategoryType.COLLECTION,
      order: 8,
      visibility: true,
      element: {
        pattern: CollectionPatternType.CAROUSEL,
        collectionIdList: [],
      },
    },
    {
      _id: "category_ID",
      type: WidgetCategoryType.CATEGORY,
      order: 7,
      visibility: false,
      element: {
        pattern: CategoryPatternType.GRID,
        title: "Danh mục nổi bật",
        categoryIdList: [],
      },
    },
    {
      _id: "product_ID",
      type: WidgetCategoryType.PRODUCT,
      order: 2,
      visibility: true,
      element: {
        pattern: ProductPatternType.GRID,
        title: "Sản phẩm mới",
        collectionId: "",
      },
    },
    {
      _id: "product_ID2",
      type: WidgetCategoryType.PRODUCT,
      order: 4,
      visibility: true,
      element: {
        pattern: ProductPatternType.CAROUSEL,
        title: "Sản phẩm giá hời",
        collectionId: "",
      },
    },
    {
      _id: "product_ID3",
      type: WidgetCategoryType.PRODUCT,
      order: 5,
      visibility: true,
      element: {
        pattern: ProductPatternType.GRID,
        title: "Sản phẩm nổi bật",
        collectionId: "",
      },
    },
    {
      _id: "product_ID4",
      type: WidgetCategoryType.PRODUCT,
      order: 6,
      visibility: true,
      element: {
        pattern: ProductPatternType.CAROUSEL,
        title: "Sản phẩm cho bạn",
        collectionId: "",
      },
    },
    {
      _id: "promotion_ID",
      type: WidgetCategoryType.PROMOTION,
      order: 3,
      visibility: false,
      element: {
        pattern: PromotionPatternType.GRID,
        title: "Voucher trao tay",
        promotionIdList: [],
      },
    },
    {
      _id: "banner_ID",
      type: WidgetCategoryType.BANNER,
      order: 0,
      visibility: true,
      element: {
        pattern: BannerPatternType.CAROUSEL,
        images: [],
      },
    },
  ]);

  // variables n methods
  const tabItems = [
    "Cửa Hàng",
    "Tất Cả Sản Phẩm",
    "Bộ Sưu Tập",
    "Hồ Sơ Cửa Hàng",
  ];

  const [shopInfo, setShopInfo] = useState<ShopInfoProps>(shopInfoData);

  // widget drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  // add widget
  const addWidget = (type: number, pattern: number, order: number) => {
    // console.log("addWidget", type, pattern, order);
    let newWidget = AddWidgetHandle({ type, pattern, order });
    setWidgets([...widgets, newWidget]);
    setOpenDrawer(false);
  };

  // update widget's visibility
  const toggleInvisibilityWidget = (widget: WidgetType) => {
    widget.visibility = !widget.visibility;
    setWidgets([...widgets]);
    // TODO: toast update successfully
  };

  // delete widget
  const tempWidget = {
    _id: "",
    type: 0,
    order: 0,
    visibility: false,
    element: undefined,
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletableWidget, setDeletableWidget] =
    useState<WidgetType>(tempWidget);

  const handleDeleteWidget = (widget: WidgetType) => {
    setDeletableWidget(widget);
    setOpenDeleteModal(true);
  };

  const deleteWidget = () => {
    let newList = widgets.filter((w) => w._id !== deletableWidget._id);
    setWidgets(newList);

    setOpenDeleteModal(false);
    setDeletableWidget(tempWidget);

    // TODO: toast update successfully
  };

  return (
    <div className="m-5 grid grid-cols-3 h-fit">
      <div className="col-span-2">
        <div className="bg-white p-2 mb-1">
          <Breadcrumb
            className="text-xs"
            items={[
              {
                href: "/",
                title: (
                  <div className="flex items-center">
                    <HiOutlineHome size={15} />
                  </div>
                ),
              },
              {
                title: "Thiết kế gian hàng",
              },
              {
                href: "/product/list",
                title: "Trang trí gian hàng",
              },
            ]}
          />
        </div>

        <section id="general-info">
          <Banner
            color={shopInfo.color}
            name={shopInfo.name}
            avatarUrl={shopInfo.avatarUrl}
            bannerUrl={shopInfo.bannerUrl}
          />
        </section>

        <div className="overflow-hidden">
          <Tabs
            defaultActiveKey="0"
            size="middle"
            style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}
            items={tabItems.map((item, i) => {
              return {
                label: item,
                key: i.toString(),
                children: <div />,
                disabled: true,
              };
            })}
            tabBarExtraContent={
              <Search disabled placeholder="Tìm tại cửa hàng" />
            }
          />
        </div>

        <div className="m-2">
          <WidgetList widgets={widgets} />
          <section id="new-widget" className="invisible">
            New widget
          </section>
        </div>

        <Link
          activeClass="active"
          to="new-widget"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          // onSetActive={handleSetActive}
        >
          <Button
            block
            onClick={() => {
              setOpenDrawer(true);
            }}
          >
            + Thêm widget
          </Button>
        </Link>
      </div>

      <div className="col-span-1 ml-2">
        <Affix offsetTop={80}>
          <Link
            activeClass="active"
            to="new-widget"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            // onSetActive={handleSetActive}
          >
            <Button
              className="mb-2 mr-5 w-full min-w-80"
              block
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              + Thêm widget
            </Button>
          </Link>

          <WidgetEditorBar
            widgets={widgets}
            setWidgets={setWidgets}
            toggleInvisibilityWidget={toggleInvisibilityWidget}
            deleteWidget={handleDeleteWidget}
            shopInfo={shopInfo}
            setShopInfo={setShopInfo}
          />
        </Affix>
      </div>

      <WidgetDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        addWidget={addWidget}
        order={widgets.length}
      />

      <FloatButton.BackTop tooltip={<div>Lướt lên đầu</div>} />

      <DeleteWidgetModal
        open={openDeleteModal}
        handleOk={() => deleteWidget()}
        handleCancel={() => setOpenDeleteModal(false)}
      />
    </div>
  );
}
